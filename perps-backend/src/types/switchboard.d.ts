declare module '@switchboard-xyz/solana.js' {
  import { Connection, PublicKey, Signer } from '@solana/web3.js';
  import { Wallet } from '@coral-xyz/anchor';

  export class SwitchboardProgram {
    static load(connection: Connection, wallet: Wallet): Promise<SwitchboardProgram>;
  }

  export class AggregatorAccount {
    constructor(config: { program: SwitchboardProgram; publicKey: PublicKey });
    fetchLatestValue(): Promise<number | null>;
  }

  export interface SwitchboardDecimal {
    mantissa: bigint;
    scale: number;
  }
} 