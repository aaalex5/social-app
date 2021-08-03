import React from 'react';
import {
    Pressable,
    StyleSheet,
    Text,
    TextInput,
    View,
    ImageBackground,
} from 'react-native';
import { Formik } from 'formik';

export default function EventForm({ addEvent }) {

    return (
        <View style={styles.container}>
            <Formik
                initialValues={{ title: '', location: '', date: '', time: '', description: ''}}
                onSubmit={(values, actions) => {
                    // Sent the event information back out to the home page
                    console.log(values);
                    addEvent(values);
                    //Reset the form after submitting
                    actions.resetForm();
                }}
            >
                {(props) => (
                    <View>
                    <TextInput
                        style={styles.inputView}
                        autoCorrect={false}
                        autoCapitalize='none'
                        placeholder='Event Title'
                        placeholderTextColor="#003f5c"
                        onChangeText={props.handleChange('title')}
                        value={props.values.title}
                    />
                    <TextInput
                        style={styles.inputView}
                        autoCorrect={false}
                        autoCapitalize='none'
                        placeholder='Location'
                        placeholderTextColor="#003f5c"
                        onChangeText={props.handleChange('location')}
                        value={props.values.location}
                    />
                    <TextInput
                        style={styles.inputView}
                        autoCorrect={false}
                        autoCapitalize='none'
                        placeholder='Date mm/dd/yyyy'
                        placeholderTextColor="#003f5c"
                        onChangeText={props.handleChange('date')}
                        value={props.values.date}
                    />
                    <TextInput
                        style={styles.inputView}
                        autoCorrect={false}
                        autoCapitalize='none'
                        placeholder='Time'
                        placeholderTextColor="#003f5c"
                        onChangeText={props.handleChange('time')}
                        value={props.values.time}
                    />
                    <TextInput
                        style={styles.inputView}
                        autoCorrect={false}
                        autoCapitalize='none'
                        placeholder='Description'
                        placeholderTextColor="#003f5c"
                        onChangeText={props.handleChange('description')}
                        value={props.values.description}
                    />
                   
                    <Pressable
                        style={styles.SubmitBtn}
                        onPress={props.handleSubmit}
                    >
                        <Text>Submit</Text>
                    </Pressable>

                </View>
                )}
            </Formik>
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

    inputView: {
        color: "white",
        width: 300,
        backgroundColor: "#465881",
        borderRadius: 25,
        height: 50,
        marginBottom: 15,
        justifyContent: "center",
        padding: 15
    },

    inputText: {
        height: 50,
        color: "white"
    },

    SubmitBtn: {
        backgroundColor: "#ddd",
        borderRadius: 25,
        height: 50,
        alignItems: "center",
        justifyContent: "center",
        marginTop: 30,
        marginBottom: 10
    },

})