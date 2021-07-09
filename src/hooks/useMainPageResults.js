import React, { useEffect, useState } from 'react';
import uznews from '../api/uznews';
import { useSafeArea } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-community/async-storage';
import { getUserId } from '../api/getUserId';
import LocalizationContext from '../context/LocalizationContext';

const lang = 'ru';

export default () => {

    let cleanupFunction = false;

    const [newsResults, setNewsResults] = useState([]);
    const [mindsResults, setMindsResults] = useState([]);
    const [categories, setCategories] = useState([]);
    const [errorMessage, setErrorMessage] = useState('');
    const [newsCount, setNewsCount] = useState(16);
    const [newsUsed, setNewsUsed] = useState(0);
    const [loading, setLoading] = useState(true);
    const [refreshing, setRefreshing] = useState(false);
    const [usd, setUsd] = useState('');
    const [eur, setEur] = useState('');
    const [rub, setRub] = useState('');
    const [mrot, setMrot] = useState('');
    const [brv, setBrv] = useState('');
    const [mindsUsed, setMindsUsed] = useState(3);
    const [user_id, setUserId] = useState("");
    const [lang, setLang] = useState('');
    
    const { t, locale, setLocale } = React.useContext(LocalizationContext);



    const getData = async () => {
        try {
            await AsyncStorage.getItem('@lang').then(async lang1 => {
                setLang(locale.substring(0, 2));onsole.log('here', locale.substring(0, 2));
            });
        } catch (e) {
            console.log(e);
        }
    }

    // const ExchangeApi = async () => {
    //     try {
    //         const response = await uznews.get('/exchange');

    //         if (!cleanupFunction) {
    //             setUsd(response.data[0].value);
    //             setEur(response.data[1].value);
    //             setRub(response.data[2].value);
    //         }
    //     } catch (err) {
    //         console.error(err);
    //     }
    // }

    const storeData = async (value, key) => {
        try {
            const jsonValue = JSON.stringify(value);
            await AsyncStorage.setItem(key, jsonValue);

            if (key == '@lang') {
                setLang(value);
            }

        } catch (e) {
            console.log(e);
        }
    }

    const CategoryApi = async () => {
        try {
            const response = await uznews.get('/category', {
                params: {
                    language: locale.substring(0, 2) != 'uz' && locale.substring(0, 2) != 'ru' ? 'ru' : locale.substring(0, 2)
                }
            }).then(response => {

                setCategories(response.data);
                storeData(response.data, '@categories')
            });
        } catch (err) {
            console.error('Error here category api', err);
        }
    }



    const ShowMoreNewsApi = async () => {
        try {
            setRefreshing(true);
            const url = `/feed`;
            let lang_code = locale.substring(0, 2) == 'ru' ? 1 : 2;
            let params = {
                limit: 8,
                language: lang_code,
                offset: newsUsed,
            }

            if (user_id) {
                params.user = user_id;
            }

            await uznews.get(url, {
                params
            }).then((response) => {
                setNewsUsed(newsUsed + 8);
                setNewsResults([...newsResults, ...response.data.articles]);
                setRefreshing(false)
            });


        } catch (err) {
            console.error(err);
        }
    }

    const ShowMoreMindsApi = async () => {
        try {
            setRefreshing(true);
            const url = `/feed`;
            let lang_code = locale.substring(0, 2) == 'ru' ? 1 : 2;
            let params = {
                limit: 0,
                language: lang_code,
                offset: 0,
                mind_limit: 3,
                mind_offset: mindsUsed,
            }


            if (user_id) {
                params.user = user_id
            }

            await uznews.get(url, {
                params
            }).then((response) => {
                setMindsUsed(mindsUsed + 3);
                setMindsResults([...mindsResults, ...response.data.minds]);
                setRefreshing(false)
            });


        } catch (err) {
            console.error(err);
        }
    }


    const NewsFeedApi = async (count) => {
        try {
            await getUserId().then(async (user_id) => {
                try {
                    setRefreshing(true);
                    setNewsUsed(count);
                    setUserId(user_id)
                    // console.log(user_id);

                    let lang_code = locale.substring(0, 2) != 'uz' && locale.substring(0, 2) != 'ru'? 1 : locale.substring(0, 2) == 'ru' ? 1 : 2;

                    let params = {
                        limit: count,
                        language: lang_code,
                        offset: 0,
                        mind_limit: 3,
                        mind_offset: 0,

                    }

                    if (user_id) {
                        params.user = user_id
                    }

                    await uznews.get('/feed', {
                        params
                    }).then(async (response) => {
                        // console.log(response);
                        setLoading(false);
                        setNewsResults(null);
                        setNewsResults(response.data.articles);
                        // console.log("user id: ", await getUserId());
                        setMindsResults(response.data.minds);
                        setRefreshing(false);

                        uznews.get('/exchange').then(response => {
                            setUsd(response.data.usd.rate);
                            setEur(response.data.eur.rate);
                            setRub(response.data.rub.rate);
                            setMrot(response.data.min_salary.MROT.value)
                            setBrv(response.data.min_salary.BRV.value)
                        });
                    });
                } catch (err) {
                    console.log(err)
                }
            })
        } catch (err) {

        }




    };

    // if (isFocused) {
    //     NewsFeedApi(newsCount);
    //     // CategoryApi();
    // }

    useEffect(() => {

        NewsFeedApi(newsCount);
        CategoryApi();

        return () => {
            cleanupFunction = true
        };

    }, [])


    return [
        NewsFeedApi,
        newsResults,
        errorMessage,
        loading,
        refreshing,
        {
            'usd': usd,
            'eur': eur,
            'rub': rub,
            'mrot': mrot,
            'brv': brv
        },
        ShowMoreNewsApi,
        categories,
        mindsResults,
        ShowMoreMindsApi,
        user_id,
        CategoryApi,
    ];


}