import React, { useState } from 'react';
import {
    ScrollView,
    RefreshControl,
    StyleSheet,
    Text,
    View,
    ActivityIndicator
} from 'react-native';
import Constants from 'expo-constants';
import { FlatList, TouchableOpacity } from 'react-native-gesture-handler';
import WidgetBar from '../components/WidgetBar';
import NewsList from '../components/NewsList';
import NewsCard from '../components/NewsCard';
import HeaderText from '../components/HeaderText';
import useMainPageResults from '../hooks/useMainPageResults';
import ShowMore from '../components/ShowMore';
import CategoriesList from '../components/CategoriesList';
import MindsList from '../components/MindsList';
import SendNews from '../components/SendNews';
import CurrentDate from '../components/CurrentDate';

const lang = 'ru';

const MainScreen = ({ navigation }) => {

    const navigationFooter = navigation;
    const [widget, setWidget] = useState(true);

    const onWidgetClose = () => {
        setWidget(false);
    }

    const [
        NewsFeedApi, 
        newsResults, 
        errorMessage, 
        loading, 
        refreshing, 
        currency, 
        ShowMoreNewsApi, 
        categories, 
        mindsResults,
        ShowMoreMindsApi,
        user_id
    ] = useMainPageResults();

    const onRefresh = () => {
        NewsFeedApi(8);
    };

    const showNews = (id) => {
        return navigation.navigate('News', { id: id, lang: lang, user_id: user_id})
    }


    const renderItem = ({ item }) => (
        <NewsCard showNews={showNews} title={item['title_' + lang]} image={item.image_name} category={item.category['title_' + lang]} time={item.date} id={item.id} />
    );
    
    
    
    const ListHeaderNews = () => (
        <>
            <WidgetBar showWidget={widget} onWidgetTap={() => onWidgetClose()} currency={currency} />
            <CurrentDate />
            <HeaderText text="Новости" />
            <CategoriesList categories={categories} lang={lang} navigation={navigation}/>
        </>
    );

    const ListFooterNews = () => (
        <View>
            <ShowMore text='Показать больше новостей' onLoadMore={() => ShowMoreNewsApi()} />

            <SendNews navigation={navigationFooter}/>

            <HeaderText text='Мнения' />
            <MindsList minds={mindsResults} lang={lang}/>
            <ShowMore text='Другие мнения' onLoadMore={() => ShowMoreMindsApi()} />
        </View>
    );


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
    }
});

export default MainScreen;