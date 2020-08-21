import React from 'react';
import { Text, View, ImageBackground, StyleSheet } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

const SendNews = ({
    navigation
}) => (
        <ImageBackground style={styles.imgBg} source={require('../../assets/banner.jpg')}>
            <Text style={styles.header}>Стань мобильным корреспондентом UzNews</Text>
            <Text style={styles.subheader}>Присылай новости или видеосюжеты и фото Можно работать в режиме инкогнито</Text>
            <View style={styles.btnContainer}>
                <TouchableOpacity  activeOpacity={0.5} style={styles.btn} onPress={() => navigation.navigate('AddNewsTab')}>
                    <Text style={styles.btnText}>Написать нам</Text>
                </TouchableOpacity>
            </View>
        </ImageBackground>
    );

const styles = StyleSheet.create({
    imgBg: {
        width: '100%',
        height: 200,
        marginTop: 15,
        marginBottom: 20,
    },
    header: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 22,
        marginTop: 18,
        marginHorizontal: 15
    },
    subheader: {
        color: '#fff',
        fontWeight: 'bold',
        marginHorizontal: 15,
        marginTop: 10,
        fontSize: 15
    },
    btnContainer: {
        flexDirection: 'row'
    },
    btn: {
        margin: 15,
        backgroundColor: '#fff',
        padding: 10,
        paddingHorizontal: 24,
        borderRadius: 50,
    },
    btnText: {
        color: '#444444',
        fontWeight: 'bold',
        textAlign: 'center',
    }
})

export default SendNews;
