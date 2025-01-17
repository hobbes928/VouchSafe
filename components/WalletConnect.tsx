import React, { useState, useEffect } from 'react';
import { Box, Button, Menu, MenuButton, MenuItem, MenuList, useToast, Flex, Text, keyframes, useColorModeValue } from '@chakra-ui/react';
import { ChevronDownIcon } from '@chakra-ui/icons';
import Web3 from 'web3';
import { signIn, signOut, useSession } from "next-auth/react";

const pulseAnimation = keyframes`
  0% { box-shadow: 0 0 0 0 rgba(255, 255, 255, 0.7); }
  70% { box-shadow: 0 0 0 10px rgba(255, 255, 255, 0); }
  100% { box-shadow: 0 0 0 0 rgba(255, 255, 255, 0); }
`;

const WalletConnect = () => {
  const [walletAddress, setWalletAddress] = useState('');
  const [balance, setBalance] = useState('');
  const [network, setNetwork] = useState('');
  const [isWalletConnected, setIsWalletConnected] = useState(false);
  const [web3, setWeb3] = useState<Web3 | null>(null);
  const { data: session } = useSession();
  const isWorldIDConnected = !!session;
  const toast = useToast();

  const bgGradient = useColorModeValue('linear(to-r, #FF416C, #FF4B2B)', 'linear(to-r, #8E2DE2, #4A00E0)');
  const textColor = useColorModeValue('white', 'gray.200');

  useEffect(() => {
    checkConnection();
  }, []);

  useEffect(() => {
    if (isWalletConnected && web3) {
      const handleNetworkChange = (networkId: string | number) => {
        setNetwork(getNetworkName(Number(networkId)));
        fetchBalanceAndNetwork(web3, walletAddress);
      };

      window.ethereum.on('chainChanged', handleNetworkChange);

      return () => {
        window.ethereum.removeListener('chainChanged', handleNetworkChange);
      };
    }
  }, [isWalletConnected, web3, walletAddress]);

  const checkConnection = async () => {
    if (window.ethereum) {
      const web3Instance = new Web3(window.ethereum);
      setWeb3(web3Instance);
      const accounts = await web3Instance.eth.getAccounts();
      if (accounts.length > 0) {
        setWalletAddress(accounts[0]);
        setIsWalletConnected(true);
        fetchBalanceAndNetwork(web3Instance, accounts[0]);
      }
    }
  };

  const fetchBalanceAndNetwork = async (web3Instance: Web3, address: string) => {
    const balance = await web3Instance.eth.getBalance(address);
    setBalance(web3Instance.utils.fromWei(balance, 'ether'));
    const networkId = await web3Instance.eth.getChainId();
    setNetwork(getNetworkName(Number(networkId)));
  };

  const getNetworkName = (networkId: number) => {
    switch(networkId) {
      case 1: return 'Mainnet';
      case 11155111: return 'Sepolia';
      default: return 'Unknown';
    }
  };

  const connectWallet = async () => {
    if (window.ethereum) {
      try {
        const web3Instance = new Web3(window.ethereum);
        setWeb3(web3Instance);
        const accounts = await web3Instance.eth.requestAccounts();
        setWalletAddress(accounts[0]);
        setIsWalletConnected(true);
        fetchBalanceAndNetwork(web3Instance, accounts[0]);
        toast({
          title: "Wallet Connected",
          description: `Address: ${accounts[0]}`,
          status: "success",
          duration: 5000,
          isClosable: true,
        });
      } catch (error: any) {
        toast({
          title: "Connection Error",
          description: error?.message,
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      }
    } else {
      toast({
        title: "Ethereum object not found",
        description: "Please install MetaMask!",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  const disconnectWallet = () => {
    setWalletAddress('');
    setBalance('');
    setNetwork('');
    setIsWalletConnected(false);
    setWeb3(null);
    toast({
      title: "Wallet Disconnected",
      status: "info",
      duration: 5000,
      isClosable: true,
    });
  };

  const connectWorldID = () => {
    signIn("worldcoin");
  };

  const disconnectWorldID = () => {
    signOut();
  };

  const switchNetwork = async (networkName: string) => {
    if (window.ethereum && web3) {
      try {
        await window.ethereum.request({
          method: 'wallet_switchEthereumChain',
          params: [{ chainId: Web3.utils.toHex(getNetworkId(networkName)) }],
        });
        setNetwork(networkName);
        fetchBalanceAndNetwork(web3, walletAddress);
      } catch (error: any) {
        console.error(error);
        toast({
          title: "Network Switch Error",
          description: error?.message,
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      }
    }
  };

  const getNetworkId = (networkName: string) => {
    switch(networkName) {
      case 'Mainnet': return 1;
      case 'Sepolia': return 11155111;
      default: return 1;
    }
  };

  const addressSummary = walletAddress ? `${walletAddress.substring(0, 6)}...${walletAddress.substring(walletAddress.length - 4)}` : '';

  return (
    <Flex alignItems="center" ml={4}>
      {isWalletConnected || isWorldIDConnected ? (
        <Menu>
          <MenuButton
            as={Button}
            rightIcon={<ChevronDownIcon />}
            bgGradient={bgGradient}
            color={textColor}
            _hover={{ opacity: 0.8 }}
            _active={{ opacity: 0.9 }}
            borderRadius="full"
            px={6}
            py={2}
            fontWeight="bold"
          >
            <Flex alignItems="center">
              {isWalletConnected && (
                <>
                  <Box 
                    w={3} 
                    h={3} 
                    borderRadius="full" 
                    bg="green.400"
                    mr={2}
                    animation={`${pulseAnimation} 2s infinite`}
                  />
                  <Text>{addressSummary}</Text>
                </>
              )}
              {isWalletConnected && isWorldIDConnected && <Text mx={2}>|</Text>}
              {isWorldIDConnected && (
                <>
                  <Box 
                    w={3} 
                    h={3} 
                    borderRadius="full" 
                    bg="green.400"
                    mr={2}
                    animation={`${pulseAnimation} 2s infinite`}
                  />
                  <Text>WorldID</Text>
                </>
              )}
            </Flex>
          </MenuButton>
          <MenuList>
            {isWalletConnected && (
              <>
                <MenuItem onClick={() => switchNetwork('Mainnet')}>
                  <Flex alignItems="center">
                    <Box w={2} h={2} borderRadius="full" bg={network === 'Mainnet' ? "green.400" : "red.400"} mr={2} />
                    <Text>Mainnet</Text>
                  </Flex>
                </MenuItem>
                <MenuItem onClick={() => switchNetwork('Sepolia')}>
                  <Flex alignItems="center">
                    <Box w={2} h={2} borderRadius="full" bg={network === 'Sepolia' ? "green.400" : "red.400"} mr={2} />
                    <Text>Sepolia (Testnet)</Text>
                  </Flex>
                </MenuItem>
                <MenuItem>
                  <Text fontWeight="bold">Balance: {parseFloat(balance).toFixed(4)} ETH</Text>
                </MenuItem>
                <MenuItem onClick={disconnectWallet}>
                  <Text color="red.500">Disconnect Wallet</Text>
                </MenuItem>
              </>
            )}
            {isWorldIDConnected ? (
              <MenuItem onClick={disconnectWorldID}>
                <Text color="red.500">Disconnect WorldID</Text>
              </MenuItem>
            ) : (
              <MenuItem onClick={connectWorldID}>
                <Text color="green.500">Connect WorldID</Text>
              </MenuItem>
            )}
          </MenuList>
        </Menu>
      ) : (
        <Button
          onClick={() => {
            connectWallet();
            connectWorldID();
          }}
          bgGradient={bgGradient}
          color={textColor}
          _hover={{ opacity: 0.8 }}
          _active={{ opacity: 0.9 }}
          borderRadius="full"
          px={6}
          py={2}
          fontWeight="bold"
          animation={`${pulseAnimation} 2s infinite`}
        >
          Connect Wallet/WorldID
        </Button>
      )}
    </Flex>
  );
};

export default WalletConnect;