import {
    Box,
    Flex,
    Image,
    Text,
    useColorModeValue,
  } from "@chakra-ui/react";
  import WalletConnect from "./WalletConnect";
  
  const Header = () => {
    const bgGradient = useColorModeValue(
      "linear(to-l, #121212, #480048, #190719)",
      "linear(to-r, #121212, #480048, #190719)"
    );
  
    return (
      <Flex
        as="header"
        width="full"
        align="center"
        justifyContent="space-between"
        p={4}
        bgGradient={bgGradient}
      >
        <Flex align="center">
          <Image src="/logo.png" alt="Logo" h="60px" mr={1} />
          <Text
            as="a"
            href="/"
            fontSize="2xl"
            fontWeight="bold"
            color="white"
            textDecoration="none"
          >
            VouchSafe
          </Text>
        </Flex>
        <WalletConnect />
      </Flex>
    );
  };
  
  export default Header;