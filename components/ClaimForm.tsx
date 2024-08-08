import React, { useState, useEffect } from "react";
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
  useColorModeValue,
  Box,
  useToast,
  Flex,
} from "@chakra-ui/react";
import { keyframes } from "@emotion/react";
import { ethers } from "ethers";
import { ClaimSchemaUID, EASContractAddress } from "@/utils/ContractsUtils";
import { EAS, SchemaEncoder } from "@ethereum-attestation-service/eas-sdk";

const pulseAnimation = keyframes`
  0% {
    transform: scale(0.95);
    box-shadow: 0 0 0 0 rgba(255, 255, 255, 0.7);
  }
  
  70% {
    transform: scale(1);
    box-shadow: 0 0 0 10px rgba(255, 255, 255, 0);
  }
  
  100% {
    transform: scale(0.95);
    box-shadow: 0 0 0 0 rgba(255, 255, 255, 0);
  }
`;

const ClaimForm = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();

  const [walletAddress, setWalletAddress] = useState("");
  const [formData, setFormData] = useState({
    projectName: "",
    scammerAddress: "",
    scammerLinkedIn: "",
    scammerWorldID: "",
    scammerCompanyName: "",
    amountOwed: "",
    claimStatus: "open",
    comments: "",
  });

  const bgGradient = useColorModeValue(
    "linear(to-bl, #121212, #480048, #190719)",
    "linear(to-br, #121212, #480048, #190719)"
  );
  const overlayGradient = useColorModeValue(
    "linear(to-t, #ffffff40, #ffffff10)",
    "linear(to-t, #00000040, #00000010)"
  );

  const buttonStyle = {
    fontWeight: "bold",
    borderRadius: "full",
    fontSize: "md",
    px: 4,
    py: 2,
    color: "white",
    boxShadow: "lg",
    background: "rgba(255, 255, 255, 0.2)",
    _hover: {
      background: "rgba(255, 255, 255, 0.3)",
    },
  };

  useEffect(() => {
    // Check if MetaMask is installed and connected
    if (typeof window.ethereum !== "undefined") {
      window.ethereum
        .request({ method: "eth_accounts" })
        .then((accounts) => {
          if (accounts.length > 0) {
            setWalletAddress(accounts[0]);
          }
        })
        .catch(console.error);
    }
  }, []);

  const handleInputChange = (e: any) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  let toastLoading: any;
  const handleSubmit = async () => {
    if (!walletAddress) {
      toast({
        title: "Wallet not connected",
        description: "Please connect your wallet to submit a claim.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    try {
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();

      const eas = new EAS(EASContractAddress);
      eas.connect(signer);

      const schemaEncoder = new SchemaEncoder(
        "string ProjectName,address Scammer_Address,string Scammer_LinkedIn,string Scammer_WorldID,string Scammer_CompanyName,uint24 Amount_Owed_USD,bool Claim_Status,string Comments"
      );

      const encodedData = schemaEncoder.encodeData([
        { name: "ProjectName", value: formData.projectName, type: "string" },
        {
          name: "Scammer_Address",
          value: formData.scammerAddress,
          type: "address",
        },
        {
          name: "Scammer_LinkedIn",
          value: formData.scammerLinkedIn,
          type: "string",
        },
        {
          name: "Scammer_WorldID",
          value: formData.scammerWorldID,
          type: "string",
        },
        {
          name: "Scammer_CompanyName",
          value: formData.scammerCompanyName,
          type: "string",
        },
        { name: "Amount_Owed_USD", value: formData.amountOwed, type: "uint24" },
        { name: "Claim_Status", value: formData.claimStatus, type: "bool" },
        { name: "Comments", value: formData.comments, type: "string" },
      ]);

      const tx = await eas.attest({
        schema: ClaimSchemaUID,
        data: {
          recipient: formData.scammerAddress,
          expirationTime: BigInt(0),
          revocable: true,
          data: encodedData,
        },
      });

      toastLoading = toast({
        description: "Please wait...",
        status: "loading",
        duration: null,
      });

      const newAttestId = await tx.wait();
      console.log("newAttestId:", newAttestId);

      toast({
        title: "Attestation submitted",
        description: "Your attestation has been successfully submitted.",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
      onClose();
    } catch (error: any) {
      if (error.message.toLowerCase().includes("user rejected")) {
        error.message = "User denied transaction signature";
      } else {
        error.message = "Failed to submit attestation.";
      }

      toast({
        title: "Submission failed",
        description: error.message,
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    } finally {
      toast.close(toastLoading);
    }
  };

  return (
    <>
      <Button onClick={onOpen} style={buttonStyle}>
        Register a Shame
      </Button>
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        isCentered
        motionPreset="slideInBottom"
      >
        <ModalOverlay bg={overlayGradient} backdropFilter="blur(10px)" />
        <ModalContent bgGradient={bgGradient} p={5} rounded="md" color="white">
          <ModalHeader>Create a New Claim</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl isRequired>
              <FormLabel htmlFor="projectName">Project Name</FormLabel>
              <Input
                id="projectName"
                placeholder="Enter project name"
                onChange={handleInputChange}
              />
            </FormControl>
            <FormControl mt={4} isRequired>
              <FormLabel htmlFor="scammerAddress">
                Scammer Wallet Address
              </FormLabel>
              <Input
                id="scammerAddress"
                placeholder="0x..."
                onChange={handleInputChange}
              />
            </FormControl>
            <FormControl mt={4}>
              <FormLabel htmlFor="scammerLinkedIn">Scammer LinkedIn</FormLabel>
              <Input
                id="scammerLinkedIn"
                placeholder="LinkedIn profile URL"
                onChange={handleInputChange}
              />
            </FormControl>
            <FormControl mt={4}>
              <FormLabel htmlFor="scammerWorldID">Scammer WorldID</FormLabel>
              <Input
                id="scammerWorldID"
                placeholder="World Identification Number"
                onChange={handleInputChange}
              />
            </FormControl>
            <FormControl mt={4}>
              <FormLabel htmlFor="scammerCompanyName">
                Scammer Company Name
              </FormLabel>
              <Input
                id="scammerCompanyName"
                placeholder="Enter company name"
                onChange={handleInputChange}
              />
            </FormControl>
            <FormControl mt={4} isRequired>
              <FormLabel htmlFor="amountOwed">Amount Owed (USD)</FormLabel>
              <Input
                id="amountOwed"
                placeholder="Amount in USD"
                onChange={handleInputChange}
              />
            </FormControl>
            <FormControl mt={4} isRequired>
              <FormLabel htmlFor="claimStatus">Claim Status</FormLabel>
              <Select
                id="claimStatus"
                onChange={handleInputChange}
                icon={<Box />} // Remove default icon
              >
                <option value="open">
                  <Flex alignItems="center">
                    <Box
                      as="span"
                      width="10px"
                      height="10px"
                      borderRadius="full"
                      bg="green.500"
                      marginRight="2"
                      display="inline-block"
                      animation={`${pulseAnimation} 2s infinite`}
                    />
                    Open
                  </Flex>
                </option>
                <option value="closed">
                  <Flex alignItems="center">
                    <Box
                      as="span"
                      width="10px"
                      height="10px"
                      borderRadius="full"
                      bg="red.500"
                      marginRight="2"
                      display="inline-block"
                      animation={`${pulseAnimation} 2s infinite`}
                    />
                    Closed
                  </Flex>
                </option>
              </Select>
            </FormControl>
            <FormControl mt={4}>
              <FormLabel htmlFor="comments">Comments</FormLabel>
              <Textarea
                id="comments"
                placeholder="Add any relevant details"
                onChange={handleInputChange}
              />
            </FormControl>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="purple" mr={3} onClick={onClose}>
              Close
            </Button>
            <Button
              variant="outline"
              borderColor="white"
              color="white"
              _hover={{ bg: "whiteAlpha.300" }}
              onClick={handleSubmit}
            >
              Submit Claim
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default ClaimForm;
