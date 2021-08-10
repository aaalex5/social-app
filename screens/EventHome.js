import React, {useEffect, useState} from "react";
import { StatusBar } from 'expo-status-bar';
import { MaterialIcons } from '@expo/vector-icons';
import {
    Pressable,
    StyleSheet,
    Text,
    TextInput,
    View,
    ImageBackground,
    Modal,
} from 'react-native';
import Amplify, { API, withSSRContext } from "aws-amplify";
import EventForm from './EventForm';
import { concat } from "react-native-reanimated";
import e from "cors";


const EventHome = ({ navigation }) => {
    // Modal for Event Submit is default to false
    const [modalOpen, setModalOpen] = useState(false);
    const [events, setEvents] = useState([]);
    const apiName = 'EventAPI';
    const path = '/events';


    useEffect(() => {
        getEvent()
    }, [])

    const getEvent = async () => {
        try {
            console.log("in cdm function");
            const data = await API.get(apiName, path);
            console.log(data);
            setEvents(data.events);
            console.log("EVENTS", events);

        }
        catch (e) {
            console.log("Error on get", e)
        }
    }
    
    // When the user submits an event, send event to database
    const addEvent = (event) => {
        console.log(event.date);
        setModalOpen(false);
    }

    return (

        <View style ={styles.container}>

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
        marginBottom: 10,
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
    }
})

export default EventHome;