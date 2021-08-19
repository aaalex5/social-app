import React from 'react';
import {
    StyleSheet,
    View,
    Text,
    Button
} from 'react-native';

const Profile = ( { navigation } ) => {
    return (
        <View style={styles.container}>
            <Text> Profile </Text>
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
})

export default Profile;