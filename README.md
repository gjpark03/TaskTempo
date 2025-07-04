# Interval Timer App

A mobile-friendly interval timer application built with React and Vite. Perfect for workouts, meditation sessions, or any activity requiring timed intervals.

![Timer App](https://img.shields.io/badge/React-18.2.0-blue) ![Vite](https://img.shields.io/badge/Vite-5.2.0-purple) ![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4.1-teal)

## 📋 Table of Contents

- [Features](#features)
- [Updates](#updates)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Usage](#usage)
- [Project Structure](#project-structure)
- [Technologies Used](#technologies-used)
- [Contributing](#contributing)
- [License](#license)

## ✨ Features

- **Customizable Timer**: Set any duration from 1-120 minutes
- **Interval Notifications**: Visual alerts at custom intervals (5-300 seconds)
- **Mobile Responsive**: Optimized for all screen sizes
- **Visual Feedback**: Screen flash notifications for each interval
- **Timer Controls**: Start, Pause, Resume, and Reset functionality
- **Real-time Display**: Shows remaining time and intervals
- **Dark Theme**: Easy on the eyes during workouts

## 📅 Updates

| Version | Date | Description |
|---------|------|-------------|
| 1.0.0 | 2025-07-04 | Initial release with basic timer functionality |

## 🔧 Prerequisites

Before you begin, ensure you have the following installed on your machine:

- **Node.js** (version 16.0 or higher)
  - Download from [nodejs.org](https://nodejs.org/)
  - Verify installation: `node --version`
  
- **npm** (comes with Node.js)
  - Verify installation: `npm --version`

- **Git** (for cloning the repository)
  - Download from [git-scm.com](https://git-scm.com/)
  - Verify installation: `git --version`

## 🚀 Installation

Follow these step-by-step instructions to get the app running on your local machine:

### 1. Clone the Repository

```bash
# Using HTTPS
git clone https://github.com/gjpark03/WorkoutMaker.git

# OR using SSH
git clone git@github.com:gjpark03/WorkoutMaker.git

# Navigate to the project directory
cd WorkoutMaker
```

### 2. Install Dependencies

```bash
# Install all required packages
npm install
```

This will install:
- React and React DOM
- Vite (build tool)
- Tailwind CSS (styling)
- Lucide React (icons)
- PostCSS and Autoprefixer

### 3. Run the Development Server

```bash
# Start the app in development mode
npm run dev
```

The app will start and you'll see output like:
```
  VITE v5.2.0  ready in 523 ms

  ➜  Local:   http://localhost:5173/
  ➜  Network: http://192.168.1.100:5173/
  ➜  press h + enter to show help
```

### 4. Open the App

- Open your web browser
- Navigate to `http://localhost:5173`
- The app should now be running!

## 💻 Usage

### Setting Up a Timer

1. **Enter Total Time**: Input your desired duration in minutes (1-120)
2. **Set Interval**: Choose how often you want notifications in seconds (5-300)
3. **Start Timer**: Click the green "Start Timer" button

### During the Timer

- **Pause**: Click the yellow "Pause" button to temporarily stop
- **Resume**: Click "Resume" to continue from where you paused
- **Reset**: Click the red "Reset" button to stop and clear the timer
- **Visual Alerts**: The screen will flash red at each interval

### Timer Display

- **Main Timer**: Shows total time remaining in MM:SS format
- **Intervals Remaining**: Displays how many intervals are left
- **Next Interval**: Countdown to the next interval notification

## 📁 Project Structure

```
timer-app/
├── src/
│   ├── main.jsx          # App entry point
│   ├── App.jsx           # Main app component
│   ├── TimerApp.jsx      # Timer component with all logic
│   └── index.css         # Tailwind CSS imports
├── public/
│   └── vite.svg          # Default Vite logo
├── node_modules/         # Dependencies (git-ignored)
├── .gitignore           # Git ignore file
├── index.html           # HTML template
├── package.json         # Project dependencies
├── package-lock.json    # Locked dependencies
├── postcss.config.js    # PostCSS configuration
├── tailwind.config.js   # Tailwind configuration
├── vite.config.js       # Vite configuration
└── README.md            # This file
```

## 🛠️ Technologies Used

- **React 18.2.0** - UI framework
- **Vite 5.2.0** - Build tool and dev server
- **Tailwind CSS 3.4.1** - Utility-first CSS framework
- **Lucide React** - Icon library
- **PostCSS** - CSS processing
- **Autoprefixer** - CSS vendor prefixing

## 🐛 Troubleshooting

### Common Issues and Solutions

**Issue: "npm: command not found"**
- Solution: Install Node.js from [nodejs.org](https://nodejs.org/)

**Issue: "Failed to resolve import 'lucide-react'"**
- Solution: Run `npm install lucide-react`

**Issue: Tailwind styles not working**
- Solution: 
  ```bash
  npm install -D tailwindcss@3.4.1 postcss autoprefixer
  ```

**Issue: Port 5173 already in use**
- Solution: Either stop the process using that port or run:
  ```bash
  npm run dev -- --port 3000
  ```

## 👤 Author

Grace Park
- Email: parkjgrace2025@gmail.com