import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Card, Header, Icon } from 'react-native-elements';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import firebase from 'firebase';

import db from '../Config';

export default class ReceiverDetailsScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            userId: firebase.auth().currentUser.email,
            username: '',
            exchangeId: this.props.navigation.getParam('details')['exchangeId'],
            itemName: this.props.navigation.getParam('details')['item_name'],
            description: this.props.navigation.getParam('details')['description'],
            receiverId: this.props.navigation.getParam('details')['username'],
            receiverName: '',
            receiverContact: '',
            receiverAddress: '',
            receiverRequestDocId: '',
        }
    }

    getUserDetails = () => {
        db.collection('users').where('email_id', '==', this.state.userId).get()
        .then(snapshot => {
            snapshot.forEach(doc => {
                this.setState({
                    username: doc.data().first_name + ' ' + doc.data().last_name,
                });
            });
        });
    }

    getReceiverDetails = () => {
        db.collection('users').where('email_id', '==', this.state.receiverId).get()
        .then(snapshot => {
            snapshot.forEach(doc => {
                this.setState({
                    receiverName: doc.data().first_name,
                    receiverContact: doc.data().contact,
                    receiverAddress: doc.data().address,
                });
            });
        });

        db.collection('requests').where('exchangeId', '==', this.state.exchangeId).get()
        .then(snapshot => {
            snapshot.forEach(doc => {
                this.setState({
                    receiverRequestDocId: doc.id,
                });
            });
        });
    }

    updateBarterStatus = () => {
        db.collection('barters').add({
            item_name: this.state.itemName,
            exchange_id: this.state.exchangeId,
            requested_by: this.state.receiverName,
            donor_id: this.state.userId,
            request_status: 'Donor Interested',
        });
    }

    addNotification = () => {
        var message = this.state.username + ' has shown interest in donating the item.';
        var date = firebase.firestore.Timestamp.now().toDate();

        db.collection('notifications').add({
            donor_id: this.state.userId,
            receiver_id: this.state.receiverId,
            date: date,
            message: message,
            item_name: this.state.itemName,
            notification_status: 'unread',
            exchange_id: this.state.exchangeId,
        })
    }

    componentDidMount() {
        this.getUserDetails();
        this.getReceiverDetails();
    }

    render() {
        return(
            <SafeAreaProvider>
                <View style = { styles.container }>
                    <View style = {{ flex: 0.1 }}>
                        <Header
                            leftComponent = {
                                <Icon 
                                    name = 'arrow-left'
                                    type = 'feather'
                                    color = '#696969' 
                                    onPress = {() => {
                                        this.props.navigation.goBack();
                                    }} />
                            }
                            centerComponent = {{
                                text: 'Exchange Items',
                                style: {
                                    color: 'black',
                                    padding: 5,
                                    fontSize: 30,
                                    fontWeight: 'bold',
                                    textAlign: 'center',
                                }
                            }}
                            backgroundColor = '#ffff' />
                    </View>
                    <View style = {{ flex: 0.3 }}>
                        <Card
                            title = { 'Item Information' }
                            titleStyle = {{ fontSize: 20 }}>
                            <Card>
                                <Text style = {{ fontWeight: 'bold' }}>
                                    Item: { this.state.itemName }
                                </Text>
                            </Card>
                            <Card>
                                <Text style = {{ fontWeight: 'bold' }}>
                                    Description: { this.state.description }
                                </Text>
                            </Card>
                        </Card>
                    </View>
                    <View style = {{ flex: 0.3 }}>
                        <Card
                            title = { 'Receiver Information' }
                            titleStyle = {{ fontSize: 20 }}>
                            <Card>
                                <Text style = {{ fontWeight: 'bold' }}>
                                    Name: { this.state.receiverName }
                                </Text>
                            </Card>
                            <Card>
                                <Text style = {{ fontWeight: 'bold' }}>
                                    Contact: { this.state.receiverContact }
                                </Text>
                            </Card>
                            <Card>
                                <Text style = {{ fontWeight: 'bold' }}>
                                    Address: { this.state.receiverAddress }
                                </Text>
                            </Card>
                        </Card>
                    </View>
                    <View style = { styles.buttonContainer }>
                        {
                            this.state.receiverId != this.state.userId
                            ? (
                                <TouchableOpacity
                                    style = { styles.button }
                                    onPress = {() => {
                                        this.updateBarterStatus();
                                        this.addNotification();
                                        this.props.navigation.navigate('MyBarters');
                                    }}>
                                    <Text style = {{ color: "#ff5722", fontSize: 18, fontWeight: '300', padding: 20 }}>
                                        Interested to Exchange
                                    </Text>
                                </TouchableOpacity>
                            )
                            : null
                        }
                    </View>
                </View>
            </SafeAreaProvider>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    buttonContainer: {
        flex: 0.3,
        justifyContent: 'center',
        alignItems: 'center',
    },
    button: {
        height: 40,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 25,
        elevation: 10,
        padding: 20,
        borderWidth: 1,
        borderColor: '#ff5722',
    }
  })
  