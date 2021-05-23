import 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, Text, View, SafeAreaView } from 'react-native';
import Navigation from './src/navigation/index';
import * as Localization from 'expo-localization'; // or whatever library you want
import i18n from 'i18n-js';
import LocalizationContext from './src/context/LocalizationContext';
import Constants from 'expo-constants';
import * as Notifications from 'expo-notifications';

Notifications.setNotificationHandler({
    handleNotification: async () => ({
        shouldShowAlert: true,
        shouldPlaySound: false,
        shouldSetBadge: false,
    }),
});



export default function App() {


    const [expoPushToken, setExpoPushToken] = useState('');
    const [notification, setNotification] = useState(false);
    const notificationListener = useRef();
    const responseListener = useRef();

    const [locale, setLocale] = React.useState(Localization.locale);
    const localizationContext = React.useMemo(
        () => ({
            t: (scope, options) => i18n.t(scope, { locale, ...options }),
            locale,
            setLocale,
        }),
        [locale]
    );

    useEffect(() => {
        registerForPushNotificationsAsync().then(token => setExpoPushToken(token));
    
        notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
          setNotification(notification);
        });
    
        responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
          console.log(response);
        });
    
        return () => {
          Notifications.removeNotificationSubscription(notificationListener);
          Notifications.removeNotificationSubscription(responseListener);
        };
      }, []);

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
                    {/* <Text>{expoPushToken}</Text> */}
                </View>
            </SafeAreaView>
        </LocalizationContext.Provider>
    );
}

async function schedulePushNotification() {
    await Notifications.scheduleNotificationAsync({
      content: {
        title: "You've got mail! 📬",
        body: 'Here is the notification body',
        data: { data: 'goes here' },
      },
      trigger: { seconds: 2 },
    });
  }
  
  async function registerForPushNotificationsAsync() {
    let token;
    if (Constants.isDevice) {
      const { status: existingStatus } = await Notifications.getPermissionsAsync();
      let finalStatus = existingStatus;
      if (existingStatus !== 'granted') {
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
      }
      if (finalStatus !== 'granted') {
        alert('Failed to get push token for push notification!');
        return;
      }
      // token = (await Notifications.getExpoPushTokenAsync()).data;
      token = (await Notifications.getDevicePushTokenAsync()).data;
      console.log(token);
    } else {
      alert('Must use physical device for Push Notifications');
    }
  
    if (Platform.OS === 'android') {
      Notifications.setNotificationChannelAsync('default', {
        name: 'default',
        importance: Notifications.AndroidImportance.MAX,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: '#FF231F7C',
      });
    }
  
    return token;
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
        color: '#4e6293',
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
        color: '#4e6293',
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