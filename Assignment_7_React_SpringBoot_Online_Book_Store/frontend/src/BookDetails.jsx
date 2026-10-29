import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import "./BookDetails.css";

function BookDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const controller = new AbortController();
    fetch(`http://localhost:8080/api/books/${id}`, { signal: controller.signal })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Book not found");
        }
        return response.json();
      })
      .then((data) => {
        setBook(data);
        setLoading(false);
      })
      .catch((err) => {
        if (err.name !== "AbortError") {
          console.error(err);
          setError("Unable to load this book. Please make sure the backend is running.");
          setLoading(false);
        }
      });
    return () => controller.abort();
  }, [id]);

  if (loading) {
    return <div className="details-message">Loading book...</div>;
  }

  if (error || !book) {
    return (
      <div className="details-message">
        <h2>{error || "Loading book..."}</h2>
        <button onClick={() => navigate("/catalogue")}>
          Back to Catalogue
        </button>
      </div>
    );
  }

  return (
    <div className="book-details-page">
      <Navbar />

      <button
        className="back-button"
        onClick={() => navigate("/catalogue")}
      >
        ← Back to Catalogue
      </button>

      <div className="book-details-card">

        <div className="details-image">
          <img
            src={book.imageUrl || "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='600' height='800'%3E%3Crect width='600' height='800' fill='%23eee8ff'/%3E%3Ctext x='50%25' y='50%25' text-anchor='middle' fill='%237c3aed' font-size='36'%3EBOOKHUB%3C/text%3E%3C/svg%3E"}
            alt={book.title}
            onError={(e) => {
              e.currentTarget.onerror = null;
              e.currentTarget.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='600' height='800'%3E%3Crect width='600' height='800' fill='%23eee8ff'/%3E%3Ctext x='50%25' y='50%25' text-anchor='middle' fill='%237c3aed' font-size='36'%3EBOOKHUB%3C/text%3E%3C/svg%3E";
            }}
          />
        </div>

        <div className="details-content">

          <span className="details-category">
            {book.category}
          </span>

          <h1>{book.title}</h1>

          <p className="details-author">
            by {book.author}
          </p>

          <div className="details-price">
            ₹{book.price}
          </div>

          <p className="details-description">
            Discover this carefully selected book from our collection.
            Explore its ideas, stories and knowledge.
          </p>

          <div className="details-actions">
            <button className="cart-button">
              Add to Cart
            </button>

            <button className="buy-button">
              Buy Now
            </button>
          </div>

        </div>

      </div>
    </div>
  );
}

export default BookDetails;