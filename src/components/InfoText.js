import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';



const InfoText = ({text}) => {

    return (
        <View style={styles.container}>
            <Text style={styles.text}>{text}</Text>
        </View>
    )
};

const styles = StyleSheet.create({
    container: {
        margin: 15
    },
    text: {
        fontSize: 15,
        textAlign: 'justify',
        lineHeight: 20
    }
});

export default InfoText;