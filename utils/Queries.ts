import { gql } from "@apollo/client";

export const GET_ATTESTATIONS_QUERY = gql`
  query Attestations($schemaId: String) {
    attestations(where: { schemaId: { equals: $schemaId } }) {
      id
      attester
      recipient
      decodedDataJson
      txid
      timeCreated
    }
  }
`;
