import React from 'react';
import { Image } from 'react-native';
import MainScreen from '../screens/MainScreen';
import NewsScreen from '../screens/NewsScreen';
import HistoryScreen from '../screens/HistoryScreen';
import SettingsScreen from '../screens/SettingsScreen';
import BookmarkScreen from '../screens/BookmarkScreen';
import AddNewsScreen from '../screens/AddNewsScreen';
import { createStackNavigator } from '@react-navigation/stack';
import { Icon } from 'react-native-eva-icons';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';





const MainStack = createStackNavigator();

const MainStackScreen = ({ navigation }) => {
    return (
        <MainStack.Navigator screenOptions={{
            headerStyle: {
                backgroundColor: '#fff',
                elevation: 0, // remove shadow on Android
                shadowOpacity: 0,

            },
            headerTintColor: '#fff',
            headerTitleStyle: {
                fontWeight: 'bold'
            },
            headerBackTitleVisible: false,
            headerTitleAlign: 'center',
            headerTitle: (props) => <LogoTitle {...props} />,

        }}>
            <MainStack.Screen name='Main' component={MainScreen} options={{
                headerLeft: () => {
                    return (
                        <TouchableOpacity>
                            <Icon name='menu-outline' onPress={() => navigation.openDrawer()} width={24} height={24} fill='#20235a' />
                        </TouchableOpacity>
                    )
                },
                headerLeftContainerStyle: {
                    padding: 10
                },
                headerRightContainerStyle: {
                    padding: 10
                },
                headerRight: () => {
                    return (
                        <TouchableOpacity>
                            <Icon name='search-outline' width={24} height={24} fill='#20235a' />
                        </TouchableOpacity>
                    )
                },

            }} />
            <MainStack.Screen name='News' component={NewsScreen} options={{
                headerTitle: 'Новости',
                headerTintColor: '#20235a',
                headerStyle: {
                    // backgroundColor: 'transparent',
                    elevation: 0, // remove shadow on Android
                    shadowOpacity: 0,
                },
            }} />
        </MainStack.Navigator>
    )
}

const HistoryStack = createStackNavigator();

const HistoryStackScreen = ({ navigation }) => {
    return (
        <HistoryStack.Navigator screenOptions={{
            headerStyle: {
                backgroundColor: '#fff',
                elevation: 0, // remove shadow on Android
                shadowOpacity: 0,

            },
            headerTintColor: '#fff',
            headerTitleStyle: {
                fontWeight: 'bold'
            },
            headerBackTitleVisible: false,
            headerTitleAlign: 'center',
            headerTitle: (props) => <LogoTitle {...props} />,

        }}>
            <HistoryStack.Screen name='History' component={HistoryScreen} options={{
                headerLeft: () => {
                    return (
                        <TouchableOpacity>
                            <Icon name='menu-outline' onPress={() => navigation.openDrawer()} width={24} height={24} fill='#20235a' />
                        </TouchableOpacity>
                    )
                },
                headerLeftContainerStyle: {
                    padding: 10
                }
            }} />
            {/* <HistoryStack.Screen name='News' component={NewsScreen} options={{
                headerTitle: 'Новости',
                headerTintColor: '#20235a',
                headerStyle: {
                    // backgroundColor: 'transparent',
                    elevation: 0, // remove shadow on Android
                    shadowOpacity: 0,
                },
            }} /> */}
        </HistoryStack.Navigator>
    )
}

const AddNewsStack = createStackNavigator();

const AddNewsStackScreen = ({ navigation }) => {
    return (
        <AddNewsStack.Navigator screenOptions={{
            headerStyle: {
                backgroundColor: '#fff',
                elevation: 0, // remove shadow on Android
                shadowOpacity: 0,

            },
            headerTintColor: '#fff',
            headerTitleStyle: {
                fontWeight: 'bold'
            },
            headerBackTitleVisible: false,
            headerTitleAlign: 'center',
            headerTitle: (props) => <LogoTitle {...props} />,

        }}>
            <AddNewsStack.Screen name='AddNews' component={AddNewsScreen} options={{
                headerLeft: () => {
                    return (
                        <TouchableOpacity>
                            <Icon name='menu-outline' onPress={() => navigation.openDrawer()} width={24} height={24} fill='#20235a' />
                        </TouchableOpacity>
                    )
                },
                headerLeftContainerStyle: {
                    padding: 10
                }
            }} />
            {/* <HistoryStack.Screen name='News' component={NewsScreen} options={{
                headerTitle: 'Новости',
                headerTintColor: '#20235a',
                headerStyle: {
                    // backgroundColor: 'transparent',
                    elevation: 0, // remove shadow on Android
                    shadowOpacity: 0,
                },
            }} /> */}
        </AddNewsStack.Navigator>
    )
}

const BookmarkStack = createStackNavigator();

