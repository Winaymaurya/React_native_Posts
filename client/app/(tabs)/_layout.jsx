import React from 'react'
import {Tabs} from 'expo-router'
import { Ionicons } from '@expo/vector-icons';
import {StatusBar} from 'expo-status-bar'
import { createStackNavigator } from '@react-navigation/stack';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
const Stack = createStackNavigator();
export default function TabLayout() {

  return (
    <>
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: '#161622', // Background color of the header
        },
        headerTintColor: '#FFF', // Color of the header text
        headerTitleStyle: {
          fontWeight: 'light', // Custom font styling for the header title
        },
      }}
    >
      <Stack.Screen name="HomeTabs" component={HomeTabs} options={{ headerShown: false }} />
      {/* Other screens can be added here */}
    </Stack.Navigator>

    <StatusBar backgroundColor='#161622' style='light' />
  </>
);
}

function HomeTabs() {
return (
  <Tabs
    screenOptions={{
      headerShown: true, // Show header for each tab screen
      tabBarActiveTintColor: '#4c9ad0',
      tabBarInactiveTintColor: '#CDCDE0',
      tabBarStyle: {
        backgroundColor: '#161622',
        padding: 2,
        height: 55,
      },
      headerStyle: {
        backgroundColor: '#161622', // Same background as tab bar
      },
      headerTintColor: '#CCCCFF', // Customize the color of the header text and icons
      headerTitleStyle: {
        fontWeight: 'light', // Custom font styling for the header title
      },
    }}
  >
    <Tabs.Screen
      name='Home'
      options={{
        tabBarIcon: ({ color }) => <Ionicons name="home" size={24} color={color} />,
        title: 'Home', // Custom title for the header
      }}
    />
    <Tabs.Screen
      name='Create'
      options={{
        tabBarIcon: ({ color }) => <Ionicons name="create" size={24} color={color} />,
        title: 'Create',
      }}
    />
    <Tabs.Screen
      name='MyPost'
      options={{
        tabBarIcon: ({ color }) => <MaterialCommunityIcons name="post" size={24} color={color} />,
        title: 'MyPosts ',
      }}
    />
    <Tabs.Screen
      name='Profile'
      options={{
        tabBarIcon: ({ color }) => <Ionicons name="people-circle" size={24} color={color} />,
        title: 'Profile ',
      }}
    />
  </Tabs>
);
}