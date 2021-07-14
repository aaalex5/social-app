import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from "../screens/LoginScreen.js";
import SignUp from "../screens/SignUp.js";

const Stack = createStackNavigator();

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
            </Stack.Navigator>

        </NavigationContainer>

    );
};

export default LoginNavigation;