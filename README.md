# 🛒 Grabit

Modern e‑commerce starter built with Next.js (App Router), MongoDB, and NextAuth. Includes auth, protected routes, product CRUD, a hero carousel, product highlights marquee, dark mode, and polished UX with SweetAlert2.

- 🔗 Live Link: https://grabit-7lr5.vercel.app/

## 🏷️ Tech Badges
![Next.js](https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white)
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Tailwind_CSS](https://img.shields.io/badge/Tailwind_CSS-0F172A?style=for-the-badge&logo=tailwindcss&logoColor=38BDF8)
![MongoDB](https://img.shields.io/badge/MongoDB-023430?style=for-the-badge&logo=mongodb&logoColor=47A248)
![NextAuth.js](https://img.shields.io/badge/NextAuth.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white)
![SweetAlert2](https://img.shields.io/badge/SweetAlert2-59359A?style=for-the-badge&logoColor=white)
![Vercel](https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white)
![Node.js_18+](https://img.shields.io/badge/Node.js-18%2B-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)

---

## 🧾 Overview
- 🏷️ Name: Grabit  
- ✍️ Short Description: A minimal e‑commerce template with user accounts, secure product creation, and a clean, responsive UI. Built for speed and clarity with Next.js App Router and MongoDB.

## ✨ Features
- 🔐 Auth with NextAuth (email + password, JWT sessions)
- 🧂 Secure signup API with hashed passwords (bcrypt)
- 🛡️ Protected dashboard route (Add Product)
- 🗂️ Products: list, dynamic details page, optional category filter
- 🎠 Product Highlights marquee (newest items, CSS‑only, pause on hover)
- 🖼️ Hero carousel on home
- 🍬 SweetAlert2 feedback for login/register/add‑product/logout
- 🌗 Dark mode theme toggle
- 🎨 Tailwind CSS styling
- 🩺 DB health check endpoint
- 🚀 Ready for Vercel deployment

## 🧰 Tech Stack
- Frontend: Next.js (App Router), React 18, Tailwind CSS
- Auth: NextAuth.js (Credentials) + MongoDBAdapter
- Database: MongoDB (official Node driver)
- UX: SweetAlert2
- Deployment: Vercel

## 🗂️ Folder Structure
```
app/
  api/
    auth/
      [...nextauth]/route.js        # NextAuth handler
      signup/route.js               # POST signup
    db/
      ping/route.js                 # DB health check
    products/route.js               # GET list, POST create (auth)
  components/
    Navbar.jsx
    ThemeToggle.jsx
    HeroCarousel.jsx
    ProductHighlights.jsx
  dashboard/
    add-product/
      page.jsx                      # server page (protected)
      AddProductForm.jsx            # client form + SweetAlert2
  login/
    page.jsx                        # server wrapper + Suspense
    LoginClient.jsx                 # client logic (useSearchParams)
  register/
    page.jsx                        # server wrapper + Suspense
    RegisterClient.jsx              # client logic (useSearchParams)
  products/
    page.jsx                        # list (server)
    [id]/page.jsx                   # details (server)
  layout.js
  page.jsx                          # home (hero + highlights)
  providers.jsx                     # SessionProvider wrapper
  Footer.jsx

lib/
  mongodb.js                        # Mongo client + getDb()
  auth.js                           # NextAuth options (if extracted)

public/
  hero/ (mens.jpg, womens.jpg, kids.jpg)

app/globals.css                     # Tailwind + theme + cta-btn + marquee
next.config.mjs
jsconfig.json
```

## 🛠️ Setup & Installation
```bash
git clone <repo-url>
cd grabit
npm install
npm run dev
```
Local production preview:
```bash
npm run build
npm start
```

## 🧭 Route Summary
- 🌐 Pages
  - GET `/` — Home (Hero + Product Highlights)
  - GET `/login` — Login (client under Suspense, SweetAlert2)
  - GET `/register` — Register (client under Suspense, auto sign‑in + SweetAlert2)
  - GET `/products` — All products, optional `?category=mens|womens|kids`
  - GET `/products/[id]` — Product details (with long “Details” section)
  - GET `/dashboard/add-product` — Protected Add Product
- 🛠️ APIs
  - GET `/api/db/ping` — Health check
  - POST `/api/auth/signup` — Register user ({ name, email, password })
  - GET `/api/products` — List products (optional `?category=`)
  - POST `/api/products` — Create product (auth required)

## 📦 Scripts
```json
{
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start"
  }
}
```

## 🎯 Design & UX Highlights
- Brand‑aligned colors (#2a4ba7 light / #b8d9ff dark) throughout UI
- CTA button with animated sweep and theme‑aware variables
- Marquee highlights: seamless loop using duplicated track + CSS mask
- Login/Register/Add‑product flows with friendly toasts and redirects
- Mobile‑first navbar with animated underline and responsive menu

## ⚠️ Notes & Gotchas
- Case‑sensitive filenames matter in production (e.g., `app/page.jsx`)
- Client hooks like `useSearchParams()` are wrapped by Suspense from a Server page (`/login`, `/register`)
- Keep server‑only code (DB helpers) out of client components
- Avoid Edge runtime for routes using MongoDB/bcrypt

## 🗺️ Roadmap
- Edit/Delete product endpoints and UI
- Search and advanced filters
- Role‑based access (admin dashboard)
- Image uploads + optimization
- Pagination or infinite scroll on `/products`
- Stripe checkout

## 🤝 Contributing
Issues and PRs are welcome!

## 📄 License
MIT