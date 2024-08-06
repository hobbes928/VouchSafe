import React, { useState, useEffect } from 'react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  useDisclosure,
  useColorModeValue,
  useToast
} from '@chakra-ui/react';

const AttestForm = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();

  const [walletAddress, setWalletAddress] = useState('');
  const [formData, setFormData] = useState({
    attestedAddress: '',
    worldID: '',
    comments: ''
  });

  const bgGradient = useColorModeValue('linear(to-bl, #121212, #480048, #190719)', 'linear(to-br, #121212, #480048, #190719)');
  const overlayGradient = useColorModeValue('linear(to-t, #ffffff40, #ffffff10)', 'linear(to-t, #00000040, #00000010)');

  const buttonStyle = {
    fontWeight: 'bold',
    borderRadius: 'full',
    fontSize: 'md',
    px: 4,
    py: 2,
    color: 'white',
    boxShadow: 'lg',
    background: 'rgba(255, 255, 255, 0.2)',
    _hover: {
      background: 'rgba(255, 255, 255, 0.3)',
    },
  };

  useEffect(() => {
    // Check if MetaMask is installed and connected
    if (typeof window.ethereum !== 'undefined') {
      window.ethereum.request({ method: 'eth_accounts' })
        .then(accounts => {
          if (accounts.length > 0) {
            setWalletAddress(accounts[0]);
          }
        })
        .catch(console.error);
    }
  }, []);

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [id]: value
    }));
  };

  const handleSubmit = async () => {
    if (!walletAddress) {
      toast({
        title: "Wallet not connected",
        description: "Please connect your wallet to submit an attestation.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    try {
      // Here you would typically make an API call to your backend
      const response = await fetch('/api/submit-attestation', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          attestorAddress: walletAddress,
        }),
      });

      if (response.ok) {
        toast({
          title: "Attestation submitted",
          description: "Your attestation has been successfully submitted.",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
        onClose();
      } else {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to submit attestation');
      }
    } catch (error) {
      toast({
        title: "Submission failed",
        description: error.message,
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  return (
    <>
      <Button onClick={onOpen} style={buttonStyle}>Attest</Button>
      <Modal isOpen={isOpen} onClose={onClose} isCentered motionPreset="slideInBottom">
        <ModalOverlay bg={overlayGradient} backdropFilter="blur(10px)" />
        <ModalContent bgGradient={bgGradient} p={5} rounded="md" color="white">
          <ModalHeader>Create a New Attestation</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl isRequired>
              <FormLabel htmlFor="attestedAddress">Attested Wallet Address</FormLabel>
              <Input id="attestedAddress" placeholder="Enter wallet address to attest" onChange={handleInputChange} />
            </FormControl>
            <FormControl mt={4} isRequired>
              <FormLabel htmlFor="worldID">WorldID</FormLabel>
              <Input id="worldID" placeholder="Enter WorldID" onChange={handleInputChange} />
            </FormControl>
            <FormControl mt={4}>
              <FormLabel htmlFor="comments">Comments</FormLabel>
              <Textarea id="comments" placeholder="Add any relevant details or endorsements" onChange={handleInputChange} />
            </FormControl>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="purple" mr={3} onClick={onClose}>
              Close
            </Button>
            <Button variant="outline" borderColor="white" color="white" _hover={{ bg: "whiteAlpha.300" }} onClick={handleSubmit}>Submit Attestation</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default AttestForm;