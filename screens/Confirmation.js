import React, { useState } from "react";
import { StatusBar } from 'expo-status-bar';
import {
    Pressable,
    StyleSheet,
    Text,
    TextInput,
    TouchableWithoutFeedback,
    View,
    Keyboard
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
        <TouchableWithoutFeedback onPress={() => {
            Keyboard.dismiss();
        }}>
            <View style={styles.container}>
                <Text style={styles.logo}>Check your email for the confirmation code</Text>
                <TextInput
                    style={styles.inputView}
                    autoCorrect={false}
                    placeholder="Enter Code"
                    placeholderTextColor = "#003f5c"
                    onChangeText={authCode=>setAuthCode(authCode)}
                />
                <Text style={styles.error}>{errorMessage}</Text> 
                <Pressable
                    style = {styles.ConfirmBtn}
                    onPress={() => confirmSignUp()}
                >
                    <Text>Confirm Sign Up</Text>     
                </Pressable>

            </View>
        </TouchableWithoutFeedback>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#003f5c',
        alignItems: 'center',
        justifyContent: 'center',
        
    },

    ConfirmBtn:{
        width: 300,
        backgroundColor:"#ddd",
        borderRadius:25,
        height:50,
        alignItems:"center",
        justifyContent:"center",
        marginTop:10,
        marginBottom:10
      },

    logo: {
        textAlign: "center",
        marginLeft: 30,
        marginRight: 30,
        fontWeight:"bold",
        fontSize:25,
        color:"white",
        marginBottom:40
      },

    inputView:{
        color: "white",
        width: 300,
        backgroundColor:"#465881",
        borderRadius:25,
        height:50,
        marginBottom:30,
        justifyContent:"center",
        padding:15
    },

    error: {
        width: 300,
        fontWeight: "bold",
        textAlign: 'center',
        color: '#fb5b5a',
        marginBottom: 10
    },
       
})

export default Confirmation;