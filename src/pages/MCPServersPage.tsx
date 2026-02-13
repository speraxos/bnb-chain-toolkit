/**
 * MCP Servers Index Page — /mcp
 * ═══════════════════════════════════════════════════
 * Showcases all 6 MCP servers with BackgroundGradient cards,
 * SparklesCore tool counts, Spotlight hero, and a combined
 * claude_desktop_config.json code block.
 *
 * @author nich (@nichxbt)
 * @license MIT
 * @preserve
 */

import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ExternalLink, ArrowRight, Copy, Check, Server, Code2, Globe } from 'lucide-react';
import { useState } from 'react';
import {
  Spotlight,
  TextGenerateEffect,
  BackgroundGradient,
  SparklesCore,
  MovingBorder,
} from '@/components/ui';
import { mcpServers, allServersConfig } from '@/data/mcpServers';
import { useSEO } from '@/hooks/useSEO';
import { cn } from '@/lib/utils';

const GITHUB_BASE = 'https://github.com/nirholas/bnb-chain-toolkit/tree/main/';

/** Stat items for the animated bar */
const stats = [
  { label: 'Total Tools', value: '900+', icon: Server },
  { label: 'Languages', value: '2', icon: Code2 },
  { label: 'Networks', value: '60+', icon: Globe },
];

export default function MCPServersPage() {
  useSEO({
    title: 'MCP Servers',
    description:
      '6 MCP Servers with 900+ tools for BNB Chain, Binance, and 60+ blockchain networks.',
    path: '/mcp',
  });

  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(allServersConfig);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-white dark:bg-black">
      {/* Hero */}
      <section className="relative overflow-hidden py-24 md:py-32">
        <Spotlight className="-top-40 left-0 md:left-60 md:-top-20" />
        <div className="relative z-10 mx-auto max-w-6xl px-4 text-center">
          <motion.h1
            className="text-4xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-5xl lg:text-6xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            6 MCP Servers,{' '}
            <span className="text-[#F0B90B]">900+ Tools</span>
          </motion.h1>
          <div className="mx-auto mt-6 max-w-2xl">
            <TextGenerateEffect
              words="The most comprehensive AI-blockchain toolkit — trade, bridge, stake, and deploy across 60+ networks through natural language."
              className="text-lg text-gray-600 dark:text-gray-400"
            />
          </div>
        </div>
      </section>

      {/* Stat bar */}
      <section className="mx-auto max-w-4xl px-4 pb-12">
        <div className="grid grid-cols-3 gap-4">
          {stats.map((stat) => (
            <motion.div
              key={stat.label}
              className="rounded-xl border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900/50 p-5 text-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.2 }}
            >
              <stat.icon className="mx-auto mb-2 h-5 w-5 text-[#F0B90B]" />
              <p className="text-2xl font-bold text-gray-900 dark:text-white">
                {stat.value}
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Server grid */}
      <section className="mx-auto max-w-6xl px-4 pb-16">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {mcpServers.map((server, idx) => (
            <motion.div
              key={server.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: idx * 0.08 }}
            >
              <BackgroundGradient className="rounded-2xl bg-white dark:bg-zinc-900 p-6">
                {/* Header */}
                <div className="flex items-start justify-between">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                    {server.name}
                  </h3>
                  <span
                    className={cn(
                      'rounded-full px-2.5 py-0.5 text-xs font-medium',
                      server.language === 'Python'
                        ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300'
                        : 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300',
                    )}
                  >
                    {server.language}
                  </span>
                </div>

                {/* Description */}
                <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                  {server.description}
                </p>

                {/* Tool count with sparkles */}
                <div className="relative mt-4 flex items-baseline gap-2">
                  <div className="relative">
                    <span className="relative z-10 text-3xl font-black text-[#F0B90B]">
                      {server.toolCount}
                    </span>
                    <div className="absolute inset-0 -inset-x-3 -inset-y-1">
                      <SparklesCore
                        id={`sparkle-${server.id}`}
                        background="transparent"
                        minSize={0.3}
                        maxSize={0.8}
                        particleDensity={80}
                        particleColor="#F0B90B"
                        speed={0.6}
                        className="h-full w-full"
                      />
                    </div>
                  </div>
                  <span className="text-sm text-gray-500 dark:text-gray-400">
                    tools
                  </span>
                </div>

                {/* Highlights */}
                <ul className="mt-4 space-y-1">
                  {server.highlights.slice(1).map((h) => (
                    <li
                      key={h}
                      className="flex items-center gap-1.5 text-xs text-gray-500 dark:text-gray-400"
                    >
                      <span className="h-1 w-1 rounded-full bg-[#F0B90B]" />
                      {h}
                    </li>
                  ))}
                </ul>

                {/* Actions */}
                <div className="mt-5 flex items-center justify-between">
                  <Link
                    to={`/mcp/${server.id}`}
                    className="inline-flex items-center gap-1 text-sm font-medium text-[#F0B90B] hover:underline"
                  >
                    View Details <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                  <a
                    href={`${GITHUB_BASE}${server.repoPath}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-400 transition-colors hover:text-gray-600 dark:hover:text-gray-300"
                    aria-label={`${server.name} on GitHub`}
                  >
                    <ExternalLink className="h-4 w-4" />
                  </a>
                </div>
              </BackgroundGradient>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-3xl px-4 pb-12 text-center">
        <MovingBorder
          borderRadius="1.5rem"
          className="border-[#F0B90B]/30 bg-white px-8 py-3 text-sm font-semibold text-gray-900 dark:bg-zinc-900 dark:text-white"
        >
          Add All 6 Servers to Claude Desktop
        </MovingBorder>
      </section>

      {/* Config block */}
      <section className="mx-auto max-w-3xl px-4 pb-24">
        <div className="relative rounded-xl border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900/70 p-1">
          <div className="flex items-center justify-between rounded-t-lg bg-gray-100 dark:bg-gray-800/60 px-4 py-2">
            <span className="text-xs font-mono text-gray-500 dark:text-gray-400">
              claude_desktop_config.json
            </span>
            <button
              onClick={handleCopy}
              className="flex items-center gap-1 text-xs text-gray-500 transition-colors hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
              aria-label="Copy config"
            >
              {copied ? (
                <>
                  <Check className="h-3.5 w-3.5 text-green-500" /> Copied
                </>
              ) : (
                <>
                  <Copy className="h-3.5 w-3.5" /> Copy
                </>
              )}
            </button>
          </div>
          <pre className="overflow-x-auto p-4 text-xs leading-relaxed text-gray-700 dark:text-gray-300 font-mono">
            {allServersConfig}
          </pre>
        </div>
      </section>
    </div>
  );
}
