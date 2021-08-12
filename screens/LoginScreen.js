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
import { Auth } from 'aws-amplify';


const LoginScreen = ( {navigation} ) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [badLogin, setBadLogin] = useState(0);

    const handleSignUp = () => {
        navigation.navigate('SignUp');
    }

    const handleSubmit = () => {
        signIn();
        console.log(username);
    };

    /* 
    The username and password submitted by the user are sent to and checked for errors by cognito. 
    If cognito returns an error, it is caught by our code and the badLogin variable is set to true while the errorMessage string is set
    to be the error message that cognito returns. 

    This function is run on every submit until the user provides a valid username/password combination. At that point,
    the user will be navigated to the Event/Home page.
    */
    async function signIn() {
        try {
            const user = await Auth.signIn(username, password);
            navigation.navigate('EventHome');
        } catch (error) {
            console.log('error signing in', error);
            setErrorMessage(error.message);
            setBadLogin(1);
        }
    }

    /* 
    This is the variable for the error message that is displayed on the form if a user submits an invalid login.
    When cognito sends an error message, this variable is updated and the login screen is rerendered to display it.
    */
    let message = <Text></Text>;
    if (badLogin) {
        message = <Text style={styles.error}>{errorMessage}</Text>
    }
    

    return (
        <View style ={styles.container}>

            <Text style={styles.logo}>
                <Text style={{color: '#fff'}}>
                    Get
                </Text>
                together
            </Text>

            <TextInput
                style={styles.inputView}
                autoCorrect={false}
                autoCapitalize='none'
                placeholder="Username..."
                placeholderTextColor = "#003f5c" 
                onChangeText={username=>setUsername(username)}
            />
            <TextInput
                style={styles.inputView}
                autoCorrect={false}
                autoCapitalize='none'
                placeholder="Password.." 
                placeholderTextColor = "#003f5c"
                onChangeText={password=>setPassword(password)}
            />
            {message}

            <Pressable
                style = {styles.SubmitBtn}
                onPress={handleSubmit}
            >
                <Text>Submit</Text>
                
            </Pressable>
            
            <Pressable
                onPress={handleSignUp}
            >
                <Text style={{color: 'white'}}>Don't have an account? Sign up here</Text>
            </Pressable>
        </View>
    );
};


// Style definitions
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#003f5c',
        alignItems: 'center',
        justifyContent: 'center',
        
    },

    SubmitBtn:{
        width: 300,
        backgroundColor:"#ddd",
        borderRadius:25,
        height:50,
        alignItems:"center",
        justifyContent:"center",
        marginTop:30,
        marginBottom:10
      },

    logo: {
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
        marginBottom:30,
        justifyContent:"center",
        padding:15
    },

    error: {
        width: 300,
        fontWeight: "bold",
        textAlign: 'center',
        color: '#fb5b5a',
        marginBottom: 20
    },
       
})



export default LoginScreen;