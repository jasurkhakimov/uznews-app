import React from 'react';
import { View, Text, Image } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import MainTabScreen from './TabTopNavigation';
import { DrawerContent } from './DrawerContent';

const Drawer = createDrawerNavigator();

const Navigation = () => {

    return (
        <NavigationContainer>
            <Drawer.Navigator drawerStyle={{ width: '85%' }} initialRouteName="MainDrawer" drawerContent={props => <DrawerContent {...props} />} >
                <Drawer.Screen name="MainDrawer" options={{ title: 'Главная' }} component={MainTabScreen} />
            </Drawer.Navigator>
        </NavigationContainer>
    )

}


export default Navigation;