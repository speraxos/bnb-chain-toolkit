/**
 * ═══════════════════════════════════════════════════════════════════════════
 * BNB CHAIN AI TOOLKIT - Homepage
 * ═══════════════════════════════════════════════════════════════════════════
 * ✨ Author: nich | 🐦 x.com/nichxbt | 🐙 github.com/nirholas
 * 📦 github.com/nirholas/bnb-chain-toolkit
 * Copyright (c) 2024-2026 nirholas (nich) - MIT License
 * @preserve
 * ═══════════════════════════════════════════════════════════════════════════
 */

import { useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { useSEO } from '@/hooks/useSEO';
import { useThemeStore } from '@/stores/themeStore';
import PriceTicker from '@/components/PriceTicker';
import { TopProtocolsWidget, TopYieldsWidget, TopChainsWidget, DeFiSummaryBar } from '@/components/DeFiWidgets';
import {
    Zap, Shield, Globe, Bot, Sparkles, ChevronRight,
    Code, BookOpen, Terminal, Cpu, Users, Layers,
    Coins, GitBranch, Play,
    ExternalLink, GraduationCap, Wallet,
    BarChart3, Eye, Database, Server, Wrench, Package,
    Activity, Network, Blocks, Plug, FileCode
} from 'lucide-react';
import useI18n from '@/stores/i18nStore';

// ═══════════════════════════════════════════════════════════════
// BNB CHAIN TOOLKIT DATA
// ═══════════════════════════════════════════════════════════════

const mcpServers = [
    {
        name: 'BNB Chain MCP',
        tools: '100+',
        description: 'BSC, opBNB, Greenfield — swaps, transfers, contracts',
        icon: Blocks,
        color: 'from-yellow-500 to-amber-600',
    },
    {
        name: 'Binance MCP',
        tools: '478+',
        description: 'Spot, futures, margin trading on Binance.com',
        icon: BarChart3,
        color: 'from-amber-400 to-yellow-500',
    },
    {
        name: 'Binance US MCP',
        tools: '—',
        description: 'US regulatory-compliant Binance access',
        icon: Shield,
        color: 'from-blue-500 to-indigo-600',
    },
    {
        name: 'Universal Crypto MCP',
        tools: '100+',
        description: '60+ networks, cross-chain DeFi',
        icon: Globe,
        color: 'from-emerald-500 to-teal-600',
    },
    {
        name: 'Agenti',
        tools: '50+',
        description: 'EVM + Solana, AI-to-AI payments (x402)',
        icon: Bot,
        color: 'from-violet-500 to-purple-600',
    },
    {
        name: 'UCAI',
        tools: 'Dynamic',
        description: 'Turn any smart contract ABI into an MCP server',
        icon: Wrench,
        color: 'from-pink-500 to-rose-600',
    },
];

const agentCategories = [
    { name: 'BNB Chain Agents', count: 30, description: 'PancakeSwap, Venus, BNB Staking, opBNB, Greenfield & more', icon: Blocks, color: 'text-yellow-500' },
    { name: 'Portfolio Management', count: 8, description: 'Tracking, rebalancing, tax optimization', icon: BarChart3, color: 'text-blue-500' },
    { name: 'Trading Automation', count: 7, description: 'Grid trading, DCA, arbitrage, signals', icon: Activity, color: 'text-green-500' },
    { name: 'Yield Optimization', count: 6, description: 'Auto-compounding, IL protection', icon: Coins, color: 'text-amber-500' },
    { name: 'Risk & Security', count: 5, description: 'Auditing, rug detection, exploit analysis', icon: Shield, color: 'text-red-500' },
    { name: 'Market Intelligence', count: 5, description: 'Sentiment analysis, whale tracking', icon: Eye, color: 'text-purple-500' },
    { name: 'DeFi Protocols', count: 6, description: 'Lending, DEX, derivatives integration', icon: Layers, color: 'text-teal-500' },
    { name: 'Infrastructure', count: 5, description: 'Bridge, gas, RPC, indexing tools', icon: Network, color: 'text-indigo-500' },
];

const supportedChains = [
    { name: 'BNB Smart Chain', type: 'L1', primary: true },
    { name: 'opBNB', type: 'L2', primary: true },
    { name: 'BNB Greenfield', type: 'Storage', primary: true },
    { name: 'Ethereum', type: 'L1', primary: false },
    { name: 'Polygon', type: 'L1/L2', primary: false },
    { name: 'Arbitrum', type: 'L2', primary: false },
    { name: 'Base', type: 'L2', primary: false },
    { name: 'Optimism', type: 'L2', primary: false },
    { name: 'Avalanche', type: 'L1', primary: false },
    { name: 'Solana', type: 'L1', primary: false },
];

const toolkitComponents = [
    { name: 'AI Agents', count: '72+', icon: Bot, description: 'Pre-built agent definitions for every major BNB Chain protocol' },
    { name: 'MCP Servers', count: '6', icon: Server, description: 'Model Context Protocol servers for direct blockchain access' },
    { name: 'Tools', count: '900+', icon: Wrench, description: 'On-chain tools, exchange APIs, market data endpoints' },
    { name: 'Chains', count: '60+', icon: Network, description: 'Multi-chain support with unified interfaces' },
    { name: 'Languages', count: '30+', icon: Globe, description: 'Global accessibility with translations' },
    { name: 'Standards', count: '2', icon: FileCode, description: 'ERC-8004 agent trust + W3AG accessibility' },
];

export default function Homepage() {
    const { t } = useI18n();
    const isDark = useThemeStore((s) => s.mode === 'dark');
    const [copied, setCopied] = useState(false);

    useSEO({
        title: 'BNB Chain AI Toolkit — 72+ Agents, 6 MCP Servers, 900+ Tools',
        description: 'The most comprehensive open-source AI toolkit for BNB Chain. 72+ specialized agents, 6 MCP servers, 900+ tools, 60+ chains.',
    });

    const quickStartCode = `# Clone the toolkit
git clone https://github.com/nirholas/bnb-chain-toolkit.git
cd bnb-chain-toolkit

# Install & build
bun install && bun run build

# Start any MCP server
cd mcp-servers/bnbchain-mcp && bun start`;

    const claudeConfigCode = `{
  "mcpServers": {
    "bnbchain": {
      "command": "npx",
      "args": ["-y", "@nirholas/bnbchain-mcp"],
      "env": {
        "BSC_RPC_URL": "https://bsc-dataseed.binance.org"
      }
    }
  }
}`;

    const handleCopy = useCallback((text: string) => {
        navigator.clipboard.writeText(text);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    }, []);

    return (
        <div className="min-h-screen">
            {/* ═══════════════════════════════════════════════════════════════
          HERO SECTION
      ═══════════════════════════════════════════════════════════════ */}
            <section className="relative pt-20 pb-16 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-b from-yellow-50/50 via-transparent to-transparent dark:from-yellow-900/10 dark:via-transparent" />
                <div className="absolute top-20 left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-gradient-to-br from-yellow-400/20 via-amber-300/10 to-orange-400/5 dark:from-yellow-400/5 dark:via-amber-500/3 dark:to-transparent rounded-full blur-3xl" />

                <div className="container relative mx-auto px-4">
                    <div className="text-center max-w-4xl mx-auto">
                        {/* Badge */}
                        <div className="inline-flex items-center gap-2 px-4 py-2 bg-yellow-100 dark:bg-yellow-900/30 rounded-full text-sm font-medium text-yellow-800 dark:text-yellow-300 mb-8 border border-yellow-200 dark:border-yellow-800/50">
                            <Zap className="w-4 h-4" />
                            Built for BNB Chain "Good Vibes Only" Hackathon — Track 1: Agent
                        </div>

                        {/* Title */}
                        <h1 className="text-5xl md:text-7xl font-bold mb-6 tracking-tight">
                            <span className="text-gray-900 dark:text-white">BNB Chain</span>
                            <br />
                            <span className="bg-gradient-to-r from-yellow-500 via-amber-500 to-orange-500 bg-clip-text text-transparent">
                                AI Toolkit
                            </span>
                        </h1>

                        <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto mb-10 leading-relaxed">
                            The most comprehensive open-source AI toolkit for BNB Chain.
                            Give AI assistants superpowers on the blockchain — agents, MCP servers,
                            market data, DeFi tools, and Web3 standards. All in one repo.
                        </p>

                        {/* CTA Buttons */}
                        <div className="flex flex-wrap justify-center gap-4 mb-12">
                            <a
                                href="https://github.com/nirholas/bnb-chain-toolkit"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-yellow-500 to-amber-500 hover:from-yellow-600 hover:to-amber-600 text-white font-semibold rounded-xl transition-all shadow-lg shadow-yellow-500/25 hover:shadow-yellow-500/40 hover:scale-105"
                            >
                                <GitBranch className="w-5 h-5" />
                                View on GitHub
                                <ExternalLink className="w-4 h-4" />
                            </a>
                            <Link
                                to="/docs"
                                className="inline-flex items-center gap-2 px-8 py-4 bg-gray-900 dark:bg-white dark:text-black text-white font-semibold rounded-xl hover:bg-gray-800 dark:hover:bg-gray-100 transition-all hover:scale-105"
                            >
                                <BookOpen className="w-5 h-5" />
                                Documentation
                            </Link>
                            <Link
                                to="/playground"
                                className="inline-flex items-center gap-2 px-8 py-4 border-2 border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 font-semibold rounded-xl hover:border-yellow-500 hover:text-yellow-600 dark:hover:border-yellow-500 dark:hover:text-yellow-400 transition-all"
                            >
                                <Play className="w-5 h-5" />
                                Try Playground
                            </Link>
                        </div>

                        {/* Stats Bar */}
                        <div className="flex flex-wrap justify-center gap-4 md:gap-8">
                            {toolkitComponents.slice(0, 5).map((item) => (
                                <div key={item.name} className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 shadow-sm">
                                    <item.icon className="w-5 h-5 text-yellow-500" />
                                    <span className="font-bold text-gray-900 dark:text-white">{item.count}</span>
                                    <span className="text-sm text-gray-500 dark:text-gray-400">{item.name}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* ═══════════════════════════════════════════════════════════════
          LIVE MARKET DATA
      ═══════════════════════════════════════════════════════════════ */}
            <section className="py-4 border-y border-gray-200 dark:border-gray-800 bg-gray-50/50 dark:bg-gray-900/50">
                <PriceTicker />
            </section>

            {/* ═══════════════════════════════════════════════════════════════
          WHAT IS THIS?
      ═══════════════════════════════════════════════════════════════ */}
            <section className="py-20 container mx-auto px-4">
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900 dark:text-white">
                        What Is BNB Chain AI Toolkit?
                    </h2>
                    <p className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
                        Imagine giving Claude or ChatGPT a crypto wallet, a trading terminal, and 72 expert advisors.
                        That's what this toolkit does. Everything you need to build AI-powered applications on BNB Chain.
                    </p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
                    {toolkitComponents.map((comp) => (
                        <div key={comp.name} className="group p-6 bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 hover:border-yellow-500/50 dark:hover:border-yellow-500/30 transition-all hover:shadow-lg hover:shadow-yellow-500/5">
                            <div className="flex items-center gap-4 mb-3">
                                <div className="p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded-xl group-hover:bg-yellow-100 dark:group-hover:bg-yellow-900/30 transition-colors">
                                    <comp.icon className="w-6 h-6 text-yellow-600 dark:text-yellow-400" />
                                </div>
                                <div>
                                    <h3 className="font-bold text-gray-900 dark:text-white">{comp.name}</h3>
                                    <span className="text-2xl font-bold text-yellow-500">{comp.count}</span>
                                </div>
                            </div>
                            <p className="text-sm text-gray-600 dark:text-gray-400">{comp.description}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* ═══════════════════════════════════════════════════════════════
          MCP SERVERS
      ═══════════════════════════════════════════════════════════════ */}
            <section className="py-20 bg-gray-50 dark:bg-gray-900/50">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-12">
                        <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-violet-100 dark:bg-violet-900/30 rounded-full text-sm font-medium text-violet-700 dark:text-violet-300 mb-4">
                            <Plug className="w-4 h-4" />
                            Model Context Protocol
                        </div>
                        <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900 dark:text-white">
                            6 MCP Servers, 900+ Tools
                        </h2>
                        <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                            Give AI assistants direct blockchain access. Connect Claude, ChatGPT, or any LLM
                            to BNB Chain, Binance, and 60+ networks.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto mb-12">
                        {mcpServers.map((server) => (
                            <div key={server.name} className="group p-6 bg-white dark:bg-black rounded-2xl border border-gray-200 dark:border-gray-800 hover:border-violet-500/50 transition-all hover:shadow-lg">
                                <div className="flex items-center gap-3 mb-4">
                                    <div className={`p-3 bg-gradient-to-br ${server.color} rounded-xl shadow-lg`}>
                                        <server.icon className="w-5 h-5 text-white" />
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-gray-900 dark:text-white">{server.name}</h3>
                                        <span className="text-sm text-gray-500 dark:text-gray-400">{server.tools} tools</span>
                                    </div>
                                </div>
                                <p className="text-sm text-gray-600 dark:text-gray-400">{server.description}</p>
                            </div>
                        ))}
                    </div>

                    {/* Claude Config Code Block */}
                    <div className="max-w-2xl mx-auto">
                        <div className="bg-gray-900 dark:bg-black rounded-2xl border border-gray-700 dark:border-gray-800 overflow-hidden">
                            <div className="flex items-center justify-between px-4 py-3 border-b border-gray-700 dark:border-gray-800">
                                <div className="flex items-center gap-2">
                                    <Terminal className="w-4 h-4 text-gray-400" />
                                    <span className="text-sm text-gray-400">claude_desktop_config.json</span>
                                </div>
                                <button
                                    onClick={() => handleCopy(claudeConfigCode)}
                                    className="text-xs text-gray-400 hover:text-white transition-colors px-2 py-1 rounded"
                                >
                                    {copied ? '✓ Copied' : 'Copy'}
                                </button>
                            </div>
                            <pre className="p-4 text-sm text-gray-300 overflow-x-auto">
                                <code>{claudeConfigCode}</code>
                            </pre>
                        </div>
                    </div>
                </div>
            </section>

            {/* ═══════════════════════════════════════════════════════════════
          AI AGENTS
      ═══════════════════════════════════════════════════════════════ */}
            <section className="py-20 container mx-auto px-4">
                <div className="text-center mb-12">
                    <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-amber-100 dark:bg-amber-900/30 rounded-full text-sm font-medium text-amber-700 dark:text-amber-300 mb-4">
                        <Bot className="w-4 h-4" />
                        72+ Specialized Agents
                    </div>
                    <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900 dark:text-white">
                        Pre-Built AI Agents for Every Protocol
                    </h2>
                    <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                        From PancakeSwap trading to Venus lending, BNB staking to opBNB optimization —
                        purpose-built agents for every major BNB Chain protocol and DeFi use case.
                    </p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 max-w-6xl mx-auto">
                    {agentCategories.map((cat) => (
                        <div key={cat.name} className="p-5 bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 hover:border-amber-500/50 transition-all group">
                            <div className="flex items-center gap-3 mb-2">
                                <cat.icon className={`w-5 h-5 ${cat.color}`} />
                                <span className="text-2xl font-bold text-gray-900 dark:text-white">{cat.count}</span>
                            </div>
                            <h3 className="font-semibold text-sm text-gray-900 dark:text-white mb-1">{cat.name}</h3>
                            <p className="text-xs text-gray-500 dark:text-gray-400">{cat.description}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* ═══════════════════════════════════════════════════════════════
          QUICK START
      ═══════════════════════════════════════════════════════════════ */}
            <section className="py-20 bg-gray-50 dark:bg-gray-900/50">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900 dark:text-white">
                            Get Started in 60 Seconds
                        </h2>
                        <p className="text-lg text-gray-600 dark:text-gray-400">
                            Clone, install, run. It's that simple.
                        </p>
                    </div>

                    <div className="max-w-3xl mx-auto">
                        <div className="bg-gray-900 dark:bg-black rounded-2xl border border-gray-700 dark:border-gray-800 overflow-hidden shadow-2xl">
                            <div className="flex items-center justify-between px-4 py-3 border-b border-gray-700 dark:border-gray-800">
                                <div className="flex items-center gap-2">
                                    <div className="w-3 h-3 rounded-full bg-red-500" />
                                    <div className="w-3 h-3 rounded-full bg-yellow-500" />
                                    <div className="w-3 h-3 rounded-full bg-green-500" />
                                    <span className="ml-2 text-sm text-gray-400">terminal</span>
                                </div>
                                <button
                                    onClick={() => handleCopy(quickStartCode)}
                                    className="text-xs text-gray-400 hover:text-white transition-colors px-2 py-1 rounded"
                                >
                                    {copied ? '✓ Copied' : 'Copy'}
                                </button>
                            </div>
                            <pre className="p-6 text-sm text-green-400 overflow-x-auto leading-relaxed">
                                <code>{quickStartCode}</code>
                            </pre>
                        </div>
                    </div>
                </div>
            </section>

            {/* ═══════════════════════════════════════════════════════════════
          SUPPORTED CHAINS
      ═══════════════════════════════════════════════════════════════ */}
            <section className="py-20 container mx-auto px-4">
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900 dark:text-white">
                        60+ Supported Networks
                    </h2>
                    <p className="text-lg text-gray-600 dark:text-gray-400">
                        BNB Chain first, but cross-chain by design.
                    </p>
                </div>

                <div className="flex flex-wrap justify-center gap-3 max-w-4xl mx-auto">
                    {supportedChains.map((chain) => (
                        <div
                            key={chain.name}
                            className={`px-4 py-2.5 rounded-xl border transition-all ${chain.primary
                                    ? 'bg-yellow-50 dark:bg-yellow-900/20 border-yellow-300 dark:border-yellow-700 text-yellow-800 dark:text-yellow-300 font-semibold shadow-sm'
                                    : 'bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-800 text-gray-700 dark:text-gray-300'
                                }`}
                        >
                            <span className="text-sm">{chain.name}</span>
                            <span className="ml-2 text-xs opacity-60">{chain.type}</span>
                        </div>
                    ))}
                    <div className="px-4 py-2.5 rounded-xl border border-dashed border-gray-300 dark:border-gray-700 text-gray-500 dark:text-gray-400 text-sm">
                        + 50 more networks
                    </div>
                </div>
            </section>

            {/* ═══════════════════════════════════════════════════════════════
          DeFi DASHBOARD
      ═══════════════════════════════════════════════════════════════ */}
            <section className="py-16 bg-gray-50 dark:bg-gray-900/50">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-8">
                        <h2 className="text-3xl font-bold mb-4 text-gray-900 dark:text-white">
                            Live DeFi Data
                        </h2>
                        <p className="text-gray-600 dark:text-gray-400">
                            Real-time market data from CoinGecko, DeFiLlama, and 200+ sources
                        </p>
                    </div>
                    <div className="max-w-7xl mx-auto">
                        <DeFiSummaryBar />
                        <div className="grid md:grid-cols-3 gap-6 mt-6">
                            <TopProtocolsWidget />
                            <TopYieldsWidget />
                            <TopChainsWidget />
                        </div>
                    </div>
                </div>
            </section>

            {/* ═══════════════════════════════════════════════════════════════
          ARCHITECTURE OVERVIEW
      ═══════════════════════════════════════════════════════════════ */}
            <section className="py-20 container mx-auto px-4">
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900 dark:text-white">
                        Repository Architecture
                    </h2>
                    <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                        A single monorepo with everything integrated and production-ready.
                    </p>
                </div>

                <div className="max-w-4xl mx-auto">
                    <div className="bg-gray-900 dark:bg-black rounded-2xl border border-gray-700 dark:border-gray-800 p-6 font-mono text-sm text-gray-300 leading-relaxed overflow-x-auto">
                        <div className="text-yellow-400 mb-2">bnb-chain-toolkit/</div>
                        <div className="ml-4 space-y-1">
                            <div><span className="text-blue-400">├── agents/</span><span className="text-gray-500 ml-4"># 72+ AI Agent definitions</span></div>
                            <div className="ml-4 text-gray-500">
                                <div>├── bnb-chain-agents/ <span className="text-gray-600"># 30 BNB-specific agents</span></div>
                                <div>└── defi-agents/ <span className="text-gray-600"># 42 general DeFi agents</span></div>
                            </div>
                            <div><span className="text-blue-400">├── mcp-servers/</span><span className="text-gray-500 ml-4"># 6 MCP servers</span></div>
                            <div className="ml-4 text-gray-500">
                                <div>├── bnbchain-mcp/ <span className="text-gray-600"># BSC + opBNB (100+ tools)</span></div>
                                <div>├── binance-mcp/ <span className="text-gray-600"># Binance.com (478+ tools)</span></div>
                                <div>├── universal-crypto-mcp/ <span className="text-gray-600"># 60+ networks</span></div>
                                <div>├── agenti/ <span className="text-gray-600"># EVM + Solana</span></div>
                                <div>└── ucai/ <span className="text-gray-600"># ABI-to-MCP generator</span></div>
                            </div>
                            <div><span className="text-blue-400">├── market-data/</span><span className="text-gray-500 ml-4"># Market data &amp; news</span></div>
                            <div><span className="text-blue-400">├── defi-tools/</span><span className="text-gray-500 ml-4"># DeFi utilities</span></div>
                            <div><span className="text-blue-400">├── wallets/</span><span className="text-gray-500 ml-4"># Wallet tooling</span></div>
                            <div><span className="text-blue-400">├── standards/</span><span className="text-gray-500 ml-4"># ERC-8004 + W3AG</span></div>
                            <div><span className="text-blue-400">└── docs/</span><span className="text-gray-500 ml-4"># Documentation</span></div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ═══════════════════════════════════════════════════════════════
          WHY THIS TOOLKIT
      ═══════════════════════════════════════════════════════════════ */}
            <section className="py-20 bg-gradient-to-br from-gray-900 to-black text-white">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl md:text-4xl font-bold mb-4">
                            Why BNB Chain AI Toolkit?
                        </h2>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
                        {[
                            { icon: Package, title: 'Comprehensive Coverage', desc: 'No other project covers the entire BNB Chain AI stack in one repo' },
                            { icon: Plug, title: 'Production-Ready MCP', desc: '6 servers, 900+ tools, ready for Claude and other LLMs today' },
                            { icon: FileCode, title: 'Original Standards', desc: 'ERC-8004 for agent trust and W3AG for Web3 accessibility' },
                            { icon: Wrench, title: 'Real DeFi Tooling', desc: 'Dust sweeper, market data, wallet toolkit — not just demos' },
                            { icon: Bot, title: '72+ Specialized Agents', desc: 'Purpose-built for every major BNB Chain protocol' },
                            { icon: Globe, title: '30+ Languages', desc: 'Global accessibility with translations for worldwide reach' },
                        ].map((item) => (
                            <div key={item.title} className="p-6 bg-white/5 rounded-2xl border border-white/10 hover:border-yellow-500/30 transition-all">
                                <item.icon className="w-8 h-8 text-yellow-400 mb-4" />
                                <h3 className="font-bold text-lg mb-2">{item.title}</h3>
                                <p className="text-gray-400 text-sm">{item.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ═══════════════════════════════════════════════════════════════
          EXPLORE MORE
      ═══════════════════════════════════════════════════════════════ */}
            <section className="py-20 container mx-auto px-4">
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900 dark:text-white">
                        Explore the Toolkit
                    </h2>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 max-w-6xl mx-auto">
                    {[
                        { title: 'Documentation', desc: 'Comprehensive guides and API references', icon: BookOpen, href: '/docs', color: 'text-blue-500' },
                        { title: 'Tutorials', desc: 'Step-by-step interactive learning paths', icon: GraduationCap, href: '/tutorials', color: 'text-emerald-500' },
                        { title: 'Playground', desc: 'Try BNB Chain smart contracts live', icon: Code, href: '/playground', color: 'text-amber-500' },
                        { title: 'Sandbox', desc: 'AI-powered development environment', icon: Terminal, href: '/sandbox', color: 'text-violet-500' },
                        { title: 'IDE', desc: 'Solidity and Web3 development studio', icon: Cpu, href: '/ide', color: 'text-purple-500' },
                        { title: 'Full-Stack Demo', desc: 'Contract + frontend builder', icon: Layers, href: '/fullstack-demo', color: 'text-green-500' },
                        { title: 'Innovation Lab', desc: 'AI tools & experimental features', icon: Sparkles, href: '/innovation', color: 'text-pink-500' },
                        { title: 'Community', desc: 'Connect with BNB Chain builders', icon: Users, href: '/community', color: 'text-indigo-500' },
                    ].map((item) => (
                        <Link
                            key={item.title}
                            to={item.href}
                            className="group p-5 bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 hover:border-yellow-500/50 transition-all hover:shadow-lg"
                        >
                            <item.icon className={`w-6 h-6 ${item.color} mb-3`} />
                            <h3 className="font-semibold text-gray-900 dark:text-white mb-1 group-hover:text-yellow-600 dark:group-hover:text-yellow-400 transition-colors">
                                {item.title}
                            </h3>
                            <p className="text-sm text-gray-500 dark:text-gray-400">{item.desc}</p>
                            <ChevronRight className="w-4 h-4 text-gray-400 mt-2 group-hover:translate-x-1 transition-transform" />
                        </Link>
                    ))}
                </div>
            </section>

            {/* ═══════════════════════════════════════════════════════════════
          CTA
      ═══════════════════════════════════════════════════════════════ */}
            <section className="py-20 bg-gradient-to-r from-yellow-500 to-amber-500">
                <div className="container mx-auto px-4 text-center">
                    <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                        Ready to Build on BNB Chain?
                    </h2>
                    <p className="text-yellow-100 text-lg mb-8 max-w-2xl mx-auto">
                        72+ agents, 6 MCP servers, 900+ tools. Open source. Start building now.
                    </p>
                    <div className="flex flex-wrap justify-center gap-4">
                        <a
                            href="https://github.com/nirholas/bnb-chain-toolkit"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 px-8 py-4 bg-white text-yellow-600 font-bold rounded-xl hover:bg-gray-100 transition-all shadow-lg hover:scale-105"
                        >
                            <GitBranch className="w-5 h-5" />
                            Star on GitHub
                        </a>
                        <Link
                            to="/docs"
                            className="inline-flex items-center gap-2 px-8 py-4 bg-yellow-600 text-white font-bold rounded-xl hover:bg-yellow-700 transition-all shadow-lg hover:scale-105 border border-yellow-400"
                        >
                            <BookOpen className="w-5 h-5" />
                            Get Started
                            <ChevronRight className="w-4 h-4" />
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    );
}
