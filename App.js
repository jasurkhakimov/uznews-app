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



    return (
        <LocalizationContext.Provider value={localizationContext}>
            <SafeAreaView style={styles.container}>
                <Navigation />
                <StatusBar />
            </SafeAreaView>
        </LocalizationContext.Provider>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
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