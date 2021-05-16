import React from 'react';
import { Image } from 'react-native';
import { createBottomTabNavigator } from 'react-navigation-tabs';

import { StackNavigator } from './StackNavigator'
import ExchangeScreen from '../screens/ExchangeScreen';

export const TabNavigator = createBottomTabNavigator({
    Home: {
        screen: StackNavigator,
        navigationOptions: {
            tabBarIcon: 
                <Image
                    source = {require('../assets/home.png')}
                    style = {{ width: 20, height: 20 }} />,
            tabBarLabel: 'Home',
        },
    },
    Exchange: {
        screen: ExchangeScreen,
        navigationOptions: {
            tabBarIcon:
                <Image
                    source = {require('../assets/ads.png')}
                    style = {{ width: 20, height: 20 }} />,
            tabBarLabel: 'Exchange',
        },
    },
});