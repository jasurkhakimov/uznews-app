import React from 'react';
import { View, Text, StyleSheet, Button, ScrollView } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import HeaderText from '../components/HeaderText';
import { TextInput } from 'react-native-paper';


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
            theme={{colors: {primary: '#20235a'}}}
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

            <View>
                <InputComponent lable='Ваше имя'/>
                <InputComponent lable='Как с вами связаться?' placeholder='+998 99 999 99 99' type='phone-pad'/>
                <InputComponent lable='Электронная почта' />
                <InputComponent lable='Краткое описание статьи' />
                <InputComponent lable='Текст статьи' line={true} />
            </View>

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
    }
});

export default AddNewsScreen;