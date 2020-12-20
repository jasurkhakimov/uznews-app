import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Button, Share } from 'react-native';
import { FlatList, TouchableOpacity } from 'react-native-gesture-handler';
import { Icon } from 'react-native-eva-icons';
import HeaderText from '../components/HeaderText';
import { Picker } from '@react-native-community/picker';
import { Switch } from 'react-native-paper';
import AsyncStorage from '@react-native-community/async-storage';
import LocalizationContext from '../context/LocalizationContext';


const ProfileComponent = ({ navigation, t }) => {

    return (

        <TouchableOpacity style={styles.profile} onPress={() => navigation.navigate('Profile')}>
            <Icon name="person" width={18} height={18} fill='#fff' />
            <Text style={styles.profileText}> {t('profile')} </Text>
        </TouchableOpacity>
    );

};

const SettingsComponent = ({ font, locale, setLocale, storeData, t }) => {

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
                <View style={styles.settingElement}>
                    <Text style={styles.settingText}>{t('font_size')}</Text>
                    <Picker
                        selectedValue={font}
                        style={styles.picker}
                        mode="dropdown"
                        onValueChange={(val) => {
                            storeData(val, "@font")
                        }
                        }
                    >
                        <Picker.Item label={t('small')} value="1" />
                        <Picker.Item label={t('medium')} value="2" />
                        <Picker.Item label={t('large')} value="3" />
                    </Picker>
                </View>
                <View style={styles.settingElement}>
                    <Text style={styles.settingText}>{t('lang')} </Text>
                    <Picker
                        selectedValue={locale}
                        style={styles.picker}
                        onValueChange={(val) =>
                            setLocale(val)
                        }
                    >
                        <Picker.Item label="русский" value="ru" />
                        <Picker.Item label="узбекский" value="uz" />
                    </Picker>
                </View>
                {/* <View style={styles.settingElement}>
                    <Text style={styles.settingText}>Оповещания </Text>
                    <Switch style={styles.switch} value={isSwitchOn} onValueChange={onToggleSwitch} />
                </View> */}
            </View>
            <View style={styles.settingAdvanced}>
                <TouchableOpacity style={styles.advBtn}>
                    <Text style={styles.settingText}>{t('help')} </Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.advBtn}>
                    <Text style={styles.settingText}>{t('callback')} </Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={onShare} style={styles.advBtn}>
                    <Text style={styles.settingText}>{t('share')} </Text>
                </TouchableOpacity>
            </View>
        </View>

    );
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
            <ProfileComponent navigation={navigation} t={t}/>
            <SettingsComponent font={font} locale={locale} storeData={storeData} setLocale={setLocale} t={t} />
        </View>
    )
};

const styles = StyleSheet.create({
    profile: {
        marginHorizontal: 15,
        flexDirection: 'row',
        backgroundColor: '#475681',
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
        borderTopWidth: 1,
        borderColor: '#aaa',
        paddingTop: 15
    },
    advBtn: {
        marginBottom: 10
    }
});

export default SettingsScreen;