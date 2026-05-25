'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface NavItem {
  label: string;
  href: string;
  icon: string;
}

const navItems: NavItem[] = [
  { label: 'Dashboard', href: '/dashboard', icon: '📊' },
  { label: 'Usage', href: '/dashboard/usage', icon: '⚡' },
  { label: 'API Keys', href: '/dashboard/keys', icon: '🔑' },
  { label: 'Budgets', href: '/dashboard/budgets', icon: '💰' },
  { label: 'Models', href: '/dashboard/models', icon: '🤖' },
  { label: 'Settings', href: '/dashboard/settings', icon: '⚙️' },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 bg-white border-r border-gray-200 flex flex-col">
      <div className="px-6 py-6 border-b border-gray-200">
        <div className="flex items-center gap-2 mb-2">
          <div className="w-8 h-8 rounded-lg bg-blue-600 text-white flex items-center justify-center text-sm font-bold">
            🔥
          </div>
          <h1 className="text-lg font-semibold text-gray-900">BurnRate</h1>
        </div>
        <p className="text-xs text-gray-500">AI Usage Tracker</p>
      </div>

      <nav className="flex-1 px-4 py-6 space-y-1">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-4 py-2.5 text-sm font-medium rounded-lg transition-colors ${
                isActive
                  ? 'bg-blue-100 text-blue-900'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
              }`}
            >
              <span className="text-base">{item.icon}</span>
              {item.label}
            </Link>
          );
        })}
      </nav>

      <div className="px-4 py-6 border-t border-gray-200">
        <button className="w-full px-4 py-3 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-lg transition-colors flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center font-semibold text-gray-700 text-xs">
            N
          </div>
          <div className="text-left">
            <p className="font-medium text-gray-900">Niraj</p>
            <p className="text-xs text-gray-500">Pro Plan</p>
          </div>
          <span className="ml-auto text-gray-400">›</span>
        </button>
      </div>
    </aside>
  );
}