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

// Count function
export function countByAttesterAndRecipient(attestations: Attestation[]) {
  // Count occurrences by attester
  const attesterCount = new Map<string, number>();
  // Count occurrences by recipient
  const recipientCount = new Map<string, number>();

  attestations.forEach((attestation) => {
    const { attester, recipient } = attestation;

    // Update count for attester
    if (attesterCount.has(attester)) {
      attesterCount.set(attester, attesterCount.get(attester)! + 1);
    } else {
      attesterCount.set(attester, 1);
    }

    // Update count for recipient
    if (recipientCount.has(recipient)) {
      recipientCount.set(recipient, recipientCount.get(recipient)! + 1);
    } else {
      recipientCount.set(recipient, 1);
    }
  });

  // Convert maps to plain objects for easier use
  const attesterCountObject = Object.fromEntries(attesterCount);
  const recipientCountObject = Object.fromEntries(recipientCount);

  return {
    attesterCount: attesterCountObject,
    recipientCount: recipientCountObject,
  };
}
