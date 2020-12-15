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
import i18n from 'i18n-js';
import LocalizationContext from '../context/LocalizationContext';

const lang = 'ru';

const MainScreen = ({ navigation }) => {

    const navigationFooter = navigation;
    const [widget, setWidget] = useState(true);

    // locale.substring(0, 2)

    const onWidgetClose = () => {
        setWidget(false);
    }

    const { t, locale, setLocale } = React.useContext(LocalizationContext);

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
        user_id,
        CategoryApi,
    ] = useMainPageResults();

    const onRefresh = () => {
        NewsFeedApi(8);
        CategoryApi();
    };

    const showNews = (id) => {
        return navigation.navigate('News', { id: id, lang: lang, user_id: user_id})
    }


    const renderItem = ({ item }) => (
        <NewsCard user_id={user_id ? user_id : null} book={item.bookmark} showNews={showNews} title={item['title_' + lang]} image={item.image_name} category={item.category['title_' + lang]} time={item.date} id={item.id} />
    );
    
    
    
    const ListHeaderNews = () => (
        <>
            <WidgetBar showWidget={widget} onWidgetTap={() => onWidgetClose()} currency={currency} />
            <CurrentDate />
            <HeaderText text={t('news')} />
            <CategoriesList categories={categories} lang={lang} navigation={navigation}/>
        </>
    );

    const ListFooterNews = () => (
        <View>
            <ShowMore text={t('show_more_news')} onLoadMore={() => ShowMoreNewsApi()} />

            <SendNews navigation={navigationFooter}/>

            <HeaderText text={t('minds')} />
            <MindsList minds={mindsResults} lang={lang} showNews={showNews}/>
            <ShowMore text={t('other_minds')} onLoadMore={() => ShowMoreMindsApi()} />
            <View>
                
            </View>
        </View>
    );

    // if (lang == null) {

    // }
    if (!lang) {
        return (
            <View style={styles.container}>
                <View style={styles.langBlock}>
                    <Text style={styles.langBlockText}>Выберите язык</Text>
                    <TouchableOpacity style={styles.langBlockBtn} onPress={() => storeData('ru', '@lang')}>
                        <Text style={styles.langBlockBtnText}> Рус </Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.langBlockBtn} onPress={() => storeData('uz', '@lang')}>
                        <Text style={styles.langBlockBtnText}> Узб </Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }

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
    langBlock: {
    },
    langBlockText: {
        fontSize: 24,
        fontWeight: "bold",
        color: '#475681',
        marginBottom: 16
    },
    langBlockBtn: {
        backgroundColor: '#E8F0FF',
        padding: 16,
        marginBottom: 8,
        alignItems: 'center'
    },
    langBlockBtnText: {
        fontWeight: 'bold',
        fontSize: 16,
        color: '#475681',
    }
});

export default MainScreen;