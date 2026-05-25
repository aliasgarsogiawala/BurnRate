interface APIKey {
  id: string;
  name: string;
  provider: string;
  status: 'active' | 'expiring' | 'inactive';
  lastUsed: string;
}

interface APIKeyStatusProps {
  keys?: APIKey[];
  onRefresh?: () => void;
}

export default function APIKeyStatus({ keys, onRefresh }: APIKeyStatusProps) {
  const mockKeys: APIKey[] = keys || [
    {
      id: '1',
      name: 'OpenAI Production',
      provider: 'OpenAI',
      status: 'active',
      lastUsed: 'Right now',
    },
    {
      id: '2',
      name: 'Anthropic Development',
      provider: 'Anthropic',
      status: 'active',
      lastUsed: '2 hours ago',
    },
    {
      id: '3',
      name: 'Google Gemini',
      provider: 'Google',
      status: 'expiring',
      lastUsed: '1 day ago',
    },
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active':
        return {
          className: 'bg-green-500/20 text-green-400 border-green-500/30',
          label: '● Active',
        };
      case 'expiring':
        return {
          className: 'bg-amber-500/20 text-amber-400 border-amber-500/30',
          label: '⚠ Expiring',
        };
      case 'inactive':
        return {
          className: 'bg-slate-600/20 text-slate-400 border-slate-600/30',
          label: '○ Inactive',
        };
      default:
        return { className: '', label: '' };
    }
  };

  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900/50 p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-bold text-white">API Keys</h2>
        <button
          onClick={onRefresh}
          className="text-xs font-medium text-cyan-400 hover:text-cyan-300 px-3 py-1 rounded border border-cyan-500/30 hover:border-cyan-500/50 transition-colors"
        >
          Refresh
        </button>
      </div>

      <div className="space-y-3">
        {mockKeys.map((key) => {
          const badge = getStatusBadge(key.status);
          return (
            <div
              key={key.id}
              className="flex items-center justify-between p-4 rounded-lg bg-slate-800/30 border border-slate-700 hover:border-slate-600 transition-colors"
            >
              <div className="flex-1">
                <h3 className="font-medium text-white text-sm">{key.name}</h3>
                <p className="text-xs text-slate-400 mt-1">
                  {key.provider} • Last used {key.lastUsed}
                </p>
              </div>
              <span
                className={`text-xs font-medium px-2.5 py-1 rounded-full border ${badge.className}`}
              >
                {badge.label}
              </span>
            </div>
          );
        })}
      </div>

      <button className="w-full mt-4 px-4 py-2 rounded-lg text-sm font-medium text-slate-300 hover:text-white border border-slate-700 hover:border-slate-600 bg-slate-800/20 hover:bg-slate-800/50 transition-colors">
        Manage Keys →
      </button>
    </div>
  );
}
