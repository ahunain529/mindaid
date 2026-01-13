# MindAid 🧠

MindAid is a cross-platform **mental health and wellness mobile application** built using **React Native and Expo**.  
The app provides users with emotional support tools such as journaling, AI-powered chat, meditation resources, emergency assistance, and wellness tracking.

---

## 📌 Overview

Mental health care should be accessible, private, and supportive.  
MindAid brings multiple mental wellness features into a single, easy-to-use mobile application designed to promote emotional well-being and self-care.

---

## ✨ Features

- 📓 **Journaling**
  - Create text, image, and audio journal entries
  - Cloud storage using Firebase

- 🤖 **AI Chat Assistant**
  - Conversational emotional support
  - Powered by Google Generative AI

- 🧘 **Meditation & Relaxation**
  - Guided wellness and stress-reduction tools

- 🚨 **Emergency Support**
  - SOS alerts
  - Quick access to emergency contacts

- 📍 **Location Services**
  - Find nearby meditation or wellness centers using Google Maps

- 📊 **Mood & Habit Tracking**
  - Track emotional patterns over time

- 🩸 **Period Tracking**
  - Cycle logging and reminders

- 🎮 **Stress-Relief Games**
  - Simple interactive activities

---

## 🛠 Tech Stack

### Frontend
- React Native
- Expo
- React Navigation

### Backend & Services
- Firebase Authentication
- Firebase Realtime Database
- Google Generative AI
- Google Maps & Places API

### Tooling
- Node.js
- npm
- Expo Application Services (EAS)

---

## 🏗 Project Structure
mindaid/
├── components/ # Reusable UI components
├── screens/ # App screens
├── navigation/ # Navigation logic
├── services/ # Firebase, AI, and API integrations
├── assets/ # Images and icons
└── App.js # App entry point


---

## 🚀 Getting Started

### Prerequisites

Ensure you have installed:
- Node.js (LTS recommended)
- npm or yarn
- Expo CLI
- Android Studio or Xcode (optional for emulators)

---

## 📦 Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/ahunain529/mindaid.git
   cd mindaid
   npm install
   expo start
   to build its apk run 
   eas init
   eas build:configure
   eas build --platform andorid 

-------------------------
## ⚙️ Environment Configuration

Set up the following services:

Firebase

  Enable Authentication

  Configure Realtime Database

Google APIs

Google Maps API key

Google Generative AI API key

Add your API keys to the appropriate configuration files
(e.g., firebase.js, app.json).

⚠️ Never commit API keys to version control.
