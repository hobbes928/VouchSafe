import React from "react";
import {
  Box,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverArrow,
  PopoverCloseButton,
  PopoverHeader,
  PopoverBody,
  Button,
  keyframes,
} from "@chakra-ui/react";
import { GET_ATTESTATIONS_QUERY } from "@/utils/Queries";
import { useQuery } from "@apollo/client";
import { AttestSchemaUID, ClaimSchemaUID } from "@/utils/ContractsUtils";

const pulseAnimation = keyframes`
  0% {
    transform: scale(0.95);
    box-shadow: 0 0 0 0 rgba(72, 187, 120, 0.7);
  }
  
  70% {
    transform: scale(1);
    box-shadow: 0 0 0 10px rgba(72, 187, 120, 0);
  }
  
  100% {
    transform: scale(0.95);
    box-shadow: 0 0 0 0 rgba(72, 187, 120, 0);
  }
`;

const dummyData = [
  {
    claimantAddress: "0xABC123...",
    respondentAddress: "0xDEF456...",
    projectName: "Project Phoenix",
    walletAddress: "0xGHI789...",
    linkedInURL: "https://linkedin.com/in/example",
    worldID: "WorldID123",
    status: "Open",
    comments: "Delayed payment",
    numClaims: 3,
  },
  {
    claimantAddress: "0xZZZ999...",
    respondentAddress: "0xXXX888...",
    projectName: "Project Sunrise",
    walletAddress: "0xYYY777...",
    linkedInURL: "https://linkedin.com/in/example2",
    worldID: "WorldID456",
    status: "Closed",
    comments: "Resolved after negotiation",
    numClaims: 1,
  },
  {
    claimantAddress: "0xAAA111...",
    respondentAddress: "0xBBB222...",
    projectName: "New Horizons",
    walletAddress: "0xCCC333...",
    linkedInURL: "https://linkedin.com/in/example3",
    worldID: "WorldID789",
    status: "Open",
    comments: "Payment never received",
    numClaims: 2,
  },
  {
    claimantAddress: "0xEEE444...",
    respondentAddress: "0xFFF555...",
    projectName: "Endeavor",
    walletAddress: "0xGGG666...",
    linkedInURL: "https://linkedin.com/in/example4",
    worldID: "WorldID101112",
    status: "Closed",
    comments: "Partial payment made",
    numClaims: 4,
  },
];

const ShameTable = () => {
  const by = "id";
  // const signer = await provider.getSigner();
  const address = "0xB0739AaF97B5F12D3529ec6C109fbE1A9c9F6bAe"; //await signer.getAddress()

  const recipientCount3 = useQuery(GET_ATTESTATIONS_QUERY, {
    variables: {
      by: by,
      account: address,
      schema: AttestSchemaUID,
    },
  });

  // console.log("attesterCount:", attesterCount);
  // console.log("recipientCount:", recipientCount);
  // console.log("recipientCount2:", recipientCount2);
  console.log("recipientCount3:", recipientCount3);
  // console.log("recipientCount4:", recipientCount4);

  return (
    <Box overflowX="auto">
      <Table variant="unstyled" size="sm" colorScheme="purple">
        <Thead>
          <Tr>
            <Th color="white">Claimant</Th>
            <Th color="white">Respondent</Th>
            <Th color="white">Status</Th>
            <Th color="white">Claims</Th>
          </Tr>
        </Thead>
        <Tbody>
          {dummyData.map((item, index) => (
            <Tr key={index}>
              <Td color="white">{item.claimantAddress}</Td>
              <Td color="white">{item.respondentAddress}</Td>
              <Td color="white">
                <Popover>
                  <PopoverTrigger>
                    <Button variant="ghost">
                      <Box display="flex" alignItems="center">
                        <Box
                          width="10px"
                          height="10px"
                          borderRadius="full"
                          bg={item.status === "Open" ? "green.500" : "red.500"}
                          marginRight="2"
                          animation={
                            item.status === "Open"
                              ? `${pulseAnimation} 2s infinite`
                              : "none"
                          }
                        />
                        {item.status}
                      </Box>
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent color="gray.800">
                    <PopoverArrow />
                    <PopoverCloseButton />
                    <PopoverHeader>Claim Details</PopoverHeader>
                    <PopoverBody>
                      Project Name: {item.projectName}
                      <br />
                      Wallet Address: {item.walletAddress}
                      <br />
                      LinkedIn URL: {item.linkedInURL}
                      <br />
                      WorldID: {item.worldID}
                      <br />
                      Comments: {item.comments}
                    </PopoverBody>
                  </PopoverContent>
                </Popover>
              </Td>
              <Td color="white">{item.numClaims}</Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </Box>
  );
};

export default ShameTable;
