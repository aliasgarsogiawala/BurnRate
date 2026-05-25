interface PieChartProps {
  title: string;
  items: Array<{ label: string; value: number; cost: number; color: string }>;
  showLegend?: boolean;
}

export default function PieChart({ title, items, showLegend = true }: PieChartProps) {
  const total = items.reduce((sum, item) => sum + item.value, 0);
  
  // Calculate pie slices
  let currentAngle = -Math.PI / 2;
  const slices = items.map((item) => {
    const sliceAngle = (item.value / total) * 2 * Math.PI;
    const startAngle = currentAngle;
    const endAngle = currentAngle + sliceAngle;
    
    const x1 = 100 + 80 * Math.cos(startAngle);
    const y1 = 100 + 80 * Math.sin(startAngle);
    const x2 = 100 + 80 * Math.cos(endAngle);
    const y2 = 100 + 80 * Math.sin(endAngle);
    
    const largeArc = sliceAngle > Math.PI ? 1 : 0;
    
    // Inner circle for donut
    const x1Inner = 100 + 50 * Math.cos(startAngle);
    const y1Inner = 100 + 50 * Math.sin(startAngle);
    const x2Inner = 100 + 50 * Math.cos(endAngle);
    const y2Inner = 100 + 50 * Math.sin(endAngle);
    
    const pathData = `
      M ${x1} ${y1}
      A 80 80 0 ${largeArc} 1 ${x2} ${y2}
      L ${x2Inner} ${y2Inner}
      A 50 50 0 ${largeArc} 0 ${x1Inner} ${y1Inner}
      Z
    `;
    
    currentAngle = endAngle;
    
    return {
      pathData,
      color: item.color,
      label: item.label,
      value: item.value,
      percentage: ((item.value / total) * 100).toFixed(1),
    };
  });

  return (
    <div className="bg-white border border-gray-200 rounded-xl p-6">
      <div className="mb-6">
        <h2 className="text-sm font-semibold text-gray-900">{title}</h2>
      </div>

      <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
        {/* SVG Donut Chart */}
        <div className="flex-shrink-0">
          <svg width="240" height="240" viewBox="0 0 200 200" className="w-48 h-48">
            {slices.map((slice, idx) => (
              <path
                key={idx}
                d={slice.pathData}
                fill={slice.color}
                opacity="0.85"
                className="hover:opacity-100 transition-opacity cursor-pointer"
              />
            ))}
          </svg>
        </div>

        {/* Legend */}
        {showLegend && (
          <div className="space-y-3 flex-1">
            {slices.map((slice, idx) => {
              const item = items[idx];
              return (
                <div key={idx} className="flex items-center justify-between">
                  <div className="flex items-center gap-3 flex-1">
                    <div
                      className="w-2.5 h-2.5 rounded-full flex-shrink-0"
                      style={{ backgroundColor: slice.color }}
                    ></div>
                    <span className="text-sm text-gray-600">{slice.label}</span>
                  </div>
                  <div className="flex items-center gap-4 flex-shrink-0">
                    <span className="text-sm font-medium text-gray-900">${item.cost.toFixed(2)}</span>
                    <span className="text-sm font-medium text-gray-600 w-8 text-right">{slice.percentage}%</span>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
