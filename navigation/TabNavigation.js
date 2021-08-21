import React, {useEffect, useState} from "react";
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import EventHome from "../screens/EventHome.js";
import EventForm from "../screens/EventForm.js";
import Profile from "../screens/Profile.js";
import SignUp from '../screens/SignUp.js';
import Login from '../screens/LoginScreen.js';
import LoginScreen from '../screens/LoginScreen.js';

//import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
//const Tab = createMaterialBottomTabNavigator();
const Stack = createStackNavigator();

function Home() {
    return (
      <Tab.Navigator screenOptions={{ headerShown: false }}>
        <Tab.Screen name="EventHome" component={EventHome} />
        <Tab.Screen name="Profile" component={Profile} />
      </Tab.Navigator>
    );
  }
  
function TabNavigator() {
    const [isLoggedIn, setisLoggedIn] = useState(true);

    return isLoggedIn ? (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen name="Home" component={Home} />
            </Stack.Navigator>
        </NavigationContainer>
    ) : (
        <NavigationContainer>
            <Stack.Navigator>  
                <Stack.Screen name="LoginScreen" component={LoginScreen} />
                <Stack.Screen name="SignUp" component={SignUp} />  
            </Stack.Navigator>
        </NavigationContainer>
    )
  }

export default TabNavigator;