
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import "./index.css";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import MySubscriptions from "./pages/MySubscriptions";
import Dashboard from "./pages/Dashboard";

const meals = [
  {
    name: "Daily Tiffin",
    description: "Roti, sabzi, dal, rice and pickle.",
    price: 70,
    tag: "Daily Favourite",
    image: "https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=900&q=85",
  },
  {
    name: "Special Thali",
    description: "A delicious traditional Indian meal.",
    price: 100,
    tag: "Popular Choice",
    image: "https://images.unsplash.com/photo-1565557623262-b51c2513a641?auto=format&fit=crop&w=900&q=85",
  },
  {
    name: "Veg Meal",
    description: "Fresh and tasty vegetarian food.",
    price: 80,
    tag: "Fresh & Simple",
    image: "https://images.unsplash.com/photo-1585937421612-70a008356fbe?auto=format&fit=crop&w=900&q=85",
  },
  {
    name: "Custom Meal",
    description: "Choose your favourite dishes.",
    price: 120,
    tag: "Your Choice",
    image: "https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?auto=format&fit=crop&w=900&q=85",
  },
];

const benefits = [
  {
    icon: "♧",
    title: "Fresh & Healthy",
    text: "Nutritious meals, prepared with care.",
    colour: "green",
  },
  {
    icon: "⌂",
    title: "Homemade Taste",
    text: "Comforting food, just like home.",
    colour: "orange",
  },
  {
    icon: "♡",
    title: "Hygienic & Safe",
    text: "Food prepared with attention and care.",
    colour: "purple",
  },
  {
    icon: "➜",
    title: "Convenient Service",
    text: "A simpler way to plan your meals.",
    colour: "pink",
  },
];

