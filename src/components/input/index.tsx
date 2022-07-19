import { IInputProps, Input as NativeBaseInput } from 'native-base';

export const Input = ({ ...props }: IInputProps) => {
  return (
    <NativeBaseInput
      bg="gray.700"
      h={14}
      size="md"
      borderWidth={1}
      borderColor="gray.700"
      fontSize="md"
      fontFamily="body"
      color="white"
      placeholderTextColor="gray.300"
      _focus={{
        borderColor: 'green.500',
        bg: 'gray.700',
      }}
      {...props}
    />
  );
};
