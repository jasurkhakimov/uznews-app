import React, { useState } from 'react';
import { Text, View, StyleSheet, ImageBackground, TouchableOpacity, TouchableWithoutFeedback } from 'react-native';
import { Dimensions } from "react-native";
import { Icon } from 'react-native-eva-icons';
import { uznews_url } from '../api/config';


export const EvaIcon = ({ icon }) => (
    <Icon name={icon} width={20} height={20} fill='#fff' />
);


const NewsCard = ({title, image, category, time, id, showNews}) => {

    const [bookmark, setBookmark] = useState({state: false, icon: 'bookmark-outline'});

    const {icon} = bookmark;

    const time_arr = time.split("T");
    const time_format = time_arr[1].slice(0, 5);

    const iconChange = () => {
        if (bookmark.state) {
            return setBookmark({state: !bookmark.state, icon: 'bookmark-outline'});
        }else{
            return setBookmark({state: !bookmark.state, icon: 'bookmark'});
        }
    }



    return (
        <View style={styles.viewStyle} >

            <ImageBackground style={styles.img}  source={{ uri: uznews_url + image }}>
                <TouchableOpacity activeOpacity={1} style={styles.bgView}  onPress={() => showNews(id)}>
                    <View style={styles.header}>
                        <View style={styles.headerLeft}>
                            <Text style={styles.category}>{category}</Text>
                            <View style={styles.dot}></View>
                            <Text style={styles.time}>{time_format}</Text>
                        </View>
                        <TouchableOpacity style={styles.headerRight} onPress={() => iconChange()}> 
                            <EvaIcon icon={icon} />
                        </TouchableOpacity>
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