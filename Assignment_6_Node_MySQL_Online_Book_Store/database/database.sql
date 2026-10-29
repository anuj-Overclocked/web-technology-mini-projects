CREATE DATABASE IF NOT EXISTS online_book_store_asgn6;
USE online_book_store_asgn6;

CREATE TABLE IF NOT EXISTS users (
  id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  full_name VARCHAR(120) NOT NULL,
  email VARCHAR(255) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS books (
  id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(180) NOT NULL,
  author VARCHAR(120) NOT NULL,
  category VARCHAR(80) NOT NULL,
  price DECIMAL(10, 2) NOT NULL,
  description TEXT NOT NULL,
  image_url VARCHAR(500) NOT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  UNIQUE KEY unique_book_title (title)
);

INSERT INTO books (title, author, category, price, description, image_url) VALUES
('The Pragmatic Programmer', 'David Thomas and Andrew Hunt', 'Programming', 34.99, 'A timeless guide to becoming a more effective and thoughtful software developer.', 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=700&q=80'),
('Clean Code', 'Robert C. Martin', 'Programming', 42.50, 'Practical principles for writing readable, maintainable, and professional code.', 'https://images.unsplash.com/photo-1515879218367-8466d910aaa4?auto=format&fit=crop&w=700&q=80'),
('The Midnight Library', 'Matt Haig', 'Fiction', 16.99, 'A moving novel about the infinite possibilities that exist between life and death.', 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&w=700&q=80'),
('Pride and Prejudice', 'Jane Austen', 'Fiction', 12.00, 'A beloved classic of manners, family, wit, and unexpected romance.', 'https://images.unsplash.com/photo-1543002588-bfa74002ed7e?auto=format&fit=crop&w=700&q=80'),
('Atomic Habits', 'James Clear', 'Self Help', 18.99, 'Small changes, remarkable results: a proven framework for building better habits.', 'https://images.unsplash.com/photo-1495446815901-a7297e633e8d?auto=format&fit=crop&w=700&q=80'),
('Deep Work', 'Cal Newport', 'Self Help', 21.50, 'Rules for focused success in a distracted world.', 'https://images.unsplash.com/photo-1521587760476-6c12a4b040da?auto=format&fit=crop&w=700&q=80'),
('The Lean Startup', 'Eric Ries', 'Business', 24.99, 'How modern entrepreneurs use continuous innovation to create successful businesses.', 'https://images.unsplash.com/photo-1556761175-b413da4baf72?auto=format&fit=crop&w=700&q=80'),
('Start with Why', 'Simon Sinek', 'Business', 19.95, 'Discover how inspiring leaders motivate people and build lasting organizations.', 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=700&q=80')
ON DUPLICATE KEY UPDATE title = VALUES(title);
