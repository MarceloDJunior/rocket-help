import { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { firebase, FirebaseAuthTypes } from '@react-native-firebase/auth';
import { useTheme } from 'native-base';

import { AppRoutes } from '@/routes/app.routes';
import { SignIn } from '@/screens/sign-in';
import { Loading } from '@/components/loading';

export const Routes = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState<FirebaseAuthTypes.User>();

  const { colors } = useTheme();

  useEffect(() => {
    const unsubscribe = firebase.auth().onAuthStateChanged(user => {
      setUser(user);
      setIsLoading(false);
    });
    return () => unsubscribe();
  }, []);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.gray[600] }} >
      <NavigationContainer>{user ? <AppRoutes /> : <SignIn />}</NavigationContainer>
    </SafeAreaView>
  );
};
