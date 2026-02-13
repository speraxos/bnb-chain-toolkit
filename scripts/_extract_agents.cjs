const fs = require('fs');
const path = require('path');

const skip = ['agent-template-full.json','agent-template.json','agents-manifest.json'];

function readAgents(dir, group) {
  const files = fs.readdirSync(dir).filter(f => f.endsWith('.json') && !skip.includes(f));
  return files.map(f => {
    const data = JSON.parse(fs.readFileSync(path.join(dir, f), 'utf8'));
    return {
      id: data.identifier,
      title: data.meta.title,
      description: data.meta.description,
      avatar: data.meta.avatar,
      tags: data.meta.tags,
      category: data.meta.category,
      group,
      plugins: data.config.plugins || [],
      openingMessage: data.config.openingMessage || '',
      openingQuestions: data.config.openingQuestions || [],
      systemRole: data.config.systemRole || '',
      createdAt: data.createdAt || ''
    };
  });
}

const bnb = readAgents('agents/bnb-chain-agents', 'bnb-chain');
const defi = readAgents('agents/defi-agents/src', 'defi');
const all = [...bnb, ...defi];

console.log(JSON.stringify(all, null, 2));
