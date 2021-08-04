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
import Amplify, { API } from "aws-amplify";
import EventForm from './EventForm';
import { concat } from "react-native-reanimated";


const EventHome = ({ navigation }) => {
    // Modal for Event Submit is default to false
    const [modalOpen, setModalOpen] = useState(false);
    async function createEvent () {
        const data = {
          body: {
            id: '1',
            title: 'First Event',
            location: 'Big House',
            date: 'today',
            time: 'right now'
          }
        };
        try {
            const apiData = await API.post('socialAppAPI', '/items', data);
            console.log({ apiData });
            console.log("SUCCESS");
        }
        catch (e) {
            console.log(e);
            console.log("FAIL");
        }
        
      }
      async function fetchEvents() {
          try {
            const contactData = await API.get('socialAppAPI', '/items');
            console.log({ contactData });
            console.log("Success");
          }
          catch (e) {
              console.log(e);
              console.log("failed to get data");
          }
        
      }
      useEffect(() => {
          createEvent();
          //fetchEvents()
      })


    
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
        backgroundColor: 'white',
        borderColor: '#f2f2f2',
        padding: 10,
        borderRadius: 10,
        alignSelf: 'center',
    },

    modalClose: {
        marginTop: 50,
        marginBottom: 0,
    }
})

export default EventHome;