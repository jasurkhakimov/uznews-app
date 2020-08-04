import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import uznews from '../api/uznews';
import { WebView } from 'react-native-webview';

const NewsScreen = ({ route }) => {

    const [result, setResult] = useState(null);

    // console.log(navigation);
    const id = route.params.id;
    const lang = route.params.lang;

    const getResult = async (id) => {
        const response = await uznews.get(`/article/${id}`);
        setResult(response.data);
        console.log(response.data);
    };

    useEffect(() => {
        getResult(id);
    }, [])

    if (!result) {
        return (
            <View style={styles.container}>
                <ActivityIndicator size={30} color='#20235a' />
            </View>
        )
    }

    return (
        <View style={{ flexDirection: 'column', flex: 1 }}>
            <Text>{id}</Text>
            {/* <Text>{result.text_ru}</Text> */}
            <WebView
                style={{ width: '100%', resizeMode: 'cover', flex: 1, color: 'red' }}
                originWhitelist={['*']}
                source={{ html: result.text_ru }}
                scalesPageToFit={false}
                automaticallyAdjustContentInsets={true}
                scrollEnabled={false}
                injectedJavaScript={`
                let x = document.querySelectorAll("img");
                let i;
                for (i = 0; i < x.length; i++) {
                x[i].style.width = '100%';
                x[i].style.height = 200;
                }
                `}
            />
        </View>
    )
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff'
    }
});

export default NewsScreen;