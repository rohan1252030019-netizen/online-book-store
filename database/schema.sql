-- ============================================================
--  ONLINE BOOK STORE - DATABASE SCHEMA
--  Database: online_book_store
--
--  How to run this file:
--    Option 1 (MySQL Workbench): open this file and press the
--            lightning bolt button.
--    Option 2 (command line):
--            mysql -u root -p < database/schema.sql
-- ============================================================

-- 1. Create the database
CREATE DATABASE IF NOT EXISTS online_book_store;
USE online_book_store;

-- 2. USERS table
--    Stores every registered customer of the bookstore.
--    NOTE: the password column stores a BCRYPT HASH, never plain text.
CREATE TABLE IF NOT EXISTS users (
    id         INT AUTO_INCREMENT PRIMARY KEY,   -- Primary key: a unique number for every user
    name       VARCHAR(100) NOT NULL,
    email      VARCHAR(150) NOT NULL UNIQUE,     -- UNIQUE stops the same email registering twice
    password   VARCHAR(255) NOT NULL,            -- long enough to hold a bcrypt hash
    phone      VARCHAR(20),                      -- optional field
    address    VARCHAR(255),                     -- optional field
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 3. BOOKS table
--    Stores every book that is displayed on the website.
CREATE TABLE IF NOT EXISTS books (
    id          INT AUTO_INCREMENT PRIMARY KEY,  -- Primary key: a unique number for every book
    title       VARCHAR(200) NOT NULL,
    author      VARCHAR(150) NOT NULL,
    category    VARCHAR(60) NOT NULL,
    price       DECIMAL(10, 2) NOT NULL,         -- DECIMAL is used for money (not FLOAT)
    description TEXT,
    image_url   VARCHAR(500),
    created_at  TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- An index makes filtering by category faster when the table grows.
CREATE INDEX idx_books_category ON books (category);

-- ============================================================
--  INSERT DATA - 17 books across 6 categories
--  image_url points to covers stored in client/public/covers
--  so the images always load and never break.
-- ============================================================
INSERT INTO books (title, author, category, price, description, image_url) VALUES
('Atomic Habits', 'James Clear', 'Self-Help', 449.00,
 'A practical guide to building good habits and breaking bad ones. The book shows how small changes compound into remarkable results over time.',
 '/covers/atomic-habits.jpg'),

('The Alchemist', 'Paulo Coelho', 'Fiction', 399.00,
 'A young shepherd travels from Spain to Egypt in search of treasure, and finds something else entirely. A short and inspiring story about following your dreams.',
 '/covers/the-alchemist.jpg'),

('To Kill a Mockingbird', 'Harper Lee', 'Fiction', 429.00,
 'A young girl in the American south watches her lawyer father defend a black man wrongly accused. A classic about racism, courage and doing what is right.',
 '/covers/to-kill-a-mockingbird.jpg'),

('The Great Gatsby', 'F. Scott Fitzgerald', 'Fiction', 389.00,
 'The mysterious millionaire Jay Gatsby throws parties for everyone in town, but nobody knows who he really is or what he is trying to reach.',
 '/covers/the-great-gatsby.jpg'),

('1984', 'George Orwell', 'Fiction', 459.00,
 'A story about a man who lives in a world where the government watches every citizen and rewrites history. Still the most famous dystopia ever written.',
 '/covers/1984.jpg'),

('Clean Code', 'Robert C. Martin', 'Technology', 799.00,
 'A handbook of good software practices. It teaches how to write code that is simple, readable and easy to maintain, with many real world examples.',
 '/covers/clean-code.jpg'),

('The Pragmatic Programmer', 'Andrew Hunt', 'Technology', 899.00,
 'A classic software development book. It teaches practical habits such as version control, test driven development and continuous learning.',
 '/covers/pragmatic-programmer.jpg'),

('Introduction to Algorithms', 'Thomas H. Cormen', 'Academic', 1299.00,
 'The standard textbook on computer algorithms. It covers sorting, searching, graphs and dynamic programming with clear explanations and worked examples.',
 '/covers/intro-to-algorithms.jpg'),

('The Psychology of Money', 'Morgan Housel', 'Business', 549.00,
 'Timeless lessons on wealth, greed and happiness. It teaches that financial success depends more on behaviour than on knowledge.',
 '/covers/psychology-of-money.jpg'),

('Sapiens: A Brief History of Humankind', 'Yuval Noah Harari', 'Science', 699.00,
 'How did humans go from a small group in Africa to building empires? This book answers that question and explains the ideas that shaped our societies.',
 '/covers/sapiens.jpg'),

('A Brief History of Time', 'Stephen Hawking', 'Science', 599.00,
 'A famous explanation of the universe, black holes, space and time, written for everyone and not only for scientists.',
 '/covers/brief-history-of-time.jpg'),

('The Selfish Gene', 'Richard Dawkins', 'Science', 649.00,
 'An eye opening book about evolution. It explains genes, natural selection and the way behaviour is passed from one generation to the next.',
 '/covers/selfish-gene.jpg'),

('Rich Dad Poor Dad', 'Robert T. Kiyosaki', 'Business', 479.00,
 'A personal finance story that teaches the difference between assets and liabilities, and why financial education matters more than a large salary.',
 '/covers/rich-dad-poor-dad.jpg'),

('The Lean Startup', 'Eric Ries', 'Business', 629.00,
 'How new companies search for a working business model instead of planning everything in advance. Useful even for student side projects.',
 '/covers/lean-startup.jpg'),

('The Courage to Be Disliked', 'Ichiro Kishimi', 'Self-Help', 429.00,
 'A short book built around one simple idea - you can choose to be happy. It explains how our own thoughts shape the way we live.',
 '/covers/courage-to-be-disliked.jpg'),

('The Subtle Art of Not Giving a F*ck', 'Mark Manson', 'Self-Help', 499.00,
 'A blunt self help book that tells you to stop worrying about what everyone thinks and spend your effort on the few things that really matter.',
 '/covers/subtle-art.jpg'),

('Operating Systems: Three Easy Pieces', 'Arpaci-Dusseau', 'Academic', 1099.00,
 'A free and very clear computer science book that explains virtual memory, concurrency and file systems. Often used in university courses.',
 '/covers/os-three-easy-pieces.jpg');
