import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { Icon } from 'react-native-eva-icons';
import uznews from '../api/uznews';
import LocalizationContext from '../context/LocalizationContext';


const WidgetBar = ({ showWidget, onWidgetTap, currency }) => {

    const { t, locale, setLocale } = React.useContext(LocalizationContext);



    const display = (showWidget) ? 'flex' : 'none';

    useEffect(() => {

    }, []);

    // const [usd, eur, rub] = exchange;

    return (
        <ScrollView style={{ display: display }} alwaysBounceHorizontal horizontal={true} showsHorizontalScrollIndicator={false}>
            <View style={styles.container}>
                <View style={styles.currency}>
                    <Text style={styles.currencyText}> 1 USD = {currency.usd ? currency.usd :'........'} </Text>
                    <Text style={styles.currencyText}> 1 EUR = {currency.eur ? currency.eur :'........'} </Text>
                    <Text style={styles.currencyText}> 1 RUB = {currency.rub ? currency.rub :'.....'} </Text>
                </View>
                {/* <TouchableOpacity>
                    <Icon name='close' width={20} height={20} fill='#20235a' onPress={onWidgetTap} />
                </TouchableOpacity> */}
            </View>
            <View style={styles.container}>
                <View style={styles.currency}>
                    <Text style={styles.currencyText}> {t('brv')} = {currency.brv ? currency.brv :'.....'} сум</Text>
                    <Text style={styles.currencyText}> {t('mrot')} = {currency.mrot ? currency.mrot :'.....'} сум</Text>
                </View>
                {/* <TouchableOpacity>
                    <Icon name='close' width={20} height={20} fill='#20235a' onPress={onWidgetTap} />
                </TouchableOpacity> */}
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        backgroundColor: '#fff',
        marginHorizontal: 10,
        marginTop: 20,
        padding: 8,
        borderRadius: 50,
        alignItems: 'center',
    },
    currency: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-around'
    },
    currencyText: {
        fontSize: 12,
        fontWeight: 'bold',
        color: '#20235a'
    }
});

export default WidgetBar;
