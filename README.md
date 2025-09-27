 Lendsqr FE Test

A frontend test project for Lendsqr built with Next.js, TypeScript, Tailwind CSS, and a custom design system (pixel-perfect to Figma).
It includes authentication, user management, theming, testing setup, and clean Git workflows.

 Tech Stack

Next.js 15 – React framework with SSR

TypeScript – Strict typing & safer code

Tailwind CSS – Utility-first styling with custom tokens

React Hook Form + Zod – Form handling & validation

ShadCN UI – Reusable UI components

Jest + React Testing Library – Unit & integration testing

Netlify / VPS – Deployment ready

🎨 Design System

The design system is ported from Figma pixel-perfect specs, using OKLCH → RGB converted tokens.

Base Colors

Background: --color-background

Foreground: --color-foreground

Primary: --color-primary

Secondary: --color-secondary

Text Colors: --color-text-primary, --color-text-secondary, --color-text-muted

Status: success, warning, error (light + strong)

Sidebar & Stats Cards tokens


🔑 Authentication & Session

Login flow is handled via loginUser() in login.tsx.

Secure server-side sessions created via /api/login.

User data is persisted in storage.ts (syncs with localStorage/sessionStorage).

user.ts defines the User model, including guarantor details.

👤 User Details & Guarantor Section

The User Details page renders multiple sections:

Personal Info

Education & Employment

Socials

Guarantor Info → wired to user.guarantor props (dynamic, not static).

Testing
Setup

The project uses Jest + React Testing Library with a custom jest.setup.ts.

npm run test


🛠️ Development
Installation
git clone https://github.com/your-username/lendsqr-fe-test.git
cd lendsqr-fe-test
npm install

Running Locally
npm run dev


Runs at: http://localhost:3000

Linting
npm run lint

Build
npm run build
npm run start

🌐 Deployment

Netlify (recommended) → Push to main branch auto-deploys.

Or manual VPS setup → run npm run build && npm run start.

 Features Completed

 Pixel-perfect design system (RGB)

 Dark mode with token overrides

 Authentication & session handling

 User details page with dynamic Guarantor section

 Responsive layout (mobile + desktop)

 Jest + RTL setup for testing

 Git workflow & branch strategy

📄 License

This project is licensed under the MIT License.