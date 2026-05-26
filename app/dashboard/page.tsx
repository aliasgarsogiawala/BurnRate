import StatCard from '@/components/StatCard';
import UsageTable from '@/components/UsageTable';
import BudgetAlerts from '@/components/BudgetAlerts';
import PieChart from '@/components/PieChart';

interface StatsData {
  totalCost: number;
  totalTokens: number;
  totalRequests: number;
  totalCredits: number;
  usageByProvider: Record<string, number>;
}

async function getStats(): Promise<StatsData> {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';
    const res = await fetch(`${baseUrl}/api/usage/stats`, {
      cache: 'no-store',
    });
    if (!res.ok) {
      return {
        totalCost: 0,
        totalTokens: 0,
        totalRequests: 0,
        totalCredits: 0,
        usageByProvider: {},
      };
    }
    return res.json();
  } catch (error) {
    console.error('Failed to fetch stats:', error);
    return {
      totalCost: 0,
      totalTokens: 0,
      totalRequests: 0,
      totalCredits: 0,
      usageByProvider: {},
    };
  }
}

export default async function DashboardPage() {
  const stats = await getStats();
  const planValue = 10;
  const multiplier = stats.totalCost > 0 ? (stats.totalCost / planValue).toFixed(2) : '0.00';

  return (
    <main className="flex-1 p-8 overflow-auto bg-white">
      <div className="max-w-7xl mx-auto space-y-8">

        {/* Header */}
        <div>
          <h1 className="text-3xl font-semibold text-gray-900">Dashboard</h1>
          <p className="text-gray-600 mt-1">Track your AI API usage and costs</p>
        </div>

        {/* Hero Card - Value Proposition */}
        <div className="bg-white border border-gray-200 rounded-2xl p-8 shadow-sm">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <p className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-3">This month</p>
              <div className="space-y-4">
                <div>
                  <p className="text-gray-600 text-sm mb-1">You paid</p>
                  <p className="text-4xl font-semibold text-gray-900">${planValue}</p>
                </div>
                <div>
                  <p className="text-gray-600 text-sm mb-1">Used</p>
                  <p className="text-4xl font-semibold text-gray-900">
                    ${stats.totalCost.toFixed(2)}<span className="text-lg text-gray-400"> worth of AI</span>
                  </p>
                </div>
              </div>
              <p className="text-sm text-gray-600 mt-6">
                That's <span className="font-semibold text-gray-900">{multiplier}x your plan value</span>.
              </p>
            </div>
            <div className="flex items-center justify-center md:justify-end">
              <div className="text-center md:text-right">
                <div className="inline-flex items-center rounded-full bg-green-50 text-green-700 px-3 py-1 text-sm font-semibold mb-3">
                  {multiplier}x value received
                </div>
                <p className="text-5xl font-bold text-gray-900">
                  {multiplier}<span className="text-2xl text-gray-400">x</span>
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard
            title="Total Cost"
            value={`$${stats.totalCost.toFixed(2)}`}
            icon="💰"
            trend={{ value: 18, direction: 'up' }}
          />
          <StatCard
            title="Total Tokens"
            value={stats.totalTokens >= 1000000 ? `${(stats.totalTokens / 1000000).toFixed(2)}M` : stats.totalTokens.toLocaleString()}
            icon="⚡"
            trend={{ value: 9, direction: 'up' }}
          />
          <StatCard
            title="Requests"
            value={stats.totalRequests.toString()}
            icon="📊"
            trend={{ value: 7, direction: 'down' }}
          />
          <StatCard
            title="Avg. Cost / 1K Tokens"
            value={stats.totalTokens > 0 ? `$${((stats.totalCost / stats.totalTokens) * 1000).toFixed(3)}` : '$0.00'}
            icon="📈"
            trend={{ value: 6, direction: 'down' }}
          />
        </div>

        {/* Charts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <PieChart
            title="Cost by Model"
            items={[
              { label: 'GPT-4o', value: 42, cost: 16.21, color: '#3b82f6' },
              { label: 'Claude 3.5 Sonnet', value: 23, cost: 8.69, color: '#10b981' },
              { label: 'GPT-4 Turbo', value: 16, cost: 6.31, color: '#a855f7' },
              { label: 'Gemini 1.5 Pro', value: 12, cost: 4.58, color: '#f59e0b' },
              { label: 'Other', value: 7, cost: 2.63, color: '#d1d5db' },
            ]}
          />
          <PieChart
            title="Cost by App / Tool"
            items={[
              { label: 'Cursor', value: 46, cost: 17.65, color: '#3b82f6' },
              { label: 'VS Code Extensions', value: 25, cost: 9.44, color: '#a855f7' },
              { label: 'Cline', value: 18, cost: 6.88, color: '#f59e0b' },
              { label: 'BurnRate Chat', value: 8, cost: 3.21, color: '#10b981' },
              { label: 'Other', value: 3, cost: 1.24, color: '#d1d5db' },
            ]}
          />
        </div>

        {/* Usage and Alerts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
          <div>
            <UsageTable />
          </div>
          <BudgetAlerts />
        </div>
      </div>
    </main>
  );
}
