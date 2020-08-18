import React from 'react';
import { View, Text, StyleSheet, Button, ScrollView } from 'react-native';
import { FlatList, TouchableOpacity } from 'react-native-gesture-handler';
import HeaderText from '../components/HeaderText';
import { TextInput } from 'react-native-paper';
import { Picker } from '@react-native-community/picker';
import { Icon } from 'react-native-eva-icons';
import { withNavigation } from 'react-navigation';

const textArr = [
    'У вас есть новость или фотографии, которыми вы желаете поделиться с другими читателями «Uznews.uz»? Вам удалось запечатлеть интересное событие, факт или происшествие?',
    'Вы можете воспользоваться приведенной ниже формой, чтобы рассказать нам об этом и прислать фотографии. Объемные файлы и видео можно разместить на одном из файлообменных сайтов и прислать нам ссылку.',
    'Не забудьте указать свои контактные данные, чтобы мы могли связаться с вами для уточнения деталей. Просим вас четко написать, хотите вы, чтобы в материале были указаны ваше имя, должность и другие данные, или нет. Редакция «Uznews.uz» не гарантирует публикацию всех сообщений, присылаемых читателями.'
]




const TextComponent = ({ text, italic }) => {

    return (
        <Text style={[styles.text, italic ? { fontStyle: 'italic' } : '']}>
            {text}
        </Text>
    );
};

const InputComponent = ({ lable, placeholder, type, line }) => {
    return (
        <TextInput
            style={styles.input}
            autoCapitalize='none'
            autoCorrect={false}
            label={lable}
            placeholder={placeholder}
            keyboardType={type ? type : 'default'}
            selectionColor='#74d9ff'
            multiline={line}
            theme={{ colors: { primary: '#20235a' } }}
        />
    )
}




const AddNewsScreen = ({ navigation }) => {

    return (
        <ScrollView showsVerticalScrollIndicator={false}>
            <View style={styles.headerText}>
                <HeaderText text='Прислать новость' />
            </View>

            <View>
                <TextComponent text={textArr[0]} />
                <TextComponent text={textArr[1]} />
                <TextComponent text={textArr[2]} italic={1} />
            </View>

            <View style={styles.form}>
                <InputComponent lable='Ваше имя' />
                <InputComponent lable='Как с вами связаться?' placeholder='+998 99 999 99 99' type='phone-pad' />
                <InputComponent lable='Электронная почта' />
                <InputComponent lable='Краткое описание статьи' />
                <InputComponent lable='Текст статьи' line={true} />
                <Picker
                    // selectedValue={}
                    style={styles.picker}
                // onValueChange={(itemValue, itemIndex) =>
                //     this.setState({ language: itemValue })
                // }
                >
                    <Picker.Item label="Java" value="java" />
                    <Picker.Item label="JavaScript" value="js" />
                </Picker>
                <View style={styles.hr}></View>
            </View>
            <Text style={styles.attachText}>Прикрепить:</Text>
            <View style={styles.files}>
                <TouchableOpacity style={[styles.fileItem, styles.ml15]}>
                    <Icon name="image" width={20} height={20} fill='#20235a' />
                    <Text style={styles.fileText}> Image </Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.fileItem}>
                    <Icon name="file-outline" width={20} height={20} fill='#20235a' />
                    <Text style={styles.fileText}> File </Text>
                </TouchableOpacity>
            </View>
            <TouchableOpacity style={styles.btn}>
                <Text style={styles.btnText}> Отправить </Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.btn, styles.btnOutline]}>
                <Text style={[styles.btnText, styles.btnOutlineText]}> Отправить инкогнито </Text>
            </TouchableOpacity>

        </ScrollView>
    )
};

const styles = StyleSheet.create({
    headerText: {
        marginVertical: 10,
    },
    text: {
        color: '#333333',
        marginBottom: 10,
        lineHeight: 20,
        marginHorizontal: 15,
        textAlign: 'justify',
        fontSize: 15
    },
    input: {
        backgroundColor: 'transparent',
        padding: 0,
        marginHorizontal: 15
    },
    picker: {
        marginHorizontal: 15,
        height: 60,
        color: '#666',
        paddingLeft: 5,
    },
    form: {
        marginBottom: 20
    },
    files: {
        flexDirection: 'row',
        // justifyContent: 'center',
        marginBottom: 20
    },
    hr: {
        borderBottomColor: '#aaa',
        borderBottomWidth: 1,
        // backgroundColor: '#999',
        marginHorizontal: 15,
    },
    fileItem: {
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#20235a',
        borderRadius: 5,
        padding: 12,
        width: 60,
        marginLeft: 5
    },
    fileText: {
        fontSize: 10,
        color: '#20235a'
    },
    ml15: {
        marginLeft: 15
    },
    attachText: {
        marginLeft: 15,
        marginBottom: 10,
        fontWeight: 'bold',
        color: '#888'
    },
    btn: {
        marginHorizontal: 15,
        justifyContent: 'center',
        flexDirection: 'row',
        marginBottom: 10,
        backgroundColor: '#475681',
        paddingVertical: 12,
        borderRadius: 50,
        borderWidth: 2,
        borderColor: '#475681'
    },
    btnOutline: {
        backgroundColor: 'transparent',
    },
    btnText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 16,
        letterSpacing: 0.5
    },
    btnOutlineText: {
        color: '#475681'
    }
});

export default withNavigation(AddNewsScreen);