import { useState, useEffect, useCallback } from 'react';
import Navbar from '../components/Navbar';
import StatCard from '../components/StatCard';
import SalesBarChart from '../components/SalesBarChart';
import CategoryPieChart from '../components/CategoryPieChart';
import RevenueLineChart from '../components/RevenueLineChart';
import ActivityTable from '../components/ActivityTable';
import TopUsersCard from '../components/TopUsersCard';
import { useToast } from '../components/Toast';
import { useAuth } from '../context/AuthContext';
import { formatCurrency, formatNumber } from '../utils/helpers';
import api from '../utils/api';

const MONTHS = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];

const Dashboard = () => {
  const { user } = useAuth();
  const { showToast, ToastContainer } = useToast();

  const [summary, setSummary] = useState(null);
  const [chartData, setChartData] = useState([]);
  const [filteredChartData, setFilteredChartData] = useState([]);
  const [pieData, setPieData] = useState([]);
  const [activities, setActivities] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loadingStats, setLoadingStats] = useState(true);
  const [loadingActivity, setLoadingActivity] = useState(true);
  const [error, setError] = useState('');

  // Date filter state
  const [fromMonth, setFromMonth] = useState('Jan');
  const [toMonth, setToMonth] = useState('Dec');

  // Fetch summary + charts on mount
  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [summaryRes, chartRes, pieRes] = await Promise.all([
          api.get('/analytics/summary'),
          api.get('/analytics/chart'),
          api.get('/analytics/pie'),
        ]);
        setSummary(summaryRes.data.data);
        setChartData(chartRes.data.data);
        setFilteredChartData(chartRes.data.data);
        setPieData(pieRes.data.data);
        showToast('Dashboard loaded successfully!', 'success');
      } catch (err) {
        setError('Failed to load data. Is the backend running on port 5000?');
        showToast('Failed to load dashboard data', 'error');
      } finally {
        setLoadingStats(false);
      }
    };
    fetchStats();
  }, []);

  // Apply month range filter to chart data
  useEffect(() => {
    if (chartData.length === 0) return;
    const fromIdx = MONTHS.indexOf(fromMonth);
    const toIdx = MONTHS.indexOf(toMonth);
    if (fromIdx <= toIdx) {
      setFilteredChartData(chartData.filter((_, i) => i >= fromIdx && i <= toIdx));
    }
  }, [fromMonth, toMonth, chartData]);

  // Fetch activities with debounce
  const fetchActivities = useCallback(async () => {
    setLoadingActivity(true);
    try {
      const res = await api.get('/analytics/activities', {
        params: { search: searchQuery },
      });
      setActivities(res.data.data);
    } catch (err) {
      showToast('Failed to load activities', 'error');
    } finally {
      setLoadingActivity(false);
    }
  }, [searchQuery]);

  useEffect(() => {
    const timer = setTimeout(fetchActivities, 400);
    return () => clearTimeout(timer);
  }, [fetchActivities]);

  const statCards = summary
    ? [
        { title: 'Total Users',   value: formatNumber(summary.totalUsers),    icon: '👥', color: 'indigo',  change: 12   },
        { title: 'Total Sales',   value: formatNumber(summary.totalSales),    icon: '📈', color: 'emerald', change: 8.5  },
        { title: 'Total Revenue', value: formatCurrency(summary.totalRevenue),icon: '💎', color: 'cyan',    change: 15.2 },
        { title: 'Total Orders',  value: formatNumber(summary.totalOrders),   icon: '📦', color: 'amber',   change: -2.4 },
      ]
    : [];

  // Skeleton for stat cards
  const StatSkeleton = () => (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      {[...Array(4)].map((_, i) => (
        <div key={i} className="card animate-pulse h-28">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-gray-200 dark:bg-gray-700 rounded-xl" />
            <div className="flex-1">
              <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded mb-3 w-2/3" />
              <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-1/2" />
              <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded mt-2 w-1/3" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );

  const ChartSkeleton = () => (
    <div className="card flex items-center justify-center h-72 animate-pulse">
      <div className="w-8 h-8 border-4 border-primary-500 border-t-transparent rounded-full animate-spin" />
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <ToastContainer />
      <Navbar />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            Welcome back, {user?.name?.split(' ')[0]} 👋
          </h2>
          <p className="text-gray-500 dark:text-gray-400 mt-1 text-sm">
            Here's what's happening with your business today.
          </p>
        </div>

        {error && (
          <div className="mb-6 bg-red-50 dark:bg-red-500/10 border border-red-200 dark:border-red-500/20 text-red-600 dark:text-red-400 rounded-xl px-4 py-3 text-sm">
            ⚠️ {error}
          </div>
        )}

        {/* Stat Cards */}
        {loadingStats ? <StatSkeleton /> : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            {statCards.map((card) => <StatCard key={card.title} {...card} />)}
          </div>
        )}

        {/* Date Filter */}
        <div className="card mb-6">
          <div className="flex flex-wrap items-center gap-4">
            <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">
              📅 Filter Charts by Month Range:
            </span>
            <div className="flex items-center gap-2">
              <label className="text-xs text-gray-500 dark:text-gray-400">From</label>
              <select
                value={fromMonth}
                onChange={(e) => setFromMonth(e.target.value)}
                className="input-field py-1.5 text-sm w-24"
              >
                {MONTHS.map((m) => <option key={m}>{m}</option>)}
              </select>
            </div>
            <div className="flex items-center gap-2">
              <label className="text-xs text-gray-500 dark:text-gray-400">To</label>
              <select
                value={toMonth}
                onChange={(e) => setToMonth(e.target.value)}
                className="input-field py-1.5 text-sm w-24"
              >
                {MONTHS.map((m) => <option key={m}>{m}</option>)}
              </select>
            </div>
            <button
              onClick={() => { setFromMonth('Jan'); setToMonth('Dec'); }}
              className="text-xs text-primary-500 hover:text-primary-600 font-medium px-3 py-1.5 rounded-lg hover:bg-primary-50 dark:hover:bg-primary-500/10"
            >
              Reset
            </button>
            <span className="text-xs text-gray-400 dark:text-gray-500">
              Showing {filteredChartData.length} month{filteredChartData.length !== 1 ? 's' : ''}
            </span>
          </div>
        </div>

        {/* Row 1: Bar Chart + Pie Chart */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-4">
          <div className="lg:col-span-2">
            {loadingStats ? <ChartSkeleton /> : <SalesBarChart data={filteredChartData} />}
          </div>
          <div>
            {loadingStats ? <ChartSkeleton /> : <CategoryPieChart data={pieData} />}
          </div>
        </div>

        {/* Row 2: Line Chart + Top Users */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-6">
          <div className="lg:col-span-2">
            {loadingStats ? <ChartSkeleton /> : <RevenueLineChart data={filteredChartData} />}
          </div>
          <div>
            {loadingActivity ? <ChartSkeleton /> : <TopUsersCard activities={activities} />}
          </div>
        </div>

        {/* Activity Table */}
        <ActivityTable
          activities={activities}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          loading={loadingActivity}
        />
      </main>
    </div>
  );
};

export default Dashboard;
