import React, { useState, useEffect } from 'react';
import { Share, Button, ScrollView, View, Text, StyleSheet, ActivityIndicator, Image, useWindowDimensions, TouchableOpacity, Linking } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import uznews from '../api/uznews';
import { Avatar } from 'react-native-paper';
import { Icon } from 'react-native-eva-icons';
import LocalizationContext from '../context/LocalizationContext';
import { uznews_url } from '../api/config';
import iframe from '@native-html/iframe-plugin';
import HTML from 'react-native-render-html';
import WebView from 'react-native-webview';
import { MaterialCommunityIcons } from '@expo/vector-icons';


WebView.defaultProps.useWebKit = true;

const NewsScreen = ({ route, navigation }) => {

    const [result, setResult] = useState(null);
    const [recs, setRecs] = useState(null);
    const [day, setDay] = useState('');
    const [month, setMonth] = useState('');
    const [hour, setHour] = useState('');
    const [min, setMin] = useState('');
    const [webViewHeight, setWebViewHeight] = React.useState(null);
    const { t, locale, setLocale } = React.useContext(LocalizationContext);
    const [loading, setLoading] = useState(true);

    const contentWidth = useWindowDimensions().width;

    // const onMessage = (event) => {
    //     setWebViewHeight(Number(event.nativeEvent.data));
    // }

    // const onShouldStartLoadWithRequest = (request) => {
    //     if (request.navigationType === 'click') {
    //         // Open all new click-throughs in external browser.
    //         Linking.openURL(request.url);
    //         return false;
    //     }
    //     return true;
    // }

    const showNews = (id, user_id) => {
        // setResult(null);
        getResult(id);
    }

    const id = route.params.id;
    const lang = route.params.lang;
    const user_id = route.params.user_id;

    const getResult = async (id) => {
        setLoading(true);
        await uznews.get(`/article/${id}`, {
            params: {
                user: user_id
            }
        }).then(response => {

            response.data.text_ru = response.data.text_ru.split('\r\n\r\n<p>&nbsp;</p>').join('').split('src=\"/upload/').join(`src=\"${uznews_url}/upload/`);
            // response.data.text_ru = response.data.text_ru.split("\r\n").join('');
            response.data.text_ru = response.data.text_ru.split('<p style="text-align: left;">&nbsp;</p>').join('');
            // response.data.text_ru = response.data.text_ru.split(` `).join(' ').split('<br />').join('');
            response.data.text_ru = '<div class="mobileAppCustomFont">' + response.data.text_ru + '</div>';
            setResult(response.data);
            // console.log('log: ****', response.data);
            const date = new Date(Date.parse(response.data.date));
            const months = [t('january'), t('february'), t('march'), t('april'), t('may'), t('june'), t('july'), t('august'), t('september'), t('october'), t('november'), t('december')];
            setHour(date.getHours())
            setMin(date.getMinutes())
            setMonth(months[date.getMonth()])
            setDay(date.getDate());

            uznews.get(`/recommended/${id}`).then(response => {
                // console.log(response.data.articles);
                setRecs(response.data.articles);
                setLoading(false);

            });

        }).catch(err => {
            console.log(err);
        });
    };


    useEffect(() => {
        getResult(id);
    }, [])

    if (loading) {
        return (
            <View style={styles.container}>
                <ActivityIndicator size={30} color='#20235a' />
            </View>
        )
    }

    const renderers = {
        iframe
    }

    const onShare = async () => {
        try {
            const result = await Share.share({
                message: "https://uznews.uz" + `/article/${id}`,
            });
            if (result.action === Share.sharedAction) {
                if (result.activityType) {
                    // shared with activity type of result.activityType
                } else {
                    // shared
                }
            } else if (result.action === Share.dismissedAction) {
                // dismissed
            }
        } catch (error) {
            alert(error.message);
        }
    };


    const SocMedia = (url) => {
        return Linking.openURL(url);
    }


    return (
        <View style={styles.container}>
            <ScrollView
                // contentContainerStyle={{ flexGrow: 1, height: styles.header.height + webViewHeight }}
                style={{ flex: 1, flexGrow: 1 }}
            >
                <View style={styles.header}>
                    <Image source={{ uri: result.image_name }} style={styles.imgMain} />
                    <View>
                        <Text style={{ textAlign: 'right', marginRight: 8, marginTop: 4, fontSize: 10, color: 'gray' }}> {result.image_author} </Text>
                    </View>
                </View>

                <View style={styles.title}>
                    <View style={{ paddingTop: 0, flexDirection: 'row', alignItems: 'center' }}>


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
                        body: {
                            fontSize: 14
                        },
                        p: {
                            marginVertical: 8
                        },
                        br: {
                            content: '',
                            lineHeight: 200
                        },
                        a: {
                            fontSize: 14
                        }
                    }}
                    classesStyles={{
                        'mobileAppCustomFont': {
                            fontSize: 14
                        }
                    }}
                    containerStyle={{
                        backgroundColor: '#fff',
                        padding: 12,
                        fontSize: 16,
                        width: contentWidth,
                    }}
                    ptSize={1.5}
                    defaultWebViewProps={{}}
                    renderersProps={{ iframe: { scalesPageToFit: true, height: 90, webViewProps: { height: 90 } } }}
                    alterChildren={(node) => {
                        if (node.name === 'iframe') {
                            delete node.attribs.width;
                            delete node.attribs.height;
                        }
                        return node.children;
                    }}
                />

                <View style={styles.shereContainer}>

                    <Text style={styles.shareBtnText}>
                        {t('share')}:
                    </Text>
                    <View style={{display: 'flex', flexDirection: 'row', paddingTop: 8}}>
                        <TouchableOpacity style={{marginRight: 12}} onPress={() => SocMedia('https://vk.com/share.php?url==https://uznews.uz/ru/article/' + id)}>
                            <MaterialCommunityIcons name='vk' color='grey' size={21} />
                        </TouchableOpacity>
                        <TouchableOpacity style={{marginRight: 12}} onPress={() => SocMedia('https://www.facebook.com/sharer/sharer.php?u=https://uznews.uz/ru/article/' + id)}>
                            <MaterialCommunityIcons name='facebook' color='grey' size={19} />
                        </TouchableOpacity>
                        <TouchableOpacity style={{marginRight: 8}} onPress={() => SocMedia('https://t.me/share/url?url=https://uznews.uz/ru/article/' + id)}>
                            <MaterialCommunityIcons name='telegram' color='grey' size={21} />
                        </TouchableOpacity>
                    </View>

                </View>

                <View style={styles.recsContainer}>
                    <Text style={styles.recTitleText}>
                        {t('recs_title')}
                    </Text>

                    <ScrollView>

                        {
                            recs ? recs.map((item, key) => {
                                return (
                                    <TouchableOpacity onPress={() => showNews(item.id, user_id)} key={key} style={styles.recNewsBlock}>
                                        <Image source={{ uri: item.image_name }} style={styles.recImg} />
                                        <View style={{ marginHorizontal: 12, width: '65%' }}>
                                            <Text style={styles.recTitle}>
                                                {item.title_ru}
                                            </Text>
                                            <Text style={styles.recSubTitle}>
                                                {item.category.title_ru}
                                            </Text>
                                        </View>
                                    </TouchableOpacity>
                                )
                            }) : null
                        }


                    </ScrollView>
                </View>
            </ScrollView>
        </View>
    );
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
        paddingTop: 4,
        backgroundColor: '#fff',
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
    },
    titleText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#20235a',
        paddingTop: 12
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
        // height: 220,
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
    },
    shereContainer: {
        display: 'flex',
        // flexDirection: 'row',
        marginVertical: 8,
        paddingHorizontal: 12,
    },
    shereBtn: {
        backgroundColor: '#485782',
        paddingVertical: 8,
        paddingHorizontal: 24,
        borderRadius: 50,
        marginHorizontal: 16
    },
    shareBtnText: {
        color: 'gray',
        fontWeight: 'normal',
    },
    recsContainer: {
        padding: 12,
        paddingBottom: 0
    },
    recTitleText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#747e89',
        marginBottom: 12
    },
    recNewsBlock: {
        display: 'flex',
        flexDirection: 'row',
        // alignItems: 'center',
        padding: 8,
        paddingTop: 4,
        borderBottomWidth: 1,
        borderBottomColor: '#c9c9c9',
        // borderRadius: 4,
        marginBottom: 4,
        // flexWrap: 'wrap',
        width: '100%'
    },
    recImg: {
        width: '30%',
        // height: '100%',
        height: 62,
    },
    recTitle: {
        fontSize: 12,
        fontWeight: 'bold',
        color: '#20235a',
        // marginBottom: 12б,
        // backgroundColor: 'red',
        // maxWidth: 250
    },
    recSubTitle: {
        fontSize: 10,
        fontWeight: 'bold',
        color: '#747e89',
        marginTop: 6
    }
});

export default NewsScreen;
