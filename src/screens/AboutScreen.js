import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import InfoText from '../components/InfoText';

const text = 'Новостное агентство «UzNews.uz» существует с августа 2015 года. Наше агентство специализируется на освещении актуальных и интересных новостей Узбекистана.';

const AboutScreen = ({navigation}) => {

    return (
        <View>
            <InfoText text={text} />
        </View>
    )
};

const styles = StyleSheet.create({

});

export default AboutScreen;