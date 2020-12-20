import React, { useState } from 'react';
import { Text, View, StyleSheet, ImageBackground, TouchableOpacity, TouchableWithoutFeedback } from 'react-native';
import { Dimensions, Alert } from "react-native";
import { Icon } from 'react-native-eva-icons';
import { uznews_url } from '../api/config';
import uznews from '../api/uznews';
import LocalizationContext from '../context/LocalizationContext';


export const EvaIcon = ({ icon }) => (
    <Icon name={icon} width={20} height={20} fill='#fff' />
);


const NewsCard = ({ user_id, title, image, category, time, id, showNews, book = false }) => {

    const [bookmark, setBookmark] = useState({ state: book, icon: book ? 'bookmark' : 'bookmark-outline' });
    const { t, locale, setLocale } = React.useContext(LocalizationContext);

    const { icon } = bookmark;

    

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
                let url = `/article/${id}`
                let params = {
                    "user": user_id,
                    "bookmark": "add",
                    "lite": true,
                }

                var data = JSON.stringify({ "user": user_id, "bookmark": "remove", "lite": "true" });

                var config = {
                    method: 'put',
                    url: uznews_url + `/api/v1/article/${id}/`,
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    data: data
                };


                uznews(config)
                    .then(function (response) {
                        if (response.status == 202) {
                            setBookmark({ state: !bookmark.state, icon: 'bookmark-outline' })
                            Alert.alert(
                                t('bookmark'),
                                t('removed_from_bookmark'),
                                [
                                  { text: "OK" }
                                ],
                                { cancelable: false }
                              );
                        }
                    })
                    .catch(function (error) {
                        console.log(error);
                    });
        } else {


            if (user_id) {
                let url = `/article/${id}`
                let params = {
                    "user": user_id,
                    "bookmark": "add",
                    "lite": true,
                }


                var data = JSON.stringify({ "user": user_id, "bookmark": "add", "lite": "true" });


                var config = {
                    method: 'put',
                    url: uznews_url + `/api/v1/article/${id}/`,
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    data: data
                };


                uznews(config)
                    .then(function (response) {
                        if (response.status == 202) {
                            setBookmark({ state: !bookmark.state, icon: 'bookmark' });
                            Alert.alert(
                                t('bookmark'),
                                t('added_to_bookmark'),
                                [
                                  { text: "OK" }
                                ],
                                { cancelable: false }
                              );
                        }
                    })
                    .catch(function (error) {
                        console.log(error);
                    });
            }
        }
    }



    return (
        <View style={styles.viewStyle} >

            <ImageBackground style={styles.img} source={{ uri: image }}>
                <TouchableOpacity activeOpacity={1} style={styles.bgView} onPress={() => showNews(id)}>
                    <View style={styles.header}>
                        <View style={styles.headerLeft}>
                            <Text style={styles.category}>{category}</Text>
                            <View style={styles.dot}></View>
                            <Text style={styles.time}> {day} {month}, {hour}:{min < 10 ? "0" + min : min}</Text>
                        </View>
                        {user_id ?
                            <TouchableOpacity style={styles.headerRight} onPress={() => iconChange()}>
                                <EvaIcon icon={icon} />
                            </TouchableOpacity>
                            : null}
                    </View>
                    <View style={styles.bottom}>
                        <Text style={styles.title}>{title}</Text>
                    </View>
                </TouchableOpacity>
            </ImageBackground>
        </View>
    )
}

const styles = StyleSheet.create({
    viewStyle: {
        borderRadius: 20,
        backgroundColor: '#fff',
        color: '#fff',
        margin: 15,
        marginBottom: 5,
        maxHeight: 210
    },
    img: {
        display: 'flex',
        width: '100%',
        height: '100%',
        borderRadius: 15,
        overflow: 'hidden',
    },
    bgView: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.5)',
        paddingHorizontal: 16,
        paddingVertical: 22,
        paddingBottom: 15,
        justifyContent: 'space-between',
    },
    header: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: "center",
        justifyContent: 'space-between'
    },
    headerLeft: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: "center",
    },
    headerRight: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: "flex-start",
    },
    category: {
        color: '#fff',
        textAlignVertical: 'center',
        fontSize: 12
    },
    dot: {
        width: 3,
        height: 3,
        backgroundColor: '#fff',
        borderRadius: 10,
        marginHorizontal: 6
    },
    time: {
        color: '#fff',
        fontSize: 12
    },
    save: {
        width: 20,
        height: 24,
        // backgroundColor: '#fff',
        borderWidth: 1,
        borderColor: '#fff'
    },
    title: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '700',
        letterSpacing: 0.8
    }
});

export default NewsCard;