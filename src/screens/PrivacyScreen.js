import React from 'react';
import { View, Text, StyleSheet, Button, TouchableOpacity, Linking  } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import LocalizationContext from '../context/LocalizationContext';
import InfoText from '../components/InfoText';



const PrivacyScreen = ({navigation}) => {

    const { t, locale, setLocale } = React.useContext(LocalizationContext);

    const SocMedia = (url) => {
        return Linking.openURL(url);
    }

    return (
        <View>
            <InfoText text={t('privacy_text')} />
            <TouchableOpacity style={styles.btn} onPress={() => SocMedia('https://uznews.uz/ru/policy')}>
                <Text style={styles.btnText}>{t('more')}</Text>
            </TouchableOpacity>
        </View>
    )
};

const styles = StyleSheet.create({
    btn: {
        flexDirection: 'row',
        backgroundColor: '#4e6293',
        padding: 12,
        margin: 15,
        borderRadius: 50,
        alignItems: 'center',
        justifyContent: 'center'
    },
    btnText: {
        fontWeight: 'bold',
        color: '#fff'
    }
});

export default PrivacyScreen;