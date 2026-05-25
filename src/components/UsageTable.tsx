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
  title = 'Recent usage',
  data 
}: UsageTableProps) {
  const mockData: UsageLog[] = data || [
    {
      id: '1',
      time: '2:15 PM',
      app: 'Cursor',
      model: 'GPT-4 Turbo',
      tokens: 15234,
      cost: 0.45,
    },
    {
      id: '2',
      time: '1:45 PM',
      app: 'VS Code',
      model: 'Claude 3.5',
      tokens: 8901,
      cost: 0.32,
    },
    {
      id: '3',
      time: '1:12 PM',
      app: 'Cline',
      model: 'GPT-4 Vision',
      tokens: 22145,
      cost: 0.78,
    },
    {
      id: '4',
      time: '12:34 PM',
      app: 'Custom App',
      model: 'GPT-3.5',
      tokens: 5678,
      cost: 0.08,
    },
    {
      id: '5',
      time: '11:22 AM',
      app: 'Chat',
      model: 'Claude 3 Opus',
      tokens: 18234,
      cost: 0.62,
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
    </div>
  );
}
