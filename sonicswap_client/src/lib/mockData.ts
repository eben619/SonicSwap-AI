
import { Token, TokenPair, SwapConfig, SwapTransaction } from './types';

export const tokens: Token[] = [
  {
    id: 'sonic',
    symbol: 'SONIC',
    name: 'Sonic',
    type: 'volatile',
    price: 0.0478,
    priceChange24h: 5.8,
    volume24h: 12450000,
    logoUrl: 'https://via.placeholder.com/32'
  },
  {
    id: 'hey-anon',
    symbol: 'HEY',
    name: 'Hey Anon',
    type: 'volatile',
    price: 0.0925,
    priceChange24h: -2.3,
    volume24h: 8760000,
    logoUrl: 'https://via.placeholder.com/32'
  },
  {
    id: 'pendle',
    symbol: 'PENDLE',
    name: 'Pendle',
    type: 'volatile',
    price: 3.42,
    priceChange24h: 12.5,
    volume24h: 24680000,
    logoUrl: 'https://via.placeholder.com/32'
  },
  {
    id: 'usdt',
    symbol: 'USDT',
    name: 'Tether',
    type: 'stable',
    price: 1.002,
    priceChange24h: 0.1,
    volume24h: 98760000,
    logoUrl: 'https://via.placeholder.com/32'
  },
  {
    id: 'usdc',
    symbol: 'USDC',
    name: 'USD Coin',
    type: 'stable',
    price: 0.999,
    priceChange24h: -0.2,
    volume24h: 78450000,
    logoUrl: 'https://via.placeholder.com/32'
  },
  {
    id: 'scusd',
    symbol: 'scUSD',
    name: 'Stablecoin USD',
    type: 'stable',
    price: 1.004,
    priceChange24h: 0.3,
    volume24h: 45670000,
    logoUrl: 'https://via.placeholder.com/32'
  }
];

export const tokenPairs: TokenPair[] = [
  {
    id: 'sonic-usdt',
    baseToken: tokens.find(t => t.id === 'sonic')!,
    quoteToken: tokens.find(t => t.id === 'usdt')!,
    price: 0.0478,
    priceChange24h: 5.8,
    volume24h: 4250000
  },
  {
    id: 'sonic-usdc',
    baseToken: tokens.find(t => t.id === 'sonic')!,
    quoteToken: tokens.find(t => t.id === 'usdc')!,
    price: 0.0477,
    priceChange24h: 5.7,
    volume24h: 3980000
  },
  {
    id: 'sonic-scusd',
    baseToken: tokens.find(t => t.id === 'sonic')!,
    quoteToken: tokens.find(t => t.id === 'scusd')!,
    price: 0.0479,
    priceChange24h: 5.9,
    volume24h: 2860000
  },
  {
    id: 'hey-anon-usdt',
    baseToken: tokens.find(t => t.id === 'hey-anon')!,
    quoteToken: tokens.find(t => t.id === 'usdt')!,
    price: 0.0925,
    priceChange24h: -2.3,
    volume24h: 3450000
  },
  {
    id: 'hey-anon-usdc',
    baseToken: tokens.find(t => t.id === 'hey-anon')!,
    quoteToken: tokens.find(t => t.id === 'usdc')!,
    price: 0.0923,
    priceChange24h: -2.4,
    volume24h: 3120000
  },
  {
    id: 'hey-anon-scusd',
    baseToken: tokens.find(t => t.id === 'hey-anon')!,
    quoteToken: tokens.find(t => t.id === 'scusd')!,
    price: 0.0928,
    priceChange24h: -2.1,
    volume24h: 2780000
  },
  {
    id: 'pendle-usdt',
    baseToken: tokens.find(t => t.id === 'pendle')!,
    quoteToken: tokens.find(t => t.id === 'usdt')!,
    price: 3.42,
    priceChange24h: 12.5,
    volume24h: 9860000
  },
  {
    id: 'pendle-usdc',
    baseToken: tokens.find(t => t.id === 'pendle')!,
    quoteToken: tokens.find(t => t.id === 'usdc')!,
    price: 3.41,
    priceChange24h: 12.4,
    volume24h: 8740000
  },
  {
    id: 'pendle-scusd',
    baseToken: tokens.find(t => t.id === 'pendle')!,
    quoteToken: tokens.find(t => t.id === 'scusd')!,
    price: 3.425,
    priceChange24h: 12.6,
    volume24h: 7650000
  }
];

export const swapConfigs: SwapConfig[] = [
  {
    id: '1',
    sourceToken: tokens.find(t => t.id === 'sonic')!,
    targetToken: tokens.find(t => t.id === 'usdt')!,
    volatilityThreshold: 10,
    isActive: true,
    createdAt: new Date(Date.now() - 86400000 * 2).toISOString()
  },
  {
    id: '2',
    sourceToken: tokens.find(t => t.id === 'hey-anon')!,
    targetToken: tokens.find(t => t.id === 'usdc')!,
    volatilityThreshold: 8,
    isActive: true,
    createdAt: new Date(Date.now() - 86400000 * 5).toISOString()
  },
  {
    id: '3',
    sourceToken: tokens.find(t => t.id === 'pendle')!,
    targetToken: tokens.find(t => t.id === 'scusd')!,
    volatilityThreshold: 15,
    isActive: false,
    createdAt: new Date(Date.now() - 86400000 * 10).toISOString()
  }
];

export const swapTransactions: SwapTransaction[] = [
  {
    id: '1',
    sourceToken: tokens.find(t => t.id === 'sonic')!,
    sourceAmount: 1000,
    targetToken: tokens.find(t => t.id === 'usdt')!,
    targetAmount: 47.8,
    date: new Date(Date.now() - 3600000 * 2).toISOString(),
    status: 'completed',
    txHash: '0x1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef'
  },
  {
    id: '2',
    sourceToken: tokens.find(t => t.id === 'hey-anon')!,
    sourceAmount: 500,
    targetToken: tokens.find(t => t.id === 'usdc')!,
    targetAmount: 46.15,
    date: new Date(Date.now() - 3600000 * 12).toISOString(),
    status: 'completed',
    txHash: '0xabcdef1234567890abcdef1234567890abcdef1234567890abcdef1234567890'
  },
  {
    id: '3',
    sourceToken: tokens.find(t => t.id === 'pendle')!,
    sourceAmount: 25,
    targetToken: tokens.find(t => t.id === 'scusd')!,
    targetAmount: 85.625,
    date: new Date(Date.now() - 3600000 * 24).toISOString(),
    status: 'completed',
    txHash: '0x7890abcdef1234567890abcdef1234567890abcdef1234567890abcdef123456'
  },
  {
    id: '4',
    sourceToken: tokens.find(t => t.id === 'sonic')!,
    sourceAmount: 2000,
    targetToken: tokens.find(t => t.id === 'usdc')!,
    targetAmount: 95.4,
    date: new Date(Date.now() - 3600000 * 36).toISOString(),
    status: 'completed',
    txHash: '0xdef1234567890abcdef1234567890abcdef1234567890abcdef1234567890abc'
  },
  {
    id: '5',
    sourceToken: tokens.find(t => t.id === 'hey-anon')!,
    sourceAmount: 100,
    targetToken: tokens.find(t => t.id === 'usdt')!,
    targetAmount: 9.25,
    date: new Date(Date.now() - 3600000 * 48).toISOString(),
    status: 'failed',
    txHash: '0x4567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef123'
  }
];