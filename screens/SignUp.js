import React from "react";
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
async function signUpAWS(username, password) {
    try {
        const { user } = await Auth.signUp({
            username,
            password,
        });
        console.log(user);
        console.log(username, password);
    }
    catch (error) {
        console.log('error signing up:', error);
        console.log(error.message);
    }
}


export default function SignUp() {

    return (
        <View style={styles.container}>

            <Text style={styles.logo}>Gettogether</Text>

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
                        <Text style={styles.error}>{props.errors.username}</Text>

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
                        <Text style={styles.error}>{props.errors.password}</Text>

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
        marginBottom: 5,
        justifyContent: "center",
        padding: 15
    },

    error: {
        fontWeight: "bold",
        color: '#ddd',
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