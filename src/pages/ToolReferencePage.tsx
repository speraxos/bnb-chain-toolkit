/**
 * ═══════════════════════════════════════════════════════════════════════════
 * BNB CHAIN AI TOOLKIT - Tool Reference
 * ═══════════════════════════════════════════════════════════════════════════
 * ✨ Author: nich | 🐦 x.com/nichxbt | 🐙 github.com/nirholas
 * 📦 github.com/nirholas/bnb-chain-toolkit
 * Copyright (c) 2024-2026 nirholas (nich) - MIT License
 * @preserve
 * ═══════════════════════════════════════════════════════════════════════════
 */

import { useState, useMemo, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Search,
  X,
  ChevronDown,
  ChevronRight,
  Server,
  Wrench,
  Layers,
  Globe,
  ArrowRight,
  ExternalLink,
  Zap,
  Shield,
  TrendingUp,
  Code2,
  Star,
} from 'lucide-react';
import { Spotlight, TextGenerateEffect } from '@/components/ui';
import { useSEO } from '@/hooks/useSEO';
import { cn } from '@/lib/utils';

// ─── Types ───────────────────────────────────────────────────────────────────

interface Tool {
  name: string;
  description: string;
  category: string;
  server: string;
}

interface ToolCategory {
  name: string;
  server: string;
  serverName: string;
  count: string;
  description: string;
  tools: Tool[];
  color: string;
}

// ─── Tool Data: BNB Chain MCP (150+ tools) ──────────────────────────────────

const bnbchainTools: ToolCategory[] = [
  {
    name: 'Core Blockchain', server: 'bnbchain-mcp', serverName: 'BNB Chain MCP', count: '45+', description: 'Fundamental blockchain operations', color: '#F0B90B',
    tools: [
      { name: 'get_balance', description: 'Get native token balance for any address', category: 'Core Blockchain', server: 'bnbchain-mcp' },
      { name: 'get_transaction', description: 'Get transaction details by hash', category: 'Core Blockchain', server: 'bnbchain-mcp' },
      { name: 'get_block', description: 'Get block information by number or hash', category: 'Core Blockchain', server: 'bnbchain-mcp' },
      { name: 'get_gas_price', description: 'Get current gas price on network', category: 'Core Blockchain', server: 'bnbchain-mcp' },
      { name: 'estimate_gas', description: 'Estimate gas for a transaction', category: 'Core Blockchain', server: 'bnbchain-mcp' },
      { name: 'send_transaction', description: 'Send a native token transaction', category: 'Core Blockchain', server: 'bnbchain-mcp' },
      { name: 'get_transaction_receipt', description: 'Get transaction receipt with logs', category: 'Core Blockchain', server: 'bnbchain-mcp' },
      { name: 'get_contract_code', description: 'Get deployed bytecode of contract', category: 'Core Blockchain', server: 'bnbchain-mcp' },
      { name: 'call_contract', description: 'Call a read-only contract function', category: 'Core Blockchain', server: 'bnbchain-mcp' },
      { name: 'deploy_contract', description: 'Deploy a smart contract', category: 'Core Blockchain', server: 'bnbchain-mcp' },
      { name: 'resolve_ens', description: 'Resolve ENS name to address', category: 'Core Blockchain', server: 'bnbchain-mcp' },
      { name: 'get_chain_info', description: 'Get current chain information', category: 'Core Blockchain', server: 'bnbchain-mcp' },
    ],
  },
  {
    name: 'Token Operations', server: 'bnbchain-mcp', serverName: 'BNB Chain MCP', count: '30+', description: 'ERC-20 and NFT token operations', color: '#F59E0B',
    tools: [
      { name: 'get_token_info', description: 'Get name, symbol, decimals, supply', category: 'Token Operations', server: 'bnbchain-mcp' },
      { name: 'get_token_balance', description: 'Get token balance for address', category: 'Token Operations', server: 'bnbchain-mcp' },
      { name: 'transfer_token', description: 'Transfer ERC-20 tokens', category: 'Token Operations', server: 'bnbchain-mcp' },
      { name: 'approve_token', description: 'Approve spending allowance', category: 'Token Operations', server: 'bnbchain-mcp' },
      { name: 'get_nft_metadata', description: 'Get NFT metadata and traits', category: 'Token Operations', server: 'bnbchain-mcp' },
      { name: 'transfer_nft', description: 'Transfer ERC-721 NFT', category: 'Token Operations', server: 'bnbchain-mcp' },
      { name: 'get_token_holders', description: 'Get top token holders', category: 'Token Operations', server: 'bnbchain-mcp' },
      { name: 'get_token_transfers', description: 'Get recent token transfers', category: 'Token Operations', server: 'bnbchain-mcp' },
    ],
  },
  {
    name: 'DeFi', server: 'bnbchain-mcp', serverName: 'BNB Chain MCP', count: '50+', description: 'Swaps, lending, yield farming, liquidity', color: '#10B981',
    tools: [
      { name: 'get_swap_quote', description: 'Get swap quote from DEX aggregators', category: 'DeFi', server: 'bnbchain-mcp' },
      { name: 'execute_swap', description: 'Execute token swap', category: 'DeFi', server: 'bnbchain-mcp' },
      { name: 'add_liquidity', description: 'Add liquidity to DEX pools', category: 'DeFi', server: 'bnbchain-mcp' },
      { name: 'get_lending_rates', description: 'Get Aave/Compound rates', category: 'DeFi', server: 'bnbchain-mcp' },
      { name: 'supply_to_lending', description: 'Supply assets to lending protocol', category: 'DeFi', server: 'bnbchain-mcp' },
      { name: 'get_farming_apy', description: 'Get yield farming APY', category: 'DeFi', server: 'bnbchain-mcp' },
      { name: 'get_pool_info', description: 'Get liquidity pool details', category: 'DeFi', server: 'bnbchain-mcp' },
      { name: 'get_tvl', description: 'Get protocol TVL from DefiLlama', category: 'DeFi', server: 'bnbchain-mcp' },
    ],
  },
  {
    name: 'Security', server: 'bnbchain-mcp', serverName: 'BNB Chain MCP', count: '15+', description: 'GoPlus analysis, honeypot detection, risk checks', color: '#EF4444',
    tools: [
      { name: 'check_token_security', description: 'GoPlus token security analysis', category: 'Security', server: 'bnbchain-mcp' },
      { name: 'detect_honeypot', description: 'Check if token is honeypot', category: 'Security', server: 'bnbchain-mcp' },
      { name: 'check_rug_pull', description: 'Assess rug pull risk', category: 'Security', server: 'bnbchain-mcp' },
      { name: 'get_holder_distribution', description: 'Get top holder breakdown', category: 'Security', server: 'bnbchain-mcp' },
      { name: 'check_contract_verified', description: 'Verify contract source', category: 'Security', server: 'bnbchain-mcp' },
      { name: 'screen_address', description: 'Check address risk score', category: 'Security', server: 'bnbchain-mcp' },
    ],
  },
  {
    name: 'Market Data', server: 'bnbchain-mcp', serverName: 'BNB Chain MCP', count: '25+', description: 'Prices, charts, trending, social metrics', color: '#8B5CF6',
    tools: [
      { name: 'get_price', description: 'Get current token price', category: 'Market Data', server: 'bnbchain-mcp' },
      { name: 'get_price_history', description: 'Get historical OHLCV data', category: 'Market Data', server: 'bnbchain-mcp' },
      { name: 'get_trending_coins', description: 'Get trending tokens', category: 'Market Data', server: 'bnbchain-mcp' },
      { name: 'get_dex_pools', description: 'Get DEX pool data', category: 'Market Data', server: 'bnbchain-mcp' },
      { name: 'get_social_metrics', description: 'Get LunarCrush sentiment', category: 'Market Data', server: 'bnbchain-mcp' },
      { name: 'get_fear_greed', description: 'Fear & Greed Index', category: 'Market Data', server: 'bnbchain-mcp' },
    ],
  },
  {
    name: 'DEX/Swap', server: 'bnbchain-mcp', serverName: 'BNB Chain MCP', count: '10+', description: '1inch, 0x, ParaSwap DEX aggregators', color: '#EC4899',
    tools: [
      { name: 'get_1inch_quote', description: '1inch swap quote', category: 'DEX/Swap', server: 'bnbchain-mcp' },
      { name: 'get_0x_quote', description: '0x API swap quote', category: 'DEX/Swap', server: 'bnbchain-mcp' },
      { name: 'get_paraswap_quote', description: 'ParaSwap swap quote', category: 'DEX/Swap', server: 'bnbchain-mcp' },
      { name: 'compare_swap_routes', description: 'Compare quotes across aggregators', category: 'DEX/Swap', server: 'bnbchain-mcp' },
    ],
  },
];

