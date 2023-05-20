import React, { useEffect } from 'react';
import { View } from 'react-native';
import Router from './src/router';
import { AppContextProvider } from './src/context/AppContext';
import SplashScreen from 'react-native-splash-screen';

const App = () => {

  useEffect(() => {
    SplashScreen.hide()
  }, []);

  return (
    <AppContextProvider>
      <View style={{ flex: 1 }}>
        <Router />
      </View>
    </AppContextProvider>
  );
}

export default App;
