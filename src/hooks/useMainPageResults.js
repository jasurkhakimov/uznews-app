import { useEffect, useState } from 'react';
import uznews from '../api/uznews';
import { useSafeArea } from 'react-native-safe-area-context';

const lang = 'ru';

export default () => {

    let cleanupFunction = false;

    const [newsResults, setNewsResults] = useState([]);
    const [mindsResults, setMindsResults] = useState([]);
    const [categories, setCategories] = useState([]);
    const [errorMessage, setErrorMessage] = useState('');
    const [newsCount, setNewsCount] = useState(8);
    const [newsUsed, setNewsUsed] = useState(0);
    const [loading, setLoading] = useState(true);
    const [refreshing, setRefreshing] = useState(false);
    const [usd, setUsd] = useState('');
    const [eur, setEur] = useState('');
    const [rub, setRub] = useState('');
    const [mindsUsed, setMindsUsed] = useState(3);

    const ExchangeApi = async () => {
        try {
            const response = await uznews.get('/exchange');

            if (!cleanupFunction) {
                setUsd(response.data[0].value);
                setEur(response.data[1].value);
                setRub(response.data[2].value);
            }
        } catch (err) {
            console.error(err);
        }
    }

    const CategoryApi = async () => {
        try {
            const response = await uznews.get('/category', {
                params: {
                    language: lang
                }
            });

            if (!cleanupFunction) {
                setCategories(response.data);
            }
        } catch (err) {
            console.error(err);
        }
    }

    const ShowMoreNewsApi = async () => {
        try {
            setRefreshing(true);
            const url = `/feed`;
            
            await uznews.get(url, {
                params: {
                    limit: 8,
                    language: 1,
                    offset: newsUsed
                }
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
            
            await uznews.get(url, {
                params: {
                    limit: 1,
                    language: 1,
                    offset: 0,
                    mind_limit: 3,
                    mind_offset: mindsUsed,
                }
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
            setRefreshing(true);
            setNewsUsed(newsCount);

            await uznews.get('/feed', {
                params: {
                    limit: count,
                    language: 1,
                    offset: 0
                }
            }).then((response) => {
                setLoading(false);
                setNewsResults(response.data.articles);
                setMindsResults(response.data.minds);
                setRefreshing(false)
            });
        } catch (err) {

        }

    };

    useEffect(() => {
        ExchangeApi();
        NewsFeedApi(newsCount);
        CategoryApi();

        return () => cleanupFunction = true;

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
        },
        ShowMoreNewsApi,
        categories,
        mindsResults,
        ShowMoreMindsApi
    ];


}