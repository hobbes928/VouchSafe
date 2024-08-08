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
  Textarea,
  useDisclosure,
  useColorModeValue,
  useToast,
} from "@chakra-ui/react";
import { EAS, SchemaEncoder } from "@ethereum-attestation-service/eas-sdk";
import { ethers } from "ethers";
import { AttestSchemaUID, EASContractAddress } from "@/utils/ContractsUtils";

const AttestForm = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();

  const [walletAddress, setWalletAddress] = useState("");
  const [formData, setFormData] = useState({
    attestedAddress: "",
    worldID: "",
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
        description: "Please connect your wallet to submit an attestation.",
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
        "address Wallet_Address, string WorldID, bool Like"
      );

      const encodedData = schemaEncoder.encodeData([
        {
          name: "Wallet_Address",
          value: formData.attestedAddress,
          type: "address",
        },
        { name: "WorldID", value: formData.worldID, type: "string" },
        { name: "Like", value: formData.comments ? true : false, type: "bool" },
      ]);

      const tx = await eas.attest({
        schema: AttestSchemaUID,
        data: {
          recipient: formData.attestedAddress,
          expirationTime: BigInt(0),
          revocable: false,
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
        description: error?.message,
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
        Attest to Fame
      </Button>
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        isCentered
        motionPreset="slideInBottom"
      >
        <ModalOverlay bg={overlayGradient} backdropFilter="blur(10px)" />
        <ModalContent bgGradient={bgGradient} p={5} rounded="md" color="white">
          <ModalHeader>Create a New Attestation</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl isRequired>
              <FormLabel htmlFor="attestedAddress">
                Attested Wallet Address
              </FormLabel>
              <Input
                id="attestedAddress"
                placeholder="Enter wallet address to attest"
                onChange={handleInputChange}
              />
            </FormControl>
            <FormControl mt={4} isRequired>
              <FormLabel htmlFor="worldID">WorldID</FormLabel>
              <Input
                id="worldID"
                placeholder="Enter WorldID"
                onChange={handleInputChange}
              />
            </FormControl>
            <FormControl mt={4}>
              <FormLabel htmlFor="comments">Comments</FormLabel>
              <Textarea
                id="comments"
                placeholder="Add any relevant details or endorsements"
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
              Submit Attestation
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default AttestForm;
