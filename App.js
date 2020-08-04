import 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, SafeAreaView } from 'react-native';
import Navigation from './src/navigation/index';

export default function App() {
    return (
        
        <SafeAreaView style={styles.container}>
            <Navigation />
            <StatusBar />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});
