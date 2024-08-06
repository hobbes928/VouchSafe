import { Box, Flex, Heading } from '@chakra-ui/react';
import ShameTable from '../components/ShameTable';
import FameTable from '../components/FameTable';

const HomePage = () => {
  return (
    <Flex direction={{ base: 'column', md: 'row' }} p={4} gap="20px">
      <Box flex="1" bgGradient="linear(to-tr, purple.800, purple.500)" p={4} borderRadius="lg">
        <Heading size="md" mb={4} color="whiteAlpha.900">Hall of Shame</Heading>
        <ShameTable />
      </Box>
      <Box flex="1" bgGradient="linear(to-tl, orange.500, yellow.300)" p={4} borderRadius="lg">
        <Heading size="md" mb={4} color="whiteAlpha.900">Hall of Fame</Heading>
        <FameTable />
      </Box>
    </Flex>
  );
};

export default HomePage;
