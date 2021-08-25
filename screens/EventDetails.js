import React, {useState} from "react";
import {
    StyleSheet,
    View,
    Text,
    Pressable,
    Button
} from 'react-native';
import '../global.js';

const EventDetails = ( { navigation } ) => {
    // This is how we will control if a user can edit/delete a post. 
    //Conditional render based on if they are the owner
    const [owner, setOwner] = useState(false);
    const [details, setDetails] = useState([]);
    const { eventID } = route.params;
    console.log("EVENTID", eventID);
    const apiName = 'EventAPI';
    const path = '/events/event'
    const editPost = () => {

    }
    const deletePost = () => {

    }
    const getEventDetails = async () => {
        getInit.queryStringParameters = {eventID: eventID};
        console.log("in getEventDetails function");
        API.get(apiName, path, getInit)
        .then(data => {
            console.log("DATA", data);
            console.log("data items", data.Items);
        })
        .catch(err => {
            console.log("Error on get event details", e);
        })
    }

   

    return owner ? (
        <View style={styles.container}>
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
            <Text> Not Owner </Text>
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