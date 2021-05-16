import React from 'react';
import { TextInput, View, StyleSheet, TouchableOpacity, Image, Text, Modal, ScrollView, KeyboardAvoidingView } from 'react-native';
import firebase from 'firebase';

import db from '../Config';

export default class SignupLoginScreen extends React.Component {
    constructor() {
        super();
        this.state = {
            emailId: '',
            password: '',
            confirmPassword: '',
            firstName: '',
            lastName: '',
            contact: '',
            address: '',
            isVisible: false,
        }
    }

    userLogin = (emailId, password) => {
        firebase
            .auth()
            .signInWithEmailAndPassword(emailId, password)
        .then(() => {
            this.props.navigation.navigate('Drawer');
        })
        .catch((error) => {
            var errorCode = error.code;
            var errorMessage = error.message;

            return alert(errorMessage);
        })
    }

    userSignUp = (emailId, password, confirmPassword) => {
        if(this.state.firstName === '' || this.state.lastName === '' || this.state.contact === '' || this.state.emailId === '' || this.state.address === '') {
            return alert('Incomplete fields.');
        } else if(password === '') {
            return alert('Please enter a password.');
        } else if(password !== confirmPassword) {
            return alert('Password does not match.');
        } else {
            firebase
                .auth()
                .createUserWithEmailAndPassword(emailId, password)
            .then((response) => {
                db.collection('users').add({
                    first_name: this.state.firstName,
                    last_name: this.state.lastName,
                    contact: this.state.contact,
                    email_id: this.state.emailId,
                    address: this.state.address
                })
                return alert(
                    'User Added Successfully.',
                    '',
                    [{
                        text: 'OK',
                        onPress: () => {
                            this.setState({
                                isVisible: false
                            })
                        }
                    }]
                )
            })
            .catch(function(error) {
                var errorCode = error.code;
                var errorMessage = error.message;
    
                return alert(errorMessage);
            })
        }
    }

    showModal = () => (
        <Modal
            animationType = 'fade'
            transparent = { true }
            visible = { this.state.isVisible }>
            <View style = { styles.modalContainer }>
                <ScrollView style = { styles.scrollView }>
                    <KeyboardAvoidingView style = { styles.keyboardAvoidingView }>
                        <Text style = { styles.modalHeader }>
                            REGISTERATION
                        </Text>
                        <TextInput
                            style = { styles.formTextInput }
                            placeholder = 'First Name'
                            onChangeText = {(text) => {
                                this.setState({
                                    firstName: text
                                })
                            }} />
                        <TextInput
                            style = { styles.formTextInput }
                            placeholder = 'Last Name'
                            onChangeText = {(text) => {
                                this.setState({
                                    lastName: text
                                })
                            }} />
                        <TextInput
                            style = { styles.formTextInput }
                            placeholder = 'Contact Number'
                            maxLength = { 10 }
                            keyboardType = 'numeric'
                            onChangeText = {(text) => {
                                this.setState({
                                    contact: text
                                })
                            }} />
                        <TextInput
                            style = { styles.formTextInput }
                            placeholder = 'Address'
                            multiline = { true }
                            onChangeText = {(text) => {
                                this.setState({
                                    address: text
                                })
                            }} />
                        <TextInput
                            style = { styles.formTextInput }
                            placeholder = 'Email'
                            keyboardType = 'email-address'
                            onChangeText = {(text) => {
                                this.setState({
                                    emailId: text
                                })
                            }} />
                        <TextInput
                            style = { styles.formTextInput }
                            placeholder = 'Password'
                            secureTextEntry = { true }
                            onChangeText = {(text) => {
                                this.setState({
                                    password: text
                                })
                            }} />
                        <TextInput
                            style = { styles.formTextInput }
                            placeholder = 'Confirm Password'
                            secureTextEntry = { true }
                            onChangeText = {(text) => {
                                this.setState({
                                    confirmPassword: text
                                })
                            }} />
                        <View style = { styles.buttonContainer }>
                            <TouchableOpacity 
                                style = { styles.registerButton }
                                onPress = {() => {
                                    this.userSignUp(this.state.emailId, this.state.password, this.state.confirmPassword)
                                }}>
                                <Text style = { styles.registerButtonText }>
                                    REGISTER
                                </Text>
                            </TouchableOpacity>
                            <TouchableOpacity 
                                style = { styles.cancelButton }
                                onPress = {() => {
                                    this.setState({
                                        isVisible: false
                                    })
                                }}>
                                <Text style = { styles.cancelButtonText }>
                                    CANCEL
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </KeyboardAvoidingView>
                </ScrollView>
            </View>
        </Modal>
    )

