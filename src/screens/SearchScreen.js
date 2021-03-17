import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import { FlatList, TouchableOpacity } from 'react-native-gesture-handler';
import { TextInput } from 'react-native-paper';
import uznews from '../api/uznews';
import { Snackbar } from 'react-native-paper';
import { ActivityIndicator } from 'react-native';
import ShowMore from '../components/ShowMore';
import NewsCard from '../components/NewsCard';
import LocalizationContext from '../context/LocalizationContext';


let lang = 'ru';

const SearchScreen = ({ navigation }) => {

    const [loading, setLoading] = useState(true);
    const [refreshing, setRefreshing] = useState(false);
    const [newsResults, setNewsResults] = useState([]);
    const [newsUsed, setNewsUsed] = useState(8);
    const [text, setText] = useState('');
    const [visible, setVisible] = useState(false);
    const [snackText, setSnackText] = useState('-');
    const { t, locale, setLocale } = React.useContext(LocalizationContext);
    const [pressed, setPressed] = useState(false)


    const search = async () => {
        if (text.length > 0) {
            try {
                let params = {
                    query: text,
                    language: 1,
                    offset: 0,
                    limit: 8
                }

                await uznews.get('/search', {
                    params
                }).then((response) => {

                    setNewsResults(response.data);
                    setPressed(true);
                }).catch((err) => {
                    console.log('send err');
                    setVisible(true);
                    setSnackText(t('internal_error'));
                })
            } catch (error) {
                console.log('try send err', error);

                setVisible(true);
                setSnackText(t('internal_error'));
            }
        } else {
            console.log('text err');

            setVisible(true);
            setSnackText(t('please_enter_text'));
        }
    }


    const showNews = (id) => {
        return navigation.navigate('News', { id: id, lang: lang })
    }

    const getMoreNews = async () => {
        try {
            
            let params = {
                query: text,
                language: 1,
                offset: newsUsed,
                limit: 8
            }

            await uznews.get('/search', {
                params
            }).then((response) => {
                setNewsUsed(newsUsed + 8);
                setNewsResults([...newsResults, ...response.data]);
            });
        } catch (err) {
            console.log(err);
        }
    }

    const renderItem = ({ item }) => (
        <NewsCard showNews={showNews} title={item['title_' + lang]} image={item.image_name} category={item.category['title_' + lang]} time={item.date} id={item.id} />
    );

    // const ListHeaderNews = () => (

    // );

    const ListFooterNews = () => (
        <View>
            { (newsResults.length >= 8) ? <ShowMore text={t('show_more_news')} onLoadMore={() => getMoreNews()} /> : <View style={styles.br}></View>}
        </View>
    );


    // if (loading) {
    //     return (
    //         <View style={styles.container}>
    //             <ActivityIndicator size={30} color='#20235a' />
    //         </View>
    //     )
    // }

    const empty = () => {
        setText('');
        setPressed(false);
        setNewsResults([]);
        setNewsUsed(8);
    }

    return (

        <View>

            <FlatList
                ListHeaderComponent={
                    <View style={styles.container}>
                        <View style={styles.inputContainer}>
                            <TextInput
                                style={styles.input}
                                // autoCapitalize='off'
                                // autoCorrect={false}
                                label={t('search')}
                                keyboardType={'default'}
                                selectionColor='#74d9ff'
                                theme={{ colors: { primary: '#20235a' } }}
                                onChangeText={text => setText(text)}
                                value={text}
                            />
                            <View style={{ flexDirection: 'row' }}>
                                <TouchableOpacity style={styles.searchBtn} onPress={search}>
                                    <Text style={styles.btnText}> {t('find')} </Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.emptyBtn} onPress={empty}>
                                    <Text style={styles.btnTextEmpty}> {t('clear')} </Text>
                                </TouchableOpacity>

                            </View>
                        </View>
                        <View style={styles.container}>
                            {
                                pressed && newsResults.length <= 0 ?  <Text style={{ color: '#777', fontWeight: 'bold', textAlign: 'center'}}>{t('no_search_results')}</Text> : null
                            }
                        </View>
                        <Snackbar
                            visible={visible}
                            onDismiss={() => setVisible(false)}
                            action={{
                                label: 'ок',
                                onPress: () => {
                                    // Do something
                                },
                            }}
                            style={{
                                backgroundColor: '#475681'
                            }}
                        >
                            {snackText}
                        </Snackbar>
                    </View>
                }
                data={newsResults}
                renderItem={renderItem}
                keyExtractor={(item, index) => index + item.image_name}
                ListFooterComponent={ListFooterNews}

                showsVerticalScrollIndicator={false}
            />
        </View>

    );
};

const styles = StyleSheet.create({
    container: {
        // flex: 1,
    },
    input: {
        backgroundColor: 'transparent',
        padding: 0,
        marginHorizontal: 15
    },
    inputContainer: {
        marginBottom: 20,
    },
    searchBtn: {
        flexDirection: 'row',
        display: 'flex',
        color: '#fff',
        justifyContent: 'center',
        margin: 15,
        width: 100,
        marginBottom: 10,
        backgroundColor: '#475681',
        paddingVertical: 8,
        borderRadius: 50,
        borderWidth: 2,
        borderColor: '#475681'
    },
    emptyBtn: {
        flexDirection: 'row',
        display: 'flex',
        color: '#fff',
        justifyContent: 'center',
        margin: 15,
        marginLeft: 0,
        width: 100,
        marginBottom: 10,
        backgroundColor: '#eee',
        paddingVertical: 8,
        borderRadius: 50,
        borderWidth: 2,
        borderColor: '#475681'
    },
    btnText: {
        color: '#fff',
        // letterSpacing: 0.5
    },
    btnTextEmpty: {
        color: '#475681',
        // letterSpacing: 0.5
    },
    br: {
        marginBottom: 20
    }
});

export default SearchScreen;