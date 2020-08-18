import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import { FlatList, TouchableOpacity } from 'react-native-gesture-handler';
import { MaterialCommunityIcons } from '@expo/vector-icons';



const TextComponent = ({ navigation }) => {

    return (

        <Text style={styles.text}>
            большой текст
        </Text>
    );

};

const ProfileScreen = ({ navigation }) => {

    return (
        <View style={styles.container}>
            <TextComponent />
            
            <TouchableOpacity style={[styles.authBtn, styles.facebook]}>
                <MaterialCommunityIcons name='facebook' color='#fff' size={21} />
                <Text style={styles.authText}>Войти через Facebook </Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.authBtn, styles.google]}>
                <MaterialCommunityIcons name='google' color='#fff' size={21} />
                <Text style={styles.authText}>Войти через Google </Text>
            </TouchableOpacity>
        </View>
    )
};

const styles = StyleSheet.create({
    container: {
        marginHorizontal: 15
    },
    text: {
        marginVertical: 15,
        fontSize: 16
    },
    authBtn: {
        alignItems: 'center',
        marginBottom: 15,
        padding: 12,
        borderRadius: 50,
        backgroundColor: 'red',
        justifyContent: 'center',
        flexDirection: 'row'
    },
    google: {
        backgroundColor: '#c71610'
    },
    facebook: {
        backgroundColor: '#4267B2'
    },
    authText: {
        color: '#fff',
        fontWeight: 'bold',
        marginLeft: 10
    }
});

export default ProfileScreen;