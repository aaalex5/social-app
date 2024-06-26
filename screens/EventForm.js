import React from 'react';
import {
    Pressable,
    StyleSheet,
    Text,
    TextInput,
    View,
    KeyboardAvoidingView,
    ImageBackground,
} from 'react-native';
import { Formik } from 'formik';
import * as yup from 'yup';

const eventSchema = yup.object({
    title: yup.string()
        .required()
        .min(4),

})

export default function EventForm({ addEvent }) {


    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={styles.container}
        >

        <View style={styles.container}>

            <Text style={styles.logo}>New Post</Text>

            <Formik
                initialValues={{ title: '', location: '', date: '', time: '', description: ''}}
                validationSchema={eventSchema}
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
                    <Text style={styles.error}>{ props.errors.title }</Text>

                    <TextInput
                        style={styles.inputView}
                        autoCorrect={false}
                        autoCapitalize='none'
                        placeholder='Location'
                        placeholderTextColor="#003f5c"
                        onChangeText={props.handleChange('location')}
                        value={props.values.location}
                    />
                    <Text style={styles.error}>{ props.errors.location }</Text>

                    <TextInput
                        style={styles.inputView}
                        autoCorrect={false}
                        autoCapitalize='none'
                        placeholder='Date mm/dd/yyyy'
                        placeholderTextColor="#003f5c"
                        onChangeText={props.handleChange('date')}
                        value={props.values.date}
                    />
                    <Text style={styles.error}>{ props.errors.date }</Text>

                    <TextInput
                        style={styles.inputView}
                        autoCorrect={false}
                        autoCapitalize='none'
                        placeholder='Time'
                        placeholderTextColor="#003f5c"
                        onChangeText={props.handleChange('time')}
                        value={props.values.time}
                    />
                    <Text style={styles.error}>{ props.errors.time }</Text>

                    <TextInput
                        style={styles.inputView}
                        autoCorrect={false}
                        autoCapitalize='none'
                        placeholder='Description'
                        placeholderTextColor="#003f5c"
                        onChangeText={props.handleChange('description')}
                        value={props.values.description}
                    />
                    <Text style={styles.error}>{ props.errors.description }</Text>
                   
                    <Pressable
                        style={styles.PostBtn}
                        onPress={props.handleSubmit}
                    >
                        <Text>Post</Text>
                    </Pressable>
                </View>
                
                )}
            </Formik>
        </View>
        </KeyboardAvoidingView>
    )

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#003f5c',
        alignItems: 'center',
        justifyContent: 'center',
    },

    logo: {
        marginTop: 0,
        fontWeight: "bold",
        fontSize: 40,
        color: "white",
        marginBottom: 40,
    },

    inputView: {
        color: "white",
        width: 300,
        backgroundColor: "#465881",
        borderRadius: 25,
        height: 50,
        marginBottom: 5,
        justifyContent: "center",
        padding: 15
    },

    inputText: {
        height: 50,
        color: "white"
    },

    PostBtn: {
        backgroundColor: "#ddd",
        borderRadius: 25,
        height: 50,
        alignItems: "center",
        justifyContent: "center",
        marginTop: 30,
        marginBottom: 10
    },

    error: {
        width: 300,
        fontWeight: "bold",
        textAlign: 'center',
        color: '#fb5b5a',
        marginBottom: 20
    },
})