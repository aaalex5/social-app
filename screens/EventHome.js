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
import Amplify, { API, graphqlOperation } from "aws-amplify";
import { listEvents } from '../src/graphql/queries'


const EventHome = () => {
    const [modalOpen, setModalOpen] = useState(false);

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

        <View style ={styles.container}>

        <Modal visible={modalOpen} animationType='slide'>
            <View style ={styles.modalContent}>
                <MaterialIcons 
                name='close'
                size={24}
                style={{ ...styles.modalToggle, ...styles.modalClose }}
                onPress={() => setModalOpen(false)}
        />
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

    },

    modalToggle: {
        marginBottom: 10,
        borderWidth: 1,
        borderColor: '#f2f2f2',
        padding: 10,
        borderRadius: 10,
        alignSelf: 'center',
    },

    modalClose: {
        marginTop: 10,
        marginBottom: 0,
    }
})

export default EventHome;