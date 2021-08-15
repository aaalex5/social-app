import React, {useEffect, useState} from "react";
import { StatusBar } from 'expo-status-bar';
import { MaterialIcons } from '@expo/vector-icons';
import {
    Pressable,
    StyleSheet,
    Text,
    RefreshControl,
    TextInput,
    View,
    FlatList,
    Modal,
    ActivityIndicator
} from 'react-native';
import Amplify, { API, withSSRContext } from "aws-amplify";
import EventForm from './EventForm.js';
import Card from './Card.js';
import { concat, withRepeat } from "react-native-reanimated";
import e from "cors";




const EventHome = ({ navigation }) => {
    // Modal for Event Submit is default to false
    const [modalOpen, setModalOpen] = useState(false);
    const [loading, setLoading] = useState(true);
    const [events, setEvents] = useState([]);
    const apiName = 'EventAPI';
    const path = '/events';
    const wait = (timeout) => {
        return new Promise(resolve => setTimeout(resolve, timeout));
    }
    const myInit = {
        headers: {},
        queryStringParameters: {}
}

    useEffect(() => {
        getEvent()
    }, [])

    const getEvent = async () => {
        //try {
            myInit.queryStringParameters = {number: 10};
            console.log("in cdm function");
            API.get(apiName, path, myInit)
            .then(data => {
                console.log("DATA", data);
                setEvents(data.events);
                console.log("EVENTS", events);
                setLoading(false);
            })
            .catch(err => {
                console.log("Error on get", e);
            })
            // const data = await API.get(apiName, path);
            // console.log(data);
            // setEvents(data.events);
            // console.log("EVENTS", events);

        //}
        // catch (e) {
        //     console.log("Error on get", e)
        // }
    }
    
    // When the user submits an event, send event to database
    const addEvent = (event) => {
        console.log(event.date);
        setModalOpen(false);
    }

    // For Slide to refresh
    const [refreshing, setRefreshing] = React.useState(false);

    const onRefresh = React.useCallback(() => {
        setRefreshing(true);
        wait(2000).then(() => setRefreshing(false));
    }, []);


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
                    <Card>
                        <Text>Title: {item.title}</Text>
                        <Text>Location: {item.location}</Text>
                        <Text>Date: {item.date}</Text>
                        <Text>Time: {item.time}</Text>
                    </Card>
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
    

            <MaterialIcons 
                name='add'
                size={24}
                style={styles.modalToggle}
                onPress={() => setModalOpen(true)}
            />

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