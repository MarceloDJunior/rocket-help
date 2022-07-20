import { useEffect, useState } from 'react';
import { Alert } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { firebase } from '@react-native-firebase/firestore';
import { VStack, HStack, useTheme, Text, ScrollView } from 'native-base';
import { CircleWavyCheck, Clipboard, DesktopTower, Hourglass } from 'phosphor-react-native';

import { Button } from '@/components/button';
import { CardDetails } from '@/components/card-details';
import { Header } from '@/components/header';
import { Input } from '@/components/input';
import { Loading } from '@/components/loading';
import { OrderProps } from '@/components/order';
import { OrderFirestoreDto } from '@/dtos/order-firestore-dto';
import { dateFormat } from '@/utils/firestore-date-format';

type RouteParams = {
  orderId: string;
};

type OrderDetails = OrderProps & {
  description: string;
  solution: string;
  closed: string;
};

export const Details = () => {
  const [order, setOrder] = useState<OrderDetails>({} as OrderDetails);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [solution, setSolution] = useState('');

  const navigation = useNavigation();
  const { colors } = useTheme();
  const route = useRoute();
  const { orderId } = route.params as RouteParams;

  const handleOrderClosed = async () => {
    if (!solution) {
      return Alert.alert('Solicitação', 'Informe a solução para encerrar a solicitação');
    }

    try {
      setIsSaving(true);
      await firebase.firestore().collection<OrderFirestoreDto>('orders').doc(orderId).update({
        status: 'closed',
        solution,
        closed_at: firebase.firestore.FieldValue.serverTimestamp(),
      });
      navigation.goBack();
      Alert.alert('Solicitação', 'Solicitação encerrada com sucesso');
    } catch (error) {
      setIsSaving(false);
      console.log(error);
      Alert.alert('Solicitação', 'Não foi possível encerrar a solicitação');
    }
  };

  useEffect(() => {
    const getOrder = async () => {
      const doc = await firebase
        .firestore()
        .collection<OrderFirestoreDto>('orders')
        .doc(orderId)
        .get();

      const { patrimony, description, status, created_at, closed_at, solution } =
        doc.data() as OrderFirestoreDto;
      const closed = closed_at ? dateFormat(closed_at) : null;
      setOrder({
        id: doc.id,
        patrimony,
        description,
        status,
        solution,
        when: dateFormat(created_at),
        closed,
      });
      setIsLoading(false);
    };

    getOrder();
  }, []);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <VStack flex={1} bg="gray.700">
      <Header title="Solicitação" />
      <HStack bg="gray.500" justifyContent="center" p={4}>
        {order.status === 'closed' ? (
          <CircleWavyCheck size={22} color={colors.green[300]} />
        ) : (
          <Hourglass size={22} color={colors.secondary[700]} />
        )}
        <Text
          fontSize="sm"
          color={order.status === 'closed' ? colors.green[300] : colors.secondary[700]}
          ml={2}
          textTransform="uppercase"
        >
          {order.status === 'closed' ? 'finalizado' : 'em andamento'}
        </Text>
      </HStack>
      <ScrollView mx={5} showsVerticalScrollIndicator={false}>
        <CardDetails
          title="Equipamento"
          description={`Patrimônio ${order.patrimony}`}
          icon={DesktopTower}
          footer={order.when}
        />
        <CardDetails
          title="Descrição do problema"
          description={order.description}
          icon={Clipboard}
        />
        <CardDetails
          title="Solução"
          icon={CircleWavyCheck}
          description={order.solution}
          footer={order.closed && `Encerrado em ${order.closed}`}
        >
          {order.status === 'open' && (
            <Input
              placeholder="Descrição da solução"
              onChangeText={setSolution}
              textAlignVertical="top"
              multiline
              h={24}
            />
          )}
        </CardDetails>
      </ScrollView>

      {order.status === 'open' && (
        <Button
          title="Encerrar solicitação"
          m={5}
          onPress={handleOrderClosed}
          isLoading={isSaving}
        />
      )}
    </VStack>
  );
};
