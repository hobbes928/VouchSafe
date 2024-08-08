// global.d.ts
interface Window {
  ethereum: {
    on(arg0: string, handleAccountsChanged: (accounts: string[]) => void): unknown;
    removeListener(arg0: string, handleAccountsChanged: (accounts: string[]) => void): unknown;
    isMetaMask?: boolean;
    request: (request: { method: string; params?: Array<any> }) => Promise<any>;
  };
}