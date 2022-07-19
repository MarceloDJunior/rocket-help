import { Heading, HStack, IconButton, Box, StyledProps, useTheme } from 'native-base';
import { useNavigation } from '@react-navigation/native';
import { CaretLeft } from 'phosphor-react-native';

type Props = StyledProps & {
  title: string;
};

export const Header = ({ title, ...props }: Props) => {
  const { colors } = useTheme();
  const navigation = useNavigation();

  const handleGoBack = () => {
    navigation.goBack();
  };

  return (
    <HStack
      w="full"
      justifyContent="space-between"
      alignItems="center"
      bg="gray.600"
      px={3}
      pb={6}
      pt={12}
      {...props}
    >
      <IconButton icon={<CaretLeft color={colors.gray[200]} size={24} />} onPress={handleGoBack} />
      <Heading color="gray.100" textAlign="center" fontSize="lg" flex={1}>
        {title}
      </Heading>
      <IconButton disabled />
    </HStack>
  );
};
