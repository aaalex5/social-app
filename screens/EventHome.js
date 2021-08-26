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
import uuid from 'react-native-uuid';
import Amplify, { API } from "aws-amplify";
import EventForm from './EventForm.js';
import Card from './Card.js';
import { concat, withRepeat } from "react-native-reanimated";
import e from "cors";
import '../global.js';
import { Auth } from 'aws-amplify';


const EventHome = ({ navigation }) => {
    // Modal for Event Submit is default to false
    const [modalOpen, setModalOpen] = useState(false);
    const [loading, setLoading] = useState(true);
    const [events, setEvents] = useState([]);
    const [refreshCount, setRefreshCount] = useState(0);
    const apiName = 'EventAPI';
    const path = '/events';
    const wait = (timeout) => {
        return new Promise(resolve => setTimeout(resolve, timeout));
    }
    // params for DB
    const getInit = {
        headers: {},
        queryStringParameters: {}
    }
    const putInit = {
        body: {}
    }
    // takes currentuserID from amplify/cognito
    async function userGrab() {
        Auth.currentUserInfo()
        .then(data => {
            global.userID = data.attributes.sub;
            console.log("GLOBAL ID", global.userID);
        })
        .catch(err => {
            console.log("Error on Amplify User", e);
        })
    }
    userGrab();
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

    const getEvent = async () => {
        getInit.queryStringParameters = {number: 10};
        console.log("in getEvent function");
        API.get(apiName, path, getInit)
        .then(data => {
            console.log("DATA", data);
            console.log("data items", data.Items);
            setEvents(data.Items);
            setLoading(false);
        })
        .catch(err => {
            console.log("Error on get", e);
        })
    }
    
    /*
    useEffect is dependent on refreshcount so the pull down to refresh triggers
    the api to pull events from the DB
    */
    useEffect(() => {
        console.log("in use effect");
        getEvent();
    }, [refreshCount]);    

    const addEvent = (event) => {
        const eventID = uuid.v1();
        putInit.body = { 
            id: eventID, 
            time: event.time, 
            date: event.date, 
            location: event.location, 
            title: event.title, 
            description: event.description,
            ownerID: global.userID,
        }
        API.put(apiName, path, putInit)
        .then(response => {
            //gotta figure out what to do here lol
            console.log(response)
        })
        .catch(error => {
            console.log(error.response);
        })
        console.log(event.date);

        setModalOpen(false);
    }
    // For Slide to refresh
    const [refreshing, setRefreshing] = React.useState(false);

    const onRefresh = React.useCallback(() => {
        console.log("IN REFRESH FUNC");
        console.log("PRE COUNT", refreshCount);
        setRefreshCount(refreshCount => refreshCount + 1);
        console.log("POST COUNT", refreshCount);
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
                        </Card>
                    </TouchableOpacity>
                )}
            />

            <Modal visible={modalOpen} animationType='slide'>
                <View style ={styles.modalContent}>
                    <MaterialIcons 
                    name='close'
                    size={24}
                    style={{ ...styles.modalToggle, ...styles.modalClose }}
                    onPress={() => setModalOpen(false)}
                    />
                <EventForm addEvent={addEvent}/>
                </View>
            </Modal>
            {/* TEMP */}
            <View>
                <Pressable
                    onPress={() => navigation.navigate('Profile')}
                >
                    <Text>PROFLE</Text>
                </Pressable>
            </View>
    

            <MaterialIcons 
                name='add'
                size={24}
                style={styles.modalToggle}
                onPress={() => setModalOpen(true)}
            />
            <View>
                <Pressable
                    onPress={() => signOutFunction()}
                >
                    <Text>Sign Out</Text>
                </Pressable>

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
    }

})

export default EventHome;