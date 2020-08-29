import React, { Component } from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import { FlatList, TouchableOpacity } from 'react-native-gesture-handler';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import * as Google from "expo-google-app-auth";
import * as Facebook from 'expo-facebook';
import AsyncStorage from '@react-native-community/async-storage';

console.disableYellowBox = true;



const TextComponent = ({ navigation }) => {

    return (

        <Text style={styles.text}>
            большой текст
        </Text>
    );

};

export default class ProfileScreen extends Component {

    constructor(props) {
        super(props);
        this.state = {
            data: {},
            loggedIn: false,
        };
    }


    facebookLogIn = async () => {
        try {

            const init = await Facebook.initializeAsync("752420818926196", "Uznews");

            const {
                type,
                token,
                expires,
                permissions,
                declinedPermissions,
            } = await Facebook.logInWithReadPermissionsAsync('752420818926196', {
                permissions: ['public_profile'],
            });
            if (type === 'success') {
                // Get the user's name using Facebook's Graph API
                fetch(`https://graph.facebook.com/me?access_token=${token}&fields=id,name,email,picture.height(500)`)
                    .then(response => response.json())
                    .then(data => {
                        console.log(data);
                        this.setState({ data: data, loggedIn: true })
                    }).then(() => {
                        (async () => {
                            try {
                                const jsonValue = JSON.stringify({ "data": this.state.data, "loggedIn": this.state.loggedIn })
                                await AsyncStorage.setItem('@login_info', jsonValue)
                            } catch (e) {
                                // saving error
                            }
                        })();
                    })
                    .catch(e => console.log(e))
            } else {
                console.log('smth goes wrong');
            }
        } catch ({ message }) {
            alert(`Facebook Login Error: ${message}`);
        }
    }


    signInWithGoogle = async () => {

        const IOS_CLIENT_ID =
            "720560601108-iah91edkpqtmcq8kjrcf7n1qobv2mj1g.apps.googleusercontent.com";

        const ANDROID_CLIENT_ID =
            "720560601108-ivnmhrojdltthiecgvomeao2uvnhjopu.apps.googleusercontent.com";

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

        if (this.state.loggedIn) {
            return (
                <View>
                    <Text>
                        {this.state.data.name} 
                    </Text>
                </View>
            );
        }
        return (
            <View style={styles.container} >
                <TextComponent />

                <TouchableOpacity onPress={this.facebookLogIn} style={[styles.authBtn, styles.facebook]}>
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