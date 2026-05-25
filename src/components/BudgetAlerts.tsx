interface Alert {
  id: string;
  type: 'warning' | 'critical';
  title: string;
  description: string;
  percentage?: number;
  amount?: string;
}

interface BudgetAlertsProps {
  alerts?: Alert[];
}

export default function BudgetAlerts({ alerts }: BudgetAlertsProps) {
  const mockAlerts: Alert[] = alerts || [
    {
      id: '1',
      type: 'warning',
      title: "You're at 76% of your monthly budget",
      description: '$76.00 / $100.00 used',
      percentage: 76,
      amount: '$76.00',
    },
    {
      id: '2',
      type: 'critical',
      title: 'Daily budget reached',
      description: 'You reached 100% of your daily budget ($1.00)',
      percentage: 100,
      amount: '$1.00',
    },
  ];

  const getAlertStyles = (type: 'warning' | 'critical') => {
    if (type === 'critical') {
      return {
        container: 'bg-amber-50 border-amber-200',
        icon: 'bg-amber-100 text-amber-700',
      };
    }

    return {
      container: 'bg-green-50 border-green-200',
      icon: 'bg-green-100 text-green-700',
    };
  };

  return (
    <div className="bg-white border border-gray-200 rounded-xl p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-sm font-semibold text-gray-900">Budget Alerts</h2>
        <button className="text-xs font-medium text-gray-500 hover:text-gray-900 border border-gray-200 rounded-md px-2.5 py-1 bg-white">
          View all
        </button>
      </div>

      <div className="space-y-4">
        {mockAlerts.map((alert) => {
          const styles = getAlertStyles(alert.type);
          const progressBgColor = alert.type === 'critical' ? 'bg-amber-400' : 'bg-green-500';

          return (
            <div key={alert.id} className={`border rounded-lg p-4 ${styles.container}`}>
              <div className="flex items-start gap-3">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-semibold ${styles.icon}`}>
                  {alert.type === 'critical' ? '!' : '✓'}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h3 className="text-sm font-medium text-gray-900">{alert.title}</h3>
                      <p className="text-xs text-gray-500 mt-1">{alert.description}</p>
                    </div>
                    {alert.percentage !== undefined && (
                      <span className="text-sm font-semibold text-gray-500">{alert.percentage}%</span>
                    )}
                  </div>

                  {alert.percentage !== undefined && (
                    <div className="mt-3 w-full bg-gray-200 rounded-full h-1.5 overflow-hidden">
                      <div
                        className={`h-full ${progressBgColor} rounded-full transition-all`}
                        style={{ width: `${alert.percentage}%` }}
                      ></div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}