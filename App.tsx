import React, {useState , useCallback, useEffect} from 'react';

import {
  Roboto_400Regular,
  Roboto_500Medium,
  Roboto_700Bold
} from '@expo-google-fonts/roboto';

import theme from './src/global/styles/theme';
import { ThemeProvider  } from 'styled-components';

import { useFonts } from 'expo-font';
import AppLoading from 'expo-app-loading';

import { AppRoutes  } from './src/routes/app.routes';

import { NavigationContainer } from '@react-navigation/native';
import { AuthProvider, useAuth } from './src/hooks/AuthContext';
import { StatusBar } from 'react-native';
import { AddDevice } from './src/components/AddDevice';
import { BleTest } from './src/components/BleTest';


export default function App() {

  const [fontsLoaded] = useFonts({
    Roboto_400Regular,
    Roboto_500Medium,
    Roboto_700Bold
  });

  if(!fontsLoaded){
    return (
    <AppLoading />
    );
  }

  return (
    <ThemeProvider theme={theme}>
      <StatusBar barStyle = "dark-content" hidden = {false} backgroundColor = "#e3e2e7" translucent = {true}/>
      <AuthProvider>
       <NavigationContainer>
        <AppRoutes />
       </NavigationContainer>
      </AuthProvider>   
    </ThemeProvider>
  );
}

