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
import { set } from "react-native-reanimated";
import '../global.js'
import { get } from "react-native/Libraries/Utilities/PixelRatio";

const Profile = () => {
    const [ profileInfo, setProfileInfo ] = useState([]);
    const apiName = 'EventAPI';
    const myInit = {
        headers: {},
        queryStringParameters: {}
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
        <View>
            <Text>PROFILE</Text>
        </View>
    )
};
export default Profile;