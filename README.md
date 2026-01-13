# MindAid 🧠💜

A comprehensive React Native mobile application designed to support mental health and wellness, built with Expo.

[![React Native](https://img.shields.io/badge/React%20Native-0.76.5-blue.svg)](https://reactnative.dev/)
[![Expo SDK](https://img.shields.io/badge/Expo-~52.0.20-000020.svg)](https://expo.dev/)
[![Firebase](https://img.shields.io/badge/Firebase-11.1.0-orange.svg)](https://firebase.google.com/)
[![License](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)

## 📋 Table of Contents

- [Features]
- [Technologies]
- [Screenshots](#screenshots)
- [Installation](#installation)
- [Configuration](#configuration)
- [Project Structure](#project-structure)
- [Permissions](#permissions)
- [Development](#development)
- [Build & Deployment](#build--deployment)
- [Contributing](#contributing)
- [License](#license)

## ✨ Features

MindAid provides eight core features accessible via bottom tab navigation:

### 🏠 Home
- Interactive map view with Google Maps integration
- Meditation center search using Google Places API
- AI-powered chat assistant using Google Generative AI (Gemini Pro)

### 📓 Journal
- Text-based journal entries
- Photo and audio attachments
- Mood tracking
- Firebase Realtime Database synchronization

### 👤 Profile
- User profile editing
- Photo management
- Personal statistics dashboard
- AsyncStorage-backed settings

### 🆘 Emergency
- Emergency contact management
- SOS functionality with location sharing
- Quick SMS dispatch to contacts
- Real-time location tracking

### 🧘 Meditation
- Guided meditation sessions
- Built-in music player
- Audio playback support

### 🎮 Games
- Memory game for cognitive wellness
- Tic-Tac-Toe for stress relief
- No external dependencies

### 🏥 Doctors
- Healthcare provider directory
- Quick contact actions (call, email, maps)
- Integration with device communication apps

### 📅 Period Tracking
- Menstrual cycle tracking
- Mood logging
- Cycle predictions
- Firebase-synced data storage

## 🛠️ Technologies

### Core Stack

| Technology | Version | Purpose |
|------------|---------|---------|
| React Native | 0.76.5 | Mobile application framework |
| Expo SDK | ~52.0.20 | Development and build platform |
| React Navigation | ^7.0.14 | Navigation infrastructure |
| Firebase | ^11.1.0 | Authentication and database backend |
| React | 18.3.1 | UI library |

### Key Dependencies

```json
{
  "react-native-maps": "1.18.0",
  "react-native-maps-directions": "^1.9.0",
  "@google/generative-ai": "^0.21.0",
  "expo-camera": "~16.0.10",
  "expo-location": "~18.0.4",
  "expo-notifications": "~0.29.12",
  "expo-av": "~15.0.2",
  "expo-contacts": "~14.0.1"
}
```

### Google Cloud Services

- **Google Maps API** - Map display and location visualization
- **Google Places API** - Meditation center search
- **Google Directions API** - Route calculation
- **Google Generative AI** - AI chat assistant (gemini-pro)


## 🚀 Installation

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- Expo CLI (`npm install -g expo-cli`)
- iOS Simulator (Mac only) or Android Emulator

### Setup

1. Clone the repository:
```bash
git clone https://github.com/ahunain529/mindaid.git
cd mindaid
```

2. Install dependencies:
```bash
npm install
```

3. Configure Firebase (see [Configuration](#configuration) section)

4. Start the development server:
```bash
npm start
```

5. Run on your desired platform:
```bash
# Android
npm run android

# iOS
npm run ios

```

## ⚙️ Configuration

### Firebase Setup

1. Create a Firebase project at [Firebase Console](https://console.firebase.google.com/)

2. Enable the following services:
   - Authentication
   - Realtime Database
   - Storage (optional)

3. Create `config/firebase.js`:
```javascript
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getDatabase } from 'firebase/database';

const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_AUTH_DOMAIN",
  databaseURL: "YOUR_DATABASE_URL",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_STORAGE_BUCKET",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const database = getDatabase(app);
```

### Google API Configuration

Update `app.json` with your Google Maps API key:
```json
{
  "expo": {
    "ios": {
      "config": {
        "googleMapsApiKey": "YOUR_GOOGLE_MAPS_API_KEY"
      }
    },
    "android": {
      "config": {
        "googleMaps": {
          "apiKey": "YOUR_GOOGLE_MAPS_API_KEY"
        }
      }
    }
  }
}
```

## 📁 Project Structure

```
mindaid/
├── assets/              # Images, fonts, and static resources
├── config/
│   └── firebase.js      # Firebase configuration
├── screens/             # Feature screens
│   ├── HomeScreen.js
│   ├── JournalScreen.js
│   ├── ProfileScreen.js
│   ├── EmergencyContactsScreen.js
│   ├── MeditationScreen.js
│   ├── GameScreen.js
│   ├── DoctorsScreen.js
│   └── MenstruationScreen.js
├── services/            # Background services
│   ├── NotificationService.js
│   └── EmergencyService.js
├── App.js               # Main application entry
├── app.json             # Expo configuration
├── package.json         # Dependencies
└── eas.json            # EAS Build configuration
```

## 🔐 Permissions

### iOS Permissions

The app requires the following iOS permissions (configured in `Info.plist`):

- `NSLocationWhenInUseUsageDescription` - Emergency location sharing
- `NSLocationAlwaysUsageDescription` - Background location access
- `NSContactsUsageDescription` - Emergency contact selection
- `NSAppleMusicUsageDescription` - Meditation music playback
- `NSCameraUsageDescription` - Profile and journal photos
- `NSMicrophoneUsageDescription` - Voice notes

### Android Permissions

Required Android permissions:

- Location (Fine & Coarse)
- Camera
- Audio Recording
- Read/Write External Storage
- Contacts
- Phone (Call & SMS)
- Notifications

## 💻 Development

### Available Scripts

```bash
# Start development server with dev client
npm start

# Run on Android device/emulator
npm run android

# Run on iOS device/simulator
npm run ios

```

### Theme Configuration

The app uses a consistent color scheme:

```javascript
const theme = {
  colors: {
    primary: '#6B48FF',    // Vibrant purple
    secondary: '#FF6B6B',  // Coral pink
    accent: '#4ECDC4',     // Turquoise
    background: '#F7F7FF', // Light lavender
    text: '#2D3436',       // Dark gray
  }
}
```

## 🏗️ Build & Deployment

### EAS Build Configuration

**EAS Project ID:** `d3ab936e-4150-4496-b441-259ce157eb38`

Build the app using Expo Application Services:

```bash
# Install EAS CLI
npm install -g eas-cli

# Login to your Expo account
eas login

# Configure EAS
eas build:configure

# Build for Android
eas build --platform android

# Build for iOS
eas build --platform ios

# Build for both platforms
eas build --platform all
```

### App Identity

- **App Name:** MindAid
- **Package ID:** `com.k214663.mindAid`
- **Version:** 1.0.0
- **Orientation:** Portrait only
- **UI Style:** Light mode

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👥 Authors

- ALI HUNAIN - [GitHub Profile](https://github.com/ahunain529)

## 🙏 Acknowledgments

- Firebase for backend infrastructure
- Google Cloud Platform for AI and Maps services
- Expo team for the amazing development platform
- React Native community for continuous support

## 📞 Support

For support, email ahunain529@gmail.com or open an issue in the GitHub repository.

---

Made with ❤️ for mental wellness
