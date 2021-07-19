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
        <View style ={styles.container}>
            <Text style={styles.logo}>Gettogether</Text>

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

            <Pressable
                style = {styles.SubmitBtn}
                onPress={handleSubmit}
                disabled={validLogin}
            >
                <Text>Submit</Text>
                
            </Pressable>
            
            <Pressable
                onPress={handlePress}
            >
                <Text style={{color: 'white'}}>Don't have an account? Sign up here</Text>
            </Pressable>
        </View>
    );
};

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
       
})



export default LoginScreen;