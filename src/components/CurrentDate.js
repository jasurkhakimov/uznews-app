import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import LocalizationContext from '../context/LocalizationContext';


const CurrentDate = () => {
    const { t, locale, setLocale } = React.useContext(LocalizationContext);

    const date = new Date();
    const months = [t('january'), t('february'), t('march'), t('april'), t('may'), t('june'), t('july'), t('august'), t('september'), t('october'), t('november'), t('december')];
    const month = months[date.getMonth()]
    const days = [t('monday'), t('tuesday'), t('wednesday'), t('thursday'), t('friday'), t('satturday'), t('sunday')];
    const weekday = (date.getDay()) ? days[date.getDay() - 1] : days[6];
    const day = date.getDate();

    return (
        <Text style={styles.date}>
            {weekday}, {day} {month}
        </Text>
    )
}


const styles = StyleSheet.create({
    date: {
        marginTop: 20,
        marginHorizontal: 15,
        fontSize: 13,
        fontWeight: 'bold',
        color: '#888888'
    },
});

export default CurrentDate;