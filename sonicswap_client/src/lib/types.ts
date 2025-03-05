
export type TokenType = 'volatile' | 'stable';

export interface Token {
  id: string;
  symbol: string;
  name: string;
  type: TokenType;
  price: number;
  priceChange24h: number;
  volume24h: number;
  marketCap?: number;
  logoUrl?: string;
}

export interface TokenPair {
  id: string;
  baseToken: Token;
  quoteToken: Token;
  price: number;
  priceChange24h: number;
  volume24h: number;
}

export interface SwapConfig {
  id: string;
  sourceToken: Token;
  targetToken: Token;
  volatilityThreshold: number;
  isActive: boolean;
  createdAt: string;
}

export interface SwapTransaction {
  id: string;
  sourceToken: Token;
  sourceAmount: number;
  targetToken: Token;
  targetAmount: number;
  date: string;
  status: 'completed' | 'pending' | 'failed';
  txHash?: string;
}