import { Flex, Text } from "@chakra-ui/react";

const Footer = () => {
  return (
    <Flex
      id="footer"
      w="100%"
      h="2.5rem"
      bottom="0"
      bg="#2D3748"
      position="absolute"
      justifyContent="center"
      alignItems="center"
      color="white"
    >
      <Text fontSize=".75rem">
        Projeto desenvolvido pela Software House - UNDB © Todos os direitos
        reservados.
      </Text>
    </Flex>
  );
};

export default Footer;
