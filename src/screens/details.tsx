import { Header } from '@/components/header';
import { VStack } from 'native-base';

export const Details = () => {
  return (
    <VStack flex={1} bg="gray.700">
      <Header title="Solicitação" />
    </VStack>
  );
};
