import { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { firebase, FirebaseAuthTypes } from '@react-native-firebase/auth';

import { AppRoutes } from '@/routes/app.routes';
import { SignIn } from '@/screens/sign-in';
import { Loading } from '@/components/loading';

export const Routes = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState<FirebaseAuthTypes.User>();

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

  return <NavigationContainer>{user ? <AppRoutes /> : <SignIn />}</NavigationContainer>;
};
