import React, {useEffect, useState} from "react";
import { StatusBar } from 'expo-status-bar';
import {
    Pressable,
    StyleSheet,
    Text,
    TextInput,
    View,
    ImageBackground,
} from 'react-native';
import Amplify, { API, graphqlOperation } from "aws-amplify";
import { listEvents } from '../src/graphql/queries'


const EventHome = () => {
    const [events, setEvents] = useState([]);
    //query on every re-render
    useEffect( () => {
        fetchEvents();
    //array makes it query on first render
    }, []);
    const fetchEvents = async () => {
        try {
            const eventData = await API.graphql(graphqlOperation(listEvents));
            const eventList = eventData.data.listEvents.items;
            console.log(eventList);
            setEvents(eventList);
        }
        catch (error) {
            console.log(error);

        }

    };
    return (
        <View>
            <Text>PAWG</Text>
        </View>
    );

};
export default EventHome;