    render() {
        if(this.state.isVisible === true){
            return(
                <View style = { styles.container}>
                    <View style = { styles.modalBox }>
                        {
                            this.showModal()
                        }
                    </View>
                </View>
            )
        } else {
            return(
                <View style = { styles.container}>
                    <View style = { styles.profileContainer }>
                        <Image
                            source = {require('../assets/barter.png')}
                            style = { styles.image } />
                        <Text style = { styles.title }>
                            Barter
                        </Text>
                        <Text style = { styles.subtitle }>
                            A Trading Method
                        </Text>
                    </View>
                    <View style = { styles.login }>
                        <Text style = { styles.tinyHeader }>
                            EMAIL ADDRESS
                        </Text>
                        <TextInput
                            style = { styles.loginBar }
                            keyboardType = 'email-address'
                            onChangeText = {(text) => {
                                this.setState({
                                    emailId: text
                                })
                            }} />
                    </View>
                    <View style = { styles.login }>
                        <Text style = { styles.tinyHeader }>
                            PASSWORD
                        </Text>
                        <TextInput
                            style = { styles.loginBar }
                            secureTextEntry = { true }
                            onChangeText = {(text) => {
                                this.setState({
                                    password: text
                                })
                            }} />
                    </View>
                    <View style = { styles.buttonContainer }>
                        <TouchableOpacity
                            style = { styles.button }
                            onPress = {() => {
                                this.userLogin(this.state.emailId, this.state.password)
                            }}>
                            <Text style = { styles.buttonText }>
                                LOGIN
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style = {[ styles.button, { marginTop: 10 } ]}
                            onPress = {() => {
                                this.setState({
                                    isVisible: true
                                })
                            }}>
                            <Text style = { styles.buttonText }>
                                SIGN UP
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            )
        }
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffe0b2',
        alignItems: 'center',
    },
    profileContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        padding: 50,
        marginTop: 25,
    },
    title: {
        fontSize: 60,
        fontWeight: 300,
        fontFamily: "AvenirNext-Heavy",
        color: "#ff9800",
    },
    subtitle: {
        color: "#ff8a65",
    },
    tinyHeader: {
        color: '#ff5722',
        fontSize: 18,
        fontWeight: 'bold',
    },
    loginBar: {
        width: 300,
        height: 35,
        borderBottomWidth: 1.5,
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
    image: {
        width: 150,
        height: 150,
        borderWidth: 2,
        borderRadius: 20,
        borderColor: "#ff8a65",
    },
    login: {
        marginTop: 7,
    },
    modalContainer: {
        flex: 1,
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: "#ffffff",
        margin: 20
    },
    scrollView: {
        width: '100%',
    },
    modalHeader: {
        justifyContent: 'center',
        alignSelf: 'center',
        fontSize: 30,
        color: '#ff5722',
        margin: 50,
        fontWeight: 500,
    },
    formTextInput: {
        width: "75%",
        height: 35,
        alignSelf: 'center',
        borderColor: '#ffab91',
        borderRadius: 10,
        borderWidth: 1,
        marginTop: 20,
        padding: 10,
    },
    registerButton: {
        width: 200,
        height: 40,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1,
        borderRadius: 10,
        marginTop: 30,
    },
    registerButtonText: {
        color: '#ff5722',
        fontSize: 15,
        fontWeight: 'bold'
    },
    cancelButton: {
        width: 200,
        height: 30,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 5,
    },
    cancelButtonText: {
        color:'#ff5722',
    },
    modalBox: {
        justifyContent: 'center',
        alignItems: 'center',
    },
});