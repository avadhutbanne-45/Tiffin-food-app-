import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

const API_URL = "http://127.0.0.1:8000/api";

function getTodayDate() {
  const today = new Date();
  today.setMinutes(today.getMinutes() - today.getTimezoneOffset());
  return today.toISOString().slice(0, 10);
}

function getTotalDays(startDate, endDate) {
  if (!startDate || !endDate || endDate < startDate) {
    return 0;
  }

  const start = new Date(`${startDate}T00:00:00`);
  const end = new Date(`${endDate}T00:00:00`);

  return Math.round((end - start) / (1000 * 60 * 60 * 24)) + 1;
}

async function readResponse(response) {
  const text = await response.text();

  try {
    return text ? JSON.parse(text) : {};
  } catch {
    throw new Error(
      `Backend कडून योग्य response मिळाला नाही. HTTP ${response.status}. Django terminal तपास.`
    );
  }
}

function Subscription() {
  const { id } = useParams();

  const [mealPlan, setMealPlan] = useState(null);
  const [formData, setFormData] = useState({
    start_date: getTodayDate(),
    end_date: getTodayDate(),
    quantity: 1,
  });
  const [subscription, setSubscription] = useState(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    let cancelled = false;

    const fetchMealPlan = async () => {
      setLoading(true);
      setError("");

      try {
        const response = await fetch(`${API_URL}/meal-plans/${id}/`);
        const data = await readResponse(response);

        if (!response.ok) {
          throw new Error(
            data.detail || `Meal Plan load झाला नाही. HTTP ${response.status}`
          );
        }

        if (!cancelled) {
          setMealPlan(data);
        }
      } catch (err) {
        if (!cancelled) {
          setError(err.message || "Meal Plan load करता आला नाही.");
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    };

    fetchMealPlan();

    return () => {
      cancelled = true;
    };
  }, [id]);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((previous) => {
      const updated = {
        ...previous,
        [name]: value,
      };

      if (
        name === "start_date" &&
        updated.end_date &&
        updated.end_date < value
      ) {
        updated.end_date = value;
      }

      return updated;
    });

    setError("");
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");

    const token = localStorage.getItem("access");

    if (!token) {
      setError("Login token सापडला नाही. आधी Customer account ने Login कर.");
      return;
    }

    if (!mealPlan) {
      setError("Meal Plan details उपलब्ध नाहीत.");
      return;
    }

    if (mealPlan.is_active === false) {
      setError("हा Meal Plan सध्या उपलब्ध नाही.");
      return;
    }

    if (formData.end_date < formData.start_date) {
      setError("End Date ही Start Date च्या आधी असू शकत नाही.");
      return;
    }

    const quantity = Number(formData.quantity);

    if (!Number.isInteger(quantity) || quantity < 1) {
      setError("Quantity किमान 1 असणे आवश्यक आहे.");
      return;
    }

    setSubmitting(true);

    try {
      const response = await fetch(`${API_URL}/subscriptions/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          meal_plan: Number(id),
          start_date: formData.start_date,
          end_date: formData.end_date,
          quantity,
        }),
      });

      const data = await readResponse(response);

      if (!response.ok) {
        if (response.status === 401) {
          throw new Error("Login session संपली आहे. पुन्हा Login कर.");
        }

        const message =
          data.detail ||
          data.debug_error ||
          data.meal_plan?.[0] ||
          data.start_date?.[0] ||
          data.end_date?.[0] ||
          data.quantity?.[0] ||
          data.customer?.[0] ||
          `Subscription तयार झाली नाही. HTTP ${response.status}`;

        throw new Error(message);
      }

      setSubscription(data);
    } catch (err) {
      setError(err.message || "Subscription तयार करताना error आला.");
    } finally {
      setSubmitting(false);
    }
  };

  const totalDays = getTotalDays(
    formData.start_date,
    formData.end_date
  );

  const dailyPrice = Number(mealPlan?.price || 0);

  const estimatedTotal = dailyPrice * quantityOrOne(formData.quantity) * totalDays;

  function quantityOrOne(value) {
    const number = Number(value);
    return Number.isInteger(number) && number > 0 ? number : 1;
  }

  const pageStyle = {
    minHeight: "100vh",
    padding: "28px 18px",
    background: "#f3f7f4",
    fontFamily: "Arial, sans-serif",
    color: "#26352a",
  };

  const cardStyle = {
    width: "100%",
    maxWidth: "620px",
    boxSizing: "border-box",
    margin: "30px auto",
    padding: "28px",
    borderRadius: "16px",
    background: "#ffffff",
    boxShadow: "0 8px 28px rgba(30, 70, 40, 0.10)",
  };

  const inputStyle = {
    width: "100%",
    boxSizing: "border-box",
    padding: "12px",
    marginTop: "8px",
    border: "1px solid #ccd5ce",
    borderRadius: "8px",
    fontSize: "15px",
  };

  const labelStyle = {
    display: "block",
    marginTop: "18px",
    fontWeight: "600",
  };

  const buttonStyle = {
    width: "100%",
    marginTop: "24px",
    padding: "14px",
    border: "none",
    borderRadius: "8px",
    background: "#287d41",
    color: "#ffffff",
    fontSize: "16px",
    fontWeight: "600",
    cursor: "pointer",
  };

  return (
    <main style={pageStyle}>
      <header
        style={{
          maxWidth: "1000px",
          margin: "0 auto",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: "12px",
        }}
      >
        <Link
          to="/"
          style={{
            color: "#287d41",
            fontSize: "20px",
            fontWeight: "bold",
            textDecoration: "none",
          }}
        >
          🍲 Tiffin & Home Food
        </Link>

        <Link
          to="/meal-plans"
          style={{ color: "#287d41", fontWeight: "600" }}
        >
          Browse Meal Plans
        </Link>
      </header>

      <section style={cardStyle}>
        {loading && <p>Loading meal plan...</p>}

        {!loading && error && !subscription && (
          <p role="alert" style={{ color: "#b42318" }}>
            {error}
          </p>
        )}

        {!loading && mealPlan && !subscription && (
          <>
            <h1 style={{ color: "#246b3b", marginTop: 0 }}>
              {mealPlan.name}
            </h1>

            <p style={{ lineHeight: 1.6 }}>
              {mealPlan.description ||
                "Special homemade meals prepared with freshness and care."}
            </p>

            <h2 style={{ color: "#246b3b" }}>
              ₹{dailyPrice.toFixed(2)} / day
            </h2>

            <form onSubmit={handleSubmit}>
              <label htmlFor="start_date" style={labelStyle}>
                Start Date
              </label>
              <input
                id="start_date"
                name="start_date"
                type="date"
                value={formData.start_date}
                min={getTodayDate()}
                onChange={handleChange}
                required
                style={inputStyle}
              />

              <label htmlFor="end_date" style={labelStyle}>
                End Date
              </label>
              <input
                id="end_date"
                name="end_date"
                type="date"
                value={formData.end_date}
                min={formData.start_date}
                onChange={handleChange}
                required
                style={inputStyle}
              />

              <label htmlFor="quantity" style={labelStyle}>
                Daily Quantity
              </label>
              <input
                id="quantity"
                name="quantity"
                type="number"
                min="1"
                step="1"
                value={formData.quantity}
                onChange={handleChange}
                required
                style={inputStyle}
              />

              <div
                style={{
                  marginTop: "24px",
                  padding: "16px",
                  borderRadius: "10px",
                  background: "#edf7ef",
                }}
              >
                <p>
                  <strong>Total Days:</strong> {totalDays}
                </p>
                <p>
                  <strong>Estimated Total:</strong> ₹
                  {estimatedTotal.toFixed(2)}
                </p>
                <small>
                  Final price will be calculated by the backend.
                </small>
              </div>

              {error && (
                <p role="alert" style={{ color: "#b42318" }}>
                  {error}
                </p>
              )}

              <button
                type="submit"
                disabled={submitting || !mealPlan.is_active && mealPlan.is_active !== undefined}
                style={{
                  ...buttonStyle,
                  opacity: submitting ? 0.7 : 1,
                }}
              >
                {submitting ? "Creating Subscription..." : "Subscribe Now"}
              </button>
            </form>
          </>
        )}

        {subscription && (
          <div>
            <h1 style={{ color: "#287d41" }}>
              Subscription Created Successfully!
            </h1>

            <h2>{mealPlan?.name}</h2>

            <p>
              <strong>Subscription ID:</strong> {subscription.id}
            </p>
            <p>
              <strong>Total Subscription Price:</strong> ₹
              {Number(subscription.price ?? estimatedTotal).toFixed(2)}
            </p>
            <p>
              <strong>Start Date:</strong> {subscription.start_date}
            </p>
            <p>
              <strong>End Date:</strong> {subscription.end_date}
            </p>
            <p>
              <strong>Daily Quantity:</strong> {subscription.quantity}
            </p>
            <p>
              <strong>Status:</strong> {subscription.status || "active"}
            </p>

            <Link
              to="/my-subscriptions"
              style={{
                ...buttonStyle,
                display: "block",
                boxSizing: "border-box",
                textAlign: "center",
                textDecoration: "none",
              }}
            >
              View My Subscriptions
            </Link>

            <Link
              to="/"
              style={{
                display: "block",
                marginTop: "18px",
                textAlign: "center",
                color: "#287d41",
              }}
            >
              Back to Home
            </Link>
          </div>
        )}

        {!loading && !mealPlan && !error && (
          <p>Meal Plan सापडला नाही.</p>
        )}
      </section>
    </main>
  );
}

export default Subscription;