import { VStack } from 'native-base';

import { Header } from '@/components/header';
import { Input } from '@/components/input';
import { Button } from '@/components/button';

export const Register = () => {
  return (
    <VStack flex={1} bg="gray.600">
      <Header title="Nova solicitação" />
      <VStack flex={1} px={6} pb={6}>
        <Input placeholder="Número do patrimônio" />
        <Input
          placeholder="Descrição do problema"
          mt={5}
          flex={1}
          multiline
          textAlignVertical="top"
        />
        <Button title="Cadastrar" mt={5} />
      </VStack>
    </VStack>
  );
};
