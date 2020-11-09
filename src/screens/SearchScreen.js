import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import { FlatList, TouchableOpacity } from 'react-native-gesture-handler';
import { TextInput } from 'react-native-paper';
import uznews from '../api/uznews';
import { Snackbar } from 'react-native-paper';



const SearchScreen = ({ navigation }) => {

    const [loading, setLoading] = useState(true);
    const [refreshing, setRefreshing] = useState(false);
    const [newsResults, setNewsResults] = useState([]);
    const [newsUsed, setNewsUsed] = useState(8);
    const [text, setText] = useState('');
    const [visible, setVisible] = useState(false);
    const [snackText, setSnackText] = useState('-');


    const search = () => {
        if (text.length > 0) {
            try {
                uznews.get('/search', {
                    params: {
                        search: text
                    }
                }).then((response) => {
                    console.log(response);
                }).catch((err) => {

                    setVisible(true);
                    setSnackText('Произошла внутренняя ошибка, повторите позже');
                })
            } catch (error) {
                setVisible(true);
                setSnackText('Произошла внутренняя ошибка, повторите позже');
            }
        } else {
            setVisible(true);
            setSnackText('Пожайлуста введите текст поиска');
        }
    }


    return (
        <View style={styles.container}>
            <View style={styles.inputContainer}>
                <TextInput
                    style={styles.input}
                    autoCapitalize='none'
                    autoCorrect={false}
                    label="Поиск"
                    placeholder="Введите название стать..."
                    keyboardType={'default'}
                    selectionColor='#74d9ff'
                    theme={{ colors: { primary: '#20235a' } }}
                    onChangeText={text => setText(text)}
                />
                <View style={{ flexDirection: 'row' }}>
                    <TouchableOpacity style={styles.searchBtn} onPress={search}>
                        <Text style={styles.btnText}> найти </Text>
                    </TouchableOpacity>
                </View>
            </View>
            <View style={styles.container}>

            </View>
            <Snackbar
                visible={visible}
                onDismiss={() => setVisible(false)}
                action={{
                    label: 'ок',
                    onPress: () => {
                        // Do something
                    },
                }}
                style={{
                    backgroundColor: '#475681'
                }}
            >
                {snackText}
            </Snackbar>
        </View>
    )
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    input: {
        backgroundColor: 'transparent',
        padding: 0,
        marginHorizontal: 15
    },
    inputContainer: {
        marginBottom: 20,
    },
    searchBtn: {
        flexDirection: 'row',
        display: 'flex',
        color: '#fff',
        justifyContent: 'center',
        margin: 15,
        width: 100,
        marginBottom: 10,
        backgroundColor: '#475681',
        paddingVertical: 8,
        borderRadius: 50,
        borderWidth: 2,
        borderColor: '#475681'
    },
    btnText: {
        color: '#fff',
        // letterSpacing: 0.5
    },
});

export default SearchScreen;