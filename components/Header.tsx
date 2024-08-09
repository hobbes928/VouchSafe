import {
  Box,
  Button,
  Flex,
  Link,
  keyframes,
  useColorModeValue,
} from "@chakra-ui/react";
import WalletConnect from "./WalletConnect";
import { signIn, signOut, useSession } from "next-auth/react";
import styles from "./header.module.css";

const pulseAnimation = keyframes`
  from { transform: scale(1); }
  50% { transform: scale(1.05); }
  to { transform: scale(1); }
`;

const Header = () => {
  const { data: session, status } = useSession();
  const loading = status === "loading";

  const bgGradient = useColorModeValue(
    "linear(to-l, #121212, #480048, #190719)",
    "linear(to-r, #121212, #480048, #190719)"
  );

  const buttonStyle = {
    fontWeight: "bold",
    borderRadius: "full",
    fontSize: "md",
    px: 4,
    py: 2,
    color: "white",
    boxShadow: "lg",
    background: "rgba(255, 255, 255, 0.2)",
    _hover: {
      background: "rgba(255, 255, 255, 0.3)",
    },
  };

  const connectButtonStyle = {
    ...buttonStyle,
    background: "rgba(255, 100, 100, 0.2)",
    _hover: {
      animation: `${pulseAnimation} 1s infinite ease-in-out`,
      background: "rgba(255, 100, 100, 0.3)",
    },
  };

  return (
    <Flex
      as="header"
      width="full"
      align="center"
      justifyContent="space-between"
      p={4}
      bgGradient={bgGradient}
    >
      <Box>
        <Link href="/" style={{ textDecoration: "none" }}>
          <Button
            variant="ghost"
            size="lg"
            fontSize="2xl"
            fontWeight="bold"
            color="white"
          >
            VouchSafe
          </Button>
        </Link>
      </Box>
      <Box display="flex" alignItems="center">
        <WalletConnect />
      </Box>
      <Box>
        <p
          className={`nojs-show ${
            !session && loading ? styles.loading : styles.loaded
          }`}
        >
          {!session && (
            <>
              <span className={styles.notSignedInText}>
                You are not signed in
              </span>
              <a
                href={`/api/auth/signin`}
                className={styles.buttonPrimary}
                onClick={(e) => {
                  e.preventDefault();
                  signIn("worldcoin");
                }}
              >
                Sign in
              </a>
            </>
          )}
          {session?.user && (
            <>
              <span className={styles.signedInText}>
                <small>Signed in as</small>
                <br />
                <strong>{session.user.email ?? session.user.name}</strong>
              </span>
              <a
                href={`/api/auth/signout`}
                className={styles.button}
                onClick={(e) => {
                  e.preventDefault();
                  signOut();
                }}
              >
                Sign out
              </a>
            </>
          )}
        </p>
      </Box>
    </Flex>
  );
};

export default Header;
