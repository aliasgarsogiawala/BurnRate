'use client';

import StatCard from '@/components/StatCard';
import UsageTable from '@/components/UsageTable';
import BudgetAlerts from '@/components/BudgetAlerts';
import PieChart from '@/components/PieChart';

export default function DashboardPage() {
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
                  <p className="text-4xl font-semibold text-gray-900">$10</p>
                </div>
                <div>
                  <p className="text-gray-600 text-sm mb-1">Used</p>
                  <p className="text-4xl font-semibold text-gray-900">
                    $38.42<span className="text-lg text-gray-400"> worth of AI</span>
                  </p>
                </div>
              </div>
              <p className="text-sm text-gray-600 mt-6">
                That’s <span className="font-semibold text-gray-900">3.84x your plan value</span>.
              </p>
            </div>
            <div className="flex items-center justify-center md:justify-end">
              <div className="text-center md:text-right">
                <div className="inline-flex items-center rounded-full bg-green-50 text-green-700 px-3 py-1 text-sm font-semibold mb-3">
                  3.84x value received
                </div>
                <p className="text-5xl font-bold text-gray-900">
                  3.84<span className="text-2xl text-gray-400">x</span>
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard
            title="Total Cost"
            value="$38.42"
            icon="💰"
            trend={{ value: 18, direction: 'up' }}
          />
          <StatCard
            title="Total Tokens"
            value="1.42M"
            icon="⚡"
            trend={{ value: 9, direction: 'up' }}
          />
          <StatCard
            title="Requests"
            value="684"
            icon="📊"
            trend={{ value: 7, direction: 'down' }}
          />
          <StatCard
            title="Avg. Cost / 1K Tokens"
            value="$0.027"
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
