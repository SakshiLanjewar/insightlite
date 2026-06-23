const StatCard = ({ title, value, icon, color, change }) => {
  const colorMap = {
    indigo: 'bg-indigo-50 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-400',
    cyan: 'bg-cyan-50 dark:bg-cyan-500/10 text-cyan-600 dark:text-cyan-400',
    amber: 'bg-amber-50 dark:bg-amber-500/10 text-amber-600 dark:text-amber-400',
    emerald: 'bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400',
  };

  const isPositive = change >= 0;

  return (
    <div className="card flex items-start gap-4">
      <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-xl flex-shrink-0 ${colorMap[color]}`}>
        {icon}
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm text-gray-500 dark:text-gray-400 font-medium">{title}</p>
        <p className="text-2xl font-bold text-gray-900 dark:text-white mt-0.5 truncate">{value}</p>
        <p className={`text-xs font-medium mt-1 ${isPositive ? 'text-emerald-500' : 'text-red-500'}`}>
          {isPositive ? '▲' : '▼'} {Math.abs(change)}% vs last month
        </p>
      </div>
    </div>
  );
};

export default StatCard;
