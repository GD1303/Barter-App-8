import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, TextInput, KeyboardAvoidingView } from 'react-native';
import firebase from 'firebase';

import db from '../Config';
import AppHeader from '../components/AppHeader';

export default class SettingScreen extends React.Component {
    constructor() {
        super();
        this.state = {
            firstName: '',
            lastName: '',
            address: '',
            contact: '',
            emailId: '',
            docId: '',
        };
    }

    getData = () => {
        var user = firebase.auth().currentUser;
        var email = user.email;

        db.collection('users').where('email_id', '==', email).get()
        .then((snapshot) => {
            snapshot.forEach((doc) => {
                var data = doc.data();
                this.setState({
                    firstName: data.first_name,
                    lastName: data.last_name,
                    address: data.address,
                    contact: data.contact,
                    emailId: data.email_id,
                    docId: doc.id,
                });
            });
        });
    }

    updateData = () => {
        db.collection('users').doc(this.state.docId)
        .update({
            first_name: this.state.firstName,
            last_name: this.state.lastName,
            address: this.state.address,
            contact: this.state.contact,
        });
        
        return alert('Data Updated')
    }

    componentDidMount() {
        this.getData();
    }

    render() {
        return(
            <View style = {{ flex: 1, backgroundColor: '#ffe0b2' }}>
                <AppHeader title = 'Settings' navigation = { this.props.navigation } />
                <KeyboardAvoidingView style = { styles.container }>
                    <View style = { styles.formContainer }>
                        <View style = { styles.formTextInputContainer}>
                            <Text style = { styles.tinyHeader }>
                                FIRST NAME
                            </Text>
                            <TextInput
                                style = { styles.formTextInput }
                                maxLength = { 15 }
                                onChangeText = {(text) => {
                                    this.setState({
                                        firstName: text,
                                    });
                                }}
                                value = { this.state.firstName } />
                        </View>
                        <View style = { styles.formTextInputContainer}>
                            <Text style = { styles.tinyHeader }>
                                LAST NAME
                            </Text>
                            <TextInput
                                style = { styles.formTextInput }
                                maxLength = { 15 }
                                onChangeText = {(text) => {
                                    this.setState({
                                        lastName: text,
                                    });
                                }}
                                value = { this.state.lastName } />
                        </View>
                        <View style = { styles.formTextInputContainer}>
                            <Text style = { styles.tinyHeader }>
                                ADDRESS
                            </Text>
                            <TextInput
                                style = { styles.formTextInput }
                                onChangeText = {(text) => {
                                    this.setState({
                                        address: text,
                                    });
                                }}
                                value = { this.state.address }
                                multiline />
                        </View>
                        <View style = { styles.formTextInputContainer}>
                            <Text style = { styles.tinyHeader }>
                                CONTACT NUMBER
                            </Text>
                            <TextInput
                                style = { styles.formTextInput }
                                keyboardType = 'numeric'
                                maxLength = { 10 }
                                onChangeText = {(text) => {
                                    this.setState({
                                        contact: text,
                                    });
                                }}
                                value = { this.state.contact } />
                        </View>
                        <View style = { styles.buttonContainer }>
                            <TouchableOpacity 
                                style = { styles.button}
                                onPress = {() => {
                                this.updateData();
                                }}>
                                <Text style = { styles.buttonText }>
                                    SAVE
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </KeyboardAvoidingView>
            </View>
        )
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffe0b2',
        alignItems: 'center',
        marginTop: -400,
    },
    tinyHeader: {
        color: '#ff5722',
        fontSize: 18,
        fontWeight: 'bold',
    },
    formContainer: {
        alignItems: 'center',
        padding: 50,
        marginTop: 25,
    },
    formTextInputContainer: {
        marginTop: 7,
    },
    formTextInput: {
        width: 300,
        height: 35,
        borderWidth: 1.5,
        borderColor: "#ffab91",
        fontSize: 20,
        marginBottom: 20,
        marginTop: 5,
        color: "#ff8a65",
    },
    buttonContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    button: {
        width: 300,
        height: 50,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 25,
        backgroundColor: "#ffffff",
        elevation: 10,
    },
    buttonText: {
        color: "#ff5722",
        fontSize: 18,
        fontWeight: "bold",
    },
});