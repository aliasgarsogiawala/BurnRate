interface ChartPlaceholderProps {
  title: string;
  description?: string;
  items?: Array<{ label: string; value: number; color: string }>;
}

export default function ChartPlaceholder({
  title,
  description,
  items,
}: ChartPlaceholderProps) {
  const mockItems = items || [
    { label: 'GPT-4 Turbo', value: 35, color: 'bg-blue-500' },
    { label: 'Claude 3.5', value: 28, color: 'bg-purple-500' },
    { label: 'GPT-3.5', value: 22, color: 'bg-yellow-500' },
    { label: 'Other', value: 15, color: 'bg-gray-300' },
  ];

  return (
    <div className="bg-white border border-gray-200 rounded-xl p-6">
      <div className="mb-6">
        <h2 className="text-sm font-semibold text-gray-900">{title}</h2>
        {description && (
          <p className="text-xs text-gray-500 mt-1">{description}</p>
        )}
      </div>

      <div className="space-y-4">
        {mockItems.map((item, idx) => (
          <div key={idx} className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">{item.label}</span>
              <span className="text-sm font-medium text-gray-900">{item.value}%</span>
            </div>
            <div className="w-full bg-gray-100 rounded-full h-2 overflow-hidden">
              <div
                className={`h-full ${item.color} rounded-full transition-all`}
                style={{ width: `${item.value}%` }}
              ></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
