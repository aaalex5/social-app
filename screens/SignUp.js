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
import * as yup from 'yup';

// Yup handles validation of user inputs
const SignUpSchema = yup.object({
    // Username is required to be a string, required to be entered, and must be
    // 4 characters 
    username: yup.string()
        .required()
        .min(4),

    password: yup.string()
        .required()
        .min(8)
        .test('Has non-alnum character', 'Has capital letter', (val) => {
            return true;
        })
})

export default function SignUp() {

    return(
        <View style ={styles.container}>
            
            <Text style={styles.logo}>Gettogether</Text>

            <Formik
                initialValues={{username: '', password: ''}}
                validationSchema={SignUpSchema}
                onSubmit ={(values, actions) => {
                    console.log(values);
                    //Reset the form after submitting
                    actions.resetForm();
                    //Add the query to database to check if username exists and display error message
                   
                }}
            >
                {(props) => (
                    <View>
                        <TextInput
                            style={styles.inputView}
                            autoCorrect={false}
                            autoCapitalize='none'
                            placeholder = 'Username...'
                            placeholderTextColor = "#003f5c"
                            onChangeText={props.handleChange('username')}
                            value={props.values.username}
                            //keyboardType='numbers-and-punctuation'
                        />
                        <Text style={styles.error}>{ props.errors.username }</Text>

                        <TextInput
                            style={styles.inputView}
                            autoCorrect={false}
                            autoCapitalize='none'
                            placeholder = 'Password...'
                            placeholderTextColor = "#003f5c"
                            onChangeText={props.handleChange('password')}
                            value={props.values.password}
                            //keyboardType='numbers-and-punctuation'
                        />
                        <Text style={styles.error}>{ props.errors.password }</Text>
                        
                        <Pressable
                            style = {styles.SignUpBtn}
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

    logo:{
        fontWeight:"bold",
        fontSize:50,
        color:"#fb5b5a",
        marginBottom:40
      },

    inputView:{
        color: "white",
        width: 300,
        backgroundColor:"#465881",
        borderRadius:25,
        height:50,
        marginBottom:5,
        justifyContent:"center",
        padding:15
    },
    
    error: {
        fontWeight:"bold",
        color: '#ddd',
        marginBottom:20
    },

    inputText:{
        height:50,
        color:"white"
    },

    SignUpBtn:{
        backgroundColor:"#ddd",
        borderRadius:25,
        height:50,
        alignItems:"center",
        justifyContent:"center",
        marginTop:30,
        marginBottom:10
      },

})