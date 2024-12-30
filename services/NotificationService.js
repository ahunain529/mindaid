import * as Notifications from 'expo-notifications';

const motivationalQuotes = [
  "Your health is an investment, not an expense.",
  "Take care of your body. It's the only place you have to live.",
  "The greatest wealth is health.",
  "Wellness is the new luxury.",
  "Health is not valued until sickness comes.",
  "Your mind is a powerful thing. When you fill it with positive thoughts, your life will start to change.",
  "Every day is a new beginning. Take a deep breath and start again.",
  "Small steps every day lead to big changes.",
  "You are stronger than you think.",
  "The only bad workout is the one that didn't happen.",
  "Your future self will thank you.",
  "Progress is progress, no matter how small.",
  "Believe you can and you're halfway there.",
  "Make yourself proud.",
  "You don't have to be perfect to be amazing.",
  "Your only limit is your mind.",
  "Focus on the good.",
  "Stay patient and trust your journey.",
  "Everything you need is already within you.",
  "You are capable of amazing things."
];

export const setupNotifications = async () => {
  const { status } = await Notifications.requestPermissionsAsync();
  if (status !== 'granted') {
    console.log('Notification permissions not granted');
    return;
  }

  Notifications.setNotificationHandler({
    handleNotification: async () => ({
      shouldShowAlert: true,
      shouldPlaySound: true,
      shouldSetBadge: false,
    }),
  });
};

export const showMotivationalQuote = async () => {
  try {
    // Get a random quote
    const randomIndex = Math.floor(Math.random() * motivationalQuotes.length);
    const randomQuote = motivationalQuotes[randomIndex];
    
    // Schedule the notification immediately
    await Notifications.scheduleNotificationAsync({
      content: {
        title: "Daily Motivation",
        body: randomQuote,
        sound: 'default',
        priority: 'high',
      },
      trigger: null, // null trigger means show immediately
    });
  } catch (error) {
    console.error('Error showing notification:', error);
  }
};

// Optional: Function to show quote at specific time
export const scheduleQuoteNotification = async (hour = 9, minute = 0) => {
  try {
    await Notifications.scheduleNotificationAsync({
      content: {
        title: "Daily Motivation",
        body: motivationalQuotes[Math.floor(Math.random() * motivationalQuotes.length)],
        sound: 'default',
        priority: 'high',
      },
      trigger: {
        hour: hour,
        minute: minute,
        repeats: true,
      },
    });
  } catch (error) {
    console.error('Error scheduling notification:', error);
  }
}; 