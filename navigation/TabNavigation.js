import React, {useEffect, useState} from "react";
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import EventHome from "../screens/EventHome.js";
import EventForm from "../screens/EventForm.js";
import Profile from "../screens/Profile.js";
import SignUp from '../screens/SignUp.js';
import LoginScreen from '../screens/LoginScreen.js';
import Confirmation from '../screens/Confirmation.js';
import EventDetails from '../screens/EventDetails.js';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
//import Ionicons from 'react-native-vector-icons/Ionicons';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

function Home() {
    return (
      <Tab.Navigator screenOptions={{ headerShown: false }}>
        <Tab.Screen 
          name="EventHome" 
          component={EventHome}
        />
        <Tab.Screen 
          name="EventForm"
          component={EventForm}
        />
        <Tab.Screen 
          name="Profile" 
          component={Profile} 
        />
      </Tab.Navigator>
    );
  }
  
function TabNavigator() {

    return (
        <NavigationContainer>
            <Stack.Navigator>  
                <Stack.Screen
                  name="LoginScreen"
                  component={LoginScreen}
                />
                <Stack.Screen
                  name="Home"
                  options={({ navigation, route }) => ({
                    headerLeft: () => null
                  })}
                  component={Home}
                />
                <Stack.Screen 
                  name="SignUp" 
                  component={SignUp} 
                />  
                <Stack.Screen 
                  name="Confirmation" 
                  component={Confirmation} 
                />
                <Stack.Screen 
                  name="EventDetails" 
                  component={EventDetails}
                />
            </Stack.Navigator>
        </NavigationContainer>
    )
  }

export default TabNavigator;