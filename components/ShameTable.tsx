import React from "react";
import {
  Box,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverArrow,
  PopoverCloseButton,
  PopoverHeader,
  PopoverBody,
  Button,
  keyframes,
  Spinner,
} from "@chakra-ui/react";
import { GET_ATTESTATIONS_QUERY } from "@/utils/Queries";
import { useQuery } from "@apollo/client";
import { ClaimSchemaUID } from "@/utils/ContractsUtils";
import { transformAttestationData } from "@/utils/utlis";
import SlicedAddress from "./commons/SlicedAddress";

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

const ShameTable = () => {
  let { loading, data: claims } = useQuery(GET_ATTESTATIONS_QUERY, {
    variables: {
      schemaId: ClaimSchemaUID,
    },
  });
  claims = transformAttestationData(!loading && claims.attestations);

  return (
    <Box overflowX="auto">
      {loading ? (
        <Spinner />
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
              <Tr key={index}>
                <Td color="white">
                  <SlicedAddress address={item.attester} />
                </Td>
                <Td color="white">
                  <SlicedAddress address={item.Scammer_Address} />
                </Td>
                <Td color="white">
                  <Popover>
                    <PopoverTrigger>
                      <Button variant="ghost">
                        <Box display="flex" alignItems="center">
                          <Box
                            width="10px"
                            height="10px"
                            borderRadius="full"
                            bg={
                              item.Claim_Status === false
                                ? "green.500"
                                : "red.500"
                            }
                            marginRight="2"
                            animation={
                              item.Claim_Status === false
                                ? `${pulseAnimation} 2s infinite`
                                : "none"
                            }
                          />
                          {item.Claim_Status}
                        </Box>
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent color="gray.800">
                      <PopoverArrow />
                      <PopoverCloseButton />
                      <PopoverHeader>Claim Details</PopoverHeader>
                      <PopoverBody>
                        Project Name: {item.ProjectName}
                        <br />
                        Wallet Address: {item.Scammer_Address}
                        <br />
                        LinkedIn URL: {item.Scammer_LinkedIn}
                        <br />
                        WorldID: {item.Scammer_WorldID}
                        <br />
                        Comments: {item.Comments}
                      </PopoverBody>
                    </PopoverContent>
                  </Popover>
                </Td>
                <Td color="white">{item.numClaims}</Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      )}
    </Box>
  );
};

export default ShameTable;
