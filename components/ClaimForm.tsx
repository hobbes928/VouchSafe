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
    Select,
    Textarea,
    useDisclosure,
    Box,
    useColorModeValue
  } from '@chakra-ui/react';
  
  const ClaimForm = () => {
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
        <Button onClick={onOpen} style={buttonStyle}>Claim</Button>
        <Modal isOpen={isOpen} onClose={onClose} isCentered motionPreset="slideInBottom">
            <ModalOverlay bg={overlayGradient} backdropFilter="blur(10px)" />
            <ModalContent bgGradient={bgGradient} p={5} rounded="md" color="white">
            <ModalHeader>Create a New Claim</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <FormControl isRequired>
                <FormLabel htmlFor="projectName">Project Name</FormLabel>
                <Input id="projectName" placeholder="Enter project name" />
              </FormControl>
              <FormControl mt={4} isRequired>
                <FormLabel htmlFor="scammerAddress">Scammer Wallet Address</FormLabel>
                <Input id="scammerAddress" placeholder="0x..." />
              </FormControl>
              <FormControl mt={4}>
                <FormLabel htmlFor="scammerLinkedIn">Scammer LinkedIn</FormLabel>
                <Input id="scammerLinkedIn" placeholder="LinkedIn profile URL" />
              </FormControl>
              <FormControl mt={4}>
                <FormLabel htmlFor="scammerWorldID">Scammer WorldID</FormLabel>
                <Input id="scammerWorldID" placeholder="World Identification Number" />
              </FormControl>
              <FormControl mt={4}>
                <FormLabel htmlFor="scammerCompanyName">Scammer Company Name</FormLabel>
                <Input id="scammerCompanyName" placeholder="Enter company name" />
              </FormControl>
              <FormControl mt={4} isRequired>
                <FormLabel htmlFor="amountOwed">Amount Owed (USD)</FormLabel>
                <Input id="amountOwed" placeholder="Amount in USD" />
              </FormControl>
              <FormControl mt={4} isRequired>
                <FormLabel htmlFor="claimStatus">Claim Status</FormLabel>
                <Select id="claimStatus">
                  <option value="open">Open</option>
                  <option value="closed">Closed</option>
                </Select>
              </FormControl>
              <FormControl mt={4}>
                <FormLabel htmlFor="comments">Comments</FormLabel>
                <Textarea id="comments" placeholder="Add any relevant details" />
              </FormControl>
            </ModalBody>
            <ModalFooter>
              <Button colorScheme="purple" mr={3} onClick={onClose}>
                Close
              </Button>
              <Button variant="outline" borderColor="white" color="white" _hover={{ bg: "whiteAlpha.300" }}>Submit Claim</Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </>
    );
  };
  
  export default ClaimForm;
  