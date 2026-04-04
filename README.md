🛒 Scandiweb Full-Stack Test Project

📌 Overview

This project is a full-stack e-commerce application built as part of the Scandiweb Junior Developer test assignment.

It includes a PHP + GraphQL backend and a React frontend, implementing a complete product browsing and order creation flow.


🧠 Tech Stack

Frontend:

- React (Vite)
- Context API + Reducer (state management)
- TailwindCSS
- Axios (GraphQL requests)

Backend:

- PHP (no frameworks)
- GraphQL (webonyx/graphql-php)
- MySQL
- FastRoute (routing)
- PDO (database access)

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
