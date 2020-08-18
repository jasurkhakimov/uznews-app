import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import { FlatList, TouchableOpacity } from 'react-native-gesture-handler';
import { Icon } from 'react-native-eva-icons';
import HeaderText from '../components/HeaderText';
import { Picker } from '@react-native-community/picker';
import { Switch } from 'react-native-paper';


const ProfileComponent = ({ navigation }) => {

    return (

        <TouchableOpacity style={styles.profile} onPress={() => navigation.navigate('Profile')}>
            <Icon name="person" width={20} height={20} fill='#fff' />
            <Text style={styles.profileText}> Профиль </Text>
        </TouchableOpacity>
    );

};

const SettingsComponent = () => {

    const [isSwitchOn, setIsSwitchOn] = React.useState(false);

    const onToggleSwitch = () => setIsSwitchOn(!isSwitchOn);

    return (
        <View>
            <HeaderText text='Настройки' />
            <View style={styles.settingContainer}>
                <View style={styles.settingElement}>
                    <Text style={styles.settingText}>Размер шрифта </Text>
                    <Picker
                        // selectedValue={}
                        style={styles.picker}
                    // onValueChange={(itemValue, itemIndex) =>
                    //     this.setState({ language: itemValue })
                    // }
                    >
                        <Picker.Item label="маленький" value="small" />
                        <Picker.Item label="средний" value="normal" />
                        <Picker.Item label="большой" value="big" />
                    </Picker>
                </View>
                <View style={styles.settingElement}>
                    <Text style={styles.settingText}>Размер шрифта </Text>
                    <Picker
                        // selectedValue={}
                        style={styles.picker}
                    // onValueChange={(itemValue, itemIndex) =>
                    //     this.setState({ language: itemValue })
                    // }
                    >
                        <Picker.Item label="русский" value="small" />
                        <Picker.Item label="узбекский" value="normal" />
                    </Picker>
                </View>
                <View style={styles.settingElement}>
                    <Text style={styles.settingText}>Оповещания </Text>
                    <Switch style={styles.switch} value={isSwitchOn} onValueChange={onToggleSwitch} />
                </View>
            </View>
            <View style={styles.settingAdvanced}>
                <TouchableOpacity style={styles.advBtn}>
                    <Text style={styles.settingText}>Настройка вашей ленты </Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.advBtn}>
                    <Text style={styles.settingText}>Помощь </Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.advBtn}>
                    <Text style={styles.settingText}>Обратная связь </Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.advBtn}>
                    <Text style={styles.settingText}>Поделится </Text>
                </TouchableOpacity>
            </View>
        </View>

    );
}



const SettingsScreen = ({ navigation }) => {

    return (
        <View style={styles.container}>
            <ProfileComponent navigation={navigation}/>
            <SettingsComponent />
        </View>
    )
};

const styles = StyleSheet.create({
    profile: {
        marginHorizontal: 15,
        flexDirection: 'row',
        backgroundColor: '#475681',
        padding: 15,
        marginVertical: 12,
        borderRadius: 50,
        alignItems: 'center',
        justifyContent: 'center'
    },
    profileText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold'
    },
    settingContainer: {
        marginHorizontal: 15,
        marginTop: 15
    },
    settingElement: {
        marginBottom: 5,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    settingText: {
        fontSize: 14,
        fontWeight: 'bold',
        color: '#333333'
    },
    picker: {
        width: 130,
        height: 30,
    },
    switch: {
        height: 30,
    },
    settingAdvanced: {
        marginTop: 20,
        marginHorizontal: 15
    },
    advBtn: {
        marginBottom: 10
    }
});

export default SettingsScreen;