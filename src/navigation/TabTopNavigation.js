import React from 'react';
import { Image } from 'react-native';
import MainScreen from '../screens/MainScreen';
import NewsScreen from '../screens/NewsScreen';
import HistoryScreen from '../screens/HistoryScreen';
import SettingsScreen from '../screens/SettingsScreen';
import ProfileScreen from '../screens/ProfileScreen';
import BookmarkScreen from '../screens/BookmarkScreen';
import AddNewsScreen from '../screens/AddNewsScreen';
import AboutScreen from '../screens/AboutScreen';
import CategoryScreen from '../screens/CategoryScreen';
import ContactsScreen from '../screens/ContactsScreen';
import AdvScreen from '../screens/AdvScreen';
import PrivacyScreen from '../screens/PrivacyScreen';
import TermsOfUseScreen from '../screens/TermsOfUseScreen';
import SearchScreen from '../screens/SearchScreen';
import UseOfMaterialsScreen from '../screens/UseOfMaterialsScreen';
import { createStackNavigator } from '@react-navigation/stack';
import { Icon } from 'react-native-eva-icons';
// import { TouchableOpacity } from 'react-native-gesture-handler';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import LocalizationContext from '../context/LocalizationContext';
import { Text, View, StyleSheet, ImageBackground, TouchableOpacity, TouchableWithoutFeedback } from 'react-native';

const MainStack = createStackNavigator();

