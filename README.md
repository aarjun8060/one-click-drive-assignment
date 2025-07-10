# OneClickDrive.com Assignment

A full-stack car rental admin dashboard built with **Next.js**, **Prisma**, **TailwindCSS**, **shadcn/ui**, **Zustand** (for state management), and supports **multiple theme presets** with SSR (Server-Side Rendering).

---

## 🚗 Project Overview

This project is an admin dashboard for managing car listings, audit logs, and application settings for a car rental platform. It demonstrates modern React/Next.js patterns, custom theming, and robust state management.

---

## ✨ Features

- **Admin Authentication** (with default credentials)
- **Car Listings Management** (CRUD, status, pagination)
- **Audit Logs** (track admin actions)
- **Settings Page** (user info, theme customization)
- **Multiple Theme Presets** (switchable, light/dark, custom styles)
- **Responsive Sidebar Navigation**
- **Loading Skeletons** for dashboard pages
- **Zustand** for global state management
- **Prisma ORM** with SQLite (easy to swap DB)
- **SSR** (Server-Side Rendering) for fast, SEO-friendly pages
- **TailwindCSS** and **shadcn/ui** for beautiful, modern UI

---

## 🛠️ Tech Stack

- [Next.js 15](https://nextjs.org/) (App Router, SSR)
- [React 19](https://react.dev/)
- [Prisma ORM](https://www.prisma.io/) (with SQLite)
- [TailwindCSS 4](https://tailwindcss.com/)
- [shadcn/ui](https://ui.shadcn.com/)
- [Zustand](https://docs.pmnd.rs/zustand/getting-started/introduction) (state management)
- [@tanstack/react-table](https://tanstack.com/table/v8) (data tables)
- [Radix UI](https://www.radix-ui.com/) (primitives)

---

## 🚀 Getting Started

### 1. **Clone the repository**

```bash
git clone <repo-url>
cd one-click-drive-assignment
```

### 2. **Install dependencies**

```bash
npm install
# or
yarn install
```

### 3. **Set up environment variables**

Create a `.env` file in the root with:

```
DATABASE_URL="file:./prisma/dev.db"
JWT_SECRET= "your_jwt_secret"
NODE_ENV="development" // production or development
```

(You can use the default SQLite setup for local development.)

### 4. **Prisma: Generate Client & Push Schema**

```bash
# Generate Prisma client
yarn prisma generate
# Push schema to DB (creates tables)
yarn prisma db:push
```

Or with npm:
```bash
npm run db:push
```

### 5. **Seed the Database**

This will create a default admin user and sample car listings:

```bash
npm run db:seed
```

- **Default Admin Credentials:**
  - Email: `admin@oneclick.com`
  - Password: `password`

### 6. **Run the Development Server**

```bash
npm run dev
# or
yarn dev
```

Visit [http://localhost:3000](http://localhost:3000) to view the app.

---

## 🧑‍💻 Usage

- **Login** at `/auth` with the default admin credentials.
- **Dashboard** at `/admin/dashboard` for navigation.
- **Car Listings** at `/admin/dashboard/car-listing` to view/manage cars.
- **Audit Logs** at `/admin/dashboard/audit-logs` to view admin actions.
- **Settings** at `/admin/dashboard/settings` to view user info and change theme presets.

---

## 🎨 Theme Presets & Customization

- Multiple built-in theme presets (light/dark, modern, pastel, etc.)
- Change theme and preset from the **Settings** page.
- Theme state is managed globally with **Zustand** and persisted in localStorage.
- Custom theme logic is in `store/theme-store.tsx`, `store/theme-preset-store.ts`, and `components/theme-present-selector.tsx`.

---

## 🗃️ State Management (Zustand)

- Global state for theme, loading, and presets is managed with **Zustand** stores.
- See `store/theme-store.tsx`, `store/theme-preset-store.ts`, and `store/loading.ts` for examples.

---

## ⚡ SSR (Server-Side Rendering)

- The app uses Next.js App Router with SSR for fast, SEO-friendly pages.
- Middleware is used for authentication and route protection.

---

## 🧩 Folder Structure

- `app/` - Next.js app directory (pages, API routes, layouts)
- `components/` - UI and dashboard components
- `store/` - Zustand state stores
- `prisma/` - Prisma schema, seed script, SQLite DB
- `utils/` - Utility functions (theme, auth, etc.)
- `public/` - Static assets

---

## 📝 Assignment Notes

- This project is for the **OneClickDrive.com** assignment.
- Built by **Arjun Singh**.
- For any issues, please open an issue or contact the author.

---

## 📜 Scripts

| Script           | Description                       |
|------------------|-----------------------------------|
| `dev`            | Run Next.js in development mode   |
| `build`          | Build the Next.js app             |
| `start`          | Start the production server       |
| `db:push`        | Push Prisma schema to DB          |
| `db:seed`        | Seed the database with sample data|
| `lint`           | Run ESLint                        |
| `format`         | Run Prettier                      |

---

## 📚 Useful Links

- [Next.js Docs](https://nextjs.org/docs)
- [Prisma Docs](https://www.prisma.io/docs)
- [TailwindCSS Docs](https://tailwindcss.com/docs)
- [shadcn/ui Docs](https://ui.shadcn.com/docs)
- [Zustand Docs](https://docs.pmnd.rs/zustand/getting-started/introduction)

---

## 🏁 License

This project is for educational purposes only.
