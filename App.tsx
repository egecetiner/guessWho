import React from 'react';
import { View } from 'react-native';
import Router from './src/router';
import { UserContextProvider } from './src/context/UserContext';

const App = () => {
  return (
    <UserContextProvider>
      <View style={{ flex: 1 }}>
        <Router />
      </View>
    </UserContextProvider>
  );
}

export default App;
