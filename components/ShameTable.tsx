import React, { useEffect, useState, useMemo } from "react";
import {
  Box,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Tooltip,
  keyframes,
  Spinner,
  Center,
  Flex,
  Heading,
  Button,
  useToast,
  Icon
} from "@chakra-ui/react";
import { QuestionIcon } from "@chakra-ui/icons";
import { GET_ATTESTATIONS_QUERY } from "@/utils/Queries";
import { useQuery } from "@apollo/client";
import { ClaimSchemaUID, EASContractAddress } from "@/utils/ContractsUtils";
import { transformAttestationData } from "@/utils/utlis";
import SlicedAddress from "./commons/SlicedAddress";
import ClaimForm from "./ClaimForm";
import { ethers } from "ethers";
import { EAS } from "@ethereum-attestation-service/eas-sdk";

const pulseAnimation = keyframes`
  0% {
    transform: scale(0.95);
    box-shadow: 0 0 0 0 rgba(72, 187, 120, 0.7);
  }
  
  70% {
    transform: scale(1);
    box-shadow: 0 0 0 10px rgba(72, 187, 120, 0);
  }
  
  100% {
    transform: scale(0.95);
    box-shadow: 0 0 0 0 rgba(72, 187, 120, 0);
  }
`;
let toastLoading: any;

interface ShameTableProps {
  onClaimSubmitted?: () => void;
  searchTerm: string;
}

const ShameTable: React.FC<ShameTableProps> = ({ onClaimSubmitted, searchTerm }) => {
  const [account, setAccount] = useState<any>();
  const toast = useToast();

  const { loading, data: claims, refetch } = useQuery(GET_ATTESTATIONS_QUERY, {
    variables: {
      schemaId: ClaimSchemaUID,
    },
  });

  useEffect(() => {
    getAccount();
  }, []);

  const transformedClaims = !loading ? transformAttestationData(claims?.attestations) : [];

  const filteredClaims = useMemo(() => {
    if (!searchTerm) return transformedClaims;
    return transformedClaims.filter((claim: any) =>
      Object.values(claim).some((value) =>
        String(value).toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
  }, [transformedClaims, searchTerm]);

  const getAccount = async () => {
    const provider = new ethers.BrowserProvider(window.ethereum);
    const signer = await provider.getSigner();
    setAccount(signer);
  };

  const handleClaimSubmitted = () => {
    refetch();
    if (onClaimSubmitted) {
      onClaimSubmitted();
    }
  };

  const handleRevoke = async (uid: string) => {
    try {
      const eas = new EAS(EASContractAddress);
      eas.connect(account);

      const transaction = await eas.revoke({
        schema: ClaimSchemaUID,
        data: { uid: uid },
      });

      toastLoading = toast({
        description: "Please wait...",
        status: "loading",
        duration: null,
      });

      await transaction.wait();

      toast({
        title: "Revoked",
        description: "Claim has been revoked.",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
      refetch();
    } catch (error: any) {
      if (error.message?.toLowerCase()?.includes("user rejected")) {
        error.message = "User denied transaction signature";
      } else {
        error.message = "Failed to revoke claim.";
      }

      toast({
        title: "Revocation failed",
        description: error.message,
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    } finally {
      toast.close(toastLoading);
    }
  };

  const handleCopyAddress = (address: string) => {
    navigator.clipboard.writeText(address);
    toast({
      title: "Address copied",
      status: "success",
      duration: 2000,
      isClosable: true,
    });
  };

  return (
    <Box overflowX="auto" minHeight="200px">
      <Flex justifyContent="space-between" alignItems="center" mb={4}>
        <Heading as="h2" size="lg" color="white">
          Hall of Shame
        </Heading>
        <ClaimForm onClaimSubmitted={handleClaimSubmitted} />
      </Flex>
      {loading ? (
        <Center height="100%" width="100%">
          <Spinner size="xl" />
        </Center>
      ) : (
        <Table variant="unstyled" size="sm" colorScheme="purple">
          <Thead>
            <Tr>
              <Th color="white">Claimant</Th>
              <Th color="white">Respondent</Th>
              <Th color="white">Status</Th>
              <Th color="white">
                Revoke{" "}
                <Tooltip label="Only claimant can revoke this claim" hasArrow placement="top">
                  <Icon as={QuestionIcon} w={3} h={3} color="gray.300" />
                </Tooltip>
              </Th>
            </Tr>
          </Thead>
          <Tbody>
            {filteredClaims.map((item: any, index: number) => (
              <Tooltip
                key={index}
                label={
                  <Box whiteSpace="pre-line">
                    <u>Claim Details:</u>
                    <br />
                    Project Name: <b>{item.ProjectName}</b>
                    <br />
                    Wallet Address: <b>{item.Scammer_Address}</b>
                    <br />
                    LinkedIn URL: <b>{item.Scammer_LinkedIn}</b>
                    <br />
                    WorldID: <b>{item.Scammer_WorldID}</b>
                    <br />
                    Amount Owed: <b>{item.Amount_Owed_USD}</b>
                    <br />
                    Comments: <b>{item.Comments}</b>
                  </Box>
                }
                hasArrow
                placement="bottom"
                bg="gray.700"
                color="white"
              >
                <Tr>
                  <Td color="white" onClick={() => handleCopyAddress(item.attester)} style={{ cursor: 'pointer' }}>
                    <SlicedAddress address={item.attester} />
                  </Td>
                  <Td color="white" onClick={() => handleCopyAddress(item.Scammer_Address)} style={{ cursor: 'pointer' }}>
                    <SlicedAddress address={item.Scammer_Address} />
                  </Td>
                  <Td color="white">
                    <Box display="flex" alignItems="center">
                      <Box
                        width="10px"
                        height="10px"
                        borderRadius="full"
                        bg={item.revoked === false ? "green.500" : "red.500"}
                        marginRight="2"
                        animation={
                          item.revoked === false
                            ? `${pulseAnimation} 2s infinite`
                            : "none"
                        }
                      />
                      {item.revoked === false ? "Open" : "Closed"}
                    </Box>
                  </Td>
                  <Td color="white">
                    {item.attester?.toLowerCase() ==
                      account?.address?.toLowerCase() &&
                      item.revoked === false && (
                        <Button
                          colorScheme="red"
                          mr={3}
                          onClick={() => handleRevoke(item.id)}
                        >
                          Revoke
                        </Button>
                      )}
                  </Td>
                </Tr>
              </Tooltip>
            ))}
          </Tbody>
        </Table>
      )}
    </Box>
  );
};

export default ShameTable;