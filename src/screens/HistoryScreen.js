import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, RefreshControl, ActivityIndicator} from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import uznews from '../api/uznews';
import ShowMore from '../components/ShowMore';
import CurrentDate from '../components/CurrentDate';
import NewsCard from '../components/NewsCard';
import HeaderText from '../components/HeaderText';
import { getUserId } from '../api/getUserId';



const HistoryScreen = ({ navigation }) => {

    const [loading, setLoading] = useState(true);
    const [refreshing, setRefreshing] = useState(false);
    const [newsResults, setNewsResults] = useState([]);
    const [newsUsed, setNewsUsed] = useState(8);
    const [user_id, setUserId] = useState("");
    // console.log(navigation);
    // const id = route.params.id;
    const title = "История";
    // const lang = route.params.lang;
    const lang = 'ru';
    const count = 8;

    const getResult = async (id) => {
         await getUserId().then(async (user_id) => {
            console.log(user_id);
            setUserId(user_id);
            
            try {
                setRefreshing(true);

                await uznews.get('/history', {
                    params: {
                        limit: count,
                        language: 1,
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

            await uznews.get('/history', {
                params: {
                    limit: 8,
                    language: 1,
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
        getResult();
    };

    useEffect(() => {
        getResult();
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
            <HeaderText text={title} />
        </>
    );

    const ListFooterNews = () => (
        <View>
            {(newsResults.length >= 8) ? <ShowMore text='Показать больше новостей' onLoadMore={() => getResultMore()} /> : <View style={styles.br}></View>}
        </View>
    );

    useEffect(() => {
        getResult();
    }, [])

    if(!user_id) {
        return (
            <View>
                <Text> Авторизуйтесь </Text>
            </View>
        )
    }


    if (loading) {
        return (
            <ScrollView style={styles.container} refreshControl={
                <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }>
                <ActivityIndicator size={30} color='#20235a' />
            </ScrollView>
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
export default HistoryScreen;