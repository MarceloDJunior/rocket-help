import { useState } from 'react';
import { Alert } from 'react-native';
import { VStack } from 'native-base';
import { useNavigation } from '@react-navigation/native';

import { Header } from '@/components/header';
import { Input } from '@/components/input';
import { Button } from '@/components/button';
import { firebase } from '@react-native-firebase/firestore';

export const Register = () => {
  const navigation = useNavigation();
  const [isLoading, setIsLoading] = useState(false);
  const [patrimony, setPatrimony] = useState('');
  const [description, setDescription] = useState('');

  const handleNewOrderRegister = async () => {
    if (!patrimony || !description) {
      return Alert.alert('Registrar', 'Preencha todos os campos.');
    }

    try {
      setIsLoading(true);
      await firebase.firestore().collection('orders').add({
        patrimony,
        description,
        status: 'open',
        created_at: firebase.firestore.FieldValue.serverTimestamp(),
      });
      Alert.alert('Solicitação', 'Solicitação registrada com sucesso.');
      navigation.goBack();
    } catch (error) {
      console.log(error);
      setIsLoading(false);
      Alert.alert('Solicitação', 'Não foi possível registrar o pedido.');
    }
  };

  return (
    <VStack flex={1} bg="gray.600">
      <Header title="Nova solicitação" />
      <VStack flex={1} px={6} pb={6}>
        <Input placeholder="Número do patrimônio" onChangeText={setPatrimony} />
        <Input
          placeholder="Descrição do problema"
          mt={5}
          flex={1}
          multiline
          textAlignVertical="top"
          onChangeText={setDescription}
        />
        <Button title="Cadastrar" mt={5} isLoading={isLoading} onPress={handleNewOrderRegister} />
      </VStack>
    </VStack>
  );
};
