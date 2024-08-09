import React, { useEffect, useState } from "react";
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
} from "@chakra-ui/react";
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

const ShameTable = () => {
  const [account, setAccount] = useState<any>();
  const toast = useToast();

  let { loading, data: claims } = useQuery(GET_ATTESTATIONS_QUERY, {
    variables: {
      schemaId: ClaimSchemaUID,
    },
  });

  useEffect(() => {
    getAccount();
  }, []);

  if (!loading) claims = transformAttestationData(claims?.attestations);

  const getAccount = async () => {
    const provider = new ethers.BrowserProvider(window.ethereum);
    const signer = await provider.getSigner();
    setAccount(signer);
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
        title: "Revocked",
        description: "Revocked.",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    } catch (error) {
      console.log(error);
    } finally {
      toast.close(toastLoading);
    }
  };
  return (
    <Box overflowX="auto" minHeight="200px">
      <Flex justifyContent="space-between" alignItems="center" mb={4}>
        <Heading as="h2" size="lg" color="white">
          Hall of Shame
        </Heading>
        <ClaimForm />
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
              <Th color="white">Claims</Th>
            </Tr>
          </Thead>
          <Tbody>
            {claims.map((item: any, index: number) => (
              <Tooltip
                key={index}
                label={`
                  Project Name: ${item.ProjectName}
                  Wallet Address: ${item.Scammer_Address}
                  LinkedIn URL: ${item.Scammer_LinkedIn}
                  WorldID: ${item.Scammer_WorldID}
                  Comments: ${item.Comments}
                `}
                hasArrow
                placement="bottom"
                bg="gray.700"
                color="white"
              >
                <Tr>
                  <Td color="white">
                    <SlicedAddress address={item.attester} />
                  </Td>
                  <Td color="white">
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
