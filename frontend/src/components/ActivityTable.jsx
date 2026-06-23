import { formatDate, formatCurrency } from '../utils/helpers';

const statusStyles = {
  completed: 'bg-emerald-100 dark:bg-emerald-500/10 text-emerald-700 dark:text-emerald-400',
  pending: 'bg-amber-100 dark:bg-amber-500/10 text-amber-700 dark:text-amber-400',
  failed: 'bg-red-100 dark:bg-red-500/10 text-red-700 dark:text-red-400',
  refunded: 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400',
};

const typeIcons = {
  sale: '💰',
  signup: '👤',
  order: '📦',
  refund: '↩️',
  login: '🔑',
};

// Export activities as CSV file
const exportToCSV = (activities) => {
  const headers = ['User', 'Action', 'Type', 'Amount', 'Status', 'Date'];
  const rows = activities.map((a) => [
    a.user,
    a.action,
    a.type,
    a.amount ? a.amount : '',
    a.status,
    formatDate(a.createdAt),
  ]);

  const csvContent =
    [headers, ...rows]
      .map((row) => row.map((val) => `"${val}"`).join(','))
      .join('\n');

  const blob = new Blob([csvContent], { type: 'text/csv' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `insightlite-activity-${Date.now()}.csv`;
  a.click();
  URL.revokeObjectURL(url);
};

const ActivityTable = ({ activities, searchQuery, onSearchChange, loading, onExport }) => {
  return (
    <div className="card">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-5">
        <h3 className="text-base font-semibold text-gray-900 dark:text-white">
          Recent Activity
          <span className="ml-2 text-xs font-normal text-gray-400 dark:text-gray-500">
            ({activities.length} records)
          </span>
        </h3>
        <div className="flex items-center gap-2 flex-wrap">
          {/* Search */}
          <div className="relative">
            <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input
              type="text"
              placeholder="Search activities..."
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              className="input-field pl-9 py-2 text-sm w-full sm:w-48"
            />
          </div>
          {/* Export CSV Button */}
          <button
            onClick={() => exportToCSV(activities)}
            disabled={activities.length === 0}
            className="flex items-center gap-2 px-3 py-2 bg-emerald-500 hover:bg-emerald-600 disabled:opacity-50 disabled:cursor-not-allowed text-white text-sm font-medium rounded-xl transition-colors"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
            </svg>
            Export CSV
          </button>
        </div>
      </div>

      {loading ? (
        <div className="space-y-3">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="flex gap-4 animate-pulse">
              <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/5" />
              <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-2/5" />
              <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/5" />
              <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/5" />
            </div>
          ))}
        </div>
      ) : activities.length === 0 ? (
        <div className="text-center py-10 text-gray-400 dark:text-gray-500">
          <p className="text-3xl mb-2">🔍</p>
          <p className="text-sm">No activities found</p>
        </div>
      ) : (
        <div className="overflow-x-auto -mx-6">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-100 dark:border-gray-700">
                {['User', 'Action', 'Type', 'Amount', 'Status', 'Date'].map((h) => (
                  <th key={h} className="text-left px-6 py-2.5 text-xs font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wider">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50 dark:divide-gray-700/50">
              {activities.map((activity) => (
                <tr key={activity._id} className="hover:bg-gray-50 dark:hover:bg-gray-700/30 transition-colors">
                  <td className="px-6 py-3 font-medium text-gray-800 dark:text-gray-200 whitespace-nowrap">
                    {activity.user}
                  </td>
                  <td className="px-6 py-3 text-gray-600 dark:text-gray-400 max-w-[180px] truncate">
                    {activity.action}
                  </td>
                  <td className="px-6 py-3 text-gray-500 dark:text-gray-400 whitespace-nowrap">
                    <span className="flex items-center gap-1">
                      {typeIcons[activity.type]} {activity.type}
                    </span>
                  </td>
                  <td className="px-6 py-3 text-gray-700 dark:text-gray-300 whitespace-nowrap">
                    {activity.amount ? formatCurrency(activity.amount) : '—'}
                  </td>
                  <td className="px-6 py-3 whitespace-nowrap">
                    <span className={`inline-flex px-2.5 py-0.5 rounded-full text-xs font-medium capitalize ${statusStyles[activity.status]}`}>
                      {activity.status}
                    </span>
                  </td>
                  <td className="px-6 py-3 text-gray-500 dark:text-gray-400 whitespace-nowrap">
                    {formatDate(activity.createdAt)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default ActivityTable;
