import React from 'react';
import { Text, View, StyleSheet } from 'react-native';


const HeaderText = ({text}) => {
    return (
        <View>
            <Text style={styles.text}>{text}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    text: {
        marginHorizontal: 15,
        fontSize: 20,
        fontWeight: 'bold',
        color: '#20235a'
    }
});

export default HeaderText;