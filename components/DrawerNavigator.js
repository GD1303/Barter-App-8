import React from 'react';
import { createDrawerNavigator } from 'react-navigation-drawer';

import { TabNavigator } from './TabNavigator';
import CustomSideBarMenu from './CustomSideBarMenu';
import SettingScreen from '../screens/SettingScreen';
import MyBarterScreen from '../screens/MyBarterScreen';
import NotificationsScreen from '../screens/NotificationsScreen';

export const DrawerNavigator = createDrawerNavigator({
    Home: {
        screen: TabNavigator,
    },
    MyBarters: {
        screen: MyBarterScreen,
    },
    Notifications: {
        screen: NotificationsScreen,
    },
    Settings: {
        screen: SettingScreen,
    },
},
{
    contentComponent: CustomSideBarMenu,
},
{
    initialRouteName: 'Home',
});