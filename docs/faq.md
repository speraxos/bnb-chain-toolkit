# Frequently Asked Questions

Answers to common questions about the BNB Chain AI Toolkit.

---

## General

<details>
<summary><b>What is this project?</b></summary>

BNB Chain AI Toolkit is an open-source collection of AI agents, MCP servers, market data tools, DeFi utilities, wallet tools, and Web3 standards — all focused on the BNB Chain ecosystem.

It gives AI assistants (like Claude, ChatGPT, etc.) the ability to interact with blockchains, trade on exchanges, and analyze crypto data.

For a simple explanation, see [What Is This?](what-is-this.md).

</details>

<details>
<summary><b>Do I need to know how to code?</b></summary>

**For basic use:** No. You can use the pre-built agents by copying their system prompts into your AI assistant.

**For MCP servers:** You need basic command-line knowledge (running `bun install` and `bun start`).

**For customization:** Yes, some TypeScript/JavaScript knowledge helps.

</details>

<details>
<summary><b>Is this free?</b></summary>

Yes. The entire toolkit is open source under the MIT license. You can use, modify, and distribute it freely.

Some external services (like CoinGecko Pro API or Binance exchange) may have their own pricing.

</details>

<details>
<summary><b>Which AI assistants does this work with?</b></summary>

| Assistant | MCP Support | Agent Support |
|-----------|:-----------:|:------------:|
| Claude Desktop | ✅ | ✅ |
| Claude Code | ✅ | ✅ |
| ChatGPT | ❌ (use API) | ✅ |
| GitHub Copilot | ✅ | ✅ |
| Cursor | ✅ | ✅ |
| Any LLM API | Via wrapper | ✅ |

</details>

<details>
<summary><b>Which blockchains are supported?</b></summary>

**Primary focus:** BNB Smart Chain (BSC), opBNB, BNB Greenfield

**Also supported:** 60+ networks including Ethereum, Polygon, Arbitrum, Base, Optimism, Avalanche, Solana, and many more.

See the full list in the [Architecture](architecture.md) guide.

</details>

---

## Security

<details>
<summary><b>Is it safe to use?</b></summary>

The toolkit itself is open source and auditable. However, anything involving private keys or real money carries inherent risk.

**Safety guidelines:**
- Never share your private keys
- Start with testnet
- Start with small amounts
- Review transactions before confirming
- Use read-only API keys when possible

</details>

<details>
<summary><b>Does this store my private keys?</b></summary>

**No.** Private keys are provided via environment variables and never stored, logged, or transmitted by the toolkit. They stay in your local environment.

</details>

<details>
<summary><b>Has the code been audited?</b></summary>

Not yet. This is an open-source project and the code is available for anyone to review. We welcome security researchers to examine the codebase.

If you find a vulnerability, please follow the [Security Policy](../SECURITY.md).

</details>

---

## Technical

<details>
<summary><b>What are MCP servers?</b></summary>

MCP (Model Context Protocol) servers are bridges between AI assistants and external services. They expose "tools" that AI can call — like checking a wallet balance, placing a trade, or fetching news.

Think of them as APIs specifically designed for AI consumption.

Learn more: [MCP Servers Guide](mcp-servers.md).

</details>

<details>
<summary><b>What's the difference between agents and MCP servers?</b></summary>

| | Agents | MCP Servers |
|-|--------|-------------|
| **What** | Personality/expertise definitions | Live services with tools |
| **Format** | JSON files | Running processes |
| **Purpose** | Tell AI *how* to think about crypto | Let AI *do* things on-chain |
| **Needs internet?** | No | Yes |
| **Example** | "You are a PancakeSwap expert" | `getTokenBalance("BNB")` |

They work best together — agents provide the domain knowledge, MCP servers provide the tools.

</details>

<details>
<summary><b>Can I use this without BNB Chain?</b></summary>

Yes! While the toolkit focuses on BNB Chain, many components support other networks:
- Universal Crypto MCP supports 60+ chains
- Agenti supports all EVM chains + Solana
- Market data works for all listed cryptocurrencies
- DeFi agents work cross-chain
- Wallet toolkit works with any EVM chain

</details>

<details>
<summary><b>What Node.js version do I need?</b></summary>

Node.js 18 or higher. We recommend using the latest LTS version.

Check your version: `node --version`

</details>

<details>
<summary><b>Can I use npm instead of bun?</b></summary>

Yes. Replace `bun install` with `npm install` and `bun start` with `npm start`. Everything works the same.

</details>

---

## Troubleshooting

<details>
<summary><b>bun install fails</b></summary>

1. Make sure bun is installed: `bun --version`
2. If not: `curl -fsSL https://bun.sh/install | bash`
3. Try deleting `node_modules` and re-running: `rm -rf node_modules && bun install`

</details>

<details>
<summary><b>MCP server won't start</b></summary>

1. Check that you're in the right directory: `cd mcp-servers/<server-name>`
2. Run `bun install` first
3. Check environment variables are set
4. Check Node.js version: `node --version` (need 18+)
5. See [Troubleshooting](troubleshooting.md) for more

</details>

<details>
<summary><b>Claude doesn't see the MCP tools</b></summary>

1. Make sure the server is running before opening Claude
2. Check your `claude_desktop_config.json` for typos
3. Restart Claude Desktop after changing config
4. Check Claude Desktop logs for errors

</details>

---

## Contributing

<details>
<summary><b>How can I contribute?</b></summary>

See [CONTRIBUTING.md](../CONTRIBUTING.md) for full details. Quick options:
- Report bugs via GitHub Issues
- Add new agents
- Improve documentation
- Submit pull requests
- Star the repo

</details>

<details>
<summary><b>Can I add my own agents?</b></summary>

Absolutely! See the [Agents Guide](agents.md#creating-your-own-agent) for step-by-step instructions.

</details>

---

## See Also

- [Getting Started](getting-started.md) — Set up the toolkit
- [What Is This?](what-is-this.md) — Simple project explanation
- [Troubleshooting](troubleshooting.md) — Detailed debugging
