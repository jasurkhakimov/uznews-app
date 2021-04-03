import React, { useState, useEffect } from 'react';
import { ScrollView, View, Text, StyleSheet, RefreshControl, ActivityIndicator } from 'react-native';
import { FlatList, TouchableOpacity } from 'react-native-gesture-handler';
import uznews from '../api/uznews';
import ShowMore from '../components/ShowMore';
import CurrentDate from '../components/CurrentDate';
import NewsCard from '../components/NewsCard';
import HeaderText from '../components/HeaderText';
import { getUserId } from '../api/getUserId';
import LocalizationContext from '../context/LocalizationContext';
import { Icon } from 'react-native-eva-icons';



const HistoryScreen = ({ navigation }) => {

    const [loading, setLoading] = useState(true);
    const [refreshing, setRefreshing] = useState(false);
    const [newsResults, setNewsResults] = useState([]);
    const [newsUsed, setNewsUsed] = useState(8);
    const [user_id, setUserId] = useState("");
    const { t, locale, setLocale } = React.useContext(LocalizationContext);

    // console.log(navigation);
    // const id = route.params.id;
    const title = t('history');
    // const lang = route.params.lang;
    const lang = 'ru';
    const count = 8;

    const getResult = async (id) => {
        await getUserId().then(async (user_id) => {
            setUserId(user_id);

            try {
                setRefreshing(true);
                let lang_code = locale.substring(0, 2) == 'ru' ? 1 : 2;
                // console.log(lang_code);

                // console.log(
                //     {
                //         limit: count,
                //         language: lang_code,
                //         offset: 0,
                //         // category: id
                //         user: user_id
                //     }
                // );

                await uznews.get('/history', {
                    params: {
                        limit: count,
                        language: lang_code,
                        offset: 0,
                        // category: id
                        user: user_id
                    }
                }).then((response) => {
                    setLoading(false);
                    setNewsResults(response.data.results);
                    setRefreshing(false)
                });
            } catch (err) {
                console.log(err);
            }

        })
    }

    const getResultMore = async (id) => {
        try {
            setRefreshing(true);

            let lang_code = locale.substring(0, 2) == 'ru' ? 1 : 2;

            await uznews.get('/history', {
                params: {
                    limit: 8,
                    language: lang_code,
                    offset: newsUsed,
                    // category: id,
                    user: user_id
                }
            }).then((response) => {
                setNewsUsed(newsUsed + 8);
                setNewsResults([...newsResults, ...response.data.results]);
                setRefreshing(false)
            });
        } catch (err) {
            console.log(err);
        }
    };

    const onRefresh = () => {
        getResult();
    };

    

    // useEffect(() => {
    //     const unsubscribe = navigation.addListener('tabPress', (e) => {
    //         // Prevent default behavior
    //         e.preventDefault();
    //         console.log('hello')
            
    //         getResult();
    //         // Do something manually
    //         // ...
    //       });
        
    //       return unsubscribe;
    // }, [navigation])



    const showNews = (id) => {
        return navigation.navigate('News', { id: id, lang: lang })
    }


    const renderItem = ({ item }) => (
        <NewsCard user_id={user_id ? user_id : null} book={item.bookmark} showNews={showNews} title={item['title_' + lang]} image={item.image_name} category={item.category['title_' + lang]} time={item.date} id={item.id} />
    );

    const ListHeaderNews = () => (
        <>
            <CurrentDate />
            <HeaderText text={title} />
        </>
    );

    const ListFooterNews = () => (
        <View>
            {(newsResults.length >= 8) ? <ShowMore text={t('show_more_news')} onLoadMore={() => getResultMore()} /> : <View style={styles.br}></View>}
        </View>
    );

    // useEffect(() => {
    //     getResult();
    // }, [])

    React.useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
          // do something
            getResult();

        });
    
        return unsubscribe;
      }, [navigation]);

    if (!user_id) {
        return (
            <View style={styles.authContainer}>
                <View style={styles.authBlock}>
                    
                    <TouchableOpacity style={styles.authBtn} onPress={() => navigation.navigate('SettingsTab', { screen: 'Profile' })}>
                        <Text style={styles.authBtnText}> {t('auth')} </Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.authBtnOutline} onPress={() => getResult()}>
                        <Icon name="refresh-outline" width={15} height={15} fill='#475681' />
                    </TouchableOpacity>
                </View>
            </View>
        )
    }


    if (loading) {
        return (
            <View style={styles.container} refreshControl={
                <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }>
                <ActivityIndicator size={30} color='#20235a' />
            </View>
        )
    }
    if (newsResults.length > 0) {
        return (

            <View>
                <FlatList
                    ListHeaderComponent={ListHeaderNews}
                    data={newsResults}
                    renderItem={renderItem}
                    keyExtractor={item => item['title_' + lang] + item.id}
                    ListFooterComponent={ListFooterNews}

                    showsVerticalScrollIndicator={false}
                    refreshControl={
                        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
                    }
                />
            </View>

        )
    } else {
        return (
            <View style={[styles.container, { backgroundColor: '#eee' }]}>
                <Text style={styles.emptyText}>{t('no_history')}</Text>
                <TouchableOpacity style={[styles.authBtnOutline, {backgroundColor: '#fff'}]} onPress={getResult}>
                    <Icon name="refresh-outline" width={15} height={15} fill='#20235a' />
                </TouchableOpacity>
            </View>
        )
    }
};

const styles = StyleSheet.create({
    scrollView: {
        backgroundColor: '#eee',
        height: '100%',
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
    },
    br: {
        marginBottom: 20
    },
    authContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'transparent',
    },
    authBlock: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
        padding: 40,
        width: '75%',
        borderRadius: 15
    },
    authText: {
        fontSize: 18,
        color: '#20235a',
    },
    authBtn: {
        backgroundColor: '#475681',
        paddingVertical: 12,
        paddingHorizontal: 24,
        borderRadius: 50,
        // marginTop: 12,
        marginRight: 12,
    },
    authBtnOutline: {
        backgroundColor: '#eee',
        paddingVertical: 12,
        paddingHorizontal: 12,
        borderRadius: 50,
        // marginTop: 12,
    },
    authBtnText: {
        color: '#fff',
    },
    emptyText: {
        fontSize: 18,
        color: '#20235a',
        fontWeight: 'bold',
        marginBottom: 12
    }
});
export default HistoryScreen;