import React from 'react';
import { Text, View, TouchableOpacity, StyleSheet } from 'react-native';

const ShowMore = ({ text, onLoadMore }) => (
    <View style={styles.container}>
        <TouchableOpacity accessibilityRole='button' activeOpacity={0.7} onPress={onLoadMore}>
            <Text style={styles.btn}>{text}</Text>
        </TouchableOpacity>
    </View>
);

const styles = StyleSheet.create({
    container: {
        padding: 15,
    },
    btn: {
        borderRadius: 50,
        textAlign: 'center',
        backgroundColor: '#475681',
        color: '#fff',
        paddingVertical: 10,
        fontSize: 16,
        fontWeight: 'bold',
    }

});


export default ShowMore;
