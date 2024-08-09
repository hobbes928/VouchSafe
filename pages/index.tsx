import React, { useState, useCallback, useMemo } from 'react';
import { Box, Flex, Heading, Input, InputGroup, InputLeftElement } from '@chakra-ui/react';
import { SearchIcon } from '@chakra-ui/icons';
import ShameTable from '../components/ShameTable';
import FameTable from '../components/FameTable';
import Head from 'next/head';

const HomePage = () => {
  const [refreshKey, setRefreshKey] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');

  const handleRefresh = useCallback(() => {
    setRefreshKey(prevKey => prevKey + 1);
  }, []);

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const searchProps = useMemo(() => ({ searchTerm }), [searchTerm]);

  return (
    <>
      <Head>
        <title>VouchSafe - Home</title>
      </Head>
      <Box p={4}>
        <InputGroup mb={4}>
          <InputLeftElement pointerEvents="none">
            <SearchIcon color="gray.300" />
          </InputLeftElement>
          <Input
            placeholder="Search addresses, claims, or attestations..."
            value={searchTerm}
            onChange={handleSearch}
            bg="white"
            color="black"
            _placeholder={{ color: 'gray.500' }}
          />
        </InputGroup>
        <Flex direction={{ base: 'column', md: 'row' }} gap="20px">
          <Box flex="1" bgGradient="linear(to-tr, purple.800, purple.500)" p={4} borderRadius="lg">
            <ShameTable
              key={`shame-${refreshKey}`}
              onClaimSubmitted={handleRefresh}
              {...searchProps}
            />
          </Box>
          <Box flex="1" bgGradient="linear(to-tl, orange.500, yellow.300)" p={4} borderRadius="lg">
            <FameTable
              key={`fame-${refreshKey}`}
              onAttestationSubmitted={handleRefresh}
              {...searchProps}
            />
          </Box>
        </Flex>
      </Box>
    </>
  );
};

export default HomePage;