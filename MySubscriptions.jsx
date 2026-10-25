import { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./MySubscriptions.css";

const API_URL = "http://127.0.0.1:8000/api";

async function readApiResponse(response) {
  const text = await response.text();

  try {
    return text ? JSON.parse(text) : {};
  } catch {
    throw new Error(
      `Backend returned an invalid response. HTTP ${response.status}.`
    );
  }
}

function getList(data) {
  if (Array.isArray(data)) {
    return data;
  }

  if (Array.isArray(data?.results)) {
    return data.results;
  }

  return [];
}

function getStatus(subscription) {
  return String(subscription.status || "unknown").toLowerCase();
}

function getStatusLabel(status) {
  return status.charAt(0).toUpperCase() + status.slice(1);
}

function getMealPlanName(subscription, mealPlans) {
  const mealPlan = subscription.meal_plan;

  if (mealPlan && typeof mealPlan === "object") {
    return (
      mealPlan.name ||
      mealPlan.title ||
      `Meal Plan #${mealPlan.id ?? ""}`
    );
  }

  const matchedPlan = mealPlans.find(
    (plan) => String(plan.id) === String(mealPlan)
  );

  if (matchedPlan) {
    return matchedPlan.name || matchedPlan.title || `Meal Plan #${matchedPlan.id}`;
  }

  return mealPlan
    ? `Meal Plan #${mealPlan}`
    : "Meal Plan";
}

function formatPrice(price) {
  if (price === null || price === undefined || price === "") {
    return "Not available";
  }

  const amount = Number(price);

  return Number.isFinite(amount)
    ? `₹${amount.toFixed(2)}`
    : "Not available";
}

function MySubscriptions() {
  const [subscriptions, setSubscriptions] = useState([]);
  const [mealPlans, setMealPlans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [actionMessage, setActionMessage] = useState("");
  const [actionLoadingId, setActionLoadingId] = useState(null);

  const loadSubscriptions = useCallback(async () => {
    const token =
      localStorage.getItem("access") ||
      sessionStorage.getItem("access");

    if (!token) {
      setError("Login token सापडला नाही. आधी Customer account ने Login कर.");
      setSubscriptions([]);
      setLoading(false);
      return;
    }

    setLoading(true);
    setError("");

    try {
      const response = await fetch(`${API_URL}/subscriptions/`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
        },
      });

      const data = await readApiResponse(response);

      if (!response.ok) {
        if (response.status === 401) {
          throw new Error("Login session संपली आहे. पुन्हा Login कर.");
        }

        throw new Error(
          data.detail ||
            data.debug_error ||
            `Subscriptions load झाल्या नाहीत. HTTP ${response.status}`
        );
      }

      setSubscriptions(getList(data));

      try {
        const plansResponse = await fetch(`${API_URL}/meal-plans/`, {
          headers: {
            Accept: "application/json",
          },
        });

        const plansData = await readApiResponse(plansResponse);

        if (plansResponse.ok) {
          setMealPlans(getList(plansData));
        }
      } catch {
        setMealPlans([]);
      }
    } catch (err) {
      setError(err.message || "Subscriptions load करताना error आला.");
      setSubscriptions([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadSubscriptions();
  }, [loadSubscriptions]);

  async function handleSubscriptionAction(subscription, action) {
    const token =
      localStorage.getItem("access") ||
      sessionStorage.getItem("access");

    if (!token) {
      setActionMessage("Login token सापडला नाही. पुन्हा Login कर.");
      return;
    }

    if (
      action === "cancel" &&
      !window.confirm(
        `Subscription #${subscription.id} cancel करायची आहे का?`
      )
    ) {
      return;
    }

    setActionLoadingId(subscription.id);
    setActionMessage("");
    setError("");

    try {
      const response = await fetch(
        `${API_URL}/subscriptions/${subscription.id}/${action}/`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        }
      );

      const data = await readApiResponse(response);

      if (!response.ok) {
        if (response.status === 401) {
          throw new Error("Login session संपली आहे. पुन्हा Login कर.");
        }

        throw new Error(
          data.detail ||
            data.debug_error ||
            `Subscription update झाली नाही. HTTP ${response.status}`
        );
      }

      setActionMessage(
        data.detail || "Subscription successfully updated."
      );

      await loadSubscriptions();
    } catch (err) {
      setActionMessage(
        err.message || "Subscription update करताना error आला."
      );
    } finally {
      setActionLoadingId(null);
    }
  }

  return (
    <main className="my-subscriptions-page">
      <header className="subscriptions-header">
        <Link to="/" className="subscriptions-brand">
          🍱 Tiffin & Home Food
        </Link>

        <Link to="/#meal-plans" className="back-link">
          Browse Meal Plans
        </Link>
      </header>

      <section className="subscriptions-content">
        <div className="subscriptions-title">
          <p className="subscriptions-eyebrow">YOUR ACCOUNT</p>
          <h1>My Subscriptions</h1>
          <p className="subscriptions-subtitle">
            View and manage your homemade meal subscriptions.
          </p>
        </div>

        {actionMessage && (
          <div className="subscription-action-message" role="status">
            <p>{actionMessage}</p>
          </div>
        )}

        {loading && (
          <div className="subscription-message" role="status">
            Loading subscriptions...
          </div>
        )}

        {!loading && error && (
          <div className="subscription-error" role="alert">
            <p>{error}</p>

            <Link to="/login" className="subscription-button">
              Go to Login
            </Link>

            <button
              type="button"
              className="subscription-action-button"
              onClick={loadSubscriptions}
            >
              Try Again
            </button>
          </div>
        )}

        {!loading && !error && subscriptions.length === 0 && (
          <div className="subscription-empty">
            <div className="empty-icon">🍱</div>
            <h2>No subscriptions yet</h2>
            <p>
              Choose a meal plan to start enjoying fresh homemade food.
            </p>

            <Link to="/#meal-plans" className="subscription-button">
              Explore Meal Plans
            </Link>
          </div>
        )}

        {!loading && !error && subscriptions.length > 0 && (
          <>
            <p className="subscription-count">
              Total subscriptions: {subscriptions.length}
            </p>

            <div className="subscription-list">
              {subscriptions.map((subscription) => {
                const status = getStatus(subscription);
                const busy = actionLoadingId === subscription.id;

                return (
                  <article
                    className="subscription-card"
                    key={subscription.id}
                  >
                    <div className="subscription-card-heading">
                      <div>
                        <p className="subscription-id">
                          Subscription #{subscription.id}
                        </p>

                        <h2>
                          {getMealPlanName(subscription, mealPlans)}
                        </h2>
                      </div>

                      <span
                        className={`subscription-status ${status}`}
                      >
                        {getStatusLabel(status)}
                      </span>
                    </div>

                    <div className="subscription-details">
                      <div className="subscription-detail">
                        <span>Start Date</span>
                        <strong>
                          {subscription.start_date || "—"}
                        </strong>
                      </div>

                      <div className="subscription-detail">
                        <span>End Date</span>
                        <strong>
                          {subscription.end_date || "—"}
                        </strong>
                      </div>

                      <div className="subscription-detail">
                        <span>Daily Quantity</span>
                        <strong>
                          {subscription.quantity ?? "—"}
                        </strong>
                      </div>

                      <div className="subscription-detail">
                        <span>Total Price</span>
                        <strong className="subscription-price">
                          {formatPrice(subscription.price)}
                        </strong>
                      </div>
                    </div>

                    <div className="subscription-actions">
                      {status === "active" && (
                        <button
                          type="button"
                          className="subscription-action-button"
                          disabled={busy}
                          onClick={() =>
                            handleSubscriptionAction(
                              subscription,
                              "pause"
                            )
                          }
                        >
                          {busy ? "Updating..." : "Pause"}
                        </button>
                      )}

                      {status === "paused" && (
                        <button
                          type="button"
                          className="subscription-action-button"
                          disabled={busy}
                          onClick={() =>
                            handleSubscriptionAction(
                              subscription,
                              "resume"
                            )
                          }
                        >
                          {busy ? "Updating..." : "Resume"}
                        </button>
                      )}

                      {!["cancelled", "completed"].includes(status) && (
                        <button
                          type="button"
                          className="subscription-action-button cancel-button"
                          disabled={busy}
                          onClick={() =>
                            handleSubscriptionAction(
                              subscription,
                              "cancel"
                            )
                          }
                        >
                          {busy ? "Updating..." : "Cancel"}
                        </button>
                      )}
                    </div>
                  </article>
                );
              })}
            </div>
          </>
        )}
      </section>

      <footer className="subscriptions-footer">
        <Link to="/">Back to Home</Link>
      </footer>
    </main>
  );
}

export default MySubscriptions;