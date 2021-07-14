import 'react-native-gesture-handler';
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import LoginScreen from "./screens/LoginScreen.js";
import LoginNavigation from "./navigation/LoginNavigation.js"

export default function App() {
  return (
    <LoginNavigation/>
  );
}