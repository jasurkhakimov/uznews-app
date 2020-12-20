import React, { useState, useEffect } from 'react';
import { ScrollView, View, Text, StyleSheet, RefreshControl, ActivityIndicator, TouchableOpacity} from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import uznews from '../api/uznews';
import ShowMore from '../components/ShowMore';
import CurrentDate from '../components/CurrentDate';
import NewsCard from '../components/NewsCard';
import HeaderText from '../components/HeaderText';
import { getUserId } from '../api/getUserId';
import LocalizationContext from '../context/LocalizationContext';



const BookmarkScreen = ({ navigation }) => {

    const [loading, setLoading] = useState(true);
    const [refreshing, setRefreshing] = useState(false);
    const [newsResults, setNewsResults] = useState([]);
    const [newsUsed, setNewsUsed] = useState(8);
    const [user_id, setUserId] = useState("");
    const { t, locale, setLocale } = React.useContext(LocalizationContext);

    // console.log(navigation);
    // const id = route.params.id;
    const title = t('bookmark');
    // const lang = route.params.lang;
    const lang = 'ru';
    const count = 8;

    const getResult = async (id) => {
         await getUserId().then(async (user_id) => {
            console.log(user_id);
            setUserId(user_id);
            
            try {
                setRefreshing(true);
                let lang_code = locale.substring(0, 2) == 'ru' ? 1 : 2;

                await uznews.get('/bookmark', {
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
                    console.log(response.data.results);
                    setRefreshing(false)
                });
            } catch (err) {

            }

        })
    }

    const getResultMore = async (id) => {
        try {
            setRefreshing(true);
            let lang_code = locale.substring(0, 2) == 'ru' ? 1 : 2;

            await uznews.get('/bookmark', {
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
                console.log(response.data.results);
                setRefreshing(false)
            });
        } catch (err) {

        }
    };

    const onRefresh = () => {
        setNewsUsed(8);
        getResult();
    };

    useEffect(() => {
        getResult();
    }, [])



    const showNews = (id) => {
        return navigation.navigate('News', { id: id, lang: lang })
    }


    const renderItem = ({ item }) => (
        <NewsCard user_id={user_id ? user_id : null} book={true} showNews={showNews} title={item['title_' + lang]} image={item.image_name} category={item.category['title_' + lang]} time={item.date} id={item.id} />
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

    useEffect(() => {
        getResult();
    }, [])

    if(!user_id) {
        return (
            <View style={styles.authContainer}>
                <View style={styles.authBlock}>
                    <Text style={styles.authText}> {t('auth')} </Text>
                    <TouchableOpacity style={styles.authBtn} onPress={() => getResult()}>
                        <Text style={styles.authBtnText}> {t('refresh')} </Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }


    if (loading) {
        return (
            <View style={[styles.container, styles.scrollView]} refreshControl={
                <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }>
                <ActivityIndicator size={30} color='#20235a' />
            </View>
        )
    }

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

    );
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
        backgroundColor: '#fff'
    },
    br: {
        marginBottom: 20
    },
    authContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'transparent'
    },
    authBlock: {
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
        backgroundColor: '#20235a',
        paddingVertical: 12,
        paddingHorizontal: 24,
        borderRadius: 50,
        marginTop: 12,
    },
    authBtnText: {
        color: '#fff',
    },
});
export default BookmarkScreen;