import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Button, Share, Platform, Modal } from 'react-native';
import { FlatList, TouchableOpacity } from 'react-native-gesture-handler';
import { Icon } from 'react-native-eva-icons';
import HeaderText from '../components/HeaderText';
import { Picker } from '@react-native-community/picker';
import { Switch } from 'react-native-paper';
import AsyncStorage from '@react-native-community/async-storage';
import LocalizationContext from '../context/LocalizationContext';
import * as Notifications from 'expo-notifications';
import Constants from 'expo-constants';
import uznews from '../api/uznews';
import axios from 'axios';


const ProfileComponent = ({ navigation, t }) => {

    return (

        <TouchableOpacity style={styles.profile} onPress={() => navigation.navigate('Profile')}>
            <Icon name="person" width={18} height={18} fill='#fff' />
            <Text style={styles.profileText}> {t('profile')} </Text>
        </TouchableOpacity>
    );

};

const SettingsComponent = ({ navigation, font, locale, setLocale, storeData, t }) => {

    const [modalVisible, setModalVisible] = useState(false);
    const [isSwitchOn, setIsSwitchOn] = useState(false);
    const [token, setToken] = useState('');

    useEffect(() => {
        registerForPushNotificationsAsync().then(token => {
            setToken(token);
            if (token) {
                // setIsSwitchOn(true)
                uznews.get('/NotificationStatus', {
                    params: {
                        "token": token
                    }
                }).then(response => {
                    let result = response.data
                    setIsSwitchOn(result.status)
                }).catch(err => console.log(response))
            }
        });



        // if (token) {
        //     setIsSwitchOn(true);
        // } else {
        //     setIsSwitchOn(false);
        // }
    }, []);

    const onToggleSwitch = async () => {
        if (!isSwitchOn) {
            uznews.put(`/NotificationStatus?token=${token}`, {
                status: true
            }).then(response => {
                if (response.status == 200) {
                    alert(t('notification_is_on'))
                    setIsSwitchOn(!isSwitchOn);
                }
            }).catch(err => {
                alert('Произошла ошибка,попробуйте позже')
                console.log(err)
            })
        } else {
            uznews.put(`/NotificationStatus?token=${token}`, {
                status: false
            }).then(response => {
                if (response.status == 200) {
                    alert(t('notification_is_off'))
                    setIsSwitchOn(!isSwitchOn);
                }
            }).catch(err => {
                alert('Произошла ошибка,попробуйте позже')
                console.log(err)
            })
        }
    };

    const onShare = async () => {
        try {
            const result = await Share.share({
                message: 'http://uznews.uz',
            });
            if (result.action === Share.sharedAction) {
                if (result.activityType) {
                    // shared with activity type of result.activityType
                } else {
                    // shared
                }
            } else if (result.action === Share.dismissedAction) {
                // dismissed
            }
        } catch (error) {
            alert(error.message);
        }
    };


    return (
        <View>
            <HeaderText text={t('settings')} />
            <View style={styles.settingContainer}>

                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={modalVisible}
                >
                    <View style={styles.containerModal}>
                        <View style={styles.langBlock}>
                            <Text style={styles.langBlockText}>Выберите язык</Text>
                            <TouchableOpacity style={styles.langBlockBtn} onPress={() => { setLocale('ru'); setModalVisible(false) }}>
                                <Text style={styles.langBlockBtnText}> Рус </Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.langBlockBtn} onPress={() => { setLocale('uz'); setModalVisible(false) }}>
                                <Text style={styles.langBlockBtnText}> Узб </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </Modal>


                <View style={styles.settingElement}>
                    <Text style={styles.settingText}>{t('lang')} </Text>
                    {
                        Platform.OS === 'ios' ?
                            <TouchableOpacity onPress={() => {
                                setModalVisible(true);
                            }}>
                                <Text>
                                    {
                                        locale.substring(0, 2) == 'ru' ? 'Русский' : locale.substring(0, 2) == 'uz' ? 'Узбекча' : null
                                    }
                                </Text>
                            </TouchableOpacity>
                            :
                            <Picker
                                selectedValue={locale}
                                style={styles.picker}
                                onValueChange={(val) =>
                                    setLocale(val)
                                }
                            >
                                <Picker.Item label="русский" value="ru" />
                                <Picker.Item label="узбекча" value="uz" />
                            </Picker>}
                </View>
                <View style={styles.settingElement}>
                    <Text style={styles.settingText}>{t('notifications')} </Text>
                    <Switch style={styles.switch} value={isSwitchOn} onValueChange={onToggleSwitch} />
                </View>
            </View>
            <View style={styles.settingAdvanced}>
                {/* <TouchableOpacity style={styles.advBtn}>
                    <Text style={styles.settingText}>{t('help')} </Text>
                </TouchableOpacity> */}
                <TouchableOpacity style={styles.advBtn} onPress={() => navigation.navigate('Contacts')}>
                    <Text style={styles.settingText}>{t('callback')} </Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={onShare} style={styles.advBtn}>
                    <Text style={styles.settingText}>{t('share')} </Text>
                </TouchableOpacity>
            </View>
        </View>

    );
}


