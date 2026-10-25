import { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./Orders.css";

const API_URL = "http://127.0.0.1:8000/api";

function getTodayDate() {
  const today = new Date();
  today.setMinutes(today.getMinutes() - today.getTimezoneOffset());
  return today.toISOString().slice(0, 10);
}

async function readResponse(response) {
  const text = await response.text();

  try {
    return text ? JSON.parse(text) : {};
  } catch {
    throw new Error(
      `Backend returned an invalid response. HTTP ${response.status}`
    );
  }
}

function getList(data) {
  if (Array.isArray(data)) return data;
  if (Array.isArray(data?.results)) return data.results;
  return [];
}

function getPlanName(subscription, mealPlans) {
  const mealPlan = subscription.meal_plan;

  if (mealPlan && typeof mealPlan === "object") {
    return mealPlan.name || mealPlan.title || `Meal Plan #${mealPlan.id}`;
  }

  const plan = mealPlans.find(
    (item) => String(item.id) === String(mealPlan)
  );

  return plan
    ? plan.name || plan.title || `Meal Plan #${plan.id}`
    : `Meal Plan #${mealPlan}`;
}

function getPlanPrice(subscription, mealPlans) {
  const mealPlan = subscription.meal_plan;

  if (mealPlan && typeof mealPlan === "object") {
    return Number(mealPlan.price || 0);
  }

  const plan = mealPlans.find(
    (item) => String(item.id) === String(mealPlan)
  );

  return Number(plan?.price || 0);
}

function getInitialDate(subscription, today) {
  if (today < subscription.start_date) {
    return subscription.start_date;
  }

  if (today <= subscription.end_date) {
    return today;
  }

  return subscription.end_date;
}

function Orders() {
  const [subscriptions, setSubscriptions] = useState([]);
  const [orders, setOrders] = useState([]);
  const [mealPlans, setMealPlans] = useState([]);
  const [selectedSubscription, setSelectedSubscription] = useState("");
  const [orderDate, setOrderDate] = useState(getTodayDate());
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const loadData = useCallback(async () => {
    const token =
      localStorage.getItem("access") ||
      sessionStorage.getItem("access");

    if (!token) {
      setError("Login required. Please login with your customer account.");
      setLoading(false);
      return;
    }

    setLoading(true);
    setError("");

    try {
      const headers = {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
      };

      const [subscriptionsResponse, ordersResponse, plansResponse] =
        await Promise.all([
          fetch(`${API_URL}/subscriptions/`, { headers }),
          fetch(`${API_URL}/orders/`, { headers }),
          fetch(`${API_URL}/meal-plans/`, { headers }),
        ]);

      const [subscriptionsData, ordersData, plansData] = await Promise.all([
        readResponse(subscriptionsResponse),
        readResponse(ordersResponse),
        readResponse(plansResponse),
      ]);

      if (!subscriptionsResponse.ok) {
        throw new Error(
          subscriptionsData.detail ||
            `Subscriptions could not load. HTTP ${subscriptionsResponse.status}`
        );
      }

      if (!ordersResponse.ok) {
        throw new Error(
          ordersData.detail ||
            `Orders could not load. HTTP ${ordersResponse.status}`
        );
      }

      const allSubscriptions = getList(subscriptionsData);
      const today = getTodayDate();

      const availableSubscriptions = allSubscriptions.filter(
        (subscription) =>
          String(subscription.status).toLowerCase() === "active" &&
          subscription.end_date >= today
      );

      setSubscriptions(availableSubscriptions);
      setOrders(getList(ordersData));

      if (plansResponse.ok) {
        setMealPlans(getList(plansData));
      }

      setSelectedSubscription((previous) => {
        const stillAvailable = availableSubscriptions.some(
          (subscription) => String(subscription.id) === String(previous)
        );

        if (stillAvailable) return previous;

        return availableSubscriptions.length
          ? String(availableSubscriptions[0].id)
          : "";
      });

      setMessage("");
    } catch (err) {
      setError(err.message || "Unable to load orders.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadData();
  }, [loadData]);

  const activeSubscription = subscriptions.find(
    (subscription) =>
      String(subscription.id) === String(selectedSubscription)
  );

  function handleSubscriptionChange(event) {
    const id = event.target.value;
    const subscription = subscriptions.find(
      (item) => String(item.id) === String(id)
    );

    setSelectedSubscription(id);

    if (subscription) {
      setOrderDate(getInitialDate(subscription, getTodayDate()));
    }

    setError("");
    setMessage("");
  }

  async function handleCreateOrder(event) {
    event.preventDefault();
    setError("");
    setMessage("");

    const token =
      localStorage.getItem("access") ||
      sessionStorage.getItem("access");

    if (!token) {
      setError("Login token सापडला नाही. पुन्हा login कर.");
      return;
    }

    if (!activeSubscription) {
      setError("Order करण्यासाठी active subscription आवश्यक आहे.");
      return;
    }

    const orderQuantity = Number(quantity);

    if (!Number.isInteger(orderQuantity) || orderQuantity < 1) {
      setError("Quantity किमान 1 असणे आवश्यक आहे.");
      return;
    }

    if (
      orderDate < activeSubscription.start_date ||
      orderDate > activeSubscription.end_date
    ) {
      setError(
        "Order date ही subscription च्या Start Date आणि End Date दरम्यान असावी."
      );
      return;
    }

    setSubmitting(true);

    try {
      const response = await fetch(`${API_URL}/orders/`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          subscription: Number(activeSubscription.id),
          order_date: orderDate,
          quantity: orderQuantity,
        }),
      });

      const data = await readResponse(response);

      if (!response.ok) {
        throw new Error(
          data.detail ||
            data.subscription?.[0] ||
            data.order_date?.[0] ||
            data.quantity?.[0] ||
            `Order create झाला नाही. HTTP ${response.status}`
        );
      }

      setMessage(`Order #${data.id} created successfully!`);
      setQuantity(1);

      await loadData();
    } catch (err) {
      setError(err.message || "Order create करताना error आला.");
    } finally {
      setSubmitting(false);
    }
  }

  function formatPrice(price) {
    const value = Number(price);

    return Number.isFinite(value) ? `₹${value.toFixed(2)}` : "—";
  }

  return (
    <main className="orders-page">
      <header className="orders-header">
        <Link to="/" className="orders-brand">
          🍱 Tiffin & Home Food
        </Link>

        <nav className="orders-nav">
          <Link to="/meal-plans">Meal Plans</Link>
          <Link to="/my-subscriptions">My Subscriptions</Link>
        </nav>
      </header>

      <section className="orders-content">
        <p className="orders-eyebrow">CUSTOMER ACCOUNT</p>
        <h1>My Orders</h1>
        <p className="orders-subtitle">
          Create a food order and track your orders.
        </p>

        {message && (
          <div className="orders-message" role="status">
            {message}
          </div>
        )}

        {error && (
          <div className="orders-error" role="alert">
            <p>{error}</p>
            {!localStorage.getItem("access") &&
              !sessionStorage.getItem("access") && (
                <Link to="/login">Go to Login</Link>
              )}
          </div>
        )}

        {!loading && subscriptions.length === 0 && (
          <div className="orders-empty">
            <h2>No active subscriptions</h2>
            <p>
              Create a new subscription before placing an order.
            </p>
            <Link to="/meal-plans" className="orders-button">
              Browse Meal Plans
            </Link>
          </div>
        )}

        {subscriptions.length > 0 && (
          <section className="create-order-card">
            <h2>Create New Order</h2>

            <form onSubmit={handleCreateOrder}>
              <label htmlFor="subscription">Active Subscription</label>
              <select
                id="subscription"
                value={selectedSubscription}
                onChange={handleSubscriptionChange}
                required
              >
                {subscriptions.map((subscription) => (
                  <option
                    key={subscription.id}
                    value={subscription.id}
                  >
                    #{subscription.id} —{" "}
                    {getPlanName(subscription, mealPlans)}
                  </option>
                ))}
              </select>

              <label htmlFor="order_date">Order Date</label>
              <input
                id="order_date"
                type="date"
                value={orderDate}
                min={activeSubscription?.start_date}
                max={activeSubscription?.end_date}
                onChange={(event) => setOrderDate(event.target.value)}
                required
              />

              <label htmlFor="quantity">Quantity</label>
              <input
                id="quantity"
                type="number"
                min="1"
                step="1"
                value={quantity}
                onChange={(event) => setQuantity(event.target.value)}
                required
              />

              {activeSubscription && (
                <div className="order-estimate">
                  <span>Meal Plan</span>
                  <strong>
                    {getPlanName(activeSubscription, mealPlans)}
                  </strong>
                  <span>Estimated Order Amount</span>
                  <strong>
                    {formatPrice(
                      getPlanPrice(activeSubscription, mealPlans) *
                        Math.max(1, Number(quantity) || 1)
                    )}
                  </strong>
                  <small>
                    Final amount is calculated by the backend.
                  </small>
                </div>
              )}

              <button
                className="orders-button"
                type="submit"
                disabled={submitting || loading || subscriptions.length === 0}
              >
                {submitting ? "Creating Order..." : "Create Order"}
              </button>
            </form>
          </section>
        )}

        <section className="orders-history">
          <div className="orders-section-heading">
            <h2>Order History</h2>
            <button
              type="button"
              className="orders-refresh"
              onClick={loadData}
              disabled={loading}
            >
              {loading ? "Loading..." : "Refresh"}
            </button>
          </div>

          {loading && <p>Loading orders...</p>}

          {!loading && orders.length === 0 && !error && (
            <p className="orders-muted">You haven't placed any orders yet.</p>
          )}

          {!loading && orders.length > 0 && (
            <div className="orders-list">
              {orders.map((order) => (
                <article className="order-card" key={order.id}>
                  <div>
                    <p className="order-id">Order #{order.id}</p>
                    <h3>
                      {order.subscription
                        ? `Subscription #${
                            typeof order.subscription === "object"
                              ? order.subscription.id
                              : order.subscription
                          }`
                        : "Order"}
                    </h3>
                  </div>

                  <span
                    className={`order-status ${String(
                      order.status || "pending"
                    ).toLowerCase()}`}
                  >
                    {String(order.status || "pending").replaceAll("_", " ")}
                  </span>

                  <div className="order-card-details">
                    <p>
                      <span>Order Date</span>
                      <strong>{order.order_date || "—"}</strong>
                    </p>
                    <p>
                      <span>Quantity</span>
                      <strong>{order.quantity ?? "—"}</strong>
                    </p>
                    <p>
                      <span>Total Amount</span>
                      <strong>{formatPrice(order.total_amount)}</strong>
                    </p>
                  </div>
                </article>
              ))}
            </div>
          )}
        </section>
      </section>
    </main>
  );
}

export default Orders;