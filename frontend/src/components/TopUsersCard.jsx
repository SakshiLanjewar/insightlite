import { getInitials } from '../utils/helpers';

const colors = [
  'bg-primary-500',
  'bg-emerald-500',
  'bg-amber-500',
  'bg-cyan-500',
  'bg-pink-500',
];

const TopUsersCard = ({ activities }) => {
  // Count activity per user from the activities list
  const userMap = {};
  activities.forEach((a) => {
    if (!userMap[a.user]) userMap[a.user] = { name: a.user, count: 0, amount: 0 };
    userMap[a.user].count += 1;
    if (a.amount) userMap[a.user].amount += a.amount;
  });

  const topUsers = Object.values(userMap)
    .sort((a, b) => b.count - a.count)
    .slice(0, 5);

  return (
    <div className="card">
      <h3 className="text-base font-semibold text-gray-900 dark:text-white mb-4">
        Top Active Users
      </h3>
      {topUsers.length === 0 ? (
        <p className="text-sm text-gray-400 dark:text-gray-500 text-center py-6">No data yet</p>
      ) : (
        <div className="space-y-3">
          {topUsers.map((user, index) => (
            <div key={user.name} className="flex items-center gap-3">
              {/* Rank */}
              <span className="text-xs font-bold text-gray-400 dark:text-gray-500 w-4">
                {index + 1}
              </span>
              {/* Avatar */}
              <div className={`w-8 h-8 rounded-full ${colors[index]} flex items-center justify-center text-white text-xs font-bold flex-shrink-0`}>
                {getInitials(user.name)}
              </div>
              {/* Name + bar */}
              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-center mb-1">
                  <p className="text-sm font-medium text-gray-800 dark:text-gray-200 truncate">
                    {user.name}
                  </p>
                  <span className="text-xs text-gray-400 dark:text-gray-500 ml-2 flex-shrink-0">
                    {user.count} {user.count === 1 ? 'action' : 'actions'}
                  </span>
                </div>
                {/* Progress bar */}
                <div className="w-full bg-gray-100 dark:bg-gray-700 rounded-full h-1.5">
                  <div
                    className={`h-1.5 rounded-full ${colors[index]}`}
                    style={{ width: `${(user.count / topUsers[0].count) * 100}%` }}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default TopUsersCard;
