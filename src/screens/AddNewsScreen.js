import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Button, ScrollView, ActivityIndicator, Image } from 'react-native';
import { FlatList, TouchableOpacity } from 'react-native-gesture-handler';
import HeaderText from '../components/HeaderText';
import { TextInput } from 'react-native-paper';
import { Picker } from '@react-native-community/picker';
import { Icon } from 'react-native-eva-icons';
import { withNavigation } from 'react-navigation';
import AsyncStorage from '@react-native-community/async-storage';
import * as ImagePicker from 'expo-image-picker';
import uznews from '../api/uznews';
import { getUserId } from '../api/getUserId';
import { Snackbar } from 'react-native-paper';

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

    const [categories, setCategories] = useState([]);
    const [loaded, setLoaded] = useState(false);
    const [category, setCategory] = useState('');
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');
    const [shortDesc, setShortDesc] = useState('');
    const [text, setText] = useState('');
    const [name, setName] = useState('');
    const [image, setImage] = useState(null);
    const [visible, setVisible] = useState(false);
    const [snackText, setSnackText] = useState('-');
    const [user_id, setUserId] = useState("");

    let cleanupFunction = false;

    const getData = async () => {
        try {
            const value = await AsyncStorage.getItem('@categories');

            if (value) {
                setCategories(JSON.parse(value));
                setLoaded(true);
            }

        } catch (e) {
            console.log(e);
        }
    }

    const send = async () => {

        if (phone.length > 0 && email.length > 0 && shortDesc.length > 0 && text.length > 0 && name.length > 0 && category != '-') {
            await getUserId().then(async (user_id) => {
                try {
                    let url = '/post/' + user_id + "/";

                    await uznews.post(url,
                        {
                            "author": user_id,
                            "author_name": name,
                            "author_num": phone,
                            "author_mail": email,
                            "article_type": 0,
                            "desc": shortDesc,
                            "text": text,
                            "latitude": 60.0256556,
                            "longitude": -45.54566
                        }
                    ).then((response) => {
                        if (response.status == 201) {
                            setSnackText('Новость отправлена успешно, спасибо!')
                            setVisible(true);
                            setName('');
                            setEmail('');
                            setShortDesc('');
                            setText('');
                            setCategory('-');

                        }
                    }).catch(function (error) {
                        console.log(error);
                        setSnackText('Произошла ошибка, повторите позже пожайлуста')
                        setVisible(true);
                    });
                } catch (err) {
                    console.log(err);
                    setSnackText('Произошла ошибка, повторите позже пожайлуста')
                    setVisible(true);
                }
            })
        } else {
            setVisible(true);
            setSnackText('Заполните все поля пожайлуста')
        }

    }

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        }).then((result) => {

            if (!result.cancelled) {
                setImage(result.uri);
            }
        });


    };

    useEffect(() => {

        getData();

        (async () => {
            if (Platform.OS !== 'web') {
                const { status } = await ImagePicker.requestCameraRollPermissionsAsync();
                if (status !== 'granted') {
                    alert('Sorry, we need camera roll permissions to make this work!');
                }
            }
        })();

    }, [])

    if (!loaded) {
        return (
            <View style={styles.container}>
                <ActivityIndicator size={30} color='#20235a' />
            </View>
        )
    } else {
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
                    <TextInput
                        style={styles.input}
                        autoCapitalize='none'
                        autoCorrect={false}
                        label='Ваше имя'
                        keyboardType={'default'}
                        selectionColor='#74d9ff'
                        theme={{ colors: { primary: '#20235a' } }}
                        onChangeText={text => setName(text)}
                    />
                    <TextInput
                        style={styles.input}
                        autoCapitalize='none'
                        autoCorrect={false}
                        lable='Как с вами связаться?'
                        placeholder='+998 99 999 99 99'
                        keyboardType='phone-pad'
                        selectionColor='#74d9ff'
                        theme={{ colors: { primary: '#20235a' } }}
                        onChangeText={text => setPhone(text)}
                    />
                    <TextInput
                        style={styles.input}
                        autoCapitalize='none'
                        autoCorrect={false}
                        label='Электронная почта'
                        keyboardType={'default'}
                        selectionColor='#74d9ff'
                        theme={{ colors: { primary: '#20235a' } }}
                        onChangeText={text => setEmail(text)}
                    />
                    <TextInput
                        style={styles.input}
                        autoCapitalize='none'
                        autoCorrect={false}
                        label='Краткое описание статьи'
                        keyboardType={'default'}
                        selectionColor='#74d9ff'
                        theme={{ colors: { primary: '#20235a' } }}
                        onChangeText={text => setShortDesc(text)}
                    />
                    <TextInput
                        style={styles.input}
                        autoCapitalize='none'
                        autoCorrect={false}
                        label='Текст статьи'
                        keyboardType={'default'}
                        selectionColor='#74d9ff'
                        multiline={true}
                        theme={{ colors: { primary: '#20235a' } }}
                        onChangeText={text => setText(text)}
                    />

                    <Picker
                        selectedValue={category}
                        style={styles.picker}
                        onValueChange={(itemValue, itemIndex) => {
                            setCategory(itemValue);
                            console.log(category);
                        }}
                    >
                        <Picker.Item label="-" value="-" />
                        {
                            categories.map((item) => {
                                return (
                                    <Picker.Item label={item.title_ru} value={item.id} key={item.id} />
                                );
                            })
                        }

                    </Picker>
                    <View style={styles.hr}></View>
                </View>
                <Text style={styles.attachText}>Прикрепить:</Text>
                <View style={styles.files}>
                    <TouchableOpacity style={[styles.fileItem, styles.ml15]} onPress={pickImage}>
                        <Icon name="image" width={20} height={20} fill='#20235a' />
                        <Text style={styles.fileText}> Image </Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.img}>
                    {image && <Image source={{ uri: image }} style={{ width: '100%', height: 200 }} />}
                </View>
                <TouchableOpacity style={styles.btn} onPress={send}>
                    <Text style={styles.btnText}> Отправить </Text>
                </TouchableOpacity>
                
                <Snackbar
                    visible={visible}
                    onDismiss={() => setVisible(false)}
                    action={{
                        label: 'ок',
                        onPress: () => {
                            // Do something
                        },
                    }}
                    style={{
                        backgroundColor: '#475681'
                    }}
                >
                    {snackText}
                </Snackbar>

            </ScrollView>
        )
    }


};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff'
    },
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
    },
    img: {
        margin: 15
    }
});

export default withNavigation(AddNewsScreen);