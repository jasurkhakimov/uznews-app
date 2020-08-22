import React from 'react';
import { Text, View, StyleSheet } from 'react-native';


const CurrentDate = () => {

    const date = new Date();
    const months = ["Января", "Февраля", "Марта", "Апреля", "Мая", "Июня", "Июля", "Августа", "Сентября", "Октября", "Ноября", "Декабря"];
    const month = months[date.getMonth()]
    const days = ['Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота', 'Воскресенье'];
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