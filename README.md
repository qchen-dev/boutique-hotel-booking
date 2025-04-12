# Boutique Hotel Booking Management App 🏨

A modern and stylish hotel booking application built with React and powered by Supabase.  
Easily manage cabins, guests, bookings, and more — perfect for boutique stays and smaller properties.

## ✨ Tech Stack

- ⚛️ **React** – UI library
- 🚦 **React Router** – Routing and navigation
- 💅 **Styled Components** – Component-level styling
- 📦 **React Query** – Data fetching and caching
- 🧠 **Context API** – Global state management
- 📝 **React Hook Form** – Forms and validation
- 🛠️ **Supabase** – Backend-as-a-service (database & auth)
- ⚡ **Vite** – Fast frontend tooling

## 🚀 Getting Started

Follow the steps below to install and run the project locally.

### 1. Clone the Repository

```bash
git clone https://github.com/qchen-dev/boutique-hotel-booking.git
cd boutique-hotel-booking
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Start the Development Server

```bash
npm run dev
```

The app will be available at http://localhost:5173.

## 📁 Project Structure

```bash
src/
│
├── features/         # Feature-based folders (e.g. bookings, cabins)
├── services/         # API service functions
├── ui/               # Reusable UI components
├── context/          # Context API providers
├── hooks/            # Custom hooks
├── pages/            # Top-level routed pages
├── data/             # Static data or constants
├── styles/           # Global styles and theme definitions
├── utils/            # Utility functions and helpers
│
├── App.jsx           # Main app layout with routes
└── main.jsx          # Entry point of the application
```

## ⚙️ Environment Variables

Make sure to set up a .env file at the root with your Supabase credentials:

```ini
VITE_SUPABASE_URL=your-supabase-url
VITE_SUPABASE_ANON_KEY=your-anon-key
```

## 📦 Build for Production

```bash
npm run build
```

## 🧹 Lint & Format

```bash
npm run lint
```

## 📝 License

MIT
