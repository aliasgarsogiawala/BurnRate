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
                  <p className="text-4xl font-semibold text-gray-900">$38.42<span className="text-lg text-gray-400"> worth of AI</span></p>
                </div>
              </div>
              <p className="text-sm text-gray-600 mt-6">
                That's <span className="font-semibold text-gray-900">3.84x your plan value</span> — your API key partnerships are working hard for you.
              </p>
            </div>
            <div className="flex items-center justify-center md:justify-end">
              <div className="text-center md:text-right">
                <p className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-2">Value received</p>
                <p className="text-5xl font-bold text-gray-900">3.84<span className="text-2xl text-gray-400">x</span></p>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard
            title="Total cost"
            value="$38.42"
            subtitle="This month"
          />
          <StatCard
            title="Total tokens"
            value="2.3M"
            subtitle="This month"
          />
          <StatCard
            title="Requests"
            value="1,247"
            subtitle="This month"
          />
          <StatCard
            title="Avg cost per 1k tokens"
            value="$0.0167"
            subtitle="This month"
          />
        </div>

        {/* Charts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <PieChart
            title="Cost by model"
            items={[
              { label: 'GPT-4 Turbo', value: 35, color: '#3b82f6' },
              { label: 'Claude 3.5', value: 28, color: '#a855f7' },
              { label: 'GPT-3.5', value: 22, color: '#eab308' },
              { label: 'Other', value: 15, color: '#d1d5db' },
            ]}
          />
          <PieChart
            title="Cost by app / tool"
            items={[
              { label: 'Cursor', value: 38, color: '#3b82f6' },
              { label: 'VS Code', value: 25, color: '#a855f7' },
              { label: 'Cline', value: 20, color: '#eab308' },
              { label: 'Other', value: 17, color: '#d1d5db' },
            ]}
          />
        </div>

        {/* Usage Table */}
        <div>
          <UsageTable />
        </div>

        {/* Budget Alerts */}
        <div>
          <BudgetAlerts />
        </div>

      </div>
    </main>
  );
}
