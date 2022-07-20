import { useState } from 'react';
import { Alert } from 'react-native';
import { Heading, Icon, VStack, useTheme } from 'native-base';
import { firebase } from '@react-native-firebase/auth';
import { Envelope, Key } from 'phosphor-react-native';

import Logo from '@/assets/logo-primary.svg';
import { Input } from '@/components/input';
import { Button } from '@/components/button';

export const SignIn = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const { colors } = useTheme();

  const handleSignIn = async () => {
    if (!email || !password) {
      return Alert.alert('Entrar', 'Informe e-mail e senha');
    }
    try {
      setIsLoading(true);
      await firebase.auth().signInWithEmailAndPassword(email, password);
    } catch (error) {
      switch (error.code) {
        case 'auth/invalid-email':
          return Alert.alert('Entrar', 'E-mail inválido');
        case 'auth/wrong-password':
        case 'auth/user-not-found':
          return Alert.alert('Entrar', 'E-mail ou senha inválidos');
        default:
          return Alert.alert('Entrar', 'Não foi possível acessar');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <VStack flex={1} alignItems="center" bg="gray.600" px={8} pt={24}>
      <Logo />
      <Heading color="gray.100" fontSize="xl" mt={20} mb={6}>
        Acesse sua conta
      </Heading>
      <Input
        mb={4}
        placeholder="E-mail"
        InputLeftElement={<Icon as={<Envelope color={colors.gray[300]} />} ml={4} />}
        onChangeText={setEmail}
      />
      <Input
        mb={8}
        placeholder="Senha"
        InputLeftElement={<Icon as={<Key color={colors.gray[300]} />} ml={4} />}
        secureTextEntry
        onChangeText={setPassword}
      />
      <Button title="Entrar" w="full" onPress={handleSignIn} isLoading={isLoading} />
    </VStack>
  );
};
