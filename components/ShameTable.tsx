import React from "react";
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
    if (!loading) claims = transformAttestationData(claims.attestations);  

  return (
    <Box overflowX="auto" minHeight="200px"> {/* Added minHeight to ensure space for spinner */}
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
                      {item.Claim_Status === false ? "Open" : "Closed"}
                    </Box>
                  </Td>
                  <Td color="white">{item.numClaims}</Td>
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