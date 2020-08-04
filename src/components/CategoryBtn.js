import React from 'react';
import { Text, View, TouchableOpacity, StyleSheet } from 'react-native';

const CategoryBtn = ({
    title, id, active
}) => (
    <TouchableOpacity style={[styles.btn, {backgroundColor: active ? '#74d9ff' : '#475681'}]}>
        <Text style={styles.text}>{title}</Text>
    </TouchableOpacity>
);

const styles = StyleSheet.create({
    btn: {
        paddingVertical: 6,
        paddingHorizontal: 12,
        marginLeft: 8,
        borderRadius: 50,
    },
    text: {
        color: '#fff',
        fontSize: 12,
    }
});

export default CategoryBtn;
