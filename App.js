import 'react-native-gesture-handler';
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import LoginScreen from "./screens/LoginScreen.js";
import LoginNavigation from "./navigation/LoginNavigation.js";
import Amplify, { Auth } from 'aws-amplify';
import awsconfig from './src/aws-exports';
Amplify.configure(awsconfig);

export default function App() {
  return (
    <LoginNavigation/>
  );
}