// ─── Tool Data: Binance MCP (478+ tools) ────────────────────────────────────

const binanceTools: ToolCategory[] = [
  {
    name: 'Spot Trading', server: 'binance-mcp', serverName: 'Binance MCP', count: '35+', description: 'Market data, order management, trade history', color: '#F3BA2F',
    tools: [
      { name: 'get_ticker_price', description: 'Get current spot price', category: 'Spot Trading', server: 'binance-mcp' },
      { name: 'get_order_book', description: 'Get order book depth', category: 'Spot Trading', server: 'binance-mcp' },
      { name: 'place_order', description: 'Place a new spot order', category: 'Spot Trading', server: 'binance-mcp' },
      { name: 'cancel_order', description: 'Cancel an open order', category: 'Spot Trading', server: 'binance-mcp' },
      { name: 'get_open_orders', description: 'Get all open orders', category: 'Spot Trading', server: 'binance-mcp' },
      { name: 'get_trade_history', description: 'Get recent trades', category: 'Spot Trading', server: 'binance-mcp' },
      { name: 'get_klines', description: 'Get candlestick/kline data', category: 'Spot Trading', server: 'binance-mcp' },
      { name: 'get_24h_stats', description: '24-hour price change statistics', category: 'Spot Trading', server: 'binance-mcp' },
    ],
  },
  {
    name: 'Futures (USD-M)', server: 'binance-mcp', serverName: 'Binance MCP', count: '40+', description: 'Perpetual futures, positions, leverage', color: '#F97316',
    tools: [
      { name: 'get_futures_price', description: 'Get futures contract price', category: 'Futures (USD-M)', server: 'binance-mcp' },
      { name: 'get_funding_rate', description: 'Get current funding rate', category: 'Futures (USD-M)', server: 'binance-mcp' },
      { name: 'place_futures_order', description: 'Place futures order', category: 'Futures (USD-M)', server: 'binance-mcp' },
      { name: 'set_leverage', description: 'Set leverage for a symbol', category: 'Futures (USD-M)', server: 'binance-mcp' },
      { name: 'get_position', description: 'Get open position details', category: 'Futures (USD-M)', server: 'binance-mcp' },
      { name: 'get_open_interest', description: 'Get open interest data', category: 'Futures (USD-M)', server: 'binance-mcp' },
    ],
  },
  {
    name: 'Futures (COIN-M)', server: 'binance-mcp', serverName: 'Binance MCP', count: '35+', description: 'Coin-margined futures contracts', color: '#D97706',
    tools: [
      { name: 'get_coinm_price', description: 'Get COIN-M contract price', category: 'Futures (COIN-M)', server: 'binance-mcp' },
      { name: 'place_coinm_order', description: 'Place COIN-M order', category: 'Futures (COIN-M)', server: 'binance-mcp' },
      { name: 'get_coinm_position', description: 'Get COIN-M position', category: 'Futures (COIN-M)', server: 'binance-mcp' },
    ],
  },
  {
    name: 'Margin Trading', server: 'binance-mcp', serverName: 'Binance MCP', count: '41', description: 'Cross & isolated margin, borrowing', color: '#DC2626',
    tools: [
      { name: 'margin_borrow', description: 'Borrow on margin', category: 'Margin Trading', server: 'binance-mcp' },
      { name: 'margin_repay', description: 'Repay margin loan', category: 'Margin Trading', server: 'binance-mcp' },
      { name: 'place_margin_order', description: 'Place margin trade order', category: 'Margin Trading', server: 'binance-mcp' },
      { name: 'get_margin_account', description: 'Get margin account info', category: 'Margin Trading', server: 'binance-mcp' },
    ],
  },
  {
    name: 'Options', server: 'binance-mcp', serverName: 'Binance MCP', count: '27', description: 'European-style options trading', color: '#7C3AED',
    tools: [
      { name: 'get_option_info', description: 'Get option contract info', category: 'Options', server: 'binance-mcp' },
      { name: 'place_option_order', description: 'Place option order', category: 'Options', server: 'binance-mcp' },
      { name: 'get_option_positions', description: 'Get option positions', category: 'Options', server: 'binance-mcp' },
    ],
  },
  {
    name: 'Wallet', server: 'binance-mcp', serverName: 'Binance MCP', count: '40+', description: 'Deposits, withdrawals, transfers, assets', color: '#2563EB',
    tools: [
      { name: 'get_account_balance', description: 'Get all asset balances', category: 'Wallet', server: 'binance-mcp' },
      { name: 'withdraw', description: 'Withdraw assets', category: 'Wallet', server: 'binance-mcp' },
      { name: 'get_deposit_address', description: 'Get deposit address', category: 'Wallet', server: 'binance-mcp' },
      { name: 'get_deposit_history', description: 'Get deposit history', category: 'Wallet', server: 'binance-mcp' },
      { name: 'universal_transfer', description: 'Transfer between sub-accounts', category: 'Wallet', server: 'binance-mcp' },
    ],
  },
  {
    name: 'Earn & Staking', server: 'binance-mcp', serverName: 'Binance MCP', count: '50+', description: 'Simple Earn, Auto-Invest, Staking, Dual Investment', color: '#059669',
    tools: [
      { name: 'get_earn_products', description: 'List Simple Earn products', category: 'Earn & Staking', server: 'binance-mcp' },
      { name: 'subscribe_earn', description: 'Subscribe to earn product', category: 'Earn & Staking', server: 'binance-mcp' },
      { name: 'get_staking_products', description: 'List staking products', category: 'Earn & Staking', server: 'binance-mcp' },
      { name: 'create_auto_invest', description: 'Create Auto-Invest plan', category: 'Earn & Staking', server: 'binance-mcp' },
      { name: 'get_dual_investment', description: 'Get Dual Investment products', category: 'Earn & Staking', server: 'binance-mcp' },
    ],
  },
  {
    name: 'Algo Trading', server: 'binance-mcp', serverName: 'Binance MCP', count: '11+', description: 'TWAP, VP, algorithmic orders', color: '#0EA5E9',
    tools: [
      { name: 'place_twap_order', description: 'Place TWAP algorithmic order', category: 'Algo Trading', server: 'binance-mcp' },
      { name: 'place_vp_order', description: 'Place Volume Participation order', category: 'Algo Trading', server: 'binance-mcp' },
      { name: 'get_algo_orders', description: 'Get algorithmic order status', category: 'Algo Trading', server: 'binance-mcp' },
    ],
  },
  {
    name: 'Copy Trading', server: 'binance-mcp', serverName: 'Binance MCP', count: '10+', description: 'Lead trader and copy features', color: '#14B8A6',
    tools: [
      { name: 'get_lead_traders', description: 'Get top lead traders', category: 'Copy Trading', server: 'binance-mcp' },
      { name: 'start_copy', description: 'Start copying a trader', category: 'Copy Trading', server: 'binance-mcp' },
      { name: 'stop_copy', description: 'Stop copying a trader', category: 'Copy Trading', server: 'binance-mcp' },
    ],
  },
  {
    name: 'Other', server: 'binance-mcp', serverName: 'Binance MCP', count: '50+', description: 'NFT, Mining, P2P, Pay, Gift Cards, Convert, Rebate', color: '#6B7280',
    tools: [
      { name: 'get_mining_stats', description: 'Get mining statistics', category: 'Other', server: 'binance-mcp' },
      { name: 'get_p2p_ads', description: 'Get P2P trading ads', category: 'Other', server: 'binance-mcp' },
      { name: 'convert_trade', description: 'Instant asset conversion', category: 'Other', server: 'binance-mcp' },
      { name: 'create_gift_card', description: 'Create a Binance gift card', category: 'Other', server: 'binance-mcp' },
    ],
  },
];