async function registerForPushNotificationsAsync() {
    let token;

    if (Constants.isDevice) {
        const { status: existingStatus } = await Notifications.getPermissionsAsync();

        let finalStatus = existingStatus;
        if (existingStatus !== 'granted') {
            const { status } = await Notifications.requestPermissionsAsync();
            finalStatus = status;
        }
        if (finalStatus !== 'granted') {
            // alert('Failed to get push token for push notification!');
            return;
        }
        token = (await Notifications.getExpoPushTokenAsync()).data;
        // token = (await Notifications.getDevicePushTokenAsync()).data;
    } else {
        // alert('Must use physical device for Push Notifications');
    }

    return token;
}


const SettingsScreen = ({ navigation }) => {

    const [font, setFont] = useState('');
    const [lang, setLang] = useState('');

    const { t, locale, setLocale } = React.useContext(LocalizationContext);


    const getData = async () => {
        try {
            const getFont = await AsyncStorage.getItem('@font');
            setFont(getFont);
        } catch (e) {
            console.log(e);
        }
    }

    const storeData = async (value, key) => {
        try {

            await AsyncStorage.setItem(key, value);

            if (key == '@font') {
                setFont(value);
            }

        } catch (e) {
            console.log(e);
        }
    }

    useEffect(() => {

        getData();

    }, [])

    return (
        <View style={styles.container}>
            <ProfileComponent navigation={navigation} t={t} />
            <SettingsComponent navigation={navigation} font={font} locale={locale} storeData={storeData} setLocale={setLocale} t={t} />
        </View>
    )
};

const styles = StyleSheet.create({
    profile: {
        marginHorizontal: 15,
        flexDirection: 'row',
        backgroundColor: '#4e6293',
        padding: 12,
        marginVertical: 12,
        borderRadius: 50,
        alignItems: 'center',
        justifyContent: 'center'
    },
    profileText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold'
    },
    settingContainer: {
        marginHorizontal: 15,
        marginTop: 15
    },
    settingElement: {
        marginBottom: 5,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    settingText: {
        fontSize: 14,
        fontWeight: 'bold',
        color: '#333333'
    },
    picker: {
        width: 130,
        height: 30,
    },
    switch: {
        height: 30,
    },
    settingAdvanced: {
        marginTop: 20,
        marginHorizontal: 15,
        // paddingTop: 15
    },
    advBtn: {
        marginBottom: 10
    },
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        // marginTop: 22,
    },
    modalView: {
        margin: 20,
        backgroundColor: 'white',
        borderRadius: 12,
        justifyContent: 'center',
        // padding: 35,
        alignItems: 'center',
    },
    openButton: {
        backgroundColor: '#F194FF',
        borderRadius: 20,
        padding: 10,
        elevation: 2,
    },
    containerModal: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        // backgroundColor: '#eee'
    },
    langBlock: {
        backgroundColor: '#fff',
        padding: 28,
        borderRadius: 15
    },
    langBlockText: {
        fontSize: 24,
        fontWeight: "bold",
        color: '#4e6293',
        marginBottom: 16
    },
    langBlockBtn: {
        backgroundColor: '#E8F0FF',
        padding: 16,
        marginBottom: 8,
        alignItems: 'center'
    },
    langBlockBtnText: {
        fontWeight: 'bold',
        fontSize: 16,
        color: '#4e6293',
    }
});

export default SettingsScreen;