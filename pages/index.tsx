import React, { useState, useCallback } from 'react';
import { Box, Flex, Heading } from '@chakra-ui/react';
import ShameTable from '../components/ShameTable';
import FameTable from '../components/FameTable';
import Head from 'next/head';

const HomePage = () => {
  const [refreshKey, setRefreshKey] = useState(0);

  const handleRefresh = useCallback(() => {
    setRefreshKey(prevKey => prevKey + 1);
  }, []);

  return (
    <>
      <Head>
        <title>VouchSafe - Home</title>
      </Head>
      <Flex direction={{ base: 'column', md: 'row' }} p={4} gap="20px">
        <Box flex="1" bgGradient="linear(to-tr, purple.800, purple.500)" p={4} borderRadius="lg">
          <ShameTable key={`shame-${refreshKey}`} onClaimSubmitted={handleRefresh} />
        </Box>
        <Box flex="1" bgGradient="linear(to-tl, orange.500, yellow.300)" p={4} borderRadius="lg">
          <FameTable key={`fame-${refreshKey}`} onAttestationSubmitted={handleRefresh} />
        </Box>
      </Flex>
    </>
  );
};

export default HomePage;