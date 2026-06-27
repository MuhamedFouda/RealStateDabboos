// Static dashboard statistics
// icon: name of react-icons icon component (imported per card in StatCard.jsx)
// color: maps to Tailwind color classes defined in StatCard.jsx

export const stats = [
  {
    key: 'totalProperties',
    value: '48',
    trend: '+12%',
    trendUp: true,
    iconType: 'building',
    colorScheme: 'emerald',
  },
  {
    key: 'totalClients',
    value: '127',
    trend: '+8%',
    trendUp: true,
    iconType: 'people',
    colorScheme: 'blue',
  },
  {
    key: 'newRequests',
    value: '23',
    trend: '+5 this week',
    trendUp: true,
    iconType: 'bell',
    colorScheme: 'amber',
  },
  {
    key: 'totalSales',
    value: '$2.4M',
    trend: '+18%',
    trendUp: true,
    iconType: 'currency',
    colorScheme: 'purple',
  },
];
