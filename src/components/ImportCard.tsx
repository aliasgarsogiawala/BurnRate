'use client';

import { useState } from 'react';

export interface ImportCardProps {
  title: string;
  description: string;
  icon: string;
  fields: Array<{
    id: string;
    label: string;
    type: 'text' | 'number' | 'email';
    placeholder?: string;
    optional?: boolean;
  }>;
  onSubmit: (data: Record<string, string | number>) => void;
}

export default function ImportCard({
  title,
  description,
  icon,
  fields,
  onSubmit,
}: ImportCardProps) {
  const [formData, setFormData] = useState<Record<string, string | number>>(
    fields.reduce((acc, field) => ({ ...acc, [field.id]: '' }), {})
  );
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (fieldId: string, value: string | number) => {
    setFormData((prev) => ({ ...prev, [fieldId]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 500));
    
    onSubmit(formData);
    
    // Reset form
    setFormData(
      fields.reduce((acc, field) => ({ ...acc, [field.id]: '' }), {})
    );
    setIsSubmitting(false);
  };

  return (
    <div className="bg-white border border-gray-200 rounded-2xl p-8 shadow-sm hover:border-gray-300 transition-colors">
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center gap-3 mb-4">
          <span className="text-2xl">{icon}</span>
          <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
        </div>
        <p className="text-sm text-gray-600">{description}</p>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-4">
        {fields.map((field) => (
          <div key={field.id}>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {field.label}
              {field.optional && <span className="text-gray-400 ml-1">(optional)</span>}
            </label>
            <input
              type={field.type}
              placeholder={field.placeholder}
              value={formData[field.id]}
              onChange={(e) => handleChange(field.id, e.target.value)}
              className="w-full px-3 py-2 text-sm bg-white border border-gray-200 rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-colors"
            />
          </div>
        ))}

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full mt-6 px-4 py-2.5 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          {isSubmitting ? 'Importing...' : 'Import Usage'}
        </button>
      </form>
    </div>
  );
}
