import React, { useState } from "react";
import { StatusBar } from 'expo-status-bar';
import {
    Pressable,
    StyleSheet,
    Text,
    TextInput,
    View,
} from 'react-native';
import { Auth } from 'aws-amplify';
import { set } from "react-native-reanimated";
import '../global.js'

const Confirmation = ({route, navigation}) => {
    const [authCode, setAuthCode] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const { username } = route.params;
    console.log("User", username);
    async function confirmSignUp() {
        try {
          await Auth.confirmSignUp(username, authCode);
          navigation.navigate('EventHome');
        } catch (error) {
            setErrorMessage(error.message);
            console.log('error confirming sign up', error);
        }
    }

    return (
        <View>
             <Text>Check your email for the confirmation code.</Text>
             <TextInput
                placeholder="Enter Code"
                onChangeText={authCode=>setAuthCode(authCode)}
             />
            <Pressable
                onPress={() => confirmSignUp()}
            >
                <Text>Confirm Sign Up</Text>    
                <Text>{errorMessage}</Text>  
            </Pressable>
        </View>
    );
};

export default Confirmation;