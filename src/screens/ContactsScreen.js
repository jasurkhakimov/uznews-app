import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';



const ContactsScreen = ({navigation}) => {

    return (
        <View style={styles.container}>
            <Text style={styles.text}>Телефон редакции: <Text style={styles.bold}>(99) 888-67-65</Text>, (71) 235-66-69</Text>
            <Text style={styles.text}>Почта для контактов: info@uznews.uz</Text>
            <Text style={styles.text}>По вопросам размещения рекламы на сайте «UzNews.uz»: <Text style={styles.bold}>(94) 649-57-77</Text></Text>
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