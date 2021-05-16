import React from 'react';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';

import SignupLoginScreen from './screens/SignupLoginScreen';
import { DrawerNavigator } from './components/DrawerNavigator';

export default class App extends React.Component {
  render() {
    return(
      <AppContainer />
    )
  }
}

const SwitchNavigator = createSwitchNavigator({
  Login: {
    screen: SignupLoginScreen,
  },
  Drawer: DrawerNavigator,
});

const AppContainer = createAppContainer(SwitchNavigator);