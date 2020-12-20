import React, { version, useState, useEffect } from 'react';
import { View, ScrollView, StyleSheet, Linking } from 'react-native';
import { Icon } from 'react-native-eva-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import {
    DrawerContentScrollView,
    DrawerItem
} from '@react-navigation/drawer';
import {
    Drawer,
    Text
} from 'react-native-paper';
import { TouchableOpacity, FlatList } from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-community/async-storage';
import LocalizationContext from '../context/LocalizationContext';
import uznews from '../api/uznews';



const DrawerHeader = ({ navigation }) => {
    return (
        <View style={{ flexDirection: 'row', padding: 16 }}>
            <Icon name='close' style={styles.close} onPress={() => navigation.closeDrawer()} width={24} height={24} fill='#20235a' />
            <Text style={styles.headerText}> UzNews </Text>
        </View>
    )
}

const ManageButtons = ({ navigation, t }) => {

    return (
        <View style={{ flexDirection: 'row', }}>
            <TouchableOpacity style={styles.headerBtn} onPress={() => navigation.navigate('SettingsTab', { screen: 'Settings', initial: true })}>
                <Text style={styles.btnText}>{t('settings')}</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.headerBtn} onPress={() => navigation.navigate('SettingsTab', { screen: 'Profile', initial: false })}>
                <Text style={styles.btnText}>{t('profile')}</Text>
            </TouchableOpacity>
        </View>
    )
}



const SendNewsBtn = ({ navigation, t }) => {
    return (
        <View>
            <TouchableOpacity style={styles.addNews} onPress={() => navigation.navigate('AddNewsTab')}>
                <Text style={styles.btnText, styles.btnNews}> {t('send_news')} </Text>
            </TouchableOpacity>
        </View>
    )
}

const AboutInfo = ({ navigation, t }) => {
    return (
        <View style={styles.info}>
            <View style={styles.infoBlock1}>
                <TouchableOpacity onPress={() => navigation.navigate('About')}>
                    <Text style={styles.infoBlock1Text}> {t('about_project')} </Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigation.navigate('Contacts')}>
                    <Text style={styles.infoBlock1Text}>{t('contacts')}</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigation.navigate('Adv')}>
                    <Text style={styles.infoBlock1Text}>{t('adv')}</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.infoBlock2}>
                <TouchableOpacity onPress={() => navigation.navigate('UseOfMaterials')}>
                    <Text style={styles.infoBlock2Text}>{t('use_of_materials')}</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigation.navigate('Privacy')}>
                    <Text style={styles.infoBlock2Text}>{t('adv')}</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigation.navigate('TermsOfUse')}>
                    <Text style={styles.infoBlock2Text}>{t('terms_of_use')}</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}



const SocialMedia = () => {
    const SocMedia = (url) => {
        return Linking.openURL(url);
    }

    return (
        <View style={styles.icons}>
            <TouchableOpacity>
                <MaterialCommunityIcons onPress={() => SocMedia('https://facebook.com/uznews.uz')} name='facebook' color='#20235a' size={21} />
            </TouchableOpacity>
            <TouchableOpacity>
                <MaterialCommunityIcons onPress={() => SocMedia('https://facebook.com/uznews.uz')} name='twitter' color='#20235a' size={21} />
            </TouchableOpacity>
            <TouchableOpacity>
                <MaterialCommunityIcons onPress={() => SocMedia('https://instagram.com/uznews')} name='instagram' color='#20235a' size={21} />
            </TouchableOpacity>
            <TouchableOpacity>
                <MaterialCommunityIcons onPress={() => SocMedia('https://www.youtube.com/c/UzNewsuzb')} name='youtube' color='#20235a' size={21} />
            </TouchableOpacity>
        </View>
    )
}

const lang = 'ru';


export function DrawerContent(props) {

    const [categories, setCategories] = useState([]);
    const [loaded, setLoaded] = useState(false);
    const { t, locale, setLocale } = React.useContext(LocalizationContext);
    const [lang_main, setLangMain] = useState(locale.substring(0, 2))

    let cleanupFunction = false;

    const getData = () => {
        try {
            uznews.get('/category', {
                params: {
                    language: locale.substring(0, 2) != 'uz' && locale.substring(0, 2) != 'ru' ? 'ru' : locale.substring(0, 2)
                }
            }).then(response => {
                console.log('here');
                setCategories(response.data);
                // console.log(categories);
            });
        } catch (err) {
            console.error('Error here category api', err);
        }
    }

    if (locale.substring(0, 2) != lang_main) {
        console.log('here123');
        setLangMain(locale.substring(0, 2))
        getData();
    }

    useEffect(() => {

        getData();

    }, [])

    const CategoriesList = () => {

        const nav = props.navigation;

        const RenderItem = ({ item }) => (
            <Drawer.Item
                style={styles.drawerItem}
                label={item['title_' + lang]}
                onPress={() => nav.navigate('Category', { id: item.id, category_title: item['title_' + lang] })}
            />
        );


        if (categories) {
            return (
                <View>
                    {
                        categories.map((item) => {
                            return (
                                <RenderItem item={item} key={item.id + lang} />
                            );
                        })
                    }
                </View>
            )

        } else {
            return null
        }
    };

    return (
        <View style={{ flex: 1 }}>
            <DrawerContentScrollView {...props} showsVerticalScrollIndicator={false}>

                <DrawerHeader navigation={props.navigation} />

                <ManageButtons navigation={props.navigation} t={t} lang_main={lang_main}/>

                <CategoriesList navigation={props.navigation} getData={getData}/>

                <SendNewsBtn navigation={props.navigation} t={t}/>
                <AboutInfo navigation={props.navigation} t={t}/>

                <Drawer.Section>
                    <SocialMedia />
                </Drawer.Section>
            </DrawerContentScrollView>

        </View>
    )
}

const styles = StyleSheet.create({
    headerText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#20235a'
    },
    icons: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        paddingVertical: 16,
        paddingHorizontal: 24
    },
    infoBlock1: {
        flexDirection: 'row',
        // paddingLeft: 20,
        overflow: 'hidden',
        marginBottom: 12,
        justifyContent: 'space-around'
    },
    infoBlock1Text: {
        fontWeight: 'bold',
        color: '#20235a',
        fontSize: 14,
        marginBottom: 12
    },
    infoBlock2: {
        paddingLeft: 20
    },
    infoBlock2Text: {
        fontWeight: 'bold',
        color: '#20235a',
        fontSize: 14,
        marginBottom: 12
    },
    headerBtn: {
        backgroundColor: '#475681',
        paddingVertical: 8,
        paddingHorizontal: 16,
        borderRadius: 50,
        marginLeft: 20,
        marginVertical: 20
    },
    btnText: {
        fontWeight: 'bold',
        color: '#fff'
    },
    addNews: {
        flex: 1,
        backgroundColor: '#475681',
        alignItems: 'center',
        paddingVertical: 10,
        margin: 20,
        borderRadius: 50
    },
    btnNews: {
        fontWeight: 'bold',
        color: '#fff',
        fontSize: 16
    },
    close: {
        marginRight: '30%'
    },
    drawerItem: {
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
        marginVertical: 0,
        paddingVertical: 8,
        color: 'red'
    }
})