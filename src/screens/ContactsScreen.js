import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import LocalizationContext from '../context/LocalizationContext';



const ContactsScreen = ({navigation}) => {
    const { t, locale, setLocale } = React.useContext(LocalizationContext);

    return (
        <View style={styles.container}>
            <Text style={styles.text}>{t('editorial_office_phone')}: <Text style={styles.bold}>(99) 888-67-65</Text>, (71) 235-66-69</Text>
            <Text style={styles.text}>{t('email_for_contacts')}: info@uznews.uz</Text>
            <Text style={styles.text}>{t('about_adv')} «UzNews.uz»: <Text style={styles.bold}>(94) 649-57-77</Text></Text>
        </View>
    )
};

const styles = StyleSheet.create({
    container: {
        margin: 15
    },
    text: {
        marginBottom: 10
    },
    bold: {
        fontWeight: 'bold'
    }
});

export default ContactsScreen;