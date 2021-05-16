import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { DrawerItems } from 'react-navigation-drawer';
import firebase from 'firebase';

export default class CustomSideBarMenu extends React.Component {
    render() {
        return(
            <View style = { styles.container }>
                <View style = { styles.drawerItemsContainer }>
                    <DrawerItems {...this.props} />
                </View>
                <View style = {{
                    flex: 1,
                    justifyContent: 'flex-end',
                    paddingBottom: 30,
                }}>
                    <TouchableOpacity 
                        style = {{
                            justifyContent: 'center',
                            padding: 10,
                            height: 30,
                            width: '100%',
                        }}
                        onPress = {() => {
                            this.props.navigation.navigate('Login');
                            firebase.auth().signOut();
                        }}>
                        <Text>
                            LOGOUT
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1.,
    },
    drawerItemsContainer: {
        flex: 0.8,
    },
});