🛒 Scandiweb Full-Stack Test Project

📌 Overview

This project is a full-stack e-commerce application built as part of the Scandiweb Junior Developer test assignment.

It includes a PHP + GraphQL backend and a React frontend, implementing a complete product browsing and order creation flow.

🚀 Features

🧾 Product Listing (Category Page)

Displays products by category
Supports dynamic routing (/category/:id)
Handles direct URL access (no crashes on refresh)

📦 Product Details Page (PDP)

Displays full product information
Supports attribute selection (size, color, etc.)
Validates selection before adding to cart

🛒 Cart Overlay

Add/remove products
Increase/decrease quantity
Merge identical products (same attributes)
Display selected and available attributes
Real-time total calculation

⚙️ Attribute System

Supports multiple attribute types (text & swatch)
Fully dynamic based on backend data
Selected attributes persisted in cart state

📊 Order Creation

Sends order via GraphQL mutation
Stores:
products
quantities
selected attributes
Transaction-safe database insert
Clears cart after successful order

🧠 Tech Stack

Frontend
React (Vite)
Context API + Reducer (state management)
TailwindCSS
Axios (GraphQL requests)
Backend
PHP (no frameworks)
GraphQL (webonyx/graphql-php)
MySQL
FastRoute (routing)
PDO (database access)

▶️ Getting Started

🔧 Backend Setup

Navigate to backend folder
Install dependencies:
composer install
Configure .env file:
DB_HOST=localhost
DB_NAME=scandiweb
DB_USER=root
DB_PASS=
Start server:
php -S localhost:8000 -t public

💻 Frontend Setup

Navigate to frontend folder
Install dependencies:
npm install
Configure environment:
VITE_API_URL=http://localhost:8000/graphql
Start development server:
npm run dev

🧩 Notes
The project does not persist cart data (as per requirements)
Focus is on functionality, architecture, and clean implementation
Deployment may vary depending on hosting environment
👨‍💻 Author

Dalibor Jovanovski
Full-Stack Developer
