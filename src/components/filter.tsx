import { Button, IButtonProps, Text, useTheme } from 'native-base';

type Props = IButtonProps & {
  title: string;
  type: 'open' | 'closed';
  isActive?: boolean;
};

export const Filter = ({ title, type, isActive = false, ...props }: Props) => {
  const { colors } = useTheme();

  const colorType = type === 'open' ? colors.secondary[700] : colors.green[300];

  return (
    <Button
      variant="outline"
      borderWidth={1}
      borderColor={isActive ? colorType : 'gray.600'}
      bgColor="gray.600"
      flex={1}
      size="sm"
      {...props}
    >
      <Text color={isActive ? colorType : 'gray.300'} fontSize="xs" textTransform="uppercase">
        {title}
      </Text>
    </Button>
  );
};
