import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from "../screens/LoginScreen.js";
import SignUp from "../screens/SignUp.js";
import EventHome from "../screens/EventHome.js";
import Profile from "../screens/Profile.js";
import EventDetails from "../screens/EventDetails";

const Stack = createStackNavigator();
// adds screens so they can be navigated to
const LoginNavigation = (props) => {
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen
                    name={"LoginScreen"}
                    component={LoginScreen}
                    options={{
                        title: 'Login'
                    }}

                />
                <Stack.Screen
                    name={"SignUp"}
                    component={SignUp}
                    options={{
                        title: 'Sign Up'
                    }}
                />
                <Stack.Screen
                    name={"EventHome"}
                    component={EventHome}
                    options={{
                        title: 'Welcome Home'
                    }}
                />
                <Stack.Screen
                    name={"Profile"}
                    component={Profile}
                    options={{
                        title: 'Profile'
                    }}
                />
                <Stack.Screen
                    name={"EventDetails"}
                    component={EventDetails}
                    options={{
                        title: 'Event Details'
                    }}
                />
            </Stack.Navigator>

        </NavigationContainer>

    );
};

export default LoginNavigation;