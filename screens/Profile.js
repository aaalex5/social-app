import React, { useEffect, useState } from "react";
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
import { API, Auth } from 'aws-amplify';
import '../global.js'

const Profile = ( { navigation }) => {
    const [ profileInfo, setProfileInfo ] = useState([]);
    const apiName = 'EventRESTAPI';
    const myInit = {
        headers: {},
        queryStringParameters: {}
    }
    async function signOutFunction() {
        try {
            console.log("SIGNING OUT");
            await Auth.signOut();
            navigation.navigate('LoginScreen');
            
            global.userID = "";
        } catch (error) {
            console.log('error signing out: ', error);
        }
    }
    const getProfile = async () => {
        myInit.queryStringParameters = { userID: global.userID }
        API.get(apiName, '/events/profile', myInit)
        .then(data => {
            console.log("DATA", data);
            setProfileInfo(data);
        })
        .catch(err => {
            console.log("error on get profile", err);
        })
    }
    useEffect( () => {
        getProfile();
    }, [])


    return (
        <View style={styles.container}>
            <Text>PROFILE</Text>
            <Text>{profileInfo.username}</Text>
            <Pressable onPress={signOutFunction}>
                <Text>Sign Out</Text>

            </Pressable>
        </View>
    )
};
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#003f5c',
        alignItems: 'center',
        justifyContent: 'center',
        
    },
})
export default Profile;