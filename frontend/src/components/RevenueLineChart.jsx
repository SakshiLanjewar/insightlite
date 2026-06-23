import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import { useTheme } from '../context/ThemeContext';

const RevenueLineChart = ({ data }) => {
  const { isDark } = useTheme();

  const axisColor = isDark ? '#9ca3af' : '#6b7280';
  const gridColor = isDark ? '#374151' : '#f3f4f6';

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-3 shadow-lg text-sm">
          <p className="font-semibold text-gray-800 dark:text-white mb-1">{label}</p>
          {payload.map((entry) => (
            <p key={entry.name} style={{ color: entry.color }}>
              {entry.name}:{' '}
              <span className="font-medium">
                {entry.name === 'Revenue' ? `₹${entry.value.toLocaleString()}` : entry.value.toLocaleString()}
              </span>
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="card">
      <h3 className="text-base font-semibold text-gray-900 dark:text-white mb-4">
        Revenue Trend
      </h3>
      <ResponsiveContainer width="100%" height={260}>
        <LineChart data={data} margin={{ top: 5, right: 10, left: -10, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" stroke={gridColor} />
          <XAxis dataKey="month" tick={{ fill: axisColor, fontSize: 12 }} axisLine={false} tickLine={false} />
          <YAxis tick={{ fill: axisColor, fontSize: 12 }} axisLine={false} tickLine={false} />
          <Tooltip content={<CustomTooltip />} />
          <Legend wrapperStyle={{ fontSize: '12px', paddingTop: '12px', color: axisColor }} />
          <Line
            type="monotone"
            dataKey="revenue"
            name="Revenue"
            stroke="#10b981"
            strokeWidth={2.5}
            dot={{ fill: '#10b981', r: 4 }}
            activeDot={{ r: 6 }}
          />
          <Line
            type="monotone"
            dataKey="newUsers"
            name="New Users"
            stroke="#f59e0b"
            strokeWidth={2.5}
            dot={{ fill: '#f59e0b', r: 4 }}
            activeDot={{ r: 6 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default RevenueLineChart;
