import React from 'react';
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
import { TouchableOpacity } from 'react-native-gesture-handler';
import SettingsScreen from '../screens/SettingsScreen';

const DrawerHeader = ({ navigation }) => {
    return (
        <View style={{ flexDirection: 'row', padding: 16 }}>
            <Icon name='close' style={styles.close} onPress={() => navigation.closeDrawer()} width={24} height={24} fill='#20235a' />
            <Text style={styles.headerText}> UzNews </Text>
        </View>
    )
}

const ManageButtons = ({navigation}) => {
    return (
        <View style={{ flexDirection: 'row', }}>
            <TouchableOpacity style={styles.headerBtn} onPress={() => navigation.navigate('SettingsTab', {screen: 'Settings', initial: true})}>
                <Text style={styles.btnText}>Настройки</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.headerBtn} onPress={() => navigation.navigate('SettingsTab', {screen: 'Profile', initial: false})}>
                <Text style={styles.btnText}>Профиль</Text>
            </TouchableOpacity>
        </View>
    )
}


 
const SendNewsBtn = ({navigation}) => {
    return (
        <View>
            <TouchableOpacity style={styles.addNews} onPress={() => navigation.navigate('AddNewsTab')}>
                <Text style={styles.btnText, styles.btnNews}> Прислать новость </Text>
            </TouchableOpacity>
        </View>
    )
}

const AboutInfo = ({navigation}) => {
    return (
        <View style={styles.info}>
            <View style={styles.infoBlock1}>
                <TouchableOpacity onPress={() => navigation.navigate('About')}>
                    <Text style={styles.infoBlock1Text}>О проекте</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigation.navigate('Contacts')}>
                    <Text style={styles.infoBlock1Text}>Контакты</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigation.navigate('Adv')}>
                    <Text style={styles.infoBlock1Text}>Реклама</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.infoBlock2}>
                <TouchableOpacity onPress={() => navigation.navigate('UseOfMaterials')}>
                    <Text style={styles.infoBlock2Text}>Использование материалов</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigation.navigate('Privacy')}>
                    <Text style={styles.infoBlock2Text}>Политика конфиденциальности</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigation.navigate('TermsOfUse')}>
                    <Text style={styles.infoBlock2Text}>Условия пользования</Text>
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




export function DrawerContent(props) {

    return (
        <View style={{ flex: 1 }}>
            <DrawerContentScrollView {...props}>

                <DrawerHeader navigation={props.navigation} />

                <ManageButtons navigation={props.navigation}/>
                <SendNewsBtn navigation={props.navigation}/>
                <AboutInfo navigation={props.navigation}/>


            </DrawerContentScrollView>
            <Drawer.Section>
                <SocialMedia />
            </Drawer.Section>
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
    }
})