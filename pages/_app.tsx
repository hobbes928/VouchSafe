import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import Layout from "../components/Layout";
import type { AppProps } from "next/app";
import Head from "next/head";
import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import { SessionProvider } from "next-auth/react";
import type { Session } from "next-auth";

const theme = extendTheme({
  fonts: {
    heading: "Poppins, sans-serif",
    body: "Poppins, sans-serif",
  },
});

const client = new ApolloClient({
  cache: new InMemoryCache(),
  uri: "https://sepolia.easscan.org/graphql",
  // uri: "https://optimism.easscan.org/graphql",
});
function MyApp({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps<{ session: Session }>) {
  return (
    <ChakraProvider theme={theme}>
      <SessionProvider session={session}>
        <ApolloProvider client={client}>
          <Head>
            <title>VouchSafe</title>
            <link rel="icon" href="/favicon.ico" />
            <link rel="apple-touch-icon" sizes="180x180" href="/logo.png" />
            <link rel="icon" type="image/png" sizes="32x32" href="/logo.png" />
            <link rel="icon" type="image/png" sizes="16x16" href="/logo.png" />
            <link rel="manifest" href="/site.webmanifest" />
          </Head>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </ApolloProvider>
      </SessionProvider>
    </ChakraProvider>
  );
}

export default MyApp;
