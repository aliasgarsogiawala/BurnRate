interface Alert {
  id: string;
  type: 'warning' | 'critical';
  title: string;
  description: string;
}

interface BudgetAlertsProps {
  alerts?: Alert[];
}

export default function BudgetAlerts({ alerts }: BudgetAlertsProps) {
  const mockAlerts: Alert[] = alerts || [
    {
      id: '1',
      type: 'critical',
      title: 'Budget threshold reached',
      description: 'You have used 85% of your monthly budget ($170 of $200)',
    },
    {
      id: '2',
      type: 'warning',
      title: 'Unusual activity detected',
      description: 'GPT-4 usage is 40% higher than average',
    },
  ];

  const getAlertStyles = (type: 'warning' | 'critical') => {
    if (type === 'critical') {
      return {
        container: 'bg-red-50 border-red-200',
        title: 'text-red-900',
        description: 'text-red-700',
      };
    }
    return {
      container: 'bg-yellow-50 border-yellow-200',
      title: 'text-yellow-900',
      description: 'text-yellow-700',
    };
  };

  return (
    <div className="bg-white border border-gray-200 rounded-xl p-6">
      <h2 className="text-sm font-semibold text-gray-900 mb-4">Budget alerts</h2>

      {mockAlerts.length > 0 ? (
        <div className="space-y-3">
          {mockAlerts.map((alert) => {
            const styles = getAlertStyles(alert.type);
            return (
              <div
                key={alert.id}
                className={`border rounded-lg p-4 ${styles.container}`}
              >
                <h3 className={`font-medium text-sm ${styles.title}`}>
                  {alert.title}
                </h3>
                <p className={`text-sm mt-1 ${styles.description}`}>
                  {alert.description}
                </p>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="p-4 rounded-lg bg-green-50 border border-green-200">
          <p className="text-sm font-medium text-green-900">All budgets are within limits</p>
        </div>
      )}
    </div>
  );
}
