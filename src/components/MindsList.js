import React from 'react';
import { ScrollView } from 'react-native';
import MindCard from '../components/MindCard';


const MindsList = ({ user_id, minds, lang, navigation }) => {
    
    const showNews = (id) => {
        return navigation.navigate('News', { id: id, lang: lang, user_id: user_id })
    }

    return (
        <ScrollView>
            {
                minds.map((item) => {
                    return (
                        <MindCard
                            id={item.article.id}
                            showNews={showNews}
                            key={item.id + item.name}
                            name={item.name}
                            prof={item.prof}
                            title={item.article['title_' + lang]}
                            category={item.article.category['title_' + lang]}
                            time={item.date}
                            image={item.article.image_name}
                            photo={item.photo}
                        />
                    );
                })
            }
        </ScrollView>
    )
};

export default MindsList;
