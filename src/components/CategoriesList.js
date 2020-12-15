import React from 'react';
import { Text, View, StyleSheet, FlatList } from 'react-native';
import CategoryBtn from './CategoryBtn';
import { ScrollView } from 'react-native-gesture-handler';
import LocalizationContext from '../context/LocalizationContext';


const CategoriesList = ({ categories, lang, navigation }) => {
    const { t, locale, setLocale } = React.useContext(LocalizationContext);

    const navigateCategory = (id, title) => {
        return navigation.navigate('Category', {id: id, category_title: title})
    }

    return (
        <ScrollView style={styles.container} horizontal={true} showsHorizontalScrollIndicator={false}>
            <CategoryBtn title={t('for_you')} active={true}/>
            {
                categories.map((item) => {
                    return (<CategoryBtn key={item.id + item['title_' + lang]} title={item['title_' + lang]} navigateCategory={() => navigateCategory(item.id, item['title_' + lang])} />);
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
