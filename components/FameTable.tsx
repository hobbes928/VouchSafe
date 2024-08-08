import React from 'react';
import { Box, Table, Thead, Tbody, Tr, Th, Td, Badge, Tooltip, Spinner, Center, Flex, Heading } from '@chakra-ui/react';
import { useQuery } from '@apollo/client';
import { GET_ATTESTATIONS_QUERY } from '@/utils/Queries';
import { AttestSchemaUID } from '@/utils/ContractsUtils';
import { transformAttestationData } from '@/utils/utlis';
import SlicedAddress from './commons/SlicedAddress';
import AttestForm from './AttestForm';

const fameData = [
  {
    attestorAddress: '0xAAA111...',
    beneficiaryAddress: '0xBBB222...',
    attestations: 5,
    likes: 10,
    comments: 'Highly reliable and professional.'
  },
  {
    attestorAddress: '0xCCC333...',
    beneficiaryAddress: '0xDDD444...',
    attestations: 8,
    likes: 15,
    comments: 'Exceptional work ethics and trustworthiness.'
  },
  {
    attestorAddress: '0xEEE555...',
    beneficiaryAddress: '0xFFF666...',
    attestations: 3,
    likes: 7,
    comments: 'Always delivers on time.'
  },
  {
    attestorAddress: '0xEEE555...',
    beneficiaryAddress: '0xFFF666...',
    attestations: 3,
    likes: 5,
    comments: 'Always delivers on time.'
  }
];

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

  if (!loading) attests = transformAttestationData(attests.attestations);  

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
            {fameData.map((item, index) => (
              <Tooltip
                key={index}
                label={`
                  Attestation Details:
                  Comments: ${item.comments}
                  Total Attestations: ${item.attestations}
                  Likes: ${item.likes}
                `}
                hasArrow
                placement="bottom"
                bg="gray.700"
                color="white"
              >
                <Tr>
                  <Td color="black">{item.attestorAddress}</Td>
                  <Td color="black">{item.beneficiaryAddress}</Td>
                  <Td color="black">
                    <Badge colorScheme={getMedal(item.attestations)} p="1" fontSize="0.8em">
                      {item.attestations} {getMedal(item.attestations)}
                    </Badge>
                  </Td>
                  <Td color="black">{item.likes}</Td>
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