// ─── Tool Data: Binance US MCP (120+ tools) ─────────────────────────────────

const binanceUsTools: ToolCategory[] = [
  {
    name: 'Market Data', server: 'binance-us-mcp', serverName: 'Binance US MCP', count: '10+', description: 'Tickers, order books, trades, klines', color: '#F3BA2F',
    tools: [
      { name: 'get_ticker_price', description: 'Get price on Binance.US', category: 'Market Data', server: 'binance-us-mcp' },
      { name: 'get_24h_stats', description: '24h statistics', category: 'Market Data', server: 'binance-us-mcp' },
      { name: 'get_order_book', description: 'Order book depth', category: 'Market Data', server: 'binance-us-mcp' },
      { name: 'get_recent_trades', description: 'Recent trade history', category: 'Market Data', server: 'binance-us-mcp' },
      { name: 'get_klines', description: 'Candlestick data', category: 'Market Data', server: 'binance-us-mcp' },
    ],
  },
  {
    name: 'Spot Trading', server: 'binance-us-mcp', serverName: 'Binance US MCP', count: '15+', description: 'Limit, market, stop-limit orders', color: '#10B981',
    tools: [
      { name: 'place_order', description: 'Place a spot order', category: 'Spot Trading', server: 'binance-us-mcp' },
      { name: 'cancel_order', description: 'Cancel an order', category: 'Spot Trading', server: 'binance-us-mcp' },
      { name: 'get_open_orders', description: 'Get open orders', category: 'Spot Trading', server: 'binance-us-mcp' },
    ],
  },
  {
    name: 'Wallet & Staking', server: 'binance-us-mcp', serverName: 'Binance US MCP', count: '25+', description: 'Balances, deposits, withdrawals, staking', color: '#3B82F6',
    tools: [
      { name: 'get_balance', description: 'Get account balances', category: 'Wallet & Staking', server: 'binance-us-mcp' },
      { name: 'get_deposit_address', description: 'Get deposit address', category: 'Wallet & Staking', server: 'binance-us-mcp' },
      { name: 'get_staking_products', description: 'Available staking products', category: 'Wallet & Staking', server: 'binance-us-mcp' },
    ],
  },
  {
    name: 'OTC & Institutional', server: 'binance-us-mcp', serverName: 'Binance US MCP', count: '20+', description: 'OTC, sub-accounts, custodial, credit line', color: '#8B5CF6',
    tools: [
      { name: 'get_otc_quote', description: 'Get OTC trading quote', category: 'OTC & Institutional', server: 'binance-us-mcp' },
      { name: 'create_sub_account', description: 'Create sub-account', category: 'OTC & Institutional', server: 'binance-us-mcp' },
    ],
  },
];

