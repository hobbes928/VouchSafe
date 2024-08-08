import React from 'react';
import { Box, Table, Thead, Tbody, Tr, Th, Td, Badge, Tooltip, Spinner, Center } from '@chakra-ui/react';

const fameData = [
  {
    attestorAddress: '0xAAA111...',
    beneficiaryAddress: '0xBBB222...',
    attestations: 5,
    comments: 'Highly reliable and professional.'
  },
  {
    attestorAddress: '0xCCC333...',
    beneficiaryAddress: '0xDDD444...',
    attestations: 8,
    comments: 'Exceptional work ethics and trustworthiness.'
  },
  {
    attestorAddress: '0xEEE555...',
    beneficiaryAddress: '0xFFF666...',
    attestations: 3,
    comments: 'Always delivers on time.'
  },
  {
    attestorAddress: '0xEEE555...',
    beneficiaryAddress: '0xFFF666...',
    attestations: 3,
    comments: 'Always delivers on time.'
  }
];

const getMedal = (attestations: number) => {
    if (attestations >= 8) return 'gold';
    if (attestations >= 5) return 'silver';
    return 'bronze';
  };

const FameTable = () => {
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    setTimeout(() => setLoading(false), 1500);
  }, []);

  return (
    <Box overflowX="auto" minHeight="200px"> {/* Added minHeight to ensure space for spinner */}
      {loading ? (
        <Center height="100%" width="100%">
          <Spinner size="xl" />
        </Center>
      ) : (
      <Table variant="unstyled" size="sm" colorScheme="green">
        <Thead>
          <Tr>
            <Th>Attestor</Th>
            <Th>Beneficiary</Th>
            <Th>Attestations</Th>
            <Th>Comments</Th>
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
              `}
              hasArrow
              placement="bottom"
              bg="gray.700"
              color="white"
            >
              <Tr>
                <Td>{item.attestorAddress}</Td>
                <Td>{item.beneficiaryAddress}</Td>
                <Td>
                  <Badge colorScheme={getMedal(item.attestations)} p="1" fontSize="0.8em">
                    {item.attestations} {getMedal(item.attestations)}
                  </Badge>
                </Td>
                <Td>{item.comments}</Td>
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