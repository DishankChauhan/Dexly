export interface TestAccount {
  initializeIfNeeded(): Promise<void>;
  hasAccounts(): boolean;
  getKeypair(role: string): any;
  publicKey: string;
  role: string;
}

export const testAccounts: TestAccount[];
export const ACCOUNT_ROLES: {
  ADMIN: string;
  USER: string;
  LIQUIDATOR: string;
  TRADER_1: string;
}; 