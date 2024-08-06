import { Box, Button, Menu, MenuButton, MenuItem, MenuList, useToast, Flex, Icon } from '@chakra-ui/react';
import { ChevronDownIcon } from '@chakra-ui/icons';
import { useState } from 'react';
import Web3 from 'web3';  // Using Web3

const WalletConnect = () => {
  const [walletAddress, setWalletAddress] = useState('');
  const toast = useToast();

  const connectWallet = async () => {
    if (window.ethereum) {
      try {
        const web3 = new Web3(window.ethereum);
        const accounts = await web3.eth.requestAccounts();  // Using web3.eth.requestAccounts
        setWalletAddress(accounts[0]);
        toast({
          title: "Wallet Connected",
          description: `Address: ${accounts[0]}`,
          status: "success",
          duration: 9000,
          isClosable: true,
        });
      } catch (error) {
        toast({
          title: "Connection Error",
          description: error.message,
          status: "error",
          duration: 9000,
          isClosable: true,
        });
      }
    } else {
      toast({
        title: "Ethereum object not found",
        description: "Please install MetaMask!",
        status: "error",
        duration: 9000,
        isClosable: true,
      });
    }
  };

  const addressSummary = walletAddress ? `${walletAddress.substring(0, 6)}...${walletAddress.substring(walletAddress.length - 4)}` : '';

  return (
    <Flex alignItems="center" ml={4}>  {/* Added margin left here */}
      {walletAddress ? (
        <Menu>
          <MenuButton as={Button} rightIcon={<ChevronDownIcon />} bg="red.500" _hover={{ bg: "red.600" }}>
            {addressSummary}
          </MenuButton>
          <MenuList>
            <MenuItem onClick={() => alert('Switch to Mainnet')}>Switch to Mainnet</MenuItem>
            <MenuItem onClick={() => alert('Switch to Testnet')}>Switch to Testnet</MenuItem>
          </MenuList>
        </Menu>
      ) : (
        <Button onClick={connectWallet} bg="red.500" _hover={{ bg: "red.600" }}>
          Connect Wallet
        </Button>
      )}
    </Flex>
  );
};

export default WalletConnect;
