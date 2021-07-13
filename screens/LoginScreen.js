import React from "react";
import { StatusBar } from 'expo-status-bar';
import { Button, StyleSheet, Text, TextInput, View } from 'react-native';

function LoginScreen(props) {
    return (
        <View>
            <TextInput placeholder="Enter your username"/>
            <TextInput placeholder="Enter your password"/>
            <Button title="Don't have an account? Sign up here" onPress={() => console.log("PRESSED")}/>
        </View>
        
    );
}

export default LoginScreen;