import AsyncStorage from '@react-native-community/async-storage';


export const getUserId = () => {

    const user_id_func = async () => {
        try {
            let user_id = await AsyncStorage.getItem('@user_id')

            return user_id ? user_id : ""
        } catch (e) {
            console.log(e);
        }
    }

    return user_id_func();
}