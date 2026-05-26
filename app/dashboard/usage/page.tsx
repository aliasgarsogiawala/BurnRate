'use client';

import { useEffect, useState } from 'react';

interface UsageLog {
  id: string;
  sourceName: string;
  provider: string;
  model?: string;
  inputTokens: number;
  outputTokens: number;
  totalTokens: number;
  creditsUsed: number;
  costUsd: number;
  notes?: string;
  createdAt: string;
}

type SortField = 'date' | 'cost' | 'tokens';
type SortOrder = 'asc' | 'desc';

export default function UsagePage() {
  const [usageLogs, setUsageLogs] = useState<UsageLog[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedProvider, setSelectedProvider] = useState('');
  const [sortField, setSortField] = useState<SortField>('date');
  const [sortOrder, setSortOrder] = useState<SortOrder>('desc');
  const [providers, setProviders] = useState<string[]>([]);

  // Fetch usage logs
  useEffect(() => {
    let mounted = true;

    async function load() {
      try {
        const res = await fetch('/api/usage/import');
        if (!res.ok) return;
        const json = await res.json();
        const logs = json.usage ?? [];
        if (mounted) {
          setUsageLogs(logs);
          // Extract unique providers
          const uniqueProviders = Array.from(
            new Set(logs.map((log: UsageLog) => log.provider))
          ) as string[];
          setProviders(uniqueProviders.sort());
        }
      } catch (e) {
        console.error('Failed to fetch usage logs:', e);
      } finally {
        if (mounted) setLoading(false);
      }
    }

    load();
    return () => {
      mounted = false;
    };
  }, []);

  // Filter and sort logs
  const filteredLogs = usageLogs
    .filter((log) => {
      const matchesSearch = log.sourceName
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
      const matchesProvider = !selectedProvider || log.provider === selectedProvider;
      return matchesSearch && matchesProvider;
    })
    .sort((a, b) => {
      let aValue: number | string;
      let bValue: number | string;

      switch (sortField) {
        case 'date':
          aValue = new Date(a.createdAt).getTime();
          bValue = new Date(b.createdAt).getTime();
          break;
        case 'cost':
          aValue = a.costUsd;
          bValue = b.costUsd;
          break;
        case 'tokens':
          aValue = a.totalTokens;
          bValue = b.totalTokens;
          break;
        default:
          return 0;
      }

      if (sortOrder === 'asc') {
        return aValue > bValue ? 1 : -1;
      } else {
        return aValue < bValue ? 1 : -1;
      }
    });

  const toggleSort = (field: SortField) => {
    if (sortField === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortOrder('desc');
    }
  };

  return (
    <main className="flex-1 p-8 overflow-auto bg-white">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-semibold text-gray-900">Usage History</h1>
          <p className="text-gray-600 mt-1">
            Complete log of all imported AI usage across tools and providers.
          </p>
        </div>

        {/* Filters Card */}
        <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
          <div className="space-y-4">
            {/* Search */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Search by Source
              </label>
              <input
                type="text"
                placeholder="e.g., Cursor, GitHub Copilot, OpenAI..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-4 py-2 text-sm bg-white border border-gray-200 rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-colors"
              />
            </div>

            {/* Filter by Provider */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Filter by Provider
              </label>
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => setSelectedProvider('')}
                  className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                    !selectedProvider
                      ? 'bg-blue-100 text-blue-900'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  All Providers
                </button>
                {providers.map((provider) => (
                  <button
                    key={provider}
                    onClick={() => setSelectedProvider(provider)}
                    className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                      selectedProvider === provider
                        ? 'bg-blue-100 text-blue-900'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {provider}
                  </button>
                ))}
              </div>
            </div>

            {/* Results count */}
            <div className="text-sm text-gray-600">
              Showing {filteredLogs.length} of {usageLogs.length} entries
            </div>
          </div>
        </div>

        {/* Usage Table */}
        <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-sm">
          {loading ? (
            <div className="px-8 py-12 text-center text-gray-600">
              Loading usage history...
            </div>
          ) : filteredLogs.length === 0 ? (
            <div className="px-8 py-12 text-center text-gray-600">
              No usage logs found. Import some usage to get started.
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200 bg-white">
                    <th
                      className="px-8 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-50"
                      onClick={() => toggleSort('date')}
                    >
                      <div className="flex items-center gap-2">
                        Date
                        {sortField === 'date' && (
                          <span className="text-blue-600">
                            {sortOrder === 'asc' ? '↑' : '↓'}
                          </span>
                        )}
                      </div>
                    </th>
                    <th className="px-8 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Source
                    </th>
                    <th className="px-8 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Provider
                    </th>
                    <th
                      className="px-8 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-50"
                      onClick={() => toggleSort('tokens')}
                    >
                      <div className="flex items-center gap-2">
                        Tokens
                        {sortField === 'tokens' && (
                          <span className="text-blue-600">
                            {sortOrder === 'asc' ? '↑' : '↓'}
                          </span>
                        )}
                      </div>
                    </th>
                    <th
                      className="px-8 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-50"
                      onClick={() => toggleSort('cost')}
                    >
                      <div className="flex items-center justify-end gap-2">
                        Cost
                        {sortField === 'cost' && (
                          <span className="text-blue-600">
                            {sortOrder === 'asc' ? '↑' : '↓'}
                          </span>
                        )}
                      </div>
                    </th>
                    <th className="px-8 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Notes
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {filteredLogs.map((log, index) => (
                    <tr
                      key={log.id}
                      className={`${
                        index !== filteredLogs.length - 1 ? 'border-b border-gray-100' : ''
                      } hover:bg-gray-50 transition-colors`}
                    >
                      <td className="px-8 py-4 text-sm text-gray-600">
                        {new Date(log.createdAt).toLocaleString()}
                      </td>
                      <td className="px-8 py-4 text-sm font-medium text-gray-900">
                        {log.sourceName}
                      </td>
                      <td className="px-8 py-4 text-sm text-gray-600">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                          {log.provider}
                        </span>
                      </td>
                      <td className="px-8 py-4 text-sm text-gray-600">
                        {log.totalTokens.toLocaleString()}
                      </td>
                      <td className="px-8 py-4 text-sm font-semibold text-gray-900 text-right">
                        ${log.costUsd.toFixed(2)}
                      </td>
                      <td className="px-8 py-4 text-sm text-gray-500">
                        {log.notes ? (
                          <span className="line-clamp-1" title={log.notes}>
                            {log.notes}
                          </span>
                        ) : (
                          <span className="text-gray-400">—</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* Table Footer */}
          {filteredLogs.length > 0 && (
            <div className="px-8 py-4 bg-gray-50 border-t border-gray-200 text-sm text-gray-600">
              <div className="flex justify-between items-center">
                <span>
                  Total: ${filteredLogs.reduce((sum, log) => sum + log.costUsd, 0).toFixed(2)}
                </span>
                <span>
                  {filteredLogs.reduce((sum, log) => sum + log.totalTokens, 0).toLocaleString()} tokens
                </span>
              </div>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
