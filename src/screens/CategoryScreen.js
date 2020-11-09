import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, RefreshControl, ActivityIndicator } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import uznews from '../api/uznews';
import ShowMore from '../components/ShowMore';
import CurrentDate from '../components/CurrentDate';
import NewsCard from '../components/NewsCard';
import HeaderText from '../components/HeaderText';
import { getUserId } from '../api/getUserId';


const CategoryScreen = ({ route, navigation }) => {

    const [loading, setLoading] = useState(true);
    const [refreshing, setRefreshing] = useState(false);
    const [newsResults, setNewsResults] = useState([]);
    const [newsUsed, setNewsUsed] = useState(8);

    // console.log(navigation);
    const id = route.params.id;
    const category_title = route.params.category_title;
    // const lang = route.params.lang;
    const lang = 'ru';
    const count = 8;

    const getResult = async (id) => {

        await getUserId().then(async (user_id) => {
            try {
                setRefreshing(true);

                await uznews.get('/feed', {
                    params: {
                        limit: count,
                        language: 1,
                        offset: 0,
                        category: id,
                        user: user_id
                    }
                }).then((response) => {
                    setLoading(false);
                    setNewsResults(response.data.articles);
                    console.log(response.data.articles);
                    setRefreshing(false)
                });
            } catch (err) {

            }
        });
    };

    const getResultMore = async (id) => {
        try {
            setRefreshing(true);

            await uznews.get('/feed', {
                params: {
                    limit: 8,
                    language: 1,
                    offset: newsUsed,
                    category: id
                }
            }).then((response) => {
                setNewsUsed(newsUsed + 8);
                setNewsResults([...newsResults, ...response.data.articles]);
                console.log(response.data.articles);
                setRefreshing(false)
            });
        } catch (err) {

        }
    };

    const onRefresh = () => {
        getResult(id);
    };

    useEffect(() => {
        getResult(id);
    }, [])



    const showNews = (id) => {
        return navigation.navigate('News', { id: id, lang: lang })
    }


    const renderItem = ({ item }) => (
        <NewsCard showNews={showNews} title={item['title_' + lang]} image={item.image_name} category={item.category['title_' + lang]} time={item.date} id={item.id} />
    );

    const ListHeaderNews = () => (
        <>
            <CurrentDate />
            <HeaderText text={category_title} />
        </>
    );

    const ListFooterNews = () => (
        <View>
            { (newsResults.length >= 8) ? <ShowMore text='Показать больше новостей' onLoadMore={() => getResultMore(id)} /> : <View style={styles.br}></View>}
        </View>
    );

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
    }
});

export default CategoryScreen;