import React from 'react';
import { View } from 'react-native';
import Router from './src/router';
import { AppContextProvider } from './src/context/AppContext';

const App = () => {
  return (
    <AppContextProvider>
      <View style={{ flex: 1 }}>
        <Router />
      </View>
    </AppContextProvider>
  );
}

export default App;
