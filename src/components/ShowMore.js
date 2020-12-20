import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';


const ShowMore = ({ text, onLoadMore }) => (
    <View style={styles.container}>
        <TouchableOpacity activeOpacity={0.7} onPress={onLoadMore}>
            <Text style={styles.btn}>{text}</Text>
        </TouchableOpacity>
    </View>
);

const styles = StyleSheet.create({
    container: {
        margin: 15,
        borderRadius: 50,
        overflow: 'hidden'
    },
    btn: {
        textAlign: 'center',
        backgroundColor: '#475681',
        color: '#fff',
        paddingVertical: 12,
        fontSize: 16,
        fontWeight: 'bold',
    }

});


export default ShowMore;
