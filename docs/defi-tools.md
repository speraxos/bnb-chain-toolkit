# DeFi Tools Guide

Practical DeFi utilities included in the toolkit.

---

## Dust Sweeper

**Location:** `defi-tools/sweep/`

### What Is "Dust"?

"Dust" refers to tiny token balances left in your wallet — often worth just cents or a few dollars each. Over time, you accumulate tokens from:
- Airdrops you forgot about
- Remainder of trades that didn't sell 100%
- Reward tokens from DeFi protocols
- Test transactions

Individually they're worthless, but combined they could be worth hundreds of dollars.

### What the Dust Sweeper Does

1. **Scans** your wallet across 8 chains for tokens below a threshold (e.g., $5)
2. **Identifies** which tokens have liquidity (can be sold)
3. **Batch swaps** them into a single asset (stablecoin or yield position)
4. **Reports** total recovered value

### Supported Chains

| Chain | Network ID | Status |
|-------|-----------|--------|
| BNB Smart Chain | 56 | ✅ |
| Ethereum | 1 | ✅ |
| Polygon | 137 | ✅ |
| Arbitrum | 42161 | ✅ |
| Base | 8453 | ✅ |
| Optimism | 10 | ✅ |
| Avalanche | 43114 | ✅ |
| Fantom | 250 | ✅ |

### Quick Start

```bash
cd defi-tools/sweep
bun install

# Scan for dust (read-only, safe)
bun run scan --wallet 0xYourAddress --chain bsc

# Sweep dust tokens into USDC
bun run sweep --wallet 0xYourAddress --chain bsc --target USDC
```

### Configuration

```json
{
  "threshold": 5.00,
  "targetToken": "USDC",
  "chains": ["bsc", "ethereum", "polygon"],
  "slippage": 1.0,
  "dryRun": true
}
```

| Option | Default | Description |
|--------|---------|-------------|
| `threshold` | `5.00` | Max value ($) to consider as dust |
| `targetToken` | `USDC` | Token to consolidate into |
| `chains` | All | Which chains to sweep |
| `slippage` | `1.0` | Max slippage percentage |
| `dryRun` | `true` | Preview without executing |

### Safety Features

- **Dry run by default** — Won't execute trades unless you explicitly enable it
- **Whitelist/blacklist** — Never sell specific tokens
- **Slippage protection** — Skips tokens with bad liquidity
- **Gas estimation** — Only sweeps if profit > gas cost

---

## See Also

- [Wallets](wallets.md) — Wallet management tools
- [MCP Servers](mcp-servers.md) — Connect DeFi tools to AI
- [Getting Started](getting-started.md) — Initial setup