// ─── Tool Data: Universal Crypto MCP (380+ tools) ───────────────────────────

const universalTools: ToolCategory[] = [
  {
    name: 'Core Blockchain', server: 'universal-crypto-mcp', serverName: 'Universal Crypto MCP', count: '45+', description: 'Cross-chain blockchain operations', color: '#6366F1',
    tools: [
      { name: 'get_balance', description: 'Get balance on any chain', category: 'Core Blockchain', server: 'universal-crypto-mcp' },
      { name: 'send_transaction', description: 'Send transaction on any chain', category: 'Core Blockchain', server: 'universal-crypto-mcp' },
      { name: 'get_block', description: 'Get block data from any chain', category: 'Core Blockchain', server: 'universal-crypto-mcp' },
      { name: 'deploy_contract', description: 'Deploy contract to any EVM', category: 'Core Blockchain', server: 'universal-crypto-mcp' },
    ],
  },
  {
    name: 'DeFi', server: 'universal-crypto-mcp', serverName: 'Universal Crypto MCP', count: '50+', description: 'Multi-chain DeFi operations', color: '#10B981',
    tools: [
      { name: 'get_swap_quote', description: 'Cross-chain swap quote', category: 'DeFi', server: 'universal-crypto-mcp' },
      { name: 'execute_swap', description: 'Execute cross-chain swap', category: 'DeFi', server: 'universal-crypto-mcp' },
      { name: 'get_lending_rates', description: 'Multi-chain lending rates', category: 'DeFi', server: 'universal-crypto-mcp' },
    ],
  },
  {
    name: 'x402 Payments', server: 'universal-crypto-mcp', serverName: 'Universal Crypto MCP', count: '14', description: 'AI-to-AI payments, service marketplace', color: '#8B5CF6',
    tools: [
      { name: 'x402_get_balance', description: 'Check x402 payment balance', category: 'x402 Payments', server: 'universal-crypto-mcp' },
      { name: 'x402_pay', description: 'Make x402 payment', category: 'x402 Payments', server: 'universal-crypto-mcp' },
      { name: 'x402_register_service', description: 'Register AI service', category: 'x402 Payments', server: 'universal-crypto-mcp' },
      { name: 'x402_discover_services', description: 'Discover AI services', category: 'x402 Payments', server: 'universal-crypto-mcp' },
    ],
  },
  {
    name: 'Bridges', server: 'universal-crypto-mcp', serverName: 'Universal Crypto MCP', count: '10+', description: 'LayerZero, Stargate, Wormhole', color: '#EC4899',
    tools: [
      { name: 'bridge_tokens', description: 'Bridge tokens across chains', category: 'Bridges', server: 'universal-crypto-mcp' },
      { name: 'get_bridge_quote', description: 'Get bridge transfer quote', category: 'Bridges', server: 'universal-crypto-mcp' },
      { name: 'get_bridge_status', description: 'Check bridge transaction status', category: 'Bridges', server: 'universal-crypto-mcp' },
    ],
  },
  {
    name: 'Security', server: 'universal-crypto-mcp', serverName: 'Universal Crypto MCP', count: '15+', description: 'GoPlus, honeypot, rug pull detection', color: '#EF4444',
    tools: [
      { name: 'check_token_security', description: 'Cross-chain token security', category: 'Security', server: 'universal-crypto-mcp' },
      { name: 'detect_honeypot', description: 'Honeypot detection', category: 'Security', server: 'universal-crypto-mcp' },
    ],
  },
  {
    name: 'Market Data', server: 'universal-crypto-mcp', serverName: 'Universal Crypto MCP', count: '25+', description: 'CoinGecko, DefiLlama, GeckoTerminal', color: '#F59E0B',
    tools: [
      { name: 'get_price', description: 'Get token price (any chain)', category: 'Market Data', server: 'universal-crypto-mcp' },
      { name: 'get_trending', description: 'Trending tokens', category: 'Market Data', server: 'universal-crypto-mcp' },
      { name: 'get_tvl', description: 'Protocol TVL data', category: 'Market Data', server: 'universal-crypto-mcp' },
    ],
  },
];

// ─── Tool Data: Agenti (380+ tools) ─────────────────────────────────────────

