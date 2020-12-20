import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import InfoText from '../components/InfoText';
import LocalizationContext from '../context/LocalizationContext';


const AboutScreen = ({navigation}) => {
    const { t, locale, setLocale } = React.useContext(LocalizationContext);

    return (
        <View>
            <InfoText text={t('about_page')} />
        </View>
    )
};

const styles = StyleSheet.create({

});

export default AboutScreen;