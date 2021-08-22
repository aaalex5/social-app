import React, { useState } from "react";
import { StatusBar } from 'expo-status-bar';
import {
    Pressable,
    StyleSheet,
    Text,
    TextInput,
    View,
    Keyboard,
    TouchableWithoutFeedback
} from 'react-native';
import { Formik } from 'formik';
import { Auth } from 'aws-amplify';



const SignUp = ( { navigation }) => {
    const [errorMessage, setErrorMessage] = useState('');

     /* 
    The username and password submitted by the user are sent to and checked for errors by AWS. 
    If AWS returns an error, it is caught by our code and the badSignup variable is set to true while the errorMessage string is set
    to be the error message that AWS returns. 

    This function is run on every submit until the user provides a valid username/password combination. At that point,
    the user information will be placed into the AWS pool and the user will be navigated to the Event/Home page.
    */

    async function signUpAWS(username, password, email) {
        try {
            const { user } = await Auth.signUp({
                username,
                password,
                attributes: {
                    email,
                }
            });
            console.log("OI OI", email, username, password);
            navigation.navigate('Confirmation', {
                username: username
            });
            // send to event screen
        }
        catch (error) {
            console.log('error signing up:', error);
            console.log(error.message);
            setErrorMessage(error.message);
            setBadSignup(1);
        }
    }

    const [badSignup, setBadSignup] = useState(0);
    let message = <Text></Text>;
    if (badSignup) {
        message = <Text style={styles.error}>{errorMessage}</Text>
    }


    /*
    Formik helps handle the username/password entry as a single form being submitted. It is definited within the view.
    We use it to store the values of username and password, send them to AWS, and also to reset the username and 
    password fields after a user submits an entry.
    */

    return (
        <TouchableWithoutFeedback onPress={() => {
            Keyboard.dismiss();
        }}>

            <View style={styles.container}>

                <Text style={styles.logo}>
                    <Text style={{color: '#fff'}}>
                        Get
                    </Text>
                    together
                </Text>

                <Formik
                    initialValues={{ username: '', password: '', email: ''}}

                    onSubmit={(values, actions) => {
                        // db query for unique username
                        console.log(values);
                        //Reset the form after submitting
                        actions.resetForm();
                        signUpAWS(values.username, values.password, values.email);
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
                            />
                            <TextInput
                                style={styles.inputView}
                                autoCorrect={false}
                                autoCapitalize='none'
                                placeholder='Password...'
                                placeholderTextColor="#003f5c"
                                onChangeText={props.handleChange('password')}
                                value={props.values.password}
                            />
                            <TextInput
                                style={styles.inputView}
                                autoCorrect={false}
                                autoCapitalize='none'
                                placeholder='Email...'
                                placeholderTextColor="#003f5c"
                                onChangeText={props.handleChange('email')}
                                value={props.values.email}
                            />
                            {/* conditional error message */}
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

        </TouchableWithoutFeedback>
    )
}


// Styles defined
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