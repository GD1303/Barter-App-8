import React from 'react';
import { View, Text, TouchableOpacity, FlatList, StyleSheet } from 'react-native';
import { ListItem } from 'react-native-elements';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import firebase from 'firebase';

import db from '../Config';
import AppHeader from '../components/AppHeader';

export default class HomeScreen extends React.Component {
    constructor() {
        super();
        this.state = {
            allRequests: [],
        }
        this.requestRef = null;
    }

    getAllRequests = () => {
        this.requestRef = db.collection('requests')
        .onSnapshot((snapshot) => {
            var allRequests = snapshot.docs.map(document => document.data());
            this.setState({
                allRequests: allRequests,
            })
        })
    }

    componentDidMount = () => {
        this.getAllRequests();
    }

    componentWillUnmount = () => {
        this.requestRef();
    }

    keyExtractor = (item, index) => index.toString();

    renderItem = ({ item, i }) => {
        console.log(item.book_name);

        return(
            <ListItem
                key = { i }
                bottomDivider>
                <ListItem.Title 
                    style = {{
                        color: 'black',
                        fontWeight: 'bold',
                    }}>
                    { item.item_name }
                </ListItem.Title>
                <ListItem.Subtitle>
                    { item.description }
                </ListItem.Subtitle>
                <View style = {{ alignItems: 'right', justifyContent: "flex-end", flexDirection: "row", }}>
                    <TouchableOpacity
                        style = { styles.exchangeButton }
                        onPress = {() => {
                            this.props.navigation.navigate('ReceiverDetails', { 'details': item });
                        }}>
                        <Text style = {{ color: "#ff5722", fontSize: 18, fontWeight: '300', padding: 20 }}>
                            View
                        </Text>
                    </TouchableOpacity>
                </View>
            </ListItem>
        )
    }

    render() {
        return(
            <View style = {{ flex: 1, backgroundColor: '#ffe0b2' }}>
                <AppHeader title = 'Home' navigation = { this.props.navigation } />
                <View style = { styles.container }>
                    {
                        this.state.allRequests.length === 0
                        ? (
                            <View style = {{
                                flex: 1,
                                fontSize: 20,
                                justifyContent: 'center',
                                alignItems: 'center'
                            }}>
                                <Text style = {{ fontSize: 20 }}>
                                    List of all Barter
                                </Text>
                            </View>
                        )
                        :(
                            <FlatList
                                keyExtractor = { this.keyExtractor }
                                data = { this.state.allRequests }
                                renderItem = { this.renderItem } />
                        )
                    }
                </View>
            </View>
        )
    }
}

//incase listitem doesnt work
/*
({ item, i }) => (
    <View style = { styles.renderContainer }>
        <View>
            <Text style = {{ fontWeight: 'bold', fontSize: 20, marginTop: 20 }}>
                { item.item_name }
            </Text>
            <Text style = {{ marginBottom: 20 }}>
                { item.description }
            </Text>
        </View>
        <View style = {{ marginTop: -60, marginLeft: 150 }}>
            <TouchableOpacity 
                style = { styles.exchangeButton }
                onPress = {() => {
                    this.props.navigation.navigate('ReceiverDetails', { 'details': item });
                }}>
                <Text style = {{ color: "#ff5722", fontSize: 18, fontWeight: '300', padding: 20, }}>
                    View
                </Text>
            </TouchableOpacity>
        </View>
        <View style = {{ borderBottomWidth: 1, marginTop: 20, flex: 1 }} />
    </View>
)
*/

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffe0b2',
        alignItems: 'center',
        marginTop: -300,
    },
    exchangeButton: {
        width: 100,
        height: 40,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 25,
        elevation: 10,
        padding: 20,
        borderWidth: 1,
        borderColor: '#ff5722',
    },
    renderContainer: {
        alignItems: 'left',
        justifyContent: 'center',
        borderColor: 'black',
    }
});