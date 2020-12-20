import React from 'react';
import { View, Text, StyleSheet, Button, Linking  } from 'react-native';
import { FlatList, TouchableOpacity } from 'react-native-gesture-handler';
import LocalizationContext from '../context/LocalizationContext';



const AdvScreen = ({ navigation }) => {

    const { t, locale, setLocale } = React.useContext(LocalizationContext);

    const SocMedia = (url) => {
        return Linking.openURL(url);
    }

    return (
        <View style={styles.container}>
            <Text style={styles.text}>{t('about_adv')} «UzNews.uz»:</Text>
            <View style={styles.text}>
                <Text>{t('phone_of_adv_dep')}:</Text>
                <View style={styles.contact}>
                    <Text style={styles.bold}>(94) 649-57-77,</Text>
                    <TouchableOpacity onPress={() => SocMedia('https://t.me/uznews_ads')}>
                        <Text style={[styles.bold, styles.tg]}> Telegram </Text>
                    </TouchableOpacity> 
                </View>
            </View>
            <TouchableOpacity style={styles.btn} onPress={() => SocMedia('https://uznews.uz/ru/commercial')}>
                <Text style={styles.btnText}>{t('more')}</Text>
            </TouchableOpacity>
        </View>
    )
};

const styles = StyleSheet.create({
    container: {
        margin: 15
    },
    text: {
        marginBottom: 10,
         flexDirection: 'row'
    },
    contact: {
        flexDirection: 'row'
    },
    bold: {
        fontWeight: 'bold',
    },
    tg: {
        color: '#0088cc'
    },
    btn: {
        flexDirection: 'row',
        backgroundColor: '#475681',
        padding: 12,
        marginVertical: 12,
        borderRadius: 50,
        alignItems: 'center',
        justifyContent: 'center'
    },
    btnText: {
        fontWeight: 'bold',
        color: '#fff'
    }
});

export default AdvScreen;