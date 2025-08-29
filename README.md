# Habit Tracker App 📈

> **⚠️ PRODUCTION NOTICE**  
> This application is currently in active development and production. Features may be incomplete or subject to change. Please report any issues or bugs you encounter.

A modern, intuitive habit tracking application built with React and Vite to help you build and maintain positive habits in your daily life.

<div align="center">

## 🌟 Live Demo

**Experience the app in action!**

[![Live Demo](https://img.shields.io/badge/🚀_Live_Demo-Hosted_on_Vercel-black?style=for-the-badge&logo=vercel)](https://bbetter.vercel.app/)

*Click the badge above to try the live version*

---

</div>

## ✨ Features

- **Track Daily Habits**: Create and monitor your daily habits with ease
- **Visual Progress**: See your habit streaks and progress over time *(Coming Soon - Not Functional)*
- **Streak Tracking & Achievements**: Active tracking of habit streaks and achievement system *(Coming Soon - Not Functional)*
- **Blog Section**: Educational content and tips for habit building *(Coming Soon - Not Functional)*
- **Automated Weekly Reset**: Intelligent cron job system that resets your habit dashboard every Monday at 00:00 in your local timezone
- **Timezone-Aware**: Precise algorithm that adapts to timezone changes automatically
- **Responsive Design**: Works seamlessly on desktop and mobile devices
- **Fast Performance**: Built with Vite for lightning-fast development and production builds
- **Modern UI**: Clean, user-friendly interface for better user experience

## 🚀 Getting Started

### Prerequisites

Make sure you have the following installed on your system:
- [Node.js](https://nodejs.org/) (version 14.0 or higher)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)
- [Supabase account](https://supabase.com/) for backend services

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Zlatanoski/Habit-Tracker-App-.git
   cd Habit-Tracker-App-
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Set up environment variables**
   
   Create a `.env.local` file in the root directory:
   ```env
   VITE_SUPABASE_URL=your_supabase_project_url
   VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```
   
   Get these values from your [Supabase project dashboard](https://supabase.com/dashboard)

4. **Start the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

5. **Open your browser** and navigate to `http://localhost:5173`

## ⚡ Backend Architecture

### Automated Weekly Reset System
This application features a sophisticated **scheduled job system** using Supabase Edge Functions:

- **🕐 Precise Timing**: Executes every Monday at exactly 00:00 in the user's local timezone
- **🌍 Timezone Intelligence**: Advanced algorithm that automatically adapts when users change timezones
- **🔄 Weekly Fresh Start**: Empties the habit dashboard to provide a clean slate for each new week
- **⚙️ Cron Job Implementation**: Reliable scheduled execution using Supabase's cron job functionality
- **🎯 User-Specific**: Each user's dashboard resets according to their individual timezone settings

This ensures that regardless of where you are in the world or if you travel across timezones, your habit tracking week will always start fresh on Monday at midnight in your current location.

## 🛠️ Built With

- **[React](https://reactjs.org/)** - A JavaScript library for building user interfaces
- **[Vite](https://vitejs.dev/)** - Next generation frontend tooling for fast development
- **[Supabase](https://supabase.com/)** - Backend-as-a-Service for authentication, database, and API
- **[PostgreSQL](https://www.postgresql.org/)** - Powerful, open-source relational database system (via Supabase)
- **[Supabase Edge Functions](https://supabase.com/docs/guides/functions)** - Serverless functions for backend logic and cron jobs
- **[ESLint](https://eslint.org/)** - Code linting and formatting
- **[Vercel](https://vercel.com/)** - Deployment and hosting platform
- **Hot Module Replacement (HMR)** - For instant development feedback

## 📦 Available Scripts

In the project directory, you can run:

- `npm run dev` - Runs the app in development mode
- `npm run build` - Builds the app for production
- `npm run preview` - Previews the production build locally
- `npm run lint` - Runs ESLint to check for code issues

## 🏗️ Project Structure

```
habit-tracker-app/
├── public/
├── src/
│   ├── components/
│   ├── hooks/
│   ├── utils/
│   ├── supabase/
│   ├── App.jsx
│   └── main.jsx
├── supabase/
│   └── functions/
│       └── weekly-reset/
├── .env.local
├── index.html
├── package.json
├── vite.config.js
└── README.md
```
## 🤝 Contributing

Since this project is in active development, contributions are welcome! Here's how you can help:

1. **Fork the repository**
2. **Create a feature branch** (`git checkout -b feature/amazing-feature`)
3. **Commit your changes** (`git commit -m 'Add some amazing feature'`)
4. **Push to the branch** (`git push origin feature/amazing-feature`)
5. **Open a Pull Request**

## 📋 Roadmap

### 🚧 In Development (Coming Soon)
- [ ] **Active streak tracking and achievements system** - Currently not functional
- [ ] **Blog section with habit-building content** - Currently not functional
- [ ] **Updated footer with working links** - Current footer links may not be functional

### 🔮 Future Features
- [ ] Habit categories and tags
- [ ] Statistics and analytics dashboard
- [ ] Habit sharing and social features
- [ ] Mobile app development
- [ ] Data export functionality

## 🐛 Issues and Bug Reports

If you encounter any issues or bugs while using the application, please:

**Note**: Some features like streak tracking, achievements, blog section, and footer links are currently non-functional as they're in development.

1. Check if the issue already exists in the [Issues](https://github.com/Zlatanoski/Habit-Tracker-App-/issues) section
2. If not, create a new issue with:
   - Clear description of the problem
   - Steps to reproduce
   - Expected vs actual behavior
   - Screenshots (if applicable)

