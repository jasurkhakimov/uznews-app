import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import { FlatList, TouchableOpacity } from 'react-native-gesture-handler';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import * as GoogleSignIn from 'expo-google-sign-in';

const TextComponent = ({ navigation }) => {

    return (

        <Text style={styles.text}>
            большой текст
        </Text>
    );

};

export default class AuthScreen extends React.Component {

    state = { user: null };

    componentDidMount() {
        this.initAsync();
    }

    initAsync = async () => {
        await GoogleSignIn.initAsync({
            // You may ommit the clientId when the firebase `googleServicesFile` is configured
            clientId: '720560601108-3uh2465ln2oo30sd3g18eei8e5ssasjd.apps.googleusercontent.com',
        });
        this._syncUserWithStateAsync();
    };

    _syncUserWithStateAsync = async () => {
        const user = await GoogleSignIn.signInSilentlyAsync();
        this.setState({ user });
        console.log(this.state.user);
    };

    signOutAsync = async () => {
        await GoogleSignIn.signOutAsync();
        this.setState({ user: null });
    };

    signInAsync = async () => {
        try {
            await GoogleSignIn.askForPlayServicesAsync();
            const { type, user } = await GoogleSignIn.signInAsync();
            if (type === 'success') {
                this._syncUserWithStateAsync();
            }
        } catch ({ message }) {
            alert('login: Error:' + message);
        }
    };

    onPress = () => {
        if (this.state.user) {
            this.signOutAsync();
        } else {
            this.signInAsync();
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
                <TouchableOpacity onPress={this.onPress} style={[styles.authBtn, styles.google]}>
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