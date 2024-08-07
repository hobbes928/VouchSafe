import { Box, Table, Thead, Tbody, Tr, Th, Td, Popover, PopoverTrigger, PopoverContent, PopoverArrow, PopoverCloseButton, PopoverHeader, PopoverBody, Button, Badge } from '@chakra-ui/react';

// Dummy data for FameTable
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
  return (
    <Box overflowX="auto">
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
            <Tr key={index}>
              <Td>{item.attestorAddress}</Td>
              <Td>{item.beneficiaryAddress}</Td>
              <Td>
                <Popover>
                  <PopoverTrigger>
                    <Button variant="ghost">
                      <Badge colorScheme={getMedal(item.attestations)} p="1" fontSize="0.8em">
                        {item.attestations} {getMedal(item.attestations)}
                      </Badge>
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent>
                    <PopoverArrow />
                    <PopoverCloseButton />
                    <PopoverHeader>Attestation Details</PopoverHeader>
                    <PopoverBody>
                      Comments: {item.comments}<br/>
                      Total Attestations: {item.attestations}
                    </PopoverBody>
                  </PopoverContent>
                </Popover>
              </Td>
              <Td>{item.comments}</Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </Box>
  );
};

export default FameTable;
