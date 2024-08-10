# VouchSafe

[![ETHGlobal](https://img.shields.io/badge/ETHGlobal-SuperHack-blue)](https://ethglobal.com/events/superhack)
[![Optimism](https://img.shields.io/badge/Optimism-Enabled-red)](https://www.optimism.io/)
[![EAS](https://img.shields.io/badge/EAS-Integrated-green)](https://attest.sh/)
[![WorldID](https://img.shields.io/badge/WorldID-Verified-orange)](https://worldcoin.org/world-id)

VouchSafe is a decentralized platform that empowers workers to anonymously attest to their experiences with employers, creating a transparent and accountable gig economy ecosystem.

## Table of Contents
- [Project Description](#project-description)
- [Key Features](#key-features)
- [How It's Made](#how-its-made)
- [Technical Implementation](#technical-implementation)
- [How It Works](#how-it-works)
- [Benefits and Impact](#benefits-and-impact)
- [Getting Started](#getting-started)
- [Environment Setup](#environment-setup)
- [Installation](#installation)
- [Running the Project](#running-the-project)
- [Tech Stack](#tech-stack)
- [WorldID Integration](#worldid-integration)
- [EAS Schema Integration](#eas-schema-integration)
- [Team](#team)
- [Acknowledgements](#acknowledgements)
- [License](#license)

## Project Description

VouchSafe allows workers to anonymously attest to positive or negative experiences with employers' addresses. In cases of unpaid wages, workers can attest a claim to a particular wallet address. Similarly, they can attest to fame for an employer where they've had a positive experience. The landing page is open to everyone, where employer wallet addresses can be searched for claims and their status (open or revoked/closed) can be checked.

## Key Features

- **Anonymous Attestations**: Workers can safely share their experiences without fear of retaliation.
- **Dual Attestation Types**:
  - Negative: Claims for unpaid wages
  - Positive: Recognition of good employer practices
- **Public Search Function**: Anyone can search for attestations linked to specific employer wallet addresses.
- **Revocable Attestations**: Workers can close or revoke their attestations once resolved, ensuring up-to-date information.
- **Human Verification**: Integration with WorldID to prevent bot-generated attestations.

## How It's Made

### Technical Stack

- **Blockchain**: Optimism (Ethereum Layer 2 solution)
- **Attestation Service**: Ethereum Attestation Service (EAS)
- **Identity Verification**: WorldID
- **Frontend**: Next.js, React, Chakra UI
- **Web3 Integration**: ethers.js

### Technical Implementation

1. **Frontend**:
   - User-friendly interface for submitting and searching attestations.
   - Integration with Web3 wallets for secure interactions.

2. **WorldID Integration**:
   - Implements WorldID's verification protocol to ensure human workers.

3. **EAS Integration**:
   - Utilizes EAS for creating and managing verifiable attestations on the blockchain.

4. **Optimism Network**:
   - Chosen for its low gas fees, making it cost-effective for workers to submit attestations.

### How It Works

1. **User Registration**:
   - Workers register using WorldID for human verification.
   - This step ensures one attestation per real human, preventing spam and false claims.

2. **Creating an Attestation**:
   - Workers can submit two types of attestations:
     a. Negative: Claims for unpaid wages, linked to the employer's wallet address.
     b. Positive: Recognition of good practices or positive experiences.
   - Each attestation is stored on the Optimism blockchain using EAS.

3. **Searching Attestations**:
   - The platform provides a public search function.
   - Users can input an employer's wallet address to view all associated attestations.
   - Results show both open and closed attestations for a comprehensive view.

4. **Managing Attestations**:
   - Workers can revoke or close their claims if resolved.
   - This feature allows for resolution of disputes or updating outdated information.

5. **Employer Interaction**:
   - Employers can view attestations linked to their wallet address.
   - This transparency encourages fair practices and prompt resolution of issues.

## Benefits and Impact

- **Workers Empowerment**: Provides a platform for workers to safely report experiences.
- **Employer Accountability**: Encourages fair practices and timely wage payments.
- **Trust in Gig Economy**: Builds a more transparent and trustworthy online work environment.
- **Decentralized Reputation System**: Creates a tamper-proof, blockchain-based reputation system.

## Getting Started

### Environment Setup

Create a `.env` file in the root directory with the following content:

```env
NEXTAUTH_URL=http://localhost:3003
# Generate this with `openssl rand -base64 32`
NEXTAUTH_SECRET=""

# Get these values from the Worldcoin Developer Portal
WLD_CLIENT_ID=
WLD_CLIENT_SECRET=
```

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/vouchsafe.git
   cd vouchsafe
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

### Running the Project

1. Start the development server:
   ```bash
   npm run dev
   ```

2. Open [http://localhost:3000](http://localhost:3000) in your browser to see the result.

## Tech Stack

- **Next.js**: React framework for building the user interface
- **Chakra UI**: Component library for styled UI elements
- **ethers.js**: Library for interacting with Ethereum
- **Apollo Client**: GraphQL client for fetching attestation data
- **Web3.js**: Library for Ethereum blockchain interactions

## WorldID Integration

WorldID is integrated to verify human users and prevent bot-generated attestations. Here's a snippet of the WorldID integration:

```typescript
// File: [...nextauth].ts
import NextAuth, { NextAuthOptions } from "next-auth";

export const authOptions: NextAuthOptions = {
  providers: [
    {
      id: "worldcoin",
      name: "Worldcoin",
      type: "oauth",
      wellKnown: "https://id.worldcoin.org/.well-known/openid-configuration",
      authorization: { params: { scope: "openid" } },
      clientId: process.env.WLD_CLIENT_ID,
      clientSecret: process.env.WLD_CLIENT_SECRET,
      idToken: true,
      checks: ["state", "nonce", "pkce"],
      profile(profile) {
        return {
          id: profile.sub,
          name: profile.sub,
          verificationLevel:
            profile["https://id.worldcoin.org/v1"].verification_level,
        };
      },
    },
  ],
  // ... other configuration
};

export default NextAuth(authOptions);
```

## EAS Schema Integration

VouchSafe uses Ethereum Attestation Service (EAS) for creating and managing attestations. Here are the schema UIDs used in the project:

```typescript
// File: ContractsUtils.ts
export const EASContractAddress = "0xC2679fBD37d54388Ce493F1DB75320D236e1815e"; // Sepolia v0.26
export const AttestSchemaUID = "0x105b3c8b0c481f77d203262c339fe9524b493f9ea2cfbe1a02bd5976268931fa";
export const ClaimSchemaUID = "0x6dee028cb86e60e2884fe261bd0c4e701f7cdfaea0e42aec5628ec96d4b3e10f";
```

To create an attestation, we use the EAS SDK:

```typescript
const eas = new EAS(EASContractAddress);
eas.connect(signer);

const schemaEncoder = new SchemaEncoder("address Wallet_Address, string WorldID, bool Like");

const encodedData = schemaEncoder.encodeData([
  { name: "Wallet_Address", value: formData.attestedAddress, type: "address" },
  { name: "WorldID", value: formData.worldID, type: "string" },
  { name: "Like", value: formData.comments ? true : false, type: "bool" },
]);

const tx = await eas.attest({
  schema: AttestSchemaUID,
  data: {
    recipient: formData.attestedAddress,
    expirationTime: BigInt(0),
    revocable: false,
    data: encodedData,
  },
});

const newAttestId = await tx.wait();
```

## Team

VouchSafe is a proof of concept built by a dedicated team of developers passionate about creating a fairer gig economy. Meet the minds behind the project:

<table>
  <tr>
    <td align="center">
      <a href="https://github.com/alirazacodes">
        <img src="https://github.com/alirazacodes.png" width="100px;" alt="Ali Raza"/><br />
        <sub><b>Ali Raza</b></sub>
      </a><br />
      Web3 Fullstack Dev
    </td>
    <td align="center">
      <a href="https://github.com/alfaqi">
        <img src="https://github.com/alfaqi.png" width="100px;" alt="Abdullah Alfaqi"/><br />
        <sub><b>Abdullah Alfaqi</b></sub>
      </a><br />
      Fullstack Dev
    </td>
    <td align="center">
      <a href="https://github.com/hobbes928">
        <img src="https://github.com/hobbes928.png" width="100px;" alt="hobbes928"/><br />
        <sub><b>Manraj Jawanda</b></sub>
      </a><br />
      Project Manager/Lead
    </td>
  </tr>
</table>

## Acknowledgements

- [ETHGlobal SuperHackathon](https://ethglobal.com)
- [Optimism](https://www.optimism.io/)
- [WorldID](https://worldcoin.org/)
- [Ethereum Attestation Service](https://attest.sh/)

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

Built with ❤️ for the ETHGlobal SuperHack 2023. Check out our [submission](https://ethglobal.com/showcase/vouchsafe-hg15f) on the ETHGlobal showcase!

