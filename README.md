GitHub: https://github.com/farnazseyedi/Gamers-place
🔗 Live Demo: https://gamers-place.vercel.app/

# 🚀 Gamers-place

A modern dashboard application built with **Next.js, TypeScript, and TailwindCSS** using **SOLID principles** and clean architecture.  
The project consumes the RAWG API to manage product data.

---

## ✨ Features

- 🔐 User authentication (RWGA API)
- ⚡ Fast data fetching with
- Responsive UI with TailwindCSS
- 🏗️ Clean architecture & SOLID principles
- ♻️ Reusable component-based design

---

## 🛠️ Tech Stack

- **Framework:** Next.js (App Router)
- **Language:** TypeScript
- **Styling:** TailwindCSS
- **HTTP Client:** fetch
- **Data Fetching:** TanStack React Query
- **react-vitual**
- **react-query**
---

## 🧱 Architecture & Design Principles

This project follows:

- **SOLID principles**
- **Separation of concerns**
- **Reusable UI components**
- **Feature-based folder structure**
- **Service layer abstraction**
- **Custom hooks for business logic**

Architecture layers:

```
UI (components/pages)
↓
Hooks (business logic)
↓
Services (API layer)
↓
External APIs
```

---

## 📁 Project Structure

```
├── app/  
│   ├── components/  
│   │   ├── FavoriteGamesPage/  
│   │   │   ├── GameDropdownItem.tsx  
│   │   │   ├── GameListDropdown.tsx  
│   │   │   ├── GamesDropdownHeader.tsx  
│   │   │   └── GamesGrid.tsx  
│   │   └── GamePage/  
│   │       ├── Filters.tsx  
│   │       ├── GameCard.tsx  
│   │       ├── GameCardSkeleton.tsx  
│   │       ├── Pagination.tsx  
│   │       └── SearchBar.tsx  
│   │  
│   ├── games/  
│   │   └── [id]/  
│   │       └── page.tsx  
│   │  
│   └── page.tsx
│  
├── lib/  
│   ├── api/  
│   └── hook/  
│  
├── pages/  
│   ├── FavoriteGamesPage/  
│   │   └── page.tsx  
│   └── GameDetailPage/  
│       └── page.tsx  
│  
├── providers/  
│   └── query-provider.tsx  
│  
└── services/  
│  └── game.ts  
types
│   ├── GamesResponse.ts
---

## ⚙️ Installation

Clone the repository:

```bash
git clone https://github.com/farnazseyedi/Gamers-place
cd my-app
```

Install dependencies:

```bash
npm install
or
npm install \
  @headlessui/react@2.2.9 \
  @heroicons/react@2.2.0 \
  @tailwindcss/postcss@4.1.18 \
  @tanstack/react-query@5.90.21 \
  @tanstack/react-virtual@3.13.18 \
  @types/node@20.19.33 \
  @types/react@19.2.14 \
  @types/react-dom@19.2.3 \
  autoprefixer@10.4.24 \
  class-variance-authority@0.7.1 \
  clsx@2.1.1 \
  lucide-react@0.564.0 \
  next@16.1.6 \
  postcss@8.5.6 \
  react@19.2.3 \
  react-dom@19.2.3 \
  react-virtuoso@4.18.1 \
  tailwind-merge@3.4.0 \
  tailwindcss-animate@1.0.7 \
  tailwindcss@4.1.18 \
  typescript@5.9.3 \
  eslint@9.39.2 \
  eslint-config-next@16.1.6
```

Run development server:

```bash
npm run dev
```

App runs on:

```
http://localhost:3000
```

---

## 🧪 Running Tests

```bash
npm run test
```

## 🌐 API Source
This project uses:
https://rawg.io/

---

## Author

Farnaz Seyedi
