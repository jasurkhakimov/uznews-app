import React, { Component } from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import { FlatList, TouchableOpacity } from 'react-native-gesture-handler';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import * as Google from "expo-google-app-auth";
import * as Facebook from 'expo-facebook';
import AsyncStorage from '@react-native-community/async-storage';
import { Icon } from 'react-native-eva-icons';
import { Avatar } from 'react-native-paper';
import uznews from '../api/uznews';
import LocalizationContext from '../context/LocalizationContext';
import { t } from 'i18n-js';


// console.disableYellowBox = true;

// const { t, locale, setLocale } = React.useContext(LocalizationContext);
const transText = (text) => {
    const { t, locale, setLocale } = React.useContext(LocalizationContext);

    return t(text);
}

const TextComponent = ({ navigation }) => {

    return (
        <Text style={styles.text}>
            {transText('auth_text')}
        </Text>
    );

};

export default class ProfileScreen extends Component {

    constructor(props) {
        super(props);
        this.state = {
            data: {
                loggedIn: false,
            },
        };
        this._isMounted = false;

    }

    getData = async () => {
        try {
            const jsonValue = await AsyncStorage.getItem('@login_info');
            let json_data = (jsonValue) ? JSON.parse(jsonValue) : null;
            // console.log(json_data);
            if (this._isMounted && json_data) {
                this.setState({ data: json_data })
            }
        } catch (e) {
            console.log(e);
        }
    }

    componentDidMount() {
        this._isMounted = true;
        this.getData()
    }
    componentDidUpdate() {
        // this.getData()
    }

    componentWillUnmount() {
        this._isMounted = false;
    }


    getAuth = async (userData) => {

        // let data = {
        //     username: userData.name,
        //     social_network: userData.social_network,
        //     image: userData.img_url,
        //     notifications: null,
        //     language: "1",
        //     email: null,
        //     player_id: null
        // };

        let data = {
            "username": userData.name,
            "social_network": userData.social_network,
            "notifications": null,
            "language": 1,
            "player_id": null,
            "image": userData.img_url,
            "email": "null"
        }

        console.log(data);

        let url = "/auth/" + userData.id + "/"

        await uznews.post(url, data).then(async (response) => {
            // console.log(response.data.id);
            try {
                await AsyncStorage.setItem('@user_id', response.data.id + "")
            } catch (e) {
                // saving error
            }

        }).catch(
            error => console.log('error', error)
        );

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
                    .then((data) => {

                        let userData = { "id": data.id, "name": data.name, "img_url": data.picture.data.url, "social_network": "facebook", "loggedIn": true };
                        this.setState({ data: userData })
                        this.getAuth(userData);

                        // console.log(this.state.data);

                        (async () => {
                            try {
                                const jsonValue = JSON.stringify(userData)
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
                let userData = { "id": result.user.id, "name": result.user.givenName + " " + ((result.user.familyName) ? result.user.familyName : ""), "img_url": result.user.photoUrl, "social_network": "Google", "loggedIn": true };
                this.setState({ data: userData })
                this.getAuth();
                // console.log(this.state.data);
                // console.log(userData);
                // console.log("LoginScreen.js.js 21 | ", result.user);
                (async () => {
                    try {
                        const jsonValue = JSON.stringify(userData)
                        await AsyncStorage.setItem('@login_info', jsonValue)
                    } catch (e) {
                        // saving error
                    }
                })();
                return result.accessToken;
            } else {
                return { cancelled: true };
            }
        } catch (e) {
            console.log('LoginScreen.js.js 30 | Error with login', e);
            return { error: true };
        }
    };

    logout = async () => {
        try {
            this.setState({ data: { loggedIn: false } })
            const jsonValue = JSON.stringify({ "data": { "loggedIn": false } })
            await AsyncStorage.setItem('@login_info', jsonValue)

            try {
                await AsyncStorage.setItem('@user_id',  "")
            } catch (e) {
                // saving error
            }
            // await AsyncStorage.removeItem('@login_info');
        } catch (e) {
            // saving error
        }
    }

    render() {

        if (this.state.data.loggedIn) {
            return (
                <View style={[styles.container, styles.profile]}>
                    <View style={styles.profileBlock}>
                        <Avatar.Image size={90} source={{ uri: this.state.data.img_url }} style={styles.img} />
                        <View style={styles.profileText}>
                            <View style={styles.textBlock}>
                                <Text style={styles.label}>
                                    {t('your_name')}:
                                </Text>
                                <Text style={styles.labelText}>
                                    {this.state.data.name}
                                </Text>
                            </View>
                            <View style={styles.textBlock}>
                                <Text style={styles.label}>
                                    {t('soc_net')}:
                                </Text>
                                <Text style={[styles.labelText, styles.socNet]}>
                                    {this.state.data.social_network}
                                </Text>
                            </View>

                        </View>
                    </View>

                    <TouchableOpacity onPress={this.logout} style={[styles.authBtn]}>
                        <Icon name="log-out" width={20} height={20} fill='#fff' />
                        <Text style={styles.authText}>{t('quit')} </Text>
                    </TouchableOpacity>
                </View>
            );
        }
        return (
            <View style={styles.container} >
                <TextComponent />

                <TouchableOpacity onPress={this.facebookLogIn} style={[styles.authBtn, styles.facebook]}>
                    <Icon name="facebook" width={20} height={20} fill='#fff' />
                    <Text style={styles.authText}>{t('enter_via_fb')} </Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={this.signInWithGoogle} style={[styles.authBtn, styles.google]}>
                    <Icon name="google" width={20} height={20} fill='#fff' />
                    <Text style={styles.authText}>{t('enter_via_gl')} </Text>
                </TouchableOpacity>

            </View>
        )
    }
};

const styles = StyleSheet.create({
    container: {
        marginHorizontal: 15
    },
    profile: {
        height: '100%',
        justifyContent: 'space-between',
        paddingBottom: 10
    },
    text: {
        marginVertical: 15,
        fontSize: 16
    },
    authBtn: {
        alignItems: 'center',
        marginBottom: 8,
        padding: 12,
        borderRadius: 50,
        backgroundColor: 'red',
        justifyContent: 'center',
        flexDirection: 'row',
        backgroundColor: '#475681'
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
    },
    profileBlock: {
        flexDirection: 'row',
        marginVertical: 15,
        backgroundColor: '#fff',
        padding: 15,
        borderRadius: 15
    },
    img: {
        backgroundColor: '#475681'
    },
    profileText: {
        marginLeft: 15
    },
    label: {
        fontSize: 12,
        color: '#111'
    },
    labelText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#475681'
    },
    socNet: {
        fontSize: 14
    }
});

// export default ProfileScreen;