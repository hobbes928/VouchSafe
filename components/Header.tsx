import { Box, Button, Flex, Link, keyframes, useColorModeValue } from '@chakra-ui/react';
import ClaimForm from './ClaimForm'; // Import ClaimForm component

const pulseAnimation = keyframes`
  from { transform: scale(1); }
  50% { transform: scale(1.05); }
  to { transform: scale(1); }
`;

const Header = () => {
  const bgGradient = useColorModeValue('linear(to-l, #121212, #480048, #190719)', 'linear(to-r, #121212, #480048, #190719)');

  const buttonStyle = {
    fontWeight: 'bold',
    borderRadius: 'full',
    fontSize: 'md',
    px: 4,
    py: 2,
    color: 'white',
    boxShadow: 'lg',
    background: 'rgba(255, 255, 255, 0.2)',
    _hover: {
      background: 'rgba(255, 255, 255, 0.3)',
    },
  };

  const connectButtonStyle = {
    ...buttonStyle,
    background: 'rgba(255, 100, 100, 0.2)',
    _hover: {
      animation: `${pulseAnimation} 1s infinite ease-in-out`,
      background: 'rgba(255, 100, 100, 0.3)',
    },
  };

  return (
    <Flex as="header" width="full" align="center" justifyContent="space-between" p={4} bgGradient={bgGradient}>
      <Box>
        <Link href="/" style={{ textDecoration: 'none' }}>
          <Button variant="ghost" size="lg" fontSize="2xl" fontWeight="bold" color="white">
            VouchSafe
          </Button>
        </Link>
      </Box>
      <Box display="flex" alignItems="center">
        <ClaimForm />
        <Button style={buttonStyle} ml={4} onClick={() => alert('Attest functionality here')}>
          Attest
        </Button>
        <Button style={connectButtonStyle} ml={4} onClick={() => alert('Connect wallet functionality here')}>
          Connect Wallet
        </Button>
      </Box>
    </Flex>
  );
};

export default Header;
