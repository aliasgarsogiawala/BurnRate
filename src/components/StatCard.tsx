import React from 'react';

interface StatCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  highlight?: boolean;
}

export default function StatCard({
  title,
  value,
  subtitle,
  highlight = false,
}: StatCardProps) {
  return (
    <div className="bg-white border border-gray-200 rounded-xl p-6">
      <p className="text-sm font-medium text-gray-600 mb-3">{title}</p>
      
      <div>
        <p className="text-3xl font-semibold text-gray-900 mb-1">
          {value}
        </p>
        
        {subtitle && (
          <p className="text-xs text-gray-500">{subtitle}</p>
        )}
      </div>
    </div>
  );
}
