# CashWise

**CashWise** is a modern household budget management application designed to
help users easily track expenses, income, and plan their finances. The app is
fast, responsive, and intuitive, built using modern web technologies.

---

## Features

-   User registration and login (Better Auth)
-   Add, edit, and delete expense and income categories
-   View transaction history in tables and charts
-   Responsive UI (Tailwind CSS + Shadcn UI)
-   Form validation and error handling (React Hook Form)

---

## Technologies

| Layer          | Technologies                                                         |
| -------------- | -------------------------------------------------------------------- |
| Frontend       | Next.js, React, TypeScript, Tailwind CSS, Shadcn UI, React Hook Form |
| Backend        | Next.js Server Actions, Prisma ORM                                   |
| Database       | PostgreSQL                                                           |
| Authentication | Better Auth                                                          |
| Other          | TypeScript, Prisma for database schema management                    |

---

## Installation

1. Clone the repository:

```bash
git clone https://github.com/iamdrzazgowski/cashwise-app.git
cd cashwise-app
```

2. Install dependencies:

```bash
npm install
```

---

## Database Setup

1. Create a PostgreSQL database.

2. Copy .env.example to .env and fill in your database credentials:

```bash
DATABASE_URL="postgresql://user:password@localhost:5432/cashwise"
BETTER_AUTH_SECRET="YOUR-KEY"
BETTER_AUTH_URL="http://localhost:3000"
```

3. Add the necessary authentication models

```bash
npx @better-auth/cli generate
```

4. Initialize the database using Prisma:

```bash
npx prisma migrate dev --name init
npx prisma generate
```

---

## Running the App

```bash
npm run dev
```

---

## Architecture

-   Next.js – server-side rendering (SSR)
-   Server Actions – handle backend logic directly in Next.js components.
-   Prisma – ORM for PostgreSQL database.
-   Better Auth – secure user authentication and authorization.
-   Tailwind CSS & Shadcn UI – styling and ready-to-use UI components.
-   React Hook Form – form management and validation.
