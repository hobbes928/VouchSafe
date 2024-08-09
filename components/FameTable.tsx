import React from 'react';
import { Box, Table, Thead, Tbody, Tr, Th, Td, Badge, Tooltip, Spinner, Center, Flex, Heading } from '@chakra-ui/react';
import { useQuery } from '@apollo/client';
import { GET_ATTESTATIONS_QUERY } from '@/utils/Queries';
import { AttestSchemaUID } from '@/utils/ContractsUtils';
import { transformAttestationData } from '@/utils/utlis';
import SlicedAddress from './commons/SlicedAddress';
import AttestForm from './AttestForm';

const getMedal = (attestations: number) => {
  if (attestations >= 8) return 'gold';
  if (attestations >= 5) return 'silver';
  return 'bronze';
};

const FameTable = () => {
  let { loading, data: attests } = useQuery(GET_ATTESTATIONS_QUERY, {
    variables: {
      schemaId: AttestSchemaUID,
    },
  });

  if (!loading) attests = transformAttestationData(attests?.attestations);  

  return (
    <Box overflowX="auto" minHeight="200px">
      <Flex justifyContent="space-between" alignItems="center" mb={4}>
        <Heading as="h2" size="lg" color="white">
          Hall of Fame
        </Heading>
        <AttestForm />
      </Flex>
      {loading ? (
        <Center height="100%" width="100%">
          <Spinner size="xl" />
        </Center>
      ) : (
        <Table variant="unstyled" size="sm" colorScheme="green">
          <Thead>
            <Tr>
              <Th color="black">Attestor</Th>
              <Th color="black">Beneficiary</Th>
              <Th color="black">Attestations</Th>
              <Th color="black">Likes</Th>
            </Tr>
          </Thead>
          <Tbody>
            {attests.map((item: any, index: number) => (
              <Tooltip
                key={index}
                label={`
                  Attestation Details:
                  Total Attestations: ${item.attestations}
                  Likes: ${item.Like}
                `}
                hasArrow
                placement="bottom"
                bg="gray.700"
                color="white"
              >
                <Tr>
                  <Td color="black">
                    <SlicedAddress address={item.attester} />
                    </Td>
                  <Td color="black">
                    <SlicedAddress address={item.recipient} />
                    </Td>
                  <Td color="black">
                    <Badge colorScheme={getMedal(item.attestations)} p="1" fontSize="0.8em">
                      {item.attestations} {getMedal(item.attestations)}
                    </Badge>
                  </Td>
                  <Td color="black">{item.Like && "Yes"}</Td>
                </Tr>
              </Tooltip>
            ))}
          </Tbody>
        </Table>
      )}
    </Box>
  );
};

export default FameTable;