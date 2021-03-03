import 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, SafeAreaView } from 'react-native';
import Navigation from './src/navigation/index';
import * as Localization from 'expo-localization'; // or whatever library you want
import i18n from 'i18n-js';
import LocalizationContext from './src/context/LocalizationContext';


export default function App() {

    const [locale, setLocale] = React.useState(Localization.locale);
    const localizationContext = React.useMemo(
        () => ({
            t: (scope, options) => i18n.t(scope, { locale, ...options }),
            locale,
            setLocale,
        }),
        [locale]
    );

    // if (locale.substring(0, 2) != 'uz' && locale.substring(0, 2) != 'ru') {
    //     return (
    //         <View style={styles.container1}>
    //             <View style={styles.langBlock}>
    //                 <Text style={styles.langBlockText}>Выберите язык</Text>
    //                 <TouchableOpacity style={styles.langBlockBtn} onPress={() => setLocale('ru')}>
    //                     <Text style={styles.langBlockBtnText}> Рус </Text>
    //                 </TouchableOpacity>
    //                 <TouchableOpacity style={styles.langBlockBtn} onPress={() => setLocale('uz')}>
    //                     <Text style={styles.langBlockBtnText}> Узб </Text>
    //                 </TouchableOpacity>
    //             </View>
    //         </View>
    //     )
    // }

    return (
        <LocalizationContext.Provider value={localizationContext}>
            <SafeAreaView style={styles.container}>
                <View style={styles.container}>
                    <Navigation />
                    <StatusBar />
                </View>
            </SafeAreaView>
        </LocalizationContext.Provider>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    container1: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#eee'
    },
    langBlock: {
        backgroundColor: '#fff',
        padding: 28,
        borderRadius: 15
    },
    langBlockText: {
        fontSize: 24,
        fontWeight: "bold",
        color: '#475681',
        marginBottom: 16
    },
    langBlockBtn: {
        backgroundColor: '#E8F0FF',
        padding: 16,
        marginBottom: 8,
        alignItems: 'center'
    },
    langBlockBtnText: {
        fontWeight: 'bold',
        fontSize: 16,
        color: '#475681',
    }
});


// import 'react-native-gesture-handler';
// import { StatusBar } from 'expo-status-bar';
// import React from 'react';
// import { StyleSheet, Text, View, SafeAreaView } from 'react-native';
// import Navigation from './src/navigation/index';

// export default function App() {
//     return (

//         <SafeAreaView style={styles.container}>
//             <Navigation />
//             <StatusBar />
//         </SafeAreaView>
//     );
// }

// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//     },
// });