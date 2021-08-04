import 'react-native-gesture-handler';
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import LoginScreen from "./screens/LoginScreen.js";
import LoginNavigation from "./navigation/LoginNavigation.js";
import Amplify, { API, Auth } from 'aws-amplify';
import awsconfig from './src/aws-exports';
// config for cognito
Amplify.configure({
  Auth: {

     identityPoolId: 'us-east-2:3ef62bfb-b9a1-494d-ad53-9aad50319e9b',
     region: 'US-EAST-2',
     userPoolId: 'us-east-2_jmTM2whVk',
     userPoolWebClientId: 'k7jtoieutlbans46tpivm3t7',
   }
 });
//Amplify.configure(awsconfig);
API.configure(awsconfig);

export default function App() {
  return (
    <LoginNavigation />
  );
}