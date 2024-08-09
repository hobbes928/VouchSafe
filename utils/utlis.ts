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
  revoked: string;
};

type LikeCount = {
  recipient: string;
  Like: number;
};

type NewObject = {
  [key: string]: any;
};

export function transformAttestationData(
  attestations: Attestation[] | NewObject[]
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
      revoked: attestation.revoked,
      ...flattenedData,
    };
  });
}

export function countByRecipient(attestations: NewObject[]): LikeCount[] {
  const newAttestations = transformAttestationData(attestations);

  const recipientCount = new Map<string, number>();

  newAttestations.forEach((attestation) => {
    const { recipient } = attestation;
    if (recipientCount.has(recipient)) {
      recipientCount.set(recipient, recipientCount.get(recipient)! + 1);
    } else {
      recipientCount.set(recipient, 1);
    }
  });

  const result: LikeCount[] = Array.from(recipientCount.entries()).map(
    ([recipient, like]) => {
      return {
        recipient,
        Like: like,
      };
    }
  );

  return result;
}
