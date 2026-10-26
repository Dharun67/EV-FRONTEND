# GridWise — EV Mobility Platform Frontend

A modern, high-performance web interface for the GridWise Intelligent EV Charging & Route Optimization Platform. Built with React 18, TypeScript, Tailwind CSS, and Vite, featuring CleanTech AI dark glassmorphism aesthetics.

## ✨ Features

- **⚡ Real-time Station Discovery**: Interactive maps displaying EV charging stations with live availability status.
- **🧠 AI Route Planner**: Intelligent route calculation, battery drain estimation, and optimal charging stop recommendations.
- **📊 Live Charging Telemetry**: Real-time WebSocket streaming of battery percentage, charging rate, and session costs.
- **💳 Wallet & Payment Flow**: Seamless balance management, session payment processing, and transaction receipts.
- **📈 Fleet & CPO Dashboard**: Charge Point Operator metrics including revenue, occupancy rates, and charger health.
- **🔐 Firebase Authentication**: Secure user login, session management, and role-based access.

## 🛠️ Tech Stack

- **Framework**: React 18 + Vite
- **Language**: TypeScript
- **Styling**: Tailwind CSS, PostCSS, Lucide Icons
- **Real-Time Communication**: Socket.IO Client / WebSockets
- **Auth**: Firebase Authentication
- **Routing**: React Router DOM

## 🚀 Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/Dharun67/EV-FRONTEND.git
   cd EV-FRONTEND
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Configure environment variables:
   Copy `.env.example` to `.env` and fill in your configuration:
   ```bash
   cp .env.example .env
   ```

4. Start development server:
   ```bash
   npm run dev
   ```

5. Build for production:
   ```bash
   npm run build
   ```

## 📁 Project Structure

```
src/
├── assets/          # Static assets and icons
├── components/      # UI components (dashboard, map, payments, modals)
├── context/         # React Contexts (AuthContext, SocketContext)
├── hooks/           # Custom React hooks
├── pages/           # Application views/routes
├── services/        # API service clients
├── types/           # TypeScript interfaces and definitions
└── utils/           # Utility functions and helpers
```

## 📄 License

ISC License
