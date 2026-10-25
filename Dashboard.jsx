import { Link, useLocation } from "react-router-dom";
import "../index.css";

const menuItems = [
  { label: "Dashboard", icon: "▦", to: "/dashboard" },
  { label: "Meal Plans", icon: "🍱", to: "/#plans" },
  { label: "My Subscriptions", icon: "▣", to: "/my-subscriptions" },
  { label: "My Orders", icon: "🛍", to: "/customers" },
];

export default function Dashboard() {
  const location = useLocation();

  const sidebarStyle = {
    width: "250px",
    minWidth: "230px",
    background: "#173f32",
    color: "#ffffff",
    minHeight: "100vh",
    padding: "28px 18px",
    boxSizing: "border-box",
  };

  const cardStyle = {
    background: "#ffffff",
    padding: "24px",
    borderRadius: "14px",
    border: "1px solid #e6ece7",
    boxShadow: "0 4px 14px rgba(0,0,0,0.04)",
  };

  return (
    <div style={{ display: "flex", minHeight: "100vh", background: "#f5f7f5", color: "#24352a" }}>
      <aside style={sidebarStyle}>
        <Link to="/" style={{ color: "#ffffff", textDecoration: "none", display: "flex", alignItems: "center", gap: "10px", marginBottom: "35px" }}>
          <span style={{ fontSize: "28px" }}>🍱</span>
          <span>
            <strong style={{ fontSize: "21px" }}>TiffinHome</strong>
            <small style={{ display: "block", color: "#c7d8ce", marginTop: "4px" }}>Homemade Food</small>
          </span>
        </Link>

        <p style={{ color: "#a9c4b5", fontSize: "11px", fontWeight: "bold", letterSpacing: "1.5px", marginBottom: "15px" }}>
          MAIN MENU
        </p>

        <nav style={{ display: "grid", gap: "9px" }}>
          {menuItems.map((item) => {
            const active = location.pathname === item.to;

            return (
              <Link
                key={item.label}
                to={item.to}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "12px",
                  padding: "13px 14px",
                  borderRadius: "9px",
                  background: active ? "#2e624e" : "transparent",
                  color: "#ffffff",
                  textDecoration: "none",
                  fontWeight: active ? "bold" : "normal",
                }}
              >
                <span>{item.icon}</span>
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>

        <div style={{ marginTop: "35px", borderTop: "1px solid #426454", paddingTop: "20px" }}>
          <p style={{ color: "#a9c4b5", fontSize: "11px", fontWeight: "bold", letterSpacing: "1.5px" }}>
            ACCOUNT
          </p>
          <p style={{ color: "#d5e4dc", fontSize: "13px" }}>Payments and Profile</p>
          <p style={{ color: "#a9c4b5", fontSize: "12px" }}>More account options coming soon.</p>
        </div>

        <Link to="/" style={{ display: "block", marginTop: "30px", padding: "12px", color: "#ffffff", textDecoration: "none", borderTop: "1px solid #426454" }}>
          ← Back to Home
        </Link>
      </aside>

      <main style={{ flex: 1, minWidth: 0, padding: "35px", boxSizing: "border-box" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: "15px", flexWrap: "wrap", marginBottom: "30px" }}>
          <div>
            <p style={{ color: "#198754", fontWeight: "bold", fontSize: "12px", letterSpacing: "1.5px" }}>YOUR ACCOUNT</p>
            <h1 style={{ margin: "8px 0", fontSize: "32px" }}>Dashboard</h1>
            <p style={{ color: "#69776e", margin: 0 }}>Welcome to your Tiffin & Home Food account.</p>
          </div>
          <Link to="/" style={{ background: "#198754", color: "#ffffff", padding: "12px 18px", borderRadius: "8px", textDecoration: "none" }}>
            Browse Meals →
          </Link>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(190px, 1fr))", gap: "20px", marginBottom: "30px" }}>
          <div style={cardStyle}>
            <p style={{ color: "#198754", fontSize: "14px" }}>🍱 Meal Plans</p>
            <h2 style={{ fontSize: "27px", margin: "12px 0" }}>Explore</h2>
            <p style={{ color: "#69776e", fontSize: "14px" }}>Find your favourite homemade meals.</p>
            <Link to="/#plans" style={{ color: "#198754", fontWeight: "bold" }}>Browse Plans →</Link>
          </div>

          <div style={cardStyle}>
            <p style={{ color: "#b87918", fontSize: "14px" }}>▣ Subscriptions</p>
            <h2 style={{ fontSize: "27px", margin: "12px 0" }}>Manage</h2>
            <p style={{ color: "#69776e", fontSize: "14px" }}>View and manage your subscriptions.</p>
            <Link to="/my-subscriptions" style={{ color: "#198754", fontWeight: "bold" }}>My Subscriptions →</Link>
          </div>

          <div style={cardStyle}>
            <p style={{ color: "#425fa8", fontSize: "14px" }}>🛍 My Orders</p>
            <h2 style={{ fontSize: "27px", margin: "12px 0" }}>Track</h2>
            <p style={{ color: "#69776e", fontSize: "14px" }}>Check your order history and status.</p>
            <Link to="/customers" style={{ color: "#198754", fontWeight: "bold" }}>View Orders →</Link>
          </div>
        </div>

        <section style={{ ...cardStyle, marginBottom: "22px" }}>
          <h2 style={{ marginTop: 0 }}>Quick Actions</h2>
          <p style={{ color: "#69776e" }}>Manage your meal plans and subscriptions from one place.</p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "12px" }}>
            <Link to="/my-subscriptions" style={{ background: "#edf8ef", color: "#17623c", padding: "12px 16px", borderRadius: "8px", textDecoration: "none" }}>
              Manage Subscriptions
            </Link>
            <Link to="/#plans" style={{ background: "#fff5e6", color: "#895812", padding: "12px 16px", borderRadius: "8px", textDecoration: "none" }}>
              Explore Meal Plans
            </Link>
          </div>
        </section>

        <p style={{ color: "#879189", fontSize: "12px", textAlign: "center" }}>
          TiffinHome · Homemade food, everyday comfort.
        </p>
      </main>
    </div>
  );
}