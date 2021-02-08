import React, { useState } from 'react';
import { Text, View, StyleSheet, ImageBackground, TouchableOpacity, Image } from 'react-native';
import { Icon } from 'react-native-eva-icons';
import { Avatar } from 'react-native-paper';
import { uznews_url } from '../api/config';
import LocalizationContext from '../context/LocalizationContext';




const EvaIcon = ({ icon }) => (
    <Icon name={icon} width={20} height={20} fill='#fff' />
);

const MindCard = ({ id, name, prof, title, image, category, time, photo, showNews, }) => {

    const [bookmark, setBookmark] = useState({ state: false, icon: 'bookmark-outline' });
    const { t, locale, setLocale } = React.useContext(LocalizationContext);

    const { icon } = bookmark;

    const time_arr = time.split("T");
    const time_format = time_arr[1].slice(0, 5);

    const date = new Date(Date.parse(time));
    const hour = date.getHours();
    const min = date.getMinutes();
    const months = [t('january'), t('february'), t('march'), t('april'), t('may'), t('june'), t('july'), t('august'), t('september'), t('october'), t('november'), t('december')];
    const month = months[date.getMonth()]
    const days = [t('monday'), t('tuesday'), t('wednesday'), t('thursday'), t('friday'), t('satturday'), t('sunday')];
    const weekday = (date.getDay()) ? days[date.getDay() - 1] : days[6];
    const day = date.getDate();
    const year = date.getFullYear();



    const iconChange = () => {
        if (bookmark.state) {
            return setBookmark({ state: !bookmark.state, icon: 'bookmark-outline' });
        } else {
            return setBookmark({ state: !bookmark.state, icon: 'bookmark' });
        }
    }


    return (
        <View style={styles.card}>
            <TouchableOpacity activeOpacity={1} style={styles.start} onPress={() => showNews(id)}>
                <ImageBackground style={styles.startBgImg} source={{ uri: image }}>
                    {/* <View style={styles.startBg}>
                        <View style={styles.header}>
                            <View style={styles.headerLeft}>
                                <Text style={styles.category}>{category}</Text>
                                <View style={styles.dot}></View>
                                <Text style={styles.time}>{time_format}</Text>
                            </View>
                        </View>
                    </View> */}
                </ImageBackground>
            </TouchableOpacity>
            <View style={styles.bottom}>
                <View>
                    <TouchableOpacity onPress={() => showNews(id)}>
                        <Text style={styles.title}>{title}</Text>
                    </TouchableOpacity>

                    <Text style={styles.time}> {day} {month}, {hour}:{min < 10 ? "0" + min : min}</Text>
                    {/* <View style={{ flexDirection: 'row' }}>
                        <Icon name="eye-outline" width={16} height={16} fill='gray' />
                        <Text style={{ color: 'gray', fontSize: 12, paddingLeft: 4 }}>
                            {views}
                        </Text>
                    </View> */}
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    card: {
        maxHeight: 400,
        borderRadius: 15,
        backgroundColor: '#fff',
        color: '#fff',
        margin: 15,
        marginBottom: 5,
    },
    start: {
        height: 200,
    },
    startBgImg: {
        width: '100%',
        height: 200,
        overflow: 'hidden',
        borderTopLeftRadius: 15,
        borderTopRightRadius: 15
    },
    // startBg: {
    //     flex: 1,
    //     backgroundColor: 'rgba(0,0,0,0.5)',
    //     paddingHorizontal: 16,
    //     paddingVertical: 22,
    //     paddingBottom: 15,
    //     // justifyContent: 'space-between',
    // },
    // header: {
    //     display: 'flex',
    //     flexDirection: 'row',
    //     alignItems: "center",
    //     justifyContent: 'space-between'
    // },
    // headerLeft: {
    //     display: 'flex',
    //     flexDirection: 'row',
    //     alignItems: "center",
    // },
    // headerRight: {
    //     display: 'flex',
    //     flexDirection: 'row',
    //     alignItems: "flex-start",
    // },
    // category: {
    //     color: '#fff',
    //     textAlignVertical: 'center',
    //     fontSize: 12,
    // },
    // dot: {
    //     width: 3,
    //     height: 3,
    //     backgroundColor: '#fff',
    //     borderRadius: 10,
    //     marginHorizontal: 6
    // },
    time: {
        color: '#777',
        fontSize: 12,
        marginTop: 10
    },
    // save: {
    //     width: 20,
    //     height: 24,
    //     // backgroundColor: '#fff',
    //     borderWidth: 1,
    //     borderColor: '#fff'
    // },
    title: {
        // color: '#fff',
        fontSize: 16,
        fontWeight: '700',
        // letterSpacing: 
    },
    // headerBottom: {
    //     marginTop: 15
    // },
    bottom: {
        padding: 20,
        minHeight: 100
    },

});

export default MindCard;