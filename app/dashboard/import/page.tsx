'use client';

import { useEffect, useState } from 'react';
import ImportCard from '@/components/ImportCard';

interface ImportedUsage {
  id: string;
  date: string;
  source: string;
  provider: string;
  usage: string;
  cost: string;
  status: 'completed' | 'pending' | 'failed';
}

export default function ImportPage() {
  const [imports, setImports] = useState<ImportedUsage[]>([]);

  // Convert DB usage object to table row
  const convertUsage = (u: any): ImportedUsage => {
    const credits = u.creditsUsed ?? 0;
    const totalTokens = u.totalTokens ?? 0;
    const costUsd = u.costUsd ?? 0;

    const usageText = credits > 0 ? `${credits} credits` : totalTokens > 0 ? `${totalTokens} tokens` : '';
    const costText = `$${Number(costUsd).toFixed(2)}`;

    return {
      id: u.id,
      date: new Date(u.createdAt).toLocaleString(),
      source: u.sourceName,
      provider: u.provider,
      usage: usageText,
      cost: costText,
      status: 'completed',
    };
  };

  useEffect(() => {
    let mounted = true;

    async function load() {
      try {
        const res = await fetch('/api/usage/import');
        if (!res.ok) return;
        const json = await res.json();
        const usage = json.usage ?? [];
        const rows = usage.map(convertUsage);
        if (mounted) setImports(rows);
      } catch (e) {
        // ignore for now
      }
    }

    load();
    return () => {
      mounted = false;
    };
  }, []);

  const handleCopilotImport = async (data: Record<string, string | number>) => {
    try {
      const credits = Number(data.credits) || 0;
      const notes = (data.notes as string) || null;
      const body = {
        sourceName: 'GitHub Copilot',
        provider: 'GitHub',
        creditsUsed: credits,
        costUsd: Number((credits * 0.01).toFixed(2)),
        notes,
      };

      const res = await fetch('/api/usage/import', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });

      if (!res.ok) return;
      const json = await res.json();
      const u = json.usage;
      if (u) setImports((prev) => [convertUsage(u), ...prev]);
    } catch (e) {
      // ignore
    }
  };

  const handleOpenAIImport = async (data: Record<string, string | number>) => {
    try {
      const spend = Number(data.spend) || 0;
      const tokens = Number(data.tokens) || 0;
      const model = (data.model as string) || 'OpenAI';
      const period = (data.period as string) || null;

      const body = {
        sourceName: `${model} (OpenAI)`,
        provider: 'OpenAI',
        totalTokens: tokens,
        costUsd: Number(spend),
        notes: period,
      };

      const res = await fetch('/api/usage/import', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });

      if (!res.ok) return;
      const json = await res.json();
      const u = json.usage;
      if (u) setImports((prev) => [convertUsage(u), ...prev]);
    } catch (e) {
      // ignore
    }
  };

  const handleManualImport = async (data: Record<string, string | number>) => {
    try {
      const source = (data.source as string) || 'Manual';
      const provider = (data.provider as string) || 'Custom';
      const cost = Number(data.cost) || 0;
      const tokens = Number(data.tokens) || 0;
      const notes = (data.notes as string) || null;

      const body = {
        sourceName: source,
        provider,
        totalTokens: tokens,
        costUsd: cost,
        notes,
      };

      const res = await fetch('/api/usage/import', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });

      if (!res.ok) return;
      const json = await res.json();
      const u = json.usage;
      if (u) setImports((prev) => [convertUsage(u), ...prev]);
    } catch (e) {
      // ignore
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-50 text-green-700';
      case 'pending':
        return 'bg-amber-50 text-amber-700';
      case 'failed':
        return 'bg-red-50 text-red-700';
      default:
        return 'bg-gray-50 text-gray-700';
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'completed':
        return '✓';
      case 'pending':
        return '⏳';
      case 'failed':
        return '✕';
      default:
        return '—';
    }
  };

  return (
    <main className="flex-1 p-8 overflow-auto bg-white">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-semibold text-gray-900">Import Usage</h1>
          <p className="text-gray-600 mt-1">
            Add AI usage from tools that aren't routed through BurnRate yet.
          </p>
        </div>

        {/* Import Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* GitHub Copilot Card */}
          <ImportCard
            icon="🔨"
            title="GitHub Copilot"
            description="Import GitHub AI Credits used from your Copilot billing dashboard."
            fields={[
              {
                id: 'credits',
                label: 'AI Credits Used',
                type: 'number',
                placeholder: 'e.g., 142.5',
              },
              {
                id: 'period',
                label: 'Billing Period',
                type: 'text',
                placeholder: 'e.g., May 2025',
              },
              {
                id: 'notes',
                label: 'Notes',
                type: 'text',
                placeholder: 'Optional notes...',
                optional: true,
              },
            ]}
            onSubmit={handleCopilotImport}
          />

          {/* OpenAI / Codex Card */}
          <ImportCard
            icon="🤖"
            title="OpenAI / Codex"
            description="Import usage from OpenAI usage dashboard or API billing data."
            fields={[
              {
                id: 'spend',
                label: 'Total Spend (USD)',
                type: 'number',
                placeholder: 'e.g., 12.43',
              },
              {
                id: 'tokens',
                label: 'Total Tokens (K)',
                type: 'number',
                placeholder: 'e.g., 287.4',
              },
              {
                id: 'model',
                label: 'Model Name',
                type: 'text',
                placeholder: 'e.g., GPT-4',
              },
              {
                id: 'period',
                label: 'Billing Period',
                type: 'text',
                placeholder: 'e.g., May 2025',
              },
            ]}
            onSubmit={handleOpenAIImport}
          />

          {/* Manual Entry Card */}
          <ImportCard
            icon="✎"
            title="Manual Entry"
            description="Log AI usage manually from any tool or provider."
            fields={[
              {
                id: 'source',
                label: 'Source Name',
                type: 'text',
                placeholder: 'e.g., Cursor',
              },
              {
                id: 'provider',
                label: 'Provider',
                type: 'text',
                placeholder: 'e.g., Custom',
              },
              {
                id: 'cost',
                label: 'Cost (USD)',
                type: 'number',
                placeholder: 'e.g., 6.21',
              },
              {
                id: 'tokens',
                label: 'Tokens (K)',
                type: 'number',
                placeholder: 'e.g., 94.2',
              },
              {
                id: 'notes',
                label: 'Notes',
                type: 'text',
                placeholder: 'Optional...',
                optional: true,
              },
            ]}
            onSubmit={handleManualImport}
          />
        </div>

        {/* Recent Imports Table */}
        <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-sm">
          {/* Table Header */}
          <div className="px-8 py-4 border-b border-gray-200 bg-gray-50">
            <h2 className="text-lg font-semibold text-gray-900">Recent Imports</h2>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200 bg-white">
                  <th className="px-8 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date
                  </th>
                  <th className="px-8 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Source
                  </th>
                  <th className="px-8 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Provider
                  </th>
                  <th className="px-8 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Usage
                  </th>
                  <th className="px-8 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Cost
                  </th>
                  <th className="px-8 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody>
                {imports.map((item, index) => (
                  <tr
                    key={item.id}
                    className={`${
                      index !== imports.length - 1 ? 'border-b border-gray-100' : ''
                    } hover:bg-gray-50 transition-colors`}
                  >
                    <td className="px-8 py-4 text-sm text-gray-600">
                      {item.date}
                    </td>
                    <td className="px-8 py-4 text-sm font-medium text-gray-900">
                      {item.source}
                    </td>
                    <td className="px-8 py-4 text-sm text-gray-600">
                      {item.provider}
                    </td>
                    <td className="px-8 py-4 text-sm text-gray-600">
                      {item.usage}
                    </td>
                    <td className="px-8 py-4 text-sm font-semibold text-gray-900 text-right">
                      {item.cost}
                    </td>
                    <td className="px-8 py-4 text-center">
                      <span
                        className={`inline-flex items-center justify-center w-6 h-6 rounded-full text-xs font-semibold ${getStatusColor(
                          item.status
                        )}`}
                      >
                        {getStatusBadge(item.status)}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Table Footer */}
          <div className="px-8 py-4 bg-gray-50 border-t border-gray-200">
            <button className="text-sm font-medium text-blue-600 hover:text-blue-700 transition-colors">
              View all imports →
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}
