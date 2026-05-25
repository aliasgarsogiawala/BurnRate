import React from 'react';

interface StatCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon?: string;
  trend?: {
    value: number;
    direction: 'up' | 'down';
  };
}

export default function StatCard({
  title,
  value,
  subtitle,
  icon,
  trend,
}: StatCardProps) {
  return (
    <div className="bg-white border border-gray-200 rounded-xl p-6">
      <div className="flex items-start justify-between mb-4">
        <p className="text-sm font-medium text-gray-600">{title}</p>
        {icon && <span className="text-lg">{icon}</span>}
      </div>
      
      <div>
        <p className="text-3xl font-semibold text-gray-900 mb-2">
          {value}
        </p>
        
        {trend && (
          <p className={`text-xs font-medium ${
            trend.direction === 'up' ? 'text-red-600' : 'text-green-600'
          }`}>
            {trend.direction === 'up' ? '↑' : '↓'} {trend.value}% vs last month
          </p>
        )}
        
        {subtitle && !trend && (
          <p className="text-xs text-gray-500">{subtitle}</p>
        )}
      </div>
    </div>
  );
}
