# BlogNest - Full-Stack Blogging Platform

BlogNest is a **full-stack modern blogging application** built using **Next.js 15, TypeScript, tRPC, Drizzle ORM, Neon PostgreSQL, Clerk Authentication**, and **Zustand** for state management.  
It allows users to create, edit, publish, and manage blog posts with rich markdown editing, category-based organization, and draft-saving functionality.

![coverpage](<WhatsApp Image 2025-10-17 at 12.17.38_95c1849d.jpg>)

---

## Tech Stack

| Layer | Technologies Used |
|-------|-------------------|
| **Frontend** | Next.js 14 (App Router), TypeScript, Tailwind CSS, Markdown Editor (`@uiw/react-md-editor`), TanStack Query |
| **Backend** | tRPC, Drizzle ORM, Zod Validation |
| **Database** | Neon PostgreSQL (serverless Postgres) |
| **Authentication** | Clerk |
| **State Management** | Zustand |
| **Deployment** | Vercel (Frontend + API Routes) |

---

## Features

1. **Markdown Editor**- Rich text creation with live preview powered by `@uiw/react-md-editor`.
2. **Category Management**- Create and assign multiple categories to posts dynamically.
3. **Draft & Publish Modes**- Save posts as drafts or publish instantly with toast notifications.
4. **Filtering by Category**- View posts or drafts filtered by selected categories.
5. **User Dashboard**- Authenticated users can create, edit, and manage posts.
6. **Persistent Database**- Drizzle ORM schema synced with Neon PostgreSQL.
7. **Instant Feedback**- Toast notifications for CRUD actions via Zustand.
8. **Fully Typed API**- End-to-end type safety using tRPC and Zod.
9. **Responsive Design**- Mobile-first UI with Tailwind CSS and a toggleable sidebar.

---


## Database Schema (Drizzle ORM)

- **posts** → stores blog data (title, slug, content, published status, timestamps)
- **categories** → stores available categories
- **post_categories** → junction table linking posts and categories (many-to-many relationship)

Example schema snippet-
```ts
export const posts = pgTable("posts", {
  id- serial("id").primaryKey(),
  title- text("title").notNull(),
  slug- text("slug").unique().notNull(),
  content- text("content").notNull(),
  published- boolean("published").default(false),
  createdAt- timestamp("created_at").defaultNow(),
  updatedAt- timestamp("updated_at").defaultNow(),
});
```


## Installation

### Clone Repository

```
git clone https-//github.com/yourusername/blogify.git
cd blogNest
```


### Install Dependencies

```npm install```


### Setup Environment
```
DATABASE_URL="your-neon-postgres-url"
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY="your-clerk-key"
CLERK_SECRET_KEY="your-clerk-secret"
```

### Generate and Run Drizzle Migrations

```
npx drizzle-kit generate
npx drizzle-kit migrate
```

Run Development Server

```npm run dev```


Access App
Visit → http-//localhost-3000

## Key Implementation Highlights

- tRPC + Zod → full type-safe API communication between frontend and backend.

- Zustand Store → manages sidebar visibility and toast notifications globally.

- Neon PostgreSQL → serverless database for efficient Postgres hosting.

- Drizzle ORM → typed query builder ensuring schema-to-code consistency.

- Clerk Authentication → user identity, sign-in, and access protection for routes.

- TanStack Query → seamless real-time data fetching and cache invalidation.


## Author

Developed by Harshit Rawat 


