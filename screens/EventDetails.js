import React, {useEffect, useState} from "react";
import {
    StyleSheet,
    View,
    Text,
    Pressable,
} from 'react-native';
import Amplify, { API } from "aws-amplify";
import Card from './Card.js';
import '../global.js';

const EventDetails = ( { route, navigation } ) => {
    // This is how we will control if a user can edit/delete a post. 
    const [owner, setOwner] = useState(false);
    const [details, setDetails] = useState([]);
    const { eventID, time } = route.params;
    const apiName = 'EventRESTAPI';
    const myInit = {
        headers: {},
        queryStringParameters: {}
    }
    myInit.queryStringParameters = {eventID: eventID};

    const editPost = () => {

    }
    const deletePost = () => {
        API.del(apiName, '/events', myInit)
        .then(response => {
            console.log(response);
            console.log("successful deletion");
            navigation.navigate('EventHome');
        })
        .catch(error => {
            console.log(error.response);
        });
        
    }
    const getEventDetails = async () => {
        API.get(apiName, '/events/event', myInit)
        .then(data => {
            console.log("DATA", data);
            setDetails(data);

        })
        .catch(err => {
            console.log("Error on get event details", err);
        })
    }
    // pulls event from DB once on first render of screen
    useEffect(() => {
        getEventDetails();
    }, []); 
    //Conditional render based on if they are the owner
    return (details.ownerID == global.userID) ? (
        <View style={styles.container}>
            <Text>Title: {details.title}</Text>
            <Text>Location: {details.location}</Text>
            <Text>Date: {details.date}</Text>
            <Text>Time: {details.time}</Text>
            <Text> Owner </Text>
            
            <Pressable 
                style={styles.EditBtn}
                onPress={editPost}
            >
                <Text>Edit Post</Text>
            </Pressable>

            <Pressable 
                style={styles.EditBtn}
                onPress={deletePost}
            >
                <Text>Delete Post</Text>
            </Pressable>

        </View>

    ) : (
        <View style={styles.container}>
            <Text>Title: {details.title}</Text>
            <Text>Location: {details.location}</Text>
            <Text>Date: {details.date}</Text>
            <Text>Time: {details.time}</Text>
            <Text>NOT OWNER</Text>
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

    EditBtn:{
        width: 300,
        backgroundColor:"#ddd",
        borderRadius:25,
        height:50,
        alignItems:"center",
        justifyContent:"center",
        marginTop:30,
        marginBottom:10
      },
})


export default EventDetails;