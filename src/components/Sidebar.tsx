'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface NavItem {
  label: string;
  href: string;
}

const navItems: NavItem[] = [
  { label: 'Dashboard', href: '/dashboard' },
  { label: 'Usage', href: '/dashboard/usage' },
  { label: 'API Keys', href: '/dashboard/keys' },
  { label: 'Budgets', href: '/dashboard/budgets' },
  { label: 'Models', href: '/dashboard/models' },
  { label: 'Settings', href: '/dashboard/settings' },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 bg-gradient-to-b from-white to-gray-50 border-r border-gray-200 flex flex-col">
      {/* Logo / Brand */}
      <div className="px-6 py-8 border-b border-gray-200">
        <h1 className="text-lg font-semibold text-gray-900">BurnRate</h1>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 py-6 space-y-1">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`block px-4 py-2.5 text-sm font-medium rounded-lg transition-colors ${
                isActive
                  ? 'bg-gray-100 text-gray-900'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
              }`}
            >
              {item.label}
            </Link>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="px-4 py-6 border-t border-gray-200">
        <button className="w-full px-4 py-2.5 text-sm font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors">
          Account
        </button>
      </div>
    </aside>
  );
}
