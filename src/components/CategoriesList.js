import React from 'react';
import { Text, View, StyleSheet, FlatList } from 'react-native';
import CategoryBtn from './CategoryBtn';
import { ScrollView } from 'react-native-gesture-handler';

const CategoriesList = ({ categories, lang }) => {


    return (
        <ScrollView style={styles.container} horizontal={true} showsHorizontalScrollIndicator={false}>
            <CategoryBtn title='Для вас' active={true}/>
            {
                categories.map((item) => {
                    return (<CategoryBtn key={item.id + item['title_' + lang]} title={item['title_' + lang]} />);
                })
            }
        </ScrollView>
    );
};


const styles = StyleSheet.create({
    container: {
        marginTop: 10 
    }
});


export default CategoriesList;
