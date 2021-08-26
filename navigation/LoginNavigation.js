import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from "../screens/LoginScreen.js";
import SignUp from "../screens/SignUp.js";
import EventHome from "../screens/EventHome.js";
import Profile from "../screens/Profile.js";
import EventDetails from "../screens/EventDetails";
import Confirmation from "../screens/Confirmation.js";

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
                    params={{eventID: "", time: ""}}
                    options={{
                        title: 'Event Details'
                    }}
                />
                <Stack.Screen
                    name={"Confirmation"}
                    component={Confirmation}
                    params={{ username: "", userID: "" }}
                    options={{
                        title: 'Confirmation'
                    }}
                />
            </Stack.Navigator>

        </NavigationContainer>

    );
};

export default LoginNavigation;