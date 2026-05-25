'use client';

export default function Topbar() {
  return (
    <header className="bg-white border-b border-gray-200 px-8 py-4 flex items-center justify-between">
      {/* Left Section */}
      <div className="flex items-center gap-4">
        <h1 className="text-xl font-semibold text-gray-900">Dashboard</h1>
      </div>

      {/* Right Section */}
      <div className="flex items-center gap-4">
        {/* Date Range Selector */}
        <div className="flex items-center gap-2 px-3 py-1.5 bg-gray-50 border border-gray-200 rounded-lg">
          <select className="text-sm font-medium text-gray-700 bg-transparent border-none focus:outline-none cursor-pointer">
            <option>This month</option>
            <option>Last month</option>
            <option>Last 3 months</option>
            <option>Last 12 months</option>
          </select>
        </div>

        {/* User Avatar */}
        <button className="w-8 h-8 rounded-full bg-gray-200 hover:bg-gray-300 transition-colors flex items-center justify-center text-gray-700 font-semibold text-sm">
          U
        </button>
      </div>
    </header>
  );
}
