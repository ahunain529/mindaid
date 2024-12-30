import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  Image,
  Linking,
  TouchableOpacity,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const theme = {
  colors: {
    primary: '#6B48FF',
    secondary: '#FF6B6B',
    background: '#F7F7FF',
    text: '#2D3436',
  }
};

export default function AppCreatorScreen() {
  const handleLinkPress = (url) => {
    Linking.openURL(url);
  };

  const creators = [
    {
      name: "Ali Hunain",
      role: "Full Stack Developer",
      bio: "A passionate developer focused on creating impactful applications that enhance mental wellness and user experience.",
      github: "https://github.com/ahunain529", // Replace with actual GitHub URL
      linkedin: "https://www.linkedin.com/in/ali-hunain/" // Replace with actual LinkedIn URL
    },
    {
      name: "Rukhshan Khan",
      role: "Full Stack Developer",
      bio: "Dedicated developer specializing in mobile applications and user-centered design for mental health solutions.",
        github: "https://github.com/Rukhshankhan", // Replace with actual GitHub URL
        linkedin: "https://www.linkedin.com/in/rukhshan-khan-9351b6243?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app" // Replace with actual LinkedIn URL
    }
  ];

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Meet the Creators</Text>
      </View>

      {creators.map((creator, index) => (
        <View key={index} style={styles.creatorSection}>
          <View style={styles.imageContainer}>
            <Image
              source={
                creator.name === "Ali Hunain" 
                  ? require('../assets/a2.jpg')    // Ali's profile picture
                  : require('../assets/r2.jpg') // Rukhshan's profile picture
              }
              style={styles.creatorImage}
            />
            <Text style={styles.creatorName}>{creator.name}</Text>
            <Text style={styles.creatorRole}>{creator.role}</Text>
          </View>

          <View style={styles.bioSection}>
            <Text style={styles.bioText}>{creator.bio}</Text>
          </View>

          <View style={styles.socialLinks}>
            <TouchableOpacity
              style={styles.socialButton}
              onPress={() => handleLinkPress(creator.github)}
            >
              <Ionicons name="logo-github" size={24} color={theme.colors.primary} />
              <Text style={styles.socialButtonText}>GitHub</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.socialButton}
              onPress={() => handleLinkPress(creator.linkedin)}
            >
              <Ionicons name="logo-linkedin" size={24} color={theme.colors.primary} />
              <Text style={styles.socialButtonText}>LinkedIn</Text>
            </TouchableOpacity>
          </View>
        </View>
      ))}

      <View style={styles.appSection}>
        <Text style={styles.sectionTitle}>About the App</Text>
        <View style={styles.imageContainer}>
          <Image
            source={require('../assets/xyz.jpg')} // Add your app logo
            style={styles.appLogo}
          />
        </View>

        <View style={styles.appInfo}>
          <Text style={styles.appName}>MindfulJourney</Text>
          <Text style={styles.appVersion}>Version 1.0.0</Text>
          
          <Text style={styles.appDescription}>
            MindfulJourney is a collaborative project developed by Ali Hunain and Rukhshan Khan. 
            This meditation and journaling app is designed to help users maintain mental wellness 
            and track their mindfulness journey. Built with React Native and Firebase, it provides 
            a seamless experience for daily meditation and reflection.
          </Text>

          <View style={styles.featureList}>
            <Text style={styles.featureTitle}>Key Features:</Text>
            <View style={styles.feature}>
              <Ionicons name="timer-outline" size={20} color={theme.colors.primary} />
              <Text style={styles.featureText}>Guided Meditation Sessions</Text>
            </View>
            <View style={styles.feature}>
              <Ionicons name="journal-outline" size={20} color={theme.colors.primary} />
              <Text style={styles.featureText}>Daily Journal Entries</Text>
            </View>
            <View style={styles.feature}>
              <Ionicons name="stats-chart-outline" size={20} color={theme.colors.primary} />
              <Text style={styles.featureText}>Progress Tracking</Text>
            </View>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  header: {
    padding: 20,
    paddingTop: 40,
    backgroundColor: theme.colors.primary,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
  },
  creatorSection: {
    padding: 20,
  },
  imageContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  creatorImage: {
    width: 150,
    height: 150,
    borderRadius: 75,
    marginBottom: 10,
  },
  creatorName: {
    fontSize: 22,
    fontWeight: 'bold',
    color: theme.colors.text,
  },
  creatorRole: {
    fontSize: 16,
    color: 'gray',
    marginTop: 5,
  },
  bioSection: {
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 10,
    marginBottom: 20,
  },
  bioText: {
    fontSize: 16,
    lineHeight: 24,
    color: theme.colors.text,
  },
  socialLinks: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 20,
  },
  socialButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 8,
    minWidth: 120,
    justifyContent: 'center',
  },
  socialButtonText: {
    marginLeft: 8,
    fontSize: 16,
    color: theme.colors.primary,
  },
  appSection: {
    padding: 20,
    backgroundColor: 'white',
    margin: 20,
    borderRadius: 15,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: theme.colors.text,
    marginBottom: 20,
    textAlign: 'center',
  },
  appLogo: {
    width: 100,
    height: 100,
    borderRadius: 20,
  },
  appInfo: {
    marginTop: 20,
  },
  appName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: theme.colors.text,
    textAlign: 'center',
  },
  appVersion: {
    fontSize: 14,
    color: 'gray',
    textAlign: 'center',
    marginBottom: 15,
  },
  appDescription: {
    fontSize: 16,
    lineHeight: 24,
    color: theme.colors.text,
    marginBottom: 20,
  },
  featureList: {
    marginTop: 10,
  },
  featureTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: theme.colors.text,
    marginBottom: 10,
  },
  feature: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  featureText: {
    fontSize: 16,
    color: theme.colors.text,
    marginLeft: 10,
  },
}); 