const BookmarkStackScreen = ({ navigation }) => {
    return (
        <BookmarkStack.Navigator screenOptions={{
            headerStyle: {
                backgroundColor: '#fff',
                elevation: 0, // remove shadow on Android
                shadowOpacity: 0,

            },
            headerTintColor: '#fff',
            headerTitleStyle: {
                fontWeight: 'bold'
            },
            headerBackTitleVisible: false,
            headerTitleAlign: 'center',
            headerTitle: (props) => <LogoTitle {...props} />,

        }}>
            <BookmarkStack.Screen name='Bookmark' component={BookmarkScreen} options={{
                headerLeft: () => {
                    return (
                        <TouchableOpacity>
                            <Icon name='menu-outline' onPress={() => navigation.openDrawer()} width={24} height={24} fill='#20235a' />
                        </TouchableOpacity>
                    )
                },
                headerLeftContainerStyle: {
                    padding: 10
                }
            }} />
            {/* <HistoryStack.Screen name='News' component={NewsScreen} options={{
                headerTitle: 'Новости',
                headerTintColor: '#20235a',
                headerStyle: {
                    // backgroundColor: 'transparent',
                    elevation: 0, // remove shadow on Android
                    shadowOpacity: 0,
                },
            }} /> */}
        </BookmarkStack.Navigator>
    )
}

const SettingsStack = createStackNavigator();

const SettingsStackScreen = ({ navigation }) => {
    return (
        <SettingsStack.Navigator screenOptions={{
            headerStyle: {
                backgroundColor: '#fff',
                elevation: 0, // remove shadow on Android
                shadowOpacity: 0,

            },
            headerTintColor: '#fff',
            headerTitleStyle: {
                fontWeight: 'bold'
            },
            headerBackTitleVisible: false,
            headerTitleAlign: 'center',
            headerTitle: (props) => <LogoTitle {...props} />,

        }}>
            <SettingsStack.Screen name='Settings' component={SettingsScreen} options={{
                headerLeft: () => {
                    return (
                        <TouchableOpacity>
                            <Icon name='menu-outline' onPress={() => navigation.openDrawer()} width={24} height={24} fill='#20235a' />
                        </TouchableOpacity>
                    )
                },
                headerLeftContainerStyle: {
                    padding: 10
                }
            }} />
            {/* <HistoryStack.Screen name='News' component={NewsScreen} options={{
                headerTitle: 'Новости',
                headerTintColor: '#20235a',
                headerStyle: {
                    // backgroundColor: 'transparent',
                    elevation: 0, // remove shadow on Android
                    shadowOpacity: 0,
                },
            }} /> */}
        </SettingsStack.Navigator>
    )
}



const LogoTitle = () => {
    return (
        <Image
            style={{ width: 100, }}
            source={require('../../assets/logo.png')}
            resizeMode='contain'
        />
    );
}











const Tab = createMaterialBottomTabNavigator();


const MainTabScreen = () => {
    return (
        <Tab.Navigator
            initialRouteName="Main"
            activeColor="#74d9ff"
            inactiveColor="#20235a"
            style={{ backgroundColor: '#fff' }}
            barStyle={{
                backgroundColor: '#fff', 
                elevation: 0,
                shadowOpacity: 0,
                // height: 54,
            }}
            labeled={true}

        >
            <Tab.Screen
                name="MainTab"
                component={MainStackScreen}
                options={{
                    tabBarLabel: 'Главная',
                    tabBarIcon: ({ color }) => (
                        <Icon name="home-outline" fill={color} width={26} height={26} />
                    ),
                }}
            />
            <Tab.Screen
                name="HistoryTab"
                component={HistoryStackScreen}
                options={{
                    tabBarLabel: 'История',
                    tabBarIcon: ({ color }) => (
                        <Icon name="eye-outline" fill={color} width={26} height={26} />
                    ),
                }}
            />
            <Tab.Screen
                name="AddNewsTab"
                component={AddNewsStackScreen}
                options={{
                    tabBarLabel: 'Написать',
                    tabBarIcon: ({ color }) => (
                        <Icon name="edit-outline" fill={color} width={26} height={26} />
                    ),
                }}
            />
            <Tab.Screen
                name="BookmarkTab"
                component={BookmarkStackScreen}
                options={{
                    tabBarLabel: 'Закладки',
                    tabBarIcon: ({ color }) => (
                        <Icon name="bookmark-outline" fill={color} width={26} height={26} />
                    ),
                }}
            />
            <Tab.Screen
                name="SettingsTab"
                component={SettingsStackScreen}
                options={{
                    tabBarLabel: 'Настройки',
                    tabBarIcon: ({ color }) => (
                        <Icon name="settings-outline" fill={color} width={26} height={26} />
                    ),
                }}
            />
        </Tab.Navigator>
    )
}

export default MainTabScreen;