function HomePage() {
  return (
    <div className="app" id="home">
      <header className="navbar">
        <a className="brand" href="#home">
          <span className="brand-mark">♨</span>
          <span className="brand-text">
            <span>
              Tiffin<span className="orange-text">Home</span>
            </span>
            <small>Homemade Food • Healthy Life</small>
          </span>
        </a>

        <nav className="nav-links" aria-label="Main navigation">
          <a className="active" href="#home">Home</a>
          <a href="#plans">Meal Plans</a>
          <a href="#about">About Us</a>
          <a href="#contact">Contact</a>
        </nav>

        <div className="nav-actions">
          <Link className="nav-login" to="/login">Login</Link>
          <Link className="nav-register" to="/register">Register</Link>
        </div>
      </header>

      <main>
        <section className="hero">
          <div className="hero-copy">
            <span className="handwritten">Freshly Prepared ♡</span>
            <p className="eyebrow">WELCOME TO TIFFINHOME</p>
            <h1>
              Traditional Indian Meals
              <span>Delivered to Your Doorstep</span>
            </h1>
            <p className="hero-description">
              Authentic home-cooked food, made with love, using fresh
              ingredients and traditional recipes.
            </p>

            <div className="hero-buttons">
              <a className="button button-primary" href="#plans">
                Explore Meal Plans <span>→</span>
              </a>
              <a className="button button-outline" href="#about">
                Learn More
              </a>
            </div>

            <div className="hero-trust">
              <span>✓</span> Freshly prepared • Homely taste • Made with care
            </div>
          </div>

          <div className="hero-visual">
            <img
              src="https://www.hindustantimes.com/ht-img/img/2026/03/19/cropped/1-1/78ef9334-62bc-4624-a5c8-4961375a71fc_1773910628020_1773910662420.jpg"
              alt="Traditional Maharashtrian festive thali"
            />
            <div className="hero-sticker">
              <span>♡</span>
              <strong>Real Food</strong>
              <strong>Real Happiness</strong>
            </div>
          </div>
        </section>

        <section className="benefit-strip" aria-label="Our benefits">
          {benefits.map((benefit) => (
            <article className="benefit-item" key={benefit.title}>
              <div className={`benefit-icon ${benefit.colour}`}>
                {benefit.icon}
              </div>
              <div>
                <h3>{benefit.title}</h3>
                <p>{benefit.text}</p>
              </div>
            </article>
          ))}
        </section>

        <section className="plans-section" id="plans">
          <div className="section-topline">
            <div>
              <span className="eyebrow">OUR MEAL PLANS</span>
              <h2>Choose Your Perfect Tiffin</h2>
              <p>Fresh, homemade meals for a happier everyday routine.</p>
            </div>
            <a className="view-all" href="#contact">View All Plans →</a>
          </div>

          <div className="meal-grid">
            {meals.map((meal, index) => (
              <article className="meal-card" key={meal.name}>
                <div className="meal-photo">
                  <img src={meal.image} alt={meal.name} loading="lazy" />
                  <span className={`meal-tag tag-${index + 1}`}>
                    {meal.tag}
                  </span>
                </div>

                <div className="meal-details">
                  <h3>{meal.name}</h3>
                  <p>{meal.description}</p>

                  <div className="price-row">
                    <div className="price">
                      <strong>₹{meal.price}</strong>
                      <span>/ day</span>
                    </div>
                    <Link
                      className="order-button"
                      to="/login"
                      aria-label={`Login to order ${meal.name}`}
                    >
                      Order Now →
                    </Link>
                  </div>
                </div>

                <span
                  className={`leaf-decoration leaf-${index + 1}`}
                  aria-hidden="true"
                >
                  ❧
                </span>
              </article>
            ))}
          </div>

          <p className="price-disclaimer">
            * Prices are sample values for the project and can be changed later.
          </p>
        </section>

        <section className="about-section" id="about">
          <div className="about-photo">
            <img
              src="https://www.hindustantimes.com/ht-img/img/2026/03/19/cropped/1-1/78ef9334-62bc-4624-a5c8-4961375a71fc_1773910628020_1773910662420.jpg"
              alt="Traditional Maharashtrian thali"
              loading="lazy"
            />
            <span className="photo-note">Good Food, Good Mood ♡</span>
          </div>

          <div className="about-copy">
            <span className="eyebrow">ABOUT US</span>
            <h2>Home Food, Made for You</h2>
            <p>
              We bring the comfort of home-cooked Indian food to your
              everyday routine. Explore meal options designed to make
              planning your food simple and convenient.
            </p>
            <a className="button button-primary" href="#plans">Know More →</a>
          </div>

          <div className="about-points">
            <div>
              <span>✓</span>
              <p>
                <strong>Fresh Ingredients</strong>
                <small>Prepared with care.</small>
              </p>
            </div>
            <div>
              <span>✿</span>
              <p>
                <strong>Traditional Recipes</strong>
                <small>Inspired by home cooking.</small>
              </p>
            </div>
            <div>
              <span>♥</span>
              <p>
                <strong>Affordable Choices</strong>
                <small>Meal options for your routine.</small>
              </p>
            </div>
            <div>
              <span>☺</span>
              <p>
                <strong>Customer First</strong>
                <small>Your experience matters.</small>
              </p>
            </div>
          </div>
        </section>

        <section className="contact-banner" id="contact">
          <div>
            <span className="eyebrow">LET'S EAT BETTER</span>
            <h2>Your favourite homely meal is waiting!</h2>
            <p>Explore our meal plans and find your everyday favourite.</p>
          </div>
          <a className="button banner-button" href="#plans">Explore Meals →</a>
        </section>
      </main>

      <footer className="footer">
        <a className="brand footer-brand" href="#home">
          <span className="brand-mark">♨</span>
          <span className="brand-text">
            <span>
              Tiffin<span className="orange-text">Home</span>
            </span>
            <small>Homemade Food • Healthy Life</small>
          </span>
        </a>

        <p>Good food, homely taste, everyday comfort.</p>

        <span className="copyright">
          © {new Date().getFullYear()} TiffinHome. All rights reserved.
        </span>
      </footer>
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/my-subscriptions" element={<MySubscriptions />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;