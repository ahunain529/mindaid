import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import ProfileScreen from '../screens/ProfileScreen';
import AppCreatorScreen from '../screens/AppCreatorScreen';
// Import other screens as needed

const Stack = createStackNavigator();

export default function AppNavigator() {
  return (
    <Stack.Navigator>
      {/* Other screens */}
      <Stack.Screen 
        name="Profile" 
        component={ProfileScreen} 
        options={{
          title: 'Profile'
        }}
      />
      <Stack.Screen 
        name="AppCreator" 
        component={AppCreatorScreen}
        options={{
          title: 'About',
          headerShown: false // Since we have a custom header
        }}
      />
    </Stack.Navigator>
  );
} 