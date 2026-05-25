interface UsageLog {
  id: string;
  time: string;
  app: string;
  model: string;
  tokens: number;
  cost: number;
}

interface UsageTableProps {
  data?: UsageLog[];
  title?: string;
}

export default function UsageTable({ 
  title = 'Recent Usage',
  data 
}: UsageTableProps) {
  const mockData: UsageLog[] = data || [
    {
      id: '1',
      time: 'May 31, 10:21 AM',
      app: 'Cursor',
      model: 'GPT-4o',
      tokens: 12400,
      cost: 0.34,
    },
    {
      id: '2',
      time: 'May 31, 09:15 AM',
      app: 'VS Code Ext.',
      model: 'Claude 3.5 Sonnet',
      tokens: 8700,
      cost: 0.28,
    },
    {
      id: '3',
      time: 'May 30, 11:47 PM',
      app: 'Cline',
      model: 'GPT-4o',
      tokens: 15200,
      cost: 0.41,
    },
    {
      id: '4',
      time: 'May 30, 08:33 PM',
      app: 'BurnRate Chat',
      model: 'Gemini 1.5 Pro',
      tokens: 9100,
      cost: 0.23,
    },
    {
      id: '5',
      time: 'May 30, 06:12 PM',
      app: 'Cursor',
      model: 'GPT-4 Turbo',
      tokens: 21300,
      cost: 0.63,
    },
  ];

  return (
    <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
      {/* Header */}
      <div className="px-6 py-4 border-b border-gray-200">
        <h2 className="text-sm font-semibold text-gray-900">{title}</h2>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-gray-200 bg-gray-50">
              <th className="px-6 py-3 text-left font-semibold text-gray-700">Time</th>
              <th className="px-6 py-3 text-left font-semibold text-gray-700">App / Tool</th>
              <th className="px-6 py-3 text-left font-semibold text-gray-700">Model</th>
              <th className="px-6 py-3 text-right font-semibold text-gray-700">Tokens</th>
              <th className="px-6 py-3 text-right font-semibold text-gray-700">Cost</th>
            </tr>
          </thead>
          <tbody>
            {mockData.map((log) => (
              <tr
                key={log.id}
                className="border-b border-gray-100 hover:bg-gray-50 transition-colors"
              >
                <td className="px-6 py-3 text-gray-600">{log.time}</td>
                <td className="px-6 py-3 font-medium text-gray-900">{log.app}</td>
                <td className="px-6 py-3 text-gray-600">{log.model}</td>
                <td className="px-6 py-3 text-right text-gray-600">
                  {log.tokens.toLocaleString()}
                </td>
                <td className="px-6 py-3 text-right font-medium text-gray-900">
                  ${log.cost.toFixed(2)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Footer */}
      <div className="px-6 py-4 border-t border-gray-200 bg-gray-50">
        <button className="text-sm font-medium text-gray-700 hover:text-gray-900 transition-colors">
          View all usage →
        </button>
      </div>
    </div>
  );
}
