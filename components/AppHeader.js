import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Header, Icon, Badge } from 'react-native-elements';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import firebase from 'firebase';

import db from '../Config';

export default class AppHeader extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: '',
        }
    }

    getNumberOfUnreadNotifications = () => {
        db.collection('notifications').where('notification_status', '==', 'unread')
        .onSnapshot(snapshot => {
            var unreadNotifications = snapshot.docs.map(doc => {
                doc.data();
            });
            this.setState({
                value: unreadNotifications.length
            });
        });
    }

    BellIconWithBadge = () => {
        return(
            <View>
                <Icon
                    name = 'bell'
                    type = 'font-awesome'
                    color = '#696969'
                    size = { 25 }
                    onPress = {() => {
                        this.props.navigation.navigate('Notifications');
                    }} />
                <Badge
                    value = { this.state.value }
                    containerStyle = {{
                        position: 'absolute',
                        top: -4,
                        right: -4,
                    }} />
            </View>
        )
    }

    componentDidMount() {
        this.getNumberOfUnreadNotifications();
    }

    render() {
        return(
            <SafeAreaProvider>
                <View style = { styles.textContainer }>
                    <Text style = { styles.title }>
                        Barter
                    </Text>
                </View>
                <View>
                    <Header
                        leftComponent = {
                            <Icon
                                name = 'bars'
                                type = 'font-awesome'
                                color = '#696969'
                                onPress = {() => {
                                    this.props.navigation.toggleDrawer();
                                }} />
                        }
                        centerComponent = {{
                            text: this.props.title,
                            style: {
                                color: '#ff8a65',
                                padding: 5,
                                fontSize: 30,
                                fontWeight: 'bold',
                                textAlign: 'center',
                            }
                        }}
                        rightComponent = {
                            <this.BellIconWithBadge { ...this.props } />
                        }
                        backgroundColor = '#ffe0b2' />
                </View>
            </SafeAreaProvider>
        )
    }
}


const styles = StyleSheet.create({
    textContainer: {
        backgroundColor: '#ffe0b2',
        borderRadius: 20,
        alignItems: 'center',
        justifyContent: 'center'
    },
    title: {
        fontSize: 60,
        fontWeight: 300,
        fontFamily: "AvenirNext-Heavy",
        color: "#ff9800",
    },
});