import { Box } from '@chakra-ui/react';
import Header from './Header';

const Layout = ({ children }) => {
  return (
    <Box>
      <Header />
      <main>{children}</main>
    </Box>
  );
};

export default Layout;