const MainStackScreen = ({ navigation }) => {

    const { t, locale, setLocale } = React.useContext(LocalizationContext);

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
                        <View>
                            <TouchableOpacity onPress={() => navigation.openDrawer()}>
                                <Icon name='menu-outline' width={24} height={24} fill='#20235a' />
                            </TouchableOpacity>
                        </View>
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
                        <TouchableOpacity onPress={() => navigation.navigate('Search')}>
                            <Icon name='search-outline' width={24} height={24} fill='#20235a' />
                        </TouchableOpacity>
                    )
                },

            }} />
            <MainStack.Screen name='News' component={NewsScreen} options={{
                headerTitle: (props) => {
                    return (
                        <TouchableOpacity onPress={() => navigation.navigate('Main')}>
                                <Image
                                    style={{ width: 120, }}
                                    source={require('../../assets/logo.png')}
                                    resizeMode='contain'
                                />
                        </TouchableOpacity>
                    )
                },
                headerTintColor: '#20235a',
                headerStyle: {
                    // backgroundColor: 'transparent',
                    elevation: 0, // remove shadow on Android
                    shadowOpacity: 0,
                },
            }} />
            <MainStack.Screen name='Category' component={CategoryScreen} options={{
                headerTitle: t('categories'),
                headerTintColor: '#20235a',
                headerStyle: {
                    // backgroundColor: 'transparent',
                    elevation: 0, // remove shadow on Android
                    shadowOpacity: 0,
                },
            }} />
            <MainStack.Screen name='About' component={AboutScreen} options={{
                headerTitle: t('about_project'),
                headerTintColor: '#20235a',
                headerStyle: {
                    // backgroundColor: 'transparent',
                    elevation: 0, // remove shadow on Android
                    shadowOpacity: 0,
                },
            }} />
            <MainStack.Screen name='Contacts' component={ContactsScreen} options={{
                headerTitle: t('contacts'),
                headerTintColor: '#20235a',
                headerStyle: {
                    // backgroundColor: 'transparent',
                    elevation: 0, // remove shadow on Android
                    shadowOpacity: 0,
                },
            }} />
            <MainStack.Screen name='Adv' component={AdvScreen} options={{
                headerTitle: t('adv'),
                headerTintColor: '#20235a',
                headerStyle: {
                    // backgroundColor: 'transparent',
                    elevation: 0, // remove shadow on Android
                    shadowOpacity: 0,
                },
            }} />
            <MainStack.Screen name='Privacy' component={PrivacyScreen} options={{
                headerTitle: t('private_policy'),
                headerTintColor: '#20235a',
                headerStyle: {
                    // backgroundColor: 'transparent',
                    elevation: 0, // remove shadow on Android
                    shadowOpacity: 0,
                },
            }} />
            <MainStack.Screen name='TermsOfUse' component={TermsOfUseScreen} options={{
                headerTitle: t('terms_of_use'),
                headerTintColor: '#20235a',
                headerStyle: {
                    // backgroundColor: 'transparent',
                    elevation: 0, // remove shadow on Android
                    shadowOpacity: 0,
                },
            }} />
            <MainStack.Screen name='UseOfMaterials' component={UseOfMaterialsScreen} options={{
                headerTitle: t('use_of_materials'),
                headerTintColor: '#20235a',
                headerStyle: {
                    // backgroundColor: 'transparent',
                    elevation: 0, // remove shadow on Android
                    shadowOpacity: 0,
                },
            }} />
            <MainStack.Screen name='Search' component={SearchScreen} options={{
                headerTitle: t('search'),
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
            headerTitle: (props) => {
                return (
                    <TouchableOpacity onPress={() => navigation.navigate('Main')}>
                            <Image
                                style={{ width: 120, }}
                                source={require('../../assets/logo.png')}
                                resizeMode='contain'
                            />
                    </TouchableOpacity>
                )
            },

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
            headerTitle: (props) => {
                return (
                    <TouchableOpacity onPress={() => navigation.navigate('Main')}>
                            <Image
                                style={{ width: 120, }}
                                source={require('../../assets/logo.png')}
                                resizeMode='contain'
                            />
                    </TouchableOpacity>
                )
            },

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
            headerTitle: (props) => {
                return (
                    <TouchableOpacity onPress={() => navigation.navigate('Main')}>
                            <Image
                                style={{ width: 120, }}
                                source={require('../../assets/logo.png')}
                                resizeMode='contain'
                            />
                    </TouchableOpacity>
                )
            },

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

    const { t, locale, setLocale } = React.useContext(LocalizationContext);

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
            headerTitle: (props) => {
                return (
                    <TouchableOpacity onPress={() => navigation.navigate('Main')}>
                            <Image
                                style={{ width: 120, }}
                                source={require('../../assets/logo.png')}
                                resizeMode='contain'
                            />
                    </TouchableOpacity>
                )
            },

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
            <SettingsStack.Screen name='Profile' component={ProfileScreen} options={{
                headerTitle: t('profile'),
                headerTintColor: '#20235a',
                headerStyle: {
                    // backgroundColor: 'transparent',
                    elevation: 0, // remove shadow on Android
                    shadowOpacity: 0,
                },
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
        <View>

            <Image
                style={{ width: 120, }}
                source={require('../../assets/logo.png')}
                resizeMode='contain'
            />
        </View>
    );
}

const Tab = createMaterialBottomTabNavigator();
const MainTabScreen = () => {

    const { t, locale, setLocale } = React.useContext(LocalizationContext);

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
                height:56,
            }}
            labeled={true}

        >
            <Tab.Screen
                name="MainTab"
                component={MainStackScreen}
                options={{
                    tabBarLabel: t('main'),
                    tabBarIcon: ({ color }) => (
                        <Icon name="home-outline" fill={color} width={26} height={26} />
                    ),
                }}
                
            />
            <Tab.Screen
                name="HistoryTab"
                component={HistoryStackScreen}
                options={{
                    tabBarLabel: t('history'),
                    tabBarIcon: ({ color }) => (
                        <Icon name="eye-outline" fill={color} width={26} height={26} />
                    ),
                }}
                listeners={({ navigation, route }) => ({
                    tabPress: e => {
                      // Prevent default action
                      e.preventDefault();
                
                      // Do something with the `navigation` object
                      navigation.navigate('HistoryTab');
                    },
                  })}
            />
            <Tab.Screen
                name="AddNewsTab"
                component={AddNewsStackScreen}
                options={{
                    tabBarLabel: t('write'),
                    tabBarIcon: ({ color }) => (
                        <Icon name="edit-outline" fill={color} width={26} height={26} />
                    ),
                }}
            />
            <Tab.Screen
                name="BookmarkTab"
                component={BookmarkStackScreen}
                options={{
                    tabBarLabel: t('bookmark'),
                    tabBarIcon: ({ color }) => (
                        <Icon name="bookmark-outline" fill={color} width={26} height={26} />
                    ),
                }}
            />
            <Tab.Screen
                name="SettingsTab"
                component={SettingsStackScreen}
                options={{
                    tabBarLabel: t('settings'),
                    tabBarIcon: ({ color }) => (
                        <Icon name="settings-outline" fill={color} width={26} height={26} />
                    ),
                }}
            />
        </Tab.Navigator>
    )
}

export default MainTabScreen;
