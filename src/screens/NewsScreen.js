import React, { useState, useEffect } from 'react';
import { ScrollView, View, Text, StyleSheet, ActivityIndicator, Image, useWindowDimensions } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import uznews from '../api/uznews';
import { Avatar } from 'react-native-paper';
import { Icon } from 'react-native-eva-icons';
import LocalizationContext from '../context/LocalizationContext';
import { uznews_url } from '../api/config';
import iframe from '@native-html/iframe-plugin';
import HTML from 'react-native-render-html';
import WebView from 'react-native-webview';

WebView.defaultProps.useWebKit = true;

const NewsScreen = ({ route }) => {

    const [result, setResult] = useState(null);
    const [day, setDay] = useState('');
    const [month, setMonth] = useState('');
    const [hour, setHour] = useState('');
    const [min, setMin] = useState('');
    const [webViewHeight, setWebViewHeight] = React.useState(null);
    const { t, locale, setLocale } = React.useContext(LocalizationContext);

    const contentWidth = useWindowDimensions().width;

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
        await uznews.get(`/article/${id}`, {
            params: {
                user: user_id
            }
        }).then(response => {

            response.data.text_ru = response.data.text_ru.split('\r\n\r\n<p>&nbsp;</p>').join('').split('src=\"/upload/').join(`src=\"${uznews_url}/upload/`);
            // response.data.text_ru = response.data.text_ru.split("\r\n").join('');
            response.data.text_ru = response.data.text_ru.split('<p style="text-align: left;">&nbsp;</p>').join('');
            setResult(response.data);
            const date = new Date(Date.parse(response.data.date));
            const months = [t('january'), t('february'), t('march'), t('april'), t('may'), t('june'), t('july'), t('august'), t('september'), t('october'), t('november'), t('december')];
            setHour(date.getHours())
            setMin(date.getMinutes())
            setMonth(months[date.getMonth()])
            setDay(date.getDate())

        }).catch(err => {
            console.log(err);
        });
    };

    if (result) {

    }

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

    const renderers = {
        iframe
    }

    return (
        <View style={styles.container}>
            <ScrollView
                // contentContainerStyle={{ flexGrow: 1, height: styles.header.height + webViewHeight }}
                style={{ flex: 1, flexGrow: 1 }}
            >
                <View style={styles.header}>
                    <Image source={{ uri: result.image_name }} style={styles.imgMain} />
                </View>

                <View style={styles.title}>
                    <View style={{ paddingTop: 5, flexDirection: 'row', alignItems: 'center' }}>


                        <Text style={{ color: '#20235a', fontWeight: 'bold', paddingRight: 5 }}>
                            {result.category.title_ru}
                        </Text>
                        <View style={{ flexDirection: 'row' }}>
                            <Icon name="clock-outline" width={16} height={16} fill='gray' />
                            <Text style={{ color: 'gray', fontSize: 12, paddingHorizontal: 4 }}>
                                {day} {month}, {hour}:{min < 10 ? "0" + min : min}
                            </Text>
                        </View>
                        <View style={{ flexDirection: 'row' }}>
                            <Icon name="eye-outline" width={16} height={16} fill='gray' />
                            <Text style={{ color: 'gray', fontSize: 12, paddingLeft: 4 }}>
                                {result.views}
                            </Text>
                        </View>
                    </View>
                    <Text style={styles.titleText}>
                        {result.title_ru}
                    </Text>

                </View>
                {result.author && (<View style={styles.authorContainer}>
                    <Avatar.Image size={60} source={{ uri: result.author.photo }} style={styles.avatar} />
                    <View style={styles.authorDesc}>
                        <Text style={styles.authorName}>{result.author.name}</Text>
                        <Text style={styles.authorProf}>{result.author.short_description}</Text>
                    </View>
                </View>)}

                <HTML
                    WebView={WebView}
                    renderers={renderers}
                    source={{ html: result.text_ru }}
                    contentWidth={contentWidth}
                    tagsStyles={{
                        img: {
                            // marginBottom: 5,
                            // marginTop: 5,
                        },
                        p: {
                            marginVertical: 8
                        }
                    }}
                    containerStyle={{
                        backgroundColor: '#fff',
                        padding: 8,
                        fontSize: 16
                    }}
                    ptSize={1.5}
                    defaultWebViewProps={{  }}
                    renderersProps={{ iframe: { scalesPageToFit: true, height: 100, webViewProps: { height: 100 } }}}
                    alterChildren = { (node) => {
                        if (node.name === 'iframe') {
                            delete node.attribs.width;
                            delete node.attribs.height;
                        } 
                        return node.children;
                    }}
                />

                {/* <WebView
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
                        let images = document.getElementsByTagName('img')
                        for (image of images) {                      
                        
                            image.src = "http://uznews.l-b.uz/upload/cache/d2/26/d2261c8d84e2b63df7b2a564e29cdfb0.jpg"
                            image.alt = "http://uznews.l-b.uz/upload/cache/d2/26/d2261c8d84e2b63df7b2a564e29cdfb0.jpg"
                            image.width = document.body.width
                            image.height = 220
                        }

                        var imgs = document.getElementsByTagName("img");
                        
                        for (var i = 0; i < imgs.length; i++) {
                            imgs[i].src = "http://uznews.l-b.uz" + imgs[i].getAttribute('src');
                        }


                        window.ReactNativeWebView.postMessage(Math.max(0, document.body.scrollHeight ));

                        const meta = document.createElement('meta'); meta.setAttribute('content', 'width=width, initial-scale=0.5, maximum-scale=0.5, user-scalable=2.0'); meta.setAttribute('name', 'viewport'); 
                        
                        document.getElementsByTagName('head')[0].appendChild(meta);

                    `}
                    style={styles.content}
                    onShouldStartLoadWithRequest={onShouldStartLoadWithRequest}
                    
                /> */}
            </ScrollView>
        </View>
    );

    // window.ReactNativeWebView.postMessage(Math.max(0, document.body.scrollHeight ));
    //                     let x = document.querySelectorAll("img");
    //                     let i;

    //                     let images = document.getElementsByTagName('img')

    //                     for (image of images) {

    //                         image.src = "http://uznews.l-b.uz" + text[x] // set the src to that URL
    //                     }

    //                     for (i = 0; i < x.length; i++) {
    //                         x[i].style.width = '100%';
    //                         x[i].style.height = 200;
    //                     }
    //                     const meta = document.createElement('meta'); meta.setAttribute('content', 'width=width, initial-scale=0.5, maximum-scale=0.5, user-scalable=2.0'); meta.setAttribute('name', 'viewport'); 

    //                     document.getElementsByTagName('head')[0].appendChild(meta);


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
        flexGrow: 1,
        justifyContent: 'center',
        alignItems: 'center',
        // backgroundColor: '#ecf0f1',
        backgroundColor: '#fff',
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
    },
    title: {
        padding: 8,
        backgroundColor: '#fff',
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
    },
    titleText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#20235a'
    },
    imgContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        height: 300,
    },
    imgMain: {
        width: '100%',
        height: 220,
    },
    // container: {
    //     flex: 1,
    //     justifyContent: 'center',
    //     backgroundColor: '#fff',
    // },
    header: {
        height: 220,
        // justifyContent: 'center'
    },
    content: {
    },
    authorContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 15,
        backgroundColor: '#fff',
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
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
