import React, { Component } from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import { FlatList, TouchableOpacity } from 'react-native-gesture-handler';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import * as Google from "expo-google-app-auth";

const IOS_CLIENT_ID =
    "720560601108-iah91edkpqtmcq8kjrcf7n1qobv2mj1g.apps.googleusercontent.com";
const ANDROID_CLIENT_ID =
    "720560601108-ivnmhrojdltthiecgvomeao2uvnhjopu.apps.googleusercontent.com";

const TextComponent = ({ navigation }) => {

    return (

        <Text style={styles.text}>
            большой текст
        </Text>
    );

};

export default class LoginScreen extends Component {
    signInWithGoogle = async () => {
        try {
            const result = await Google.logInAsync({
                iosClientId: IOS_CLIENT_ID,
                androidClientId: ANDROID_CLIENT_ID,
                scopes: ["profile", "email"]
            });

            if (result.type === "success") {
                console.log("LoginScreen.js.js 21 | ", result.user);
                // this.props.navigation.navigate("Profile", {
                //     username: result.user
                // }); //after Google login redirect to Profile
                return result.accessToken;
            } else {
                return { cancelled: true };
            }
        } catch (e) {
            console.log('LoginScreen.js.js 30 | Error with login', e);
            return { error: true };
        }
    };



    render() {
        return (
            <View style={styles.container} >
                <TextComponent />

                <TouchableOpacity style={[styles.authBtn, styles.facebook]}>
                    <MaterialCommunityIcons name='facebook' color='#fff' size={21} />
                    <Text style={styles.authText}>Войти через Facebook </Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={this.signInWithGoogle} style={[styles.authBtn, styles.google]}>
                    <MaterialCommunityIcons name='google' color='#fff' size={21} />
                    <Text style={styles.authText}>Войти через Google </Text>
                </TouchableOpacity>
            </View>
        )
    }
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

// export default ProfileScreen;