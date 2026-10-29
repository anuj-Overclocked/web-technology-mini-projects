import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "./Navbar";

import "./Catalogue.css";

function Catalogue() {
  const navigate = useNavigate();
  const [books, setBooks] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Get books from Spring Boot backend
  useEffect(() => {
    const controller = new AbortController();
    fetch("http://localhost:8080/api/books", { signal: controller.signal })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch books");
        }

        return response.json();
      })
      .then((data) => {
        setBooks(Array.isArray(data) ? data : []);
        setLoading(false);
      })
      .catch((err) => {
        if (err.name !== "AbortError") {
          console.error(err);
          setError("Unable to load books. Please make sure the backend is running.");
          setLoading(false);
        }
      });
    return () => controller.abort();
  }, []);

  // Get unique categories
  const categories = [
    "All",
    ...new Set(books.map((book) => book.category).filter(Boolean)),
  ];

  // Search + category filtering
  const filteredBooks = books.filter((book) => {
    const searchText = search.trim().toLowerCase();

    const matchesSearch =
      (book.title || "").toLowerCase().includes(searchText) ||
      (book.author || "").toLowerCase().includes(searchText);

    const matchesCategory =
      category === "All" || book.category === category;

    return matchesSearch && matchesCategory;
  });

  return (
    <div className="catalogue-page">
      <Navbar />

      {/* HERO SECTION */}

      <section className="catalogue-hero">

        <div className="hero-content">

          <p className="hero-small">
            BOOK COLLECTION
          </p>

          <h1>
            Find your next
            <span> great read.</span>
          </h1>

          <p className="hero-description">
            Discover stories, knowledge and ideas from our
            carefully selected collection.
          </p>

        </div>

        <div className="book-count">

          <strong>
            {books.length}
          </strong>

          <span>
            Books
          </span>

          <span>
            Available
          </span>

        </div>

      </section>


      {/* SEARCH + FILTERS */}

      <section className="catalogue-controls">

        <div className="search-box">

          <span>⌕</span>

          <input
            type="text"
            placeholder="Search books or authors..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

        </div>


        <div className="category-buttons">

          {categories.map((cat) => (

            <button
              key={cat}
              className={
                category === cat
                  ? "active"
                  : ""
              }
              onClick={() => setCategory(cat)}
            >
              {cat}
            </button>

          ))}

        </div>

      </section>


      {/* LOADING */}

      {loading && (

        <div className="message">
          Loading books...
        </div>

      )}


      {/* ERROR */}

      {error && (

        <div className="message error">
          {error}
        </div>

      )}


      {/* BOOKS */}

      {!loading && !error && (

        <section className="books-section">

          <div className="section-heading">

            <h2>
              Explore our collection
            </h2>

            <p>
              {filteredBooks.length} book
              {filteredBooks.length !== 1 ? "s" : ""}
            </p>

          </div>


          {filteredBooks.length === 0 ? (

            <div className="no-books">

              <h3>
                No books found
              </h3>

              <p>
                Try another search or category.
              </p>

            </div>

          ) : (

            <div className="books-grid">

              {filteredBooks.map((book) => (

                <div
                  className="book-card"
                  key={book.id}
                  onClick={() => navigate(`/catalogue/${book.id}`)}
                >

                  <div className="book-image">

                    <img
                      src={book.imageUrl || "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='600' height='800'%3E%3Crect width='600' height='800' fill='%23eee8ff'/%3E%3Ctext x='50%25' y='50%25' text-anchor='middle' fill='%237c3aed' font-size='36'%3EBOOKHUB%3C/text%3E%3C/svg%3E"}
                      alt={book.title}
                      onError={(e) => {
                        e.currentTarget.onerror = null;
                        e.currentTarget.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='600' height='800'%3E%3Crect width='600' height='800' fill='%23eee8ff'/%3E%3Ctext x='50%25' y='50%25' text-anchor='middle' fill='%237c3aed' font-size='36'%3EBOOKHUB%3C/text%3E%3C/svg%3E";
                      }}
                    />

                    <span className="category-tag">
                      {book.category}
                    </span>

                  </div>


                  <div className="book-info">

                    <h3>
                      {book.title}
                    </h3>

                    <p className="author">
                      by {book.author}
                    </p>


                    <div className="book-bottom">

                      <span className="price">
                        ₹{book.price}
                      </span>


                      {/* BOOK DETAILS BUTTON */}

                      <Link
                        to={`/catalogue/${book.id}`}
                        className="view-button"
                        onClick={(event) => event.stopPropagation()}
                      >
                        View Book →
                      </Link>

                    </div>

                  </div>

                </div>

              ))}

            </div>

          )}

        </section>

      )}

    </div>
  );
}

export default Catalogue;