import React from 'react';
import { NativeBaseProvider, StatusBar } from 'native-base';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { useFonts, Roboto_400Regular, Roboto_700Bold } from '@expo-google-fonts/roboto';

import { THEME } from '@/styles/theme';
import { Loading } from '@/components/loading';
import { Routes } from '@/routes';

export default function App() {
  const [fontsLoaded] = useFonts({ Roboto_400Regular, Roboto_700Bold });

  return (
    <NativeBaseProvider theme={THEME}>
      <SafeAreaProvider>
        <StatusBar barStyle="light-content" backgroundColor={THEME.colors.gray[600]} />
        {fontsLoaded ? <Routes /> : <Loading />}
      </SafeAreaProvider>
    </NativeBaseProvider>
  );
}
