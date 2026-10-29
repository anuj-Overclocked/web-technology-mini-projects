import { useState } from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";

import Catalogue from "./Catalogue";
import BookDetails from "./BookDetails";
import Navbar from "./Navbar";

import "./App.css";

function Home() {
  return (
    <div className="home-page">

      <Navbar />

      {/* HERO */}
      <main className="hero">

        <div className="hero-content">

          <div className="hero-badge">YOUR NEXT GREAT READ AWAITS</div>

          <h1>
            Books
            <br />
            that
            <br />
            <span>inspire.</span>
          </h1>

          <p>
            Discover stories, knowledge and ideas from thousands
            of books carefully selected for curious minds.
          </p>

          <div className="hero-buttons">
            <Link to="/catalogue" className="primary-btn">
              Explore Books →
            </Link>

            <Link to="/register" className="secondary-btn">
              Create Account
            </Link>
          </div>

          <div className="hero-stats">

            <div>
              <strong>10K+</strong>
              <span>Books</span>
            </div>

            <div>
              <strong>5K+</strong>
              <span>Readers</span>
            </div>

            <div>
              <strong>4.9</strong>
              <span>Rating</span>
            </div>

          </div>

        </div>

        {/* BOOK VISUAL */}
        <div className="hero-visual">

          <div className="glow"></div>

          <div className="book-stack">
            <div className="floating-book book-one"><div className="book-cover"><small>CLASSIC</small><strong>The<br />Alchemist</strong><em>Paulo Coelho</em></div></div>
            <div className="floating-book book-two"><div className="book-cover"><small>FICTION</small><strong>New<br />Stories</strong><em>BOOKHUB EDITION</em></div></div>
            <div className="floating-book book-three"><div className="book-cover"><small>ESSAYS</small><strong>Ideas<br />to Keep</strong><em>CURATED READS</em></div></div>
          </div>

        </div>

      </main>
    </div>
  );
}


/* LOGIN PAGE */
function Login() {
  return (
    <AuthLayout title="Welcome back" subtitle="Sign in to continue your reading journey.">
      <form className="auth-form" onSubmit={(event) => event.preventDefault()}>
        <label>Email or username<input required type="text" placeholder="you@example.com" /></label>
        <label>Password<input required type="password" placeholder="Enter your password" /></label>
        <button className="primary-btn" type="submit">Login</button>
      </form>
      <p className="auth-switch">New to BOOKHUB? <Link to="/register">Create an account</Link></p>
    </AuthLayout>
  );
}


/* REGISTER PAGE */
function Register() {
  const [error, setError] = useState("");

  function handleSubmit(event) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    setError(form.get("password") === form.get("confirmPassword") ? "" : "Passwords do not match.");
  }

  return (
    <AuthLayout title="Create your account" subtitle="Join a community built around great books.">
      <form className="auth-form" onSubmit={handleSubmit}>
        <label>Name<input required name="name" type="text" placeholder="Your name" /></label>
        <label>Email<input required name="email" type="email" placeholder="you@example.com" /></label>
        <label>Password<input required name="password" type="password" minLength="8" placeholder="At least 8 characters" /></label>
        <label>Confirm password<input required name="confirmPassword" type="password" minLength="8" placeholder="Repeat your password" /></label>
        {error && <p className="form-error">{error}</p>}
        <button className="primary-btn" type="submit">Create Account</button>
      </form>
      <p className="auth-switch">Already have an account? <Link to="/login">Login</Link></p>
    </AuthLayout>
  );
}

function AuthLayout({ title, subtitle, children }) {
  return <div className="auth-page"><Navbar /><main className="auth-panel"><Link to="/" className="back-link">Back to home</Link><h1>{title}</h1><p>{subtitle}</p>{children}</main></div>;
}


/* MAIN APP ROUTES */
function App() {
  return (
    <BrowserRouter>

      <Routes>

        {/* HOME */}
        <Route
          path="/"
          element={<Home />}
        />

        {/* CATALOGUE */}
        <Route
          path="/catalogue"
          element={<Catalogue />}
        />

        {/* BOOK DETAILS */}
        <Route
          path="/catalogue/:id"
          element={<BookDetails />}
        />

        {/* LOGIN */}
        <Route
          path="/login"
          element={<Login />}
        />

        {/* REGISTER */}
        <Route
          path="/register"
          element={<Register />}
        />

      </Routes>

    </BrowserRouter>
  );
}

export default App;