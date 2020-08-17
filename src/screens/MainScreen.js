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

const lang = 'ru';

const CurrentDate = () => {

    const date = new Date();
    const months = ["Января", "Февраля", "Марта", "Апреля", "Мая", "Июня", "Июля", "Августа", "Сентября", "Октября", "Ноября", "Декабря"];
    const month = months[date.getMonth()]
    const days = ['Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота', 'Воскресенье'];
    const weekday = (date.getDay()) ? days[date.getDay() - 1] : days[6];
    const day = date.getDate();

    return (
        <Text style={styles.date}>
            {weekday}, {day} {month}
        </Text>
    )
}


const MainScreen = ({ navigation }) => {


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
    ] = useMainPageResults();

    const onRefresh = () => {
        NewsFeedApi(8);
    };

    const showNews = (id) => {
        return navigation.navigate('News', { id: id, lang: lang })
    }


    const renderItem = ({ item }) => (
        <NewsCard showNews={showNews} title={item['title_' + lang]} image={item.image_name} category={item.category['title_' + lang]} time={item.date} id={item.id} />
    );

    const ListHeaderNews = () => (
        <>
            <WidgetBar showWidget={widget} onWidgetTap={() => onWidgetClose()} currency={currency} />
            <CurrentDate />
            <HeaderText text="Новости" />
            <CategoriesList categories={categories} lang={lang} />
        </>
    );

    const ListFooterNews = () => (
        <View>
            <ShowMore text='Показать больше новостей' onLoadMore={() => ShowMoreNewsApi()} />

            <SendNews />

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
    date: {
        marginTop: 20,
        marginHorizontal: 15,
        fontSize: 13,
        fontWeight: 'bold',
        color: '#888888'
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff'
    }
});

export default MainScreen;