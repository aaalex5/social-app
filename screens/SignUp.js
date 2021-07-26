import React, { useState } from "react";
import { StatusBar } from 'expo-status-bar';
import {
    Pressable,
    StyleSheet,
    Text,
    TextInput,
    View,
    ImageBackground,
} from 'react-native';
import { Formik } from 'formik';
import { Auth } from 'aws-amplify';



const SignUp = ( { navigation }) => {
    const [errorMessage, setErrorMessage] = useState("");
    async function signUpAWS(username, password) {
        try {
            const { user } = await Auth.signUp({
                username,
                password,
            });
            console.log(user);
            console.log(username, password);

            navigation.navigate('EventHome');
            // send to event screen
        }
        catch (error) {
            console.log('error signing up:', error);
            console.log(error.message);
            setErrorMessage(error.message);
            setBadPassword(1);
        }
        
    }
    const [badPassword, setBadPassword] = useState(0);
    let message = <Text></Text>;
    if (badPassword) {
        message = <Text style={styles.error}>{errorMessage}</Text>
    }

    return (
        <View style={styles.container}>

            <Text style={styles.logo}>Getogether</Text>

            <Formik
                initialValues={{ username: '', password: ''}}

                onSubmit={(values, actions) => {
                    // db query for unique username
                    console.log(values);
                    //Reset the form after submitting
                    actions.resetForm();
                    signUpAWS(values.username, values.password);
                    //Add the query to database to check if username exists and display error message

                }}
            >
                {(props) => (
                    <View>
                        <TextInput
                            style={styles.inputView}
                            autoCorrect={false}
                            autoCapitalize='none'
                            placeholder='Username...'
                            placeholderTextColor="#003f5c"
                            onChangeText={props.handleChange('username')}
                            value={props.values.username}
                        //keyboardType='numbers-and-punctuation'
                        />
                        {/* <Text style={styles.error}>{props.errors.username}</Text> */}

                        <TextInput
                            style={styles.inputView}
                            autoCorrect={false}
                            autoCapitalize='none'
                            placeholder='Password...'
                            placeholderTextColor="#003f5c"
                            onChangeText={props.handleChange('password')}
                            value={props.values.password}
                        //keyboardType='numbers-and-punctuation'
                        />

                        {/* <Text>{errorMessage}</Text> */}
                        {message}
                       

                        <Pressable
                            style={styles.SignUpBtn}
                            onPress={props.handleSubmit}
                        >
                            <Text>Sign Up</Text>
                        </Pressable>

                    </View>
                )}
            </Formik>

        </View>
    )
}

const styles = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: '#003f5c',
        alignItems: 'center',
        justifyContent: 'center',

    },

    logo: {
        fontWeight: "bold",
        fontSize: 50,
        color: "#fb5b5a",
        marginBottom: 40
    },

    inputView: {
        color: "white",
        width: 300,
        backgroundColor: "#465881",
        borderRadius: 25,
        height: 50,
        marginBottom: 15,
        justifyContent: "center",
        padding: 15
    },

    error: {
        width: 300,
        fontWeight: "bold",
        textAlign: 'center',
        color: '#fb5b5a',
        marginBottom: 20
    },

    inputText: {
        height: 50,
        color: "white"
    },

    SignUpBtn: {
        backgroundColor: "#ddd",
        borderRadius: 25,
        height: 50,
        alignItems: "center",
        justifyContent: "center",
        marginTop: 30,
        marginBottom: 10
    },

})
export default SignUp;