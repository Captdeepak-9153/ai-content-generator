# AI Content Generator
[![Ask DeepWiki](https://devin.ai/assets/askdeepwiki.png)](https://deepwiki.com/Captdeepak-9153/ai-content-generator)

AI Content Generator is a full-stack application built with Next.js that leverages Google's Generative AI (Gemini) to create diverse content based on various templates. It features user authentication, a subscription model, content history, and a rich text editor for a seamless content creation experience.

## Key Features

*   **Versatile Content Generation:** Create content for blogs (titles, full articles, topic ideas), YouTube (SEO titles, descriptions, tags), Instagram (posts, hashtags, ideas), and more.
*   **AI-Powered:** Utilizes Google's Gemini AI model for generating creative and relevant content.
*   **Rich Text Editor:** View and edit generated content with a Toast UI editor integration.
*   **User Authentication:** Secure sign-up and sign-in functionality powered by Clerk.
*   **Subscription Management:** Integrated with Razorpay for handling user subscriptions.
*   **Content History:** Keep track of your generated content for easy access and reuse.
*   **25+ Content Templates:** A wide array of pre-defined templates to kickstart content creation.
*   **Code Generation & Tools:** Includes templates for writing code, explaining code, and detecting bugs.
*   **Modern UI/UX:** Responsive design built with Tailwind CSS, Shadcn UI, and engaging animations using Framer Motion.

## Tech Stack

*   **Framework:** Next.js 15
*   **Language:** TypeScript
*   **Styling:** Tailwind CSS, Shadcn UI
*   **Animations:** Framer Motion
*   **AI:** Google Generative AI (Gemini via `@google/generative-ai`)
*   **Authentication:** Clerk
*   **Database:** Neon (PostgreSQL)
*   **ORM:** Drizzle ORM
*   **Payments:** Razorpay
*   **Text Editor:** Toast UI Editor (`@toast-ui/react-editor`)

## Project Structure Overview

The project follows a standard Next.js App Router structure:

*   `app/`: Contains all routes, UI, and logic for the application.
    *   `(auth)/`: Authentication-related pages (sign-in, sign-up).
    *   `(context)/`: React Context providers (e.g., `UserSubscriptionContext`).
    *   `(data)/`: Static data, including the `Templates.tsx` definitions.
    *   `api/`: API routes for server-side logic (e.g., `create-subscription`).
    *   `dashboard/`: The main user-facing dashboard after authentication.
        *   `_components/`: Reusable React components specific to the dashboard.
        *   `billing/`: Page for managing user subscriptions.
        *   `content/[template-slug]/`: Dynamic route for generating content based on a selected template.
        *   `history/`: Page to display the user's content generation history.
        *   `settings/`: User profile and settings management.
*   `components/ui/`: UI components (largely from Shadcn UI).
*   `lib/`: Shared utility functions.
*   `public/`: Static assets (images, logos, etc.).
*   `utils/`: Core utilities for AI model interaction (`AiModel.tsx`), database connection (`db.tsx`), and database schema (`schema.tsx`).
*   `drizzle.config.js`: Configuration file for Drizzle ORM.
*   `middleware.ts`: Handles authentication and route protection using Clerk.

## Environment Variables

Create a `.env.local` file in the root of the project and add the following environment variables. Obtain the values from the respective services:

```env
# Google Generative AI
NEXT_PUBLIC_GOOGLE_GEMINI_API_KEY=your_gemini_api_key

# Clerk Authentication (Get from your Clerk Dashboard)
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
CLERK_SECRET_KEY=your_clerk_secret_key
# Ensure you also set NEXT_PUBLIC_CLERK_SIGN_IN_URL, NEXT_PUBLIC_CLERK_SIGN_UP_URL,
# NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL, NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL appropriately
# Example:
# NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
# NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
# NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/dashboard
# NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/dashboard

# Neon Database (PostgreSQL - Get from your Neon Project)
NEXT_PUBLIC_DRIZZLE_DB_URL=your_neon_database_connection_string_here

# Razorpay (Get from your Razorpay Dashboard)
NEXT_PUBLIC_RAZORPAY_KEY_ID=your_razorpay_key_id
RAZORPAY_SECRET_KEY=your_razorpay_secret_key
SUBSCRIPTION_PLAN_ID=your_razorpay_subscription_plan_id
```

## Getting Started

### Prerequisites

*   Node.js (version recommended by Next.js, e.g., 18.x or later)
*   A package manager (npm, yarn, pnpm, or bun)
*   Access to Google Generative AI, Clerk, Neon, and Razorpay services to obtain API keys and credentials.

### Installation

1.  Clone the repository:
    ```bash
    git clone https://github.com/captdeepak-9153/ai-content-generator.git
    cd ai-content-generator
    ```

2.  Install dependencies:
    ```bash
    npm install
    # or
    yarn install
    # or
    pnpm install
    # or
    bun install
    ```

3.  Set up your environment variables:
    Create a `.env.local` file in the root directory and populate it with the necessary keys as described in the "Environment Variables" section.

### Database Setup

This project uses Drizzle ORM with a Neon PostgreSQL database.
1.  Ensure your `NEXT_PUBLIC_DRIZZLE_DB_URL` in `.env.local` is correctly configured with your Neon database connection string.
2.  Push the schema to your database. This will create the necessary tables based on `utils/schema.tsx`:
    ```bash
    npm run db:push
    ```
3.  (Optional) To browse your database using Drizzle Studio:
    ```bash
    npm run db:studio
    ```

### Running the Development Server

Once the dependencies are installed and environment variables are set up:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result. You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

## Available Scripts

*   `npm run dev`: Starts the Next.js development server.
*   `npm run build`: Builds the application for production.
*   `npm run start`: Starts the production server (after building).
*   `npm run lint`: Runs ESLint to check for code quality issues.
*   `npm run db:push`: Pushes schema changes to the database using Drizzle Kit.
*   `npm run db:studio`: Opens Drizzle Studio for database management.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel. (Note: The project also uses Tektur font as specified in `app/layout.tsx`).

## Learn More

To learn more about Next.js, take a look at the following resources:

-   [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
-   [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details. Remember to set up your environment variables in your Vercel project settings.
