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
    useColorModeValue
  } from '@chakra-ui/react';
  
  const AttestForm = () => {
    const { isOpen, onOpen, onClose } = useDisclosure();
  
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
                <FormLabel htmlFor="walletAddress">Wallet Address</FormLabel>
                <Input id="walletAddress" placeholder="Enter wallet address" />
              </FormControl>
              <FormControl mt={4} isRequired>
                <FormLabel htmlFor="worldID">WorldID</FormLabel>
                <Input id="worldID" placeholder="Enter WorldID" />
              </FormControl>
              <FormControl mt={4}>
                <FormLabel htmlFor="like">Comments</FormLabel>
                <Textarea id="like" placeholder="Add any relevant details or endorsements" />
              </FormControl>
            </ModalBody>
            <ModalFooter>
              <Button colorScheme="purple" mr={3} onClick={onClose}>
                Close
              </Button>
              <Button variant="outline" borderColor="white" color="white" _hover={{ bg: "whiteAlpha.300" }}>Submit Attestation</Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </>
    );
  };
  
  export default AttestForm;
  