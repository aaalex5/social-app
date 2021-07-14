import React, {useState} from "react";
import { StatusBar } from 'expo-status-bar';
import {
    Pressable,
    StyleSheet,
    Text,
    TextInput,
    View,
    ImageBackground,
} from 'react-native';


const LoginScreen = ( {navigation} ) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [validLogin] = useState(0);
    const handlePress = () => {
        navigation.navigate('SignUp');
    }

    const handleSubmit = () => {
        console.log({username});
        console.log({password});
    }
    const handleButton = () => {
        if (username.length > 0 && password.length > 0) {
            validLogin = 1;
        }
    }
    return (
        <View>
            <TextInput
                autoCorrect={false}
                autoCapitalize='none'
                placeholder="Enter your username" 
                onChangeText={username=>setUsername(username)}
            />
            <TextInput
                autoCorrect={false}
                autoCapitalize='none'
                placeholder="Enter your password" 
                onChangeText={password=>setPassword(password)}
            />
            <Pressable
                onPress={handleSubmit}
                disabled={validLogin}
            >
                <Text>Submit</Text>
                
            </Pressable>
            <Pressable
                onPress={handlePress}
            >
                <Text>"Don't have an account? Sign up here"</Text>
            </Pressable>
        </View>
    );
};


export default LoginScreen;