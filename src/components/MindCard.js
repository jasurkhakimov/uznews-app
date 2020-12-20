import React, { useState } from 'react';
import { Text, View, StyleSheet, ImageBackground, TouchableOpacity, Image } from 'react-native';
import { Icon } from 'react-native-eva-icons';
import { Avatar } from 'react-native-paper';
import {uznews_url} from '../api/config';




const EvaIcon = ({ icon }) => (
    <Icon name={icon} width={20} height={20} fill='#fff' />
);

const MindCard = ({ id, name, prof, title, image, category, time, photo, showNews }) => {

    const [bookmark, setBookmark] = useState({ state: false, icon: 'bookmark-outline' });

    const { icon } = bookmark;

    const time_arr = time.split("T");
    const time_format = time_arr[1].slice(0, 5);

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
                    <View style={styles.startBg}>
                        <View style={styles.header}>
                            <View style={styles.headerLeft}>
                                <Text style={styles.category}>{category}</Text>
                                <View style={styles.dot}></View>
                                <Text style={styles.time}>{time_format}</Text>
                            </View>
                        </View>
                        <View style={styles.headerBottom}>
                            <Text style={styles.title}>
                                {title}
                            </Text>
                        </View>
                    </View>
                </ImageBackground>
            </TouchableOpacity>
            <View style={styles.bottom}>
                <Avatar.Image size={90} source={{ uri: uznews_url + '/upload/' + photo }} style={styles.bottomImg} />
                <View style={styles.bottomText}>
                    <Text style={styles.name}>{name}</Text>
                    <Text style={styles.position}>{prof}</Text>
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
    startBg: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.5)',
        paddingHorizontal: 16,
        paddingVertical: 22,
        paddingBottom: 15,
        // justifyContent: 'space-between',
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
        fontSize: 12,
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
        fontSize: 12,
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
    },
    headerBottom: {
        marginTop: 15
    },
    bottom: {
        alignItems: 'center',
        paddingTop: 50,
        paddingBottom: 40,
    },
    bottomImg: {
        position: 'absolute',
        top: -60,
        zIndex: 3,
    },
    bottomText: {
        alignItems: 'center'
    },
    name: {
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 10
    },
    position: {
        paddingHorizontal: 25,
        textAlign: 'center',
        fontSize: 15 
    },
});

export default MindCard;