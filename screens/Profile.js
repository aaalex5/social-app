import React, {useEffect, useState} from "react";
import {
    StyleSheet,
    View,
    Text,
    Pressable,
} from 'react-native';
import { use } from "../amplify/backend/function/EventFunction/src/app.js";
import '../global.js';

const Profile = ( { navigation } ) => {
    const [profileInfo, setProfileInfo ] = useState([]);
    const apiName = 'EventAPI';
    const myInit = {
        headers: {},
        queryStringParameters: {}
    }
    const getProfile = async () => {
        myInit.queryStringParameters = {userID: global.userID};
        API.get(apiName, '/profile', myInit)
        .then(data => {
            console.log("DATA", data);
            setProfileInfo(data);
        })
        .catch(err => {
            console.log("Error on get event details", err);
        })
    }
    useEffect(() => {
        getProfile();
    }, []);
    return (
        <View style={styles.container}>
            <Text> {profileInfo.username} </Text>
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
})

export default Profile;