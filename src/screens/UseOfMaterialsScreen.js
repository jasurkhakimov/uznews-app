import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import InfoText from '../components/InfoText';

const text = 'Частичное или полное использование размещенных на вебсайте UzNews.uz текстовых/фотографических/видео материалов разрешается только при условии ссылки и/или прямой открытой для поисковых систем гиперссылки на непосредственный адрес материала на нашем Сайте.';


const UseOfMaterialsScreen = ({navigation}) => {

    return (
        <View>
            <InfoText text={text} />
        </View>
    );
};

const styles = StyleSheet.create({

});

export default UseOfMaterialsScreen;