import React, { useState, useEffect } from 'react';
import { ScrollView, View, Text, StyleSheet, ActivityIndicator, Image } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import uznews from '../api/uznews';
import { WebView } from 'react-native-webview';
// import MyWebView from 'react-native-webview-autoheight';
import { Avatar } from 'react-native-paper';


const NewsScreen = ({ route }) => {

    const [result, setResult] = useState(null);
    const [webViewHeight, setWebViewHeight] = React.useState(null);

    const onMessage = (event) => {
        setWebViewHeight(Number(event.nativeEvent.data));
    }

    const onShouldStartLoadWithRequest = (request) => {
        if (request.navigationType === 'click') {
            // Open all new click-throughs in external browser.
            Linking.openURL(request.url);
            return false;
        }
        return true;
    }


    // console.log(navigation);
    const id = route.params.id;
    const lang = route.params.lang;
    const user_id = route.params.user_id;

    const getResult = async (id) => {
        const response = await uznews.get(`/article/${id}`, {
            params: {
                user: user_id
            }
        });
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
        <View style={styles.container}>
            <ScrollView contentContainerStyle={{ flexGrow: 1, height: styles.header.height + webViewHeight }}>
                <View style={styles.header}>
                    <Image source={{ uri: result.image_name }} style={styles.imgMain}/>
                </View>
                { result.author && (<View style={styles.authorContainer}>
                    <Avatar.Image size={60} source={{ uri: result.author.photo }} style={styles.avatar} />
                    <View style={styles.authorDesc}>
                        <Text style={styles.authorName}>{result.author.name}</Text>
                        <Text style={styles.authorProf}>{result.author.short_description}</Text>
                    </View>
                </View>) }
                
                <WebView
                    source={{ html: result.text_ru }}
                    bounces={true}
                    style={{
                        // width: '100%',
                        height: 100
                    }}
                    scrollEnabled={false}
                    scalesPageToFit={false}
                    automaticallyAdjustContentInsets={true}
                    onMessage={onMessage}
                    injectedJavaScript={`
                        window.ReactNativeWebView.postMessage(Math.max(0, document.body.scrollHeight));
                        let x = document.querySelectorAll("img");
                        let i;
                        for (i = 0; i < x.length; i++) {
                            x[i].style.width = '100%';
                            x[i].style.height = 200;
                            x[i].src = "uznews.l-b.uz" + x[i].src
                            console.log(x[i].src)
                        }
                        const meta = document.createElement('meta'); meta.setAttribute('content', 'width=width, initial-scale=0.5, maximum-scale=0.5, user-scalable=2.0'); meta.setAttribute('name', 'viewport'); document.getElementsByTagName('head')[0].appendChild(meta);

                    `}
                    style={styles.content}
                    onShouldStartLoadWithRequest={onShouldStartLoadWithRequest}
                    
                />
            </ScrollView>
        </View>
    );

    // return (
    //     <View style={styles.container}>
    //         <ScrollView scontentContainerStyle={{ flexGrow: 1, height: styles.imgContainer.height + webViewHeight }}>
    //             <View style={styles.imgContainer}>
    //                 <Image
    //                     style={styles.imgMain}
    //                     source={{
    //                         uri: result.image_name,
    //                     }}
    //                 />
    //             </View>

    //             {/* <Text>{result.text_ru}</Text> */}
    //             <WebView
    //                 style={{ width: '100%', resizeMode: 'cover', flex: 1, color: 'red' }}
    //                 originWhitelist={['*']}
    //                 source={{ html: result.text_ru }}
    //                 bounces={true}
    //                 scrollEnabled={false}
    //                 onMessage={onMessage}
    //                 scalesPageToFit={false}
    //                 automaticallyAdjustContentInsets={true}
    //                 scrollEnabled={false}
    //                 injectedJavaScript={`
    //             window.ReactNativeWebView.postMessage(Math.max(document.body.offsetHeight, document.body.scrollHeight));
    //             let x = document.querySelectorAll("img");
    //             let i;
    //             for (i = 0; i < x.length; i++) {
    //             x[i].style.width = '100%';
    //             x[i].style.height = 200;
    //             }
    //             `}
    //                 onShouldStartLoadWithRequest={onShouldStartLoadWithRequest}
    //             />
    //         </ScrollView>
    //     </View>
    // )
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#eee'
    },
    imgContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        height: 300,
    },
    imgMain: {
        width: '100%',
        height: 200,
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: '#ecf0f1',
    },
    header: {
        height: 200,
        // justifyContent: 'center'
    },
    content: {
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
    },
    authorContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 15,
        backgroundColor: '#fff',
    },  
    avatar: {
        
    },
    authorDesc: {
        paddingLeft: 15
    },
    authorName: {
        fontSize: 16,
        color: '#20235a',
        fontWeight: 'bold'
    }
});

export default NewsScreen;
