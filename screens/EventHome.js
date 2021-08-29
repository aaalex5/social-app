import React, {useEffect, useState} from "react";
import { StatusBar } from 'expo-status-bar';
import { MaterialIcons } from '@expo/vector-icons';
import {
    Pressable,
    StyleSheet,
    Text,
    RefreshControl,
    TouchableOpacity,
    View,
    FlatList,
    Modal,
    ActivityIndicator
} from 'react-native';
import Amplify, { API } from "aws-amplify";
import EventForm from './EventForm.js';
import Card from './Card.js';
import RSVPButton from '../components/RSVPButton.js'
import { concat, withRepeat } from "react-native-reanimated";
import '../global.js';
import { Auth } from 'aws-amplify';


const EventHome = ({ navigation }) => {
    // Modal for Event Submit is default to false
    const [modalOpen, setModalOpen] = useState(false);
    const [loading, setLoading] = useState(true);
    const [events, setEvents] = useState([]);
    const [refreshCount, setRefreshCount] = useState(0);
    const apiName = 'EventRESTAPI';
    const path = '/events';
    const wait = (timeout) => {
        return new Promise(resolve => setTimeout(resolve, timeout));
    }
    // params for DB
    const getInit = {
        headers: {},
        queryStringParameters: {}
    }
    // takes currentuserID from amplify/cognito
    async function userGrab() {
        Auth.currentUserInfo()
        .then(data => {
            global.userID = data.attributes.sub;
            console.log("GLOBAL ID", global.userID);
        })
        .catch(err => {
            console.log("Error on Amplify User", err);
        })
    }

    const getEvent = async () => {
        getInit.queryStringParameters = {number: 10};
        API.get(apiName, path, getInit)
        .then(data => {
            console.log("DATA", data);
            console.log("data items", data.Items);
            setEvents(data.Items);
            setLoading(false);
        })
        .catch(err => {
            console.log("Error on get", err);
        })
    }
    
    /*
    useEffect is dependent on refreshcount so the pull down to refresh triggers
    the api to pull events from the DB
    */
    useEffect(() => {
        getEvent();
        userGrab();
    }, [refreshCount]);
    const setRSVP = (ownerID, eventID) => {
        if (global.userID == ownerID) {
            return (
                <Text>Your Event</Text>
            );
        }
        return (
            <RSVPButton eventID={eventID} userID={global.userID}/>
        );
    }

    
    // For Slide to refresh
    const [refreshing, setRefreshing] = React.useState(false);

    const onRefresh = React.useCallback(() => {
        setRefreshCount(refreshCount => refreshCount + 1);
        setRefreshing(true);
        wait(2000).then(() => setRefreshing(false));
    }, [refreshCount]);


    // If loading = true, show loading indicator. Otherwise show home page
    return loading ? (
        <View style={styles.loading}>
            <ActivityIndicator size="large" />
        </View>

    ) : (

        <View style ={styles.container}>

            <FlatList 
                refreshControl={
                    <RefreshControl
                        refreshing={refreshing}
                        onRefresh={onRefresh}
                        title="Pull to refresh"
                        tintColor="#fff"
                        titleColor="#fff"
                    />
                }

                data={events}
                renderItem={({ item }) => (
                    <TouchableOpacity onPress={() => navigation.navigate('EventDetails', {eventID: item.id, time: item.time})}>
                        <Card>
                            <Text>Title: {item.title}</Text>
                            <Text>Location: {item.location}</Text>
                            <Text>Date: {item.date}</Text>
                            <Text>Time: {item.time}</Text>
                            {setRSVP(item.ownerID, item.id)}
                        </Card>
                    </TouchableOpacity>
                )}
            />
            <View>
            </View>
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

    modalContent: {
        flex: 1,
        backgroundColor: '#003f5c',
        alignItems: 'center',
        justifyContent: 'center',
    },

    modalToggle: {
        marginTop: 15,
        marginBottom: 40,
        borderWidth: 1,
        color: "white",
        backgroundColor: '#003f5c',
        borderColor: '#f2f2f2',
        padding: 10,
        borderRadius: 10,
        alignSelf: 'center',
    },

    modalClose: {
        marginLeft: 300,
        marginTop: 50,
        marginBottom: 0,
    },

    loading: {
        flex: 1, 
        justifyContent: 'center',
        backgroundColor: '#003f5c'
    },

})

export default EventHome;