const agentiTools: ToolCategory[] = [
  {
    name: 'Core Blockchain', server: 'agenti', serverName: 'Agenti', count: '45+', description: 'Cross-chain blockchain operations', color: '#6366F1',
    tools: [
      { name: 'get_balance', description: 'Get balance on any chain', category: 'Core Blockchain', server: 'agenti' },
      { name: 'send_transaction', description: 'Send transaction on any chain', category: 'Core Blockchain', server: 'agenti' },
      { name: 'get_block', description: 'Get block data from any chain', category: 'Core Blockchain', server: 'agenti' },
      { name: 'deploy_contract', description: 'Deploy contract to any EVM', category: 'Core Blockchain', server: 'agenti' },
    ],
  },
  {
    name: 'DeFi', server: 'agenti', serverName: 'Agenti', count: '50+', description: 'Multi-chain DeFi operations', color: '#10B981',
    tools: [
      { name: 'get_swap_quote', description: 'Cross-chain swap quote', category: 'DeFi', server: 'agenti' },
      { name: 'execute_swap', description: 'Execute cross-chain swap', category: 'DeFi', server: 'agenti' },
      { name: 'get_lending_rates', description: 'Multi-chain lending rates', category: 'DeFi', server: 'agenti' },
    ],
  },
  {
    name: 'x402 Payments', server: 'agenti', serverName: 'Agenti', count: '14', description: 'AI-to-AI payments, service marketplace', color: '#8B5CF6',
    tools: [
      { name: 'x402_get_balance', description: 'Check x402 payment balance', category: 'x402 Payments', server: 'agenti' },
      { name: 'x402_pay', description: 'Make x402 payment', category: 'x402 Payments', server: 'agenti' },
      { name: 'x402_register_service', description: 'Register AI service', category: 'x402 Payments', server: 'agenti' },
      { name: 'x402_discover_services', description: 'Discover AI services', category: 'x402 Payments', server: 'agenti' },
    ],
  },
  {
    name: 'Bridges', server: 'agenti', serverName: 'Agenti', count: '10+', description: 'LayerZero, Stargate, Wormhole', color: '#EC4899',
    tools: [
      { name: 'bridge_tokens', description: 'Bridge tokens across chains', category: 'Bridges', server: 'agenti' },
      { name: 'get_bridge_quote', description: 'Get bridge transfer quote', category: 'Bridges', server: 'agenti' },
      { name: 'get_bridge_status', description: 'Check bridge transaction status', category: 'Bridges', server: 'agenti' },
    ],
  },
  {
    name: 'Security', server: 'agenti', serverName: 'Agenti', count: '15+', description: 'GoPlus, honeypot, rug pull detection', color: '#EF4444',
    tools: [
      { name: 'check_token_security', description: 'Cross-chain token security', category: 'Security', server: 'agenti' },
      { name: 'detect_honeypot', description: 'Honeypot detection', category: 'Security', server: 'agenti' },
    ],
  },
  {
    name: 'Market Data', server: 'agenti', serverName: 'Agenti', count: '25+', description: 'CoinGecko, DefiLlama, GeckoTerminal', color: '#F59E0B',
    tools: [
      { name: 'get_price', description: 'Get token price (any chain)', category: 'Market Data', server: 'agenti' },
      { name: 'get_trending', description: 'Trending tokens', category: 'Market Data', server: 'agenti' },
      { name: 'get_tvl', description: 'Protocol TVL data', category: 'Market Data', server: 'agenti' },
    ],
  },
];

// ─── Tool Data: UCAI (Dynamic tools) ────────────────────────────────────────

const ucaiTools: ToolCategory[] = [
  {
    name: 'Server Generation', server: 'ucai', serverName: 'UCAI', count: 'Dynamic', description: 'Generate MCP servers from contract ABIs', color: '#10B981',
    tools: [
      { name: 'generate', description: 'Generate MCP server from contract ABI', category: 'Server Generation', server: 'ucai' },
      { name: 'generate_from_address', description: 'Auto-fetch ABI and generate server', category: 'Server Generation', server: 'ucai' },
    ],
  },
  {
    name: 'Security Scanner', server: 'ucai', serverName: 'UCAI', count: '50+', description: '50+ risk checks, honeypot, rugpull analysis', color: '#EF4444',
    tools: [
      { name: 'scan_contract', description: 'Run full security scan', category: 'Security Scanner', server: 'ucai' },
      { name: 'check_ownership', description: 'Analyze contract ownership', category: 'Security Scanner', server: 'ucai' },
      { name: 'detect_risks', description: 'Detect common risk patterns', category: 'Security Scanner', server: 'ucai' },
    ],
  },
  {
    name: 'Contract Whisperer', server: 'ucai', serverName: 'UCAI', count: '\u2014', description: 'Plain English contract explanations', color: '#3B82F6',
    tools: [
      { name: 'explain_contract', description: 'Explain contract in plain English', category: 'Contract Whisperer', server: 'ucai' },
      { name: 'explain_function', description: 'Explain a specific function', category: 'Contract Whisperer', server: 'ucai' },
    ],
  },
  {
    name: 'Pro Templates', server: 'ucai', serverName: 'UCAI', count: '5+', description: 'Flash Loans, Arbitrage, Yield Aggregators', color: '#8B5CF6',
    tools: [
      { name: 'flash_loan_template', description: 'Generate flash loan server', category: 'Pro Templates', server: 'ucai' },
      { name: 'arbitrage_template', description: 'Generate arbitrage server', category: 'Pro Templates', server: 'ucai' },
      { name: 'yield_aggregator_template', description: 'Generate yield aggregator server', category: 'Pro Templates', server: 'ucai' },
    ],
  },
];

// ─── Combined data ──────────────────────────────────────────────────────────

const ALL_CATEGORIES: ToolCategory[] = [
  ...bnbchainTools,
  ...binanceTools,
  ...binanceUsTools,
  ...universalTools,
  ...agentiTools,
  ...ucaiTools,
];

// ─── Server metadata ────────────────────────────────────────────────────────

interface ServerMeta {
  id: string;
  name: string;
  count: string;
  color: string;
  icon: typeof Server;
}

const SERVERS: ServerMeta[] = [
  { id: 'bnbchain-mcp', name: 'BNB Chain MCP', count: '150+', color: '#F0B90B', icon: Zap },
  { id: 'binance-mcp', name: 'Binance MCP', count: '478+', color: '#F3BA2F', icon: TrendingUp },
  { id: 'binance-us-mcp', name: 'Binance US MCP', count: '120+', color: '#3B82F6', icon: Globe },
  { id: 'universal-crypto-mcp', name: 'Universal Crypto MCP', count: '380+', color: '#6366F1', icon: Layers },
  { id: 'agenti', name: 'Agenti', count: '380+', color: '#10B981', icon: Code2 },
  { id: 'ucai', name: 'UCAI', count: 'Dynamic', color: '#8B5CF6', icon: Wrench },
];

// ─── Popular tools ──────────────────────────────────────────────────────────

const POPULAR_TOOLS: Tool[] = [
  { name: 'get_price', description: 'Get current token price on any chain', category: 'Market Data', server: 'bnbchain-mcp' },
  { name: 'get_balance', description: 'Get native token balance for any address', category: 'Core Blockchain', server: 'bnbchain-mcp' },
  { name: 'check_token_security', description: 'GoPlus token security analysis', category: 'Security', server: 'bnbchain-mcp' },
  { name: 'get_swap_quote', description: 'Get swap quote from DEX aggregators', category: 'DeFi', server: 'bnbchain-mcp' },
  { name: 'execute_swap', description: 'Execute token swap on DEX', category: 'DeFi', server: 'bnbchain-mcp' },
  { name: 'get_token_info', description: 'Get name, symbol, decimals, supply', category: 'Token Operations', server: 'bnbchain-mcp' },
  { name: 'detect_honeypot', description: 'Check if token is honeypot', category: 'Security', server: 'bnbchain-mcp' },
  { name: 'get_ticker_price', description: 'Get current spot price on Binance', category: 'Spot Trading', server: 'binance-mcp' },
  { name: 'bridge_tokens', description: 'Bridge tokens across chains', category: 'Bridges', server: 'universal-crypto-mcp' },
  { name: 'get_funding_rate', description: 'Get current funding rate for futures', category: 'Futures (USD-M)', server: 'binance-mcp' },
  { name: 'scan_contract', description: 'Run full security scan on contract', category: 'Security Scanner', server: 'ucai' },
  { name: 'get_tvl', description: 'Get protocol TVL from DefiLlama', category: 'DeFi', server: 'bnbchain-mcp' },
];

// ─── Component ──────────────────────────────────────────────────────────────

export default function ToolReferencePage() {
  useSEO({
    title: 'Tool Reference',
    description: '900+ tools across 6 MCP servers. Search, browse, and find exactly the tool you need for BNB Chain, Binance, and 60+ blockchain networks.',
    path: '/tools',
  });

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedServers, setSelectedServers] = useState<string[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [expandedCategories, setExpandedCategories] = useState<Set<string>>(new Set());

  // Toggle a server filter
  const toggleServer = useCallback((serverId: string) => {
    setSelectedServers(prev =>
      prev.includes(serverId) ? prev.filter(s => s !== serverId) : [...prev, serverId]
    );
    setSelectedCategories([]);
  }, []);

  // Toggle a category filter
  const toggleCategory = useCallback((categoryKey: string) => {
    setSelectedCategories(prev =>
      prev.includes(categoryKey) ? prev.filter(c => c !== categoryKey) : [...prev, categoryKey]
    );
  }, []);

  // Toggle expand/collapse for a category section
  const toggleExpanded = useCallback((key: string) => {
    setExpandedCategories(prev => {
      const next = new Set(prev);
      if (next.has(key)) {
        next.delete(key);
      } else {
        next.add(key);
      }
      return next;
    });
  }, []);

  // Available categories based on selected servers
  const availableCategories = useMemo(() => {
    const cats: { key: string; name: string; server: string }[] = [];
    const seen = new Set<string>();
    for (const cat of ALL_CATEGORIES) {
      if (selectedServers.length > 0 && !selectedServers.includes(cat.server)) continue;
      const key = `${cat.server}::${cat.name}`;
      if (!seen.has(key)) {
        seen.add(key);
        cats.push({ key, name: cat.name, server: cat.server });
      }
    }
    return cats;
  }, [selectedServers]);

  // Filter categories and tools based on search + filters
  const filteredCategories = useMemo(() => {
    const query = searchQuery.toLowerCase().trim();

    return ALL_CATEGORIES.map(cat => {
      // Server filter
      if (selectedServers.length > 0 && !selectedServers.includes(cat.server)) return null;

      // Category filter
      const catKey = `${cat.server}::${cat.name}`;
      if (selectedCategories.length > 0 && !selectedCategories.includes(catKey)) return null;

      // Search filter — match on category name, tool name, or description
      if (query) {
        const matchingTools = cat.tools.filter(
          t => t.name.toLowerCase().includes(query) || t.description.toLowerCase().includes(query)
        );
        const categoryMatches = cat.name.toLowerCase().includes(query) || cat.description.toLowerCase().includes(query);

        if (matchingTools.length === 0 && !categoryMatches) return null;

        return {
          ...cat,
          tools: matchingTools.length > 0 ? matchingTools : cat.tools,
        };
      }

      return cat;
    }).filter((c): c is ToolCategory => c !== null);
  }, [searchQuery, selectedServers, selectedCategories]);

  // Count totals
  const totalFilteredTools = useMemo(
    () => filteredCategories.reduce((sum, cat) => sum + cat.tools.length, 0),
    [filteredCategories]
  );

  const clearFilters = useCallback(() => {
    setSearchQuery('');
    setSelectedServers([]);
    setSelectedCategories([]);
  }, []);

  const hasActiveFilters = searchQuery.length > 0 || selectedServers.length > 0 || selectedCategories.length > 0;

  return (
    <main className="min-h-screen bg-white dark:bg-black text-gray-900 dark:text-white">
      {/* ── Section 1: Hero ─────────────────────────────────────── */}
      <section className="relative overflow-hidden pt-28 pb-16 sm:pt-36 sm:pb-20">
        <Spotlight className="-top-40 left-0 md:left-60 md:-top-20" fill="#F0B90B" />

        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-[#F0B90B]/10 px-4 py-2 text-sm font-medium text-[#F0B90B]">
              <Wrench className="h-4 w-4" />
              Complete API Reference
            </div>

            <TextGenerateEffect
              words="Tool Reference"
              className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl"
            />

            <p className="mx-auto mt-6 max-w-2xl text-lg text-gray-500 dark:text-neutral-400">
              900+ tools across 6 MCP servers. Search, browse, and find exactly the tool you need.
            </p>
          </motion.div>

          {/* Stats row */}
          <motion.div
            className="mt-10 flex flex-wrap justify-center gap-6 sm:gap-10"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            {[
              { label: 'Tools', value: '900+', icon: Wrench },
              { label: 'Servers', value: '6', icon: Server },
              { label: 'Categories', value: '30+', icon: Layers },
              { label: 'Chains', value: '60+', icon: Globe },
            ].map(stat => (
              <div key={stat.label} className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#F0B90B]/10">
                  <stat.icon className="h-5 w-5 text-[#F0B90B]" />
                </div>
                <div className="text-left">
                  <div className="text-xl font-bold">{stat.value}</div>
                  <div className="text-sm text-gray-500 dark:text-neutral-400">{stat.label}</div>
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── Section 4: Server Summary ──────────────────────────── */}
      <section className="relative mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <motion.h2
          className="mb-8 text-center text-2xl font-bold sm:text-3xl"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
        >
          MCP Servers
        </motion.h2>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {SERVERS.map((srv, i) => {
            const isActive = selectedServers.includes(srv.id);
            return (
              <motion.button
                key={srv.id}
                onClick={() => toggleServer(srv.id)}
                className={cn(
                  'group relative flex items-center gap-4 rounded-2xl border p-5 text-left transition-all duration-200',
                  isActive
                    ? 'border-[#F0B90B] bg-[#F0B90B]/5 ring-1 ring-[#F0B90B]/30'
                    : 'border-gray-200 dark:border-white/[0.08] bg-white dark:bg-neutral-900 hover:border-gray-300 dark:hover:border-white/[0.15]'
                )}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: i * 0.05 }}
              >
                <div
                  className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl"
                  style={{ backgroundColor: `${srv.color}15` }}
                >
                  <srv.icon className="h-6 w-6" style={{ color: srv.color }} />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="font-semibold truncate">{srv.name}</div>
                  <div className="text-sm text-gray-500 dark:text-neutral-400">
                    {srv.count} tools
                  </div>
                </div>
                {isActive && (
                  <div className="h-2 w-2 rounded-full bg-[#F0B90B] shrink-0" />
                )}
              </motion.button>
            );
          })}
        </div>
      </section>

      {/* ── Section 2: Search + Filter Bar ─────────────────────── */}
      <section className="sticky top-0 z-30 border-b border-gray-200 dark:border-white/[0.08] bg-white/80 dark:bg-black/80 backdrop-blur-xl">
        <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8">
          {/* Search input */}
          <div className="relative">
            <Search className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder="Search tools by name or description..."
              className={cn(
                'w-full rounded-xl border bg-white dark:bg-neutral-900 py-3 pl-12 pr-10 text-sm',
                'border-gray-200 dark:border-white/[0.08] placeholder-gray-400 dark:placeholder-neutral-500',
                'focus:border-[#F0B90B] focus:outline-none focus:ring-2 focus:ring-[#F0B90B]/20',
                'text-gray-900 dark:text-white'
              )}
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 rounded-lg p-1 text-gray-400 hover:text-gray-600 dark:hover:text-neutral-300"
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </div>

          {/* Server toggle pills */}
          <div className="mt-3 flex flex-wrap items-center gap-2">
            <span className="text-xs font-medium text-gray-500 dark:text-neutral-400 mr-1">
              Server:
            </span>
            {SERVERS.map(srv => {
              const active = selectedServers.includes(srv.id);
              return (
                <button
                  key={srv.id}
                  onClick={() => toggleServer(srv.id)}
                  className={cn(
                    'rounded-lg px-3 py-1.5 text-xs font-medium transition-all duration-150',
                    active
                      ? 'text-black'
                      : 'bg-gray-100 dark:bg-white/[0.05] text-gray-600 dark:text-neutral-400 hover:bg-gray-200 dark:hover:bg-white/[0.08]'
                  )}
                  style={active ? { backgroundColor: srv.color, color: '#000' } : undefined}
                >
                  {srv.name}
                </button>
              );
            })}
          </div>

          {/* Category pills (show if server is selected or there are few enough) */}
          {availableCategories.length > 0 && availableCategories.length <= 20 && (
            <div className="mt-2 flex flex-wrap items-center gap-2">
              <span className="text-xs font-medium text-gray-500 dark:text-neutral-400 mr-1">
                Category:
              </span>
              {availableCategories.map(c => {
                const active = selectedCategories.includes(c.key);
                return (
                  <button
                    key={c.key}
                    onClick={() => toggleCategory(c.key)}
                    className={cn(
                      'rounded-lg px-2.5 py-1 text-xs font-medium transition-all duration-150',
                      active
                        ? 'bg-[#F0B90B] text-black'
                        : 'bg-gray-100 dark:bg-white/[0.05] text-gray-600 dark:text-neutral-400 hover:bg-gray-200 dark:hover:bg-white/[0.08]'
                    )}
                  >
                    {c.name}
                  </button>
                );
              })}
            </div>
          )}

          {/* Result count + clear */}
          <div className="mt-3 flex items-center justify-between text-sm">
            <span className="text-gray-500 dark:text-neutral-400">
              Showing{' '}
              <span className="font-semibold text-gray-900 dark:text-white">
                {totalFilteredTools}
              </span>{' '}
              tools in{' '}
              <span className="font-semibold text-gray-900 dark:text-white">
                {filteredCategories.length}
              </span>{' '}
              categories
            </span>
            {hasActiveFilters && (
              <button
                onClick={clearFilters}
                className="flex items-center gap-1 text-xs font-medium text-[#F0B90B] hover:underline"
              >
                <X className="h-3 w-3" />
                Clear filters
              </button>
            )}
          </div>
        </div>
      </section>

      {/* ── Section 5: Popular Tools ───────────────────────────── */}
      {!hasActiveFilters && (
        <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
          <motion.h2
            className="mb-6 text-2xl font-bold sm:text-3xl"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
          >
            <Star className="mr-2 inline-block h-6 w-6 text-[#F0B90B]" />
            Popular Tools
          </motion.h2>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {POPULAR_TOOLS.map((tool, i) => {
              const srv = SERVERS.find(s => s.id === tool.server);
              return (
                <motion.div
                  key={`${tool.server}-${tool.name}`}
                  className="group rounded-2xl border border-gray-200 dark:border-white/[0.08] bg-white dark:bg-neutral-900 p-4 transition-all duration-200 hover:border-[#F0B90B]/40 hover:shadow-lg hover:shadow-[#F0B90B]/5"
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: i * 0.03 }}
                >
                  <div className="flex items-start justify-between gap-2">
                    <code className="font-mono text-sm font-semibold text-[#F0B90B]">
                      {tool.name}
                    </code>
                    <span
                      className="shrink-0 rounded-md px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide"
                      style={{
                        backgroundColor: `${srv?.color ?? '#6B7280'}15`,
                        color: srv?.color ?? '#6B7280',
                      }}
                    >
                      {srv?.name ?? tool.server}
                    </span>
                  </div>
                  <p className="mt-2 text-sm text-gray-500 dark:text-neutral-400 line-clamp-2">
                    {tool.description}
                  </p>
                  <div className="mt-2 text-xs text-gray-400 dark:text-neutral-500">
                    {tool.category}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </section>
      )}

      {/* ── Section 3: Tool Grid per Category ─────────────────── */}
      <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="space-y-4">
          {filteredCategories.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20 text-center">
              <Search className="mb-4 h-12 w-12 text-gray-300 dark:text-neutral-700" />
              <p className="text-lg font-medium text-gray-500 dark:text-neutral-400">
                No tools found
              </p>
              <p className="mt-2 text-sm text-gray-400 dark:text-neutral-500">
                Try adjusting your search or filters
              </p>
              <button
                onClick={clearFilters}
                className="mt-4 rounded-xl bg-[#F0B90B] px-6 py-2 text-sm font-semibold text-black transition-colors hover:bg-[#F0B90B]/80"
              >
                Clear all filters
              </button>
            </div>
          ) : (
            filteredCategories.map(cat => {
              const catKey = `${cat.server}::${cat.name}`;
              const isExpanded = expandedCategories.has(catKey);
              const srv = SERVERS.find(s => s.id === cat.server);

              return (
                <motion.div
                  key={catKey}
                  className="overflow-hidden rounded-2xl border border-gray-200 dark:border-white/[0.08] bg-white dark:bg-neutral-900"
                  layout
                >
                  {/* Category header */}
                  <button
                    onClick={() => toggleExpanded(catKey)}
                    className="flex w-full items-center gap-4 px-5 py-4 text-left transition-colors hover:bg-gray-50 dark:hover:bg-white/[0.03]"
                  >
                    <div
                      className="h-3 w-3 shrink-0 rounded-full"
                      style={{ backgroundColor: cat.color }}
                    />
                    <div className="min-w-0 flex-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="text-base font-semibold">{cat.name}</span>
                        <span className="rounded-md bg-gray-100 dark:bg-white/[0.06] px-2 py-0.5 text-xs font-medium text-gray-500 dark:text-neutral-400">
                          {cat.tools.length} shown
                        </span>
                        <span className="rounded-md bg-gray-100 dark:bg-white/[0.06] px-2 py-0.5 text-xs font-medium text-gray-400 dark:text-neutral-500">
                          {cat.count} total
                        </span>
                        <span
                          className="rounded-md px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide"
                          style={{
                            backgroundColor: `${srv?.color ?? '#6B7280'}15`,
                            color: srv?.color ?? '#6B7280',
                          }}
                        >
                          {cat.serverName}
                        </span>
                      </div>
                      <p className="mt-0.5 text-sm text-gray-500 dark:text-neutral-400 truncate">
                        {cat.description}
                      </p>
                    </div>
                    <motion.div
                      animate={{ rotate: isExpanded ? 0 : -90 }}
                      transition={{ duration: 0.2 }}
                      className="shrink-0 text-gray-400"
                    >
                      <ChevronDown className="h-5 w-5" />
                    </motion.div>
                  </button>

                  {/* Tools list */}
                  <AnimatePresence initial={false}>
                    {isExpanded && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25, ease: 'easeInOut' }}
                        className="overflow-hidden"
                      >
                        <div className="border-t border-gray-100 dark:border-white/[0.05] px-5 py-3">
                          <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
                            {cat.tools.map(tool => (
                              <div
                                key={`${tool.server}-${tool.name}`}
                                className="flex items-start gap-3 rounded-xl border border-gray-100 dark:border-white/[0.05] bg-gray-50 dark:bg-white/[0.02] p-3 transition-colors hover:border-[#F0B90B]/30 hover:bg-[#F0B90B]/[0.02]"
                              >
                                <ChevronRight
                                  className="mt-0.5 h-4 w-4 shrink-0"
                                  style={{ color: cat.color }}
                                />
                                <div className="min-w-0">
                                  <code className="font-mono text-sm font-medium text-gray-900 dark:text-white">
                                    {tool.name}
                                  </code>
                                  <p className="mt-0.5 text-xs text-gray-500 dark:text-neutral-400 line-clamp-2">
                                    {tool.description}
                                  </p>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })
          )}
        </div>
      </section>

      {/* ── Section 6: CTA ─────────────────────────────────────── */}
      <section className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <motion.div
          className="rounded-2xl border border-gray-200 dark:border-white/[0.08] bg-gradient-to-b from-gray-50 to-white dark:from-neutral-900 dark:to-black p-8 text-center sm:p-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-2xl font-bold sm:text-3xl">
            Ready to build with these tools?
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-gray-500 dark:text-neutral-400">
            Explore our MCP servers, discover 72+ AI agents, or dive into the source code on GitHub.
          </p>

          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Link
              to="/mcp-servers"
              className="inline-flex items-center gap-2 rounded-xl bg-[#F0B90B] px-6 py-3 text-sm font-semibold text-black transition-all duration-200 hover:bg-[#F0B90B]/80 hover:shadow-lg hover:shadow-[#F0B90B]/20"
            >
              <Server className="h-4 w-4" />
              MCP Servers
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              to="/agents"
              className="inline-flex items-center gap-2 rounded-xl border border-gray-200 dark:border-white/[0.08] bg-white dark:bg-neutral-900 px-6 py-3 text-sm font-semibold transition-all duration-200 hover:border-[#F0B90B]/40 hover:shadow-lg"
            >
              <Layers className="h-4 w-4" />
              Browse Agents
            </Link>
            <a
              href="https://github.com/nirholas/bnb-chain-toolkit"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-xl border border-gray-200 dark:border-white/[0.08] bg-white dark:bg-neutral-900 px-6 py-3 text-sm font-semibold transition-all duration-200 hover:border-[#F0B90B]/40 hover:shadow-lg"
            >
              <ExternalLink className="h-4 w-4" />
              GitHub
            </a>
          </div>
        </motion.div>

        {/* Footer attribution */}
        <div className="mt-12 text-center text-xs text-gray-400 dark:text-neutral-600">
          BNB Chain AI Toolkit &mdash; 900+ tools &middot; 6 MCP servers &middot; 60+ chains
        </div>
      </section>
    </main>
  );
}
