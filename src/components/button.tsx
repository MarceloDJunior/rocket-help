import { Button as NativeBaseButton, Heading, IButtonProps } from 'native-base';

type Props = IButtonProps & {
  title: string;
};

export const Button = ({ title, ...props }: Props) => {
  return (
    <NativeBaseButton
      bg="green.700"
      h={14}
      fontSize="sm"
      rounded="sm"
      _pressed={{ bg: 'green.500' }}
      {...props}
    >
      <Heading color="white" fontSize="md">
        {title}
      </Heading>
    </NativeBaseButton>
  );
};
