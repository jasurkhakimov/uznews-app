import React from 'react';
import { ScrollView } from 'react-native';
import MindCard from '../components/MindCard';


const MindsList = ({ minds, lang }) => (
    <ScrollView>
        {
            minds.map((item) => {
                return (
                    <MindCard
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
);

export default MindsList;
