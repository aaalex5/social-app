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
            <Text style={styles.nameTop}>{profileInfo.username}</Text>
            <Pressable onPress={signOutFunction} style={styles.SignoutBtn}>
                <Text style={{color: '#fff', fontWeight: "bold"}}>Sign Out</Text>

            </Pressable>
        </View>
    )
};
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#003f5c',

    },
    nameTop: {
        marginLeft: 20,
        fontWeight: "bold",
        fontSize: 40,
        color: "white",
        marginBottom: 40
    },
    SignoutBtn: {
        backgroundColor: "#fb5b5a",
        borderRadius: 25,
        width: 100,
        height: 50,
        alignItems: "center",
        justifyContent: "center",
        marginTop: 30,
        marginBottom: 10,
        marginLeft: 155
    },
})
export default Profile;