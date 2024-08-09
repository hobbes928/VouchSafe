import React from 'react';
import { Box, Table, Thead, Tbody, Tr, Th, Td, Tooltip, Spinner, Center, Flex, Heading, Icon, useToast } from '@chakra-ui/react';
import { StarIcon } from '@chakra-ui/icons';
import { useQuery } from '@apollo/client';
import { GET_ATTESTATIONS_QUERY } from '@/utils/Queries';
import { AttestSchemaUID } from '@/utils/ContractsUtils';
import { transformAttestationData } from '@/utils/utlis';
import SlicedAddress from './commons/SlicedAddress';
import AttestForm from './AttestForm';

const getStars = (attestations: number) => {
  if (attestations >= 5) return 5;
  if (attestations >= 4) return 4;
  if (attestations >= 3) return 3;
  if (attestations >= 2) return 2;
  return 1;
};

const StarRating = ({ rating }: { rating: number }) => {
  return (
    <Flex>
      {[...Array(5)].map((_, index) => (
        <Icon
          key={index}
          as={StarIcon}
          color={index < rating ? "yellow.400" : "gray.300"}
          w={4}
          h={4}
        />
      ))}
    </Flex>
  );
};

interface FameTableProps {
  onAttestationSubmitted?: () => void;
}

const FameTable: React.FC<FameTableProps> = ({ onAttestationSubmitted }) => {
  const { loading, data: attests, refetch } = useQuery(GET_ATTESTATIONS_QUERY, {
    variables: {
      schemaId: AttestSchemaUID,
    },
  });
  const toast = useToast();

  const handleAttestationSubmitted = () => {
    refetch();
    if (onAttestationSubmitted) {
      onAttestationSubmitted();
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

  const transformedAttests = !loading ? transformAttestationData(attests?.attestations) : [];

  return (
    <Box overflowX="auto" minHeight="200px">
      <Flex justifyContent="space-between" alignItems="center" mb={4}>
        <Heading as="h2" size="lg" color="white">
          Hall of Fame
        </Heading>
        <AttestForm onAttestationSubmitted={handleAttestationSubmitted} />
      </Flex>
      {loading ? (
        <Center height="100%" width="100%">
          <Spinner size="xl" />
        </Center>
      ) : (
        <Table variant="unstyled" size="sm" colorScheme="green">
          <Thead>
            <Tr>
              <Th color="black">Beneficiary</Th>
              <Th color="black">Attestations</Th>
              <Th color="black">Likes</Th>
            </Tr>
          </Thead>
          <Tbody>
            {transformedAttests.map((item: any, index: number) => (
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
                  <Td color="black" onClick={() => handleCopyAddress(item.recipient)} style={{ cursor: 'pointer' }}>
                    <SlicedAddress address={item.recipient} />
                  </Td>
                  <Td color="black">
                    <Flex alignItems="center">
                      <StarRating rating={getStars(item.attestations)} />
                      <Box ml={2}>{item.attestations}</Box>
                    </Flex>
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