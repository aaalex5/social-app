import React from "react";
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
import { API } from 'aws-amplify';
import '../global.js'

const RSVPButton = (props) => {
    const addRSVP = async () => {
        console.log("PROPS", props.eventID, props.userID);
        const apiName = 'EventRESTAPI';
        const path = '/events/RSVP';
        const putInit = {
            body: {}
        }
        putInit.body = { 
            userID: props.userID,
            eventID: props.eventID
        }
        API.put(apiName, path, putInit)
        .then(response => {
            //gotta figure out what to do here lol
            console.log("SUCCESS",response);
        })
        .catch(error => {
            console.log("ERROR", error.response);
        })

    }

    return(
        <View>
            <Pressable onPress={addRSVP}>
                <Text>RSVP</Text>
            </Pressable>
        </View>

    );

};

export default RSVPButton;