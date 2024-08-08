type ValueItem = {
  name: string;
  type: string;
  value: any;
};

type Item = {
  name: string;
  type: string;
  signature: string;
  value: ValueItem;
};

type Attestation = {
  __typename: string;
  id: string;
  attester: string;
  recipient: string;
  decodedDataJson: string;
  txid: string;
  timeCreated: number;
};

type NewObject = {
  [key: string]: any;
};

export function transformAttestationData(
  attestations: Attestation[]
): NewObject[] {
  if (!attestations) return [];
  return attestations.map((attestation) => {
    let decodedData: Item[] = [];
    try {
      decodedData = JSON.parse(attestation.decodedDataJson);
    } catch (error) {
      console.error("Error parsing decodedDataJson:", error);
    }

    const flattenedData = decodedData.reduce((acc, item) => {
      acc[item.name] = item.value.value;
      return acc;
    }, {} as NewObject);

    return {
      __typename: attestation.__typename,
      id: attestation.id,
      attester: attestation.attester,
      recipient: attestation.recipient,
      txid: attestation.txid,
      timeCreated: attestation.timeCreated,
      ...flattenedData,
    };
  });
}
