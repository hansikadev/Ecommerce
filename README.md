# E-Commerce Application

A modern, full-stack e-commerce web application built with Next.js 16 (App Router), React, TypeScript, and MongoDB.

## 🚀 Features

- **Storefront**: Browse products, categories, and use full text search.
- **Authentication**: Secure user authentication and management powered by Clerk.
- **Shopping Cart**: Real-time cart management using Zustand.
- **Database**: MongoDB integration via Mongoose for storing Products, Categories, Users, Orders, and Reviews.
- **Payments**: Integrated with Stripe for checkout and payment processing.
- **AI Chatbot**: Built-in chatbot interface to assist customers.
- **Responsive Animations**: Smooth UI transitions powered by Framer Motion and Tailwind CSS.
- **Webhooks**: Synced user data across services utilizing Clerk Webhooks and Svix.

## 🛠️ Tech Stack

- **Framework:** [Next.js 16](https://nextjs.org/) (App Router)
- **Language:** [TypeScript](https://www.typescriptlang.org/)
- **Database:** [MongoDB](https://www.mongodb.com/) & [Mongoose](https://mongoosejs.com/)
- **Authentication:** [Clerk](https://clerk.com/)
- **State Management:** [Zustand](https://zustand-demo.pmnd.rs/)
- **Payments:** [Stripe](https://stripe.com/)
- **Styling:** [Tailwind CSS v4](https://tailwindcss.com/)
- **Animations:** [Framer Motion](https://www.framer.com/motion/)
- **Icons:** [Lucide React](https://lucide.dev/)
- **Notifications:** [React Hot Toast](https://react-hot-toast.com/)

## 📂 Project Structure

```
my-app/
├── app/                  # Next.js App Router (pages and layouts)
│   ├── api/              # API Endpoints (categories, chat, orders, products, webhooks)
│   ├── cart/             # Shopping Cart Page
│   ├── categories/       # Category Browsing
│   ├── products/         # Product Listings & Details
│   └── search/           # Search Functionality
├── components/           # Reusable React UI Components (Navbar, CartBadge, Chatbot, etc.)
├── lib/                  # Utilities and Configuration (Mongoose connection)
├── models/               # Mongoose schemas (Category, Order, Product, Review, User)
├── store/                # Zustand global state (useCart)
└── public/               # Static assets
```

## ⚙️ Getting Started

### Prerequisites

- Node.js version 20+
- A MongoDB database (local or Atlas)
- Accounts for [Clerk](https://clerk.com/) and [Stripe](https://stripe.com/)

### Installation

1. Clone the repository and navigate to the app directory:

   ```bash
   cd my-app
   ```

2. Install dependencies:

   ```bash
   npm install
   # or yarn / pnpm install
   ```

3. Set up environment variables locally. Create a `.env.local` file at the root of `my-app` and add the following keys:

   ```env
   # Authentication (Clerk)
   NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
   CLERK_SECRET_KEY=your_clerk_secret_key
   WEBHOOK_SECRET=your_clerk_webhook_secret_key

   # Database (MongoDB)
   MONGODB_URI=your_mongodb_connection_string

   # Payments (Stripe)
   STRIPE_SECRET_KEY=your_stripe_secret_key
   STRIPE_WEBHOOK_SECRET=your_stripe_webhook_secret
   ```

4. Run the development server:

   ```bash
   npm run dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) with your browser to explore the store.

## 📡 API Routes

- `GET /api/products` - Retrieve list of products
- `GET /api/products/[id]` - Retrieve product details
- `POST /api/products/[id]/reviews` - Submit a product review
- `GET /api/categories` - Fetch available product categories
- `GET/POST /api/orders` - Order configuration and retrieval
- `POST /api/chat` - Interact with the AI Chatbot helper
- `POST /api/webhooks/clerk` - Clerk auth sync webhook

## 📝 License

This project is open-source and available under the [MIT License](LICENSE).
