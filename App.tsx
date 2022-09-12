import {View} from 'react-native';
import React from 'react';
import AppNavigator from './src/ui/navigation/AppNavigator';

const App = () => {
  return (
    <View style={{flex: 1}}>
      <AppNavigator />
    </View>
  );
};

export default App;
