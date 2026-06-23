const Analytics = require('../models/Analytics');
const Activity = require('../models/Activity');
const User = require('../models/User');

// @desc    Get summary stats (cards data)
// @route   GET /api/analytics/summary
// @access  Private
const getSummary = async (req, res) => {
  try {
    const analyticsData = await Analytics.find();

    const totalSales = analyticsData.reduce((sum, d) => sum + d.sales, 0);
    const totalRevenue = analyticsData.reduce((sum, d) => sum + d.revenue, 0);
    const totalOrders = analyticsData.reduce((sum, d) => sum + d.orders, 0);
    const totalUsers = await User.countDocuments();

    res.json({
      success: true,
      data: {
        totalUsers,
        totalSales,
        totalRevenue,
        totalOrders,
      },
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Get bar chart data (monthly sales & revenue)
// @route   GET /api/analytics/chart
// @access  Private
const getChartData = async (req, res) => {
  try {
    const data = await Analytics.find().sort({ year: 1 });

    const barData = data.map((d) => ({
      month: d.month,
      sales: d.sales,
      revenue: d.revenue,
      orders: d.orders,
    }));

    res.json({ success: true, data: barData });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Get pie chart data (breakdown by category)
// @route   GET /api/analytics/pie
// @access  Private
const getPieData = async (req, res) => {
  try {
    const data = await Analytics.find();

    const totalSales = data.reduce((sum, d) => sum + d.sales, 0);
    const totalOrders = data.reduce((sum, d) => sum + d.orders, 0);
    const totalNewUsers = data.reduce((sum, d) => sum + d.newUsers, 0);
    const totalRevenue = data.reduce((sum, d) => sum + d.revenue, 0);

    const pieData = [
      { name: 'Sales', value: totalSales, color: '#6366f1' },
      { name: 'Orders', value: totalOrders, color: '#22d3ee' },
      { name: 'New Users', value: totalNewUsers, color: '#f59e0b' },
      { name: 'Revenue (÷100)', value: Math.round(totalRevenue / 100), color: '#10b981' },
    ];

    res.json({ success: true, data: pieData });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Get recent activities
// @route   GET /api/analytics/activities
// @access  Private
const getActivities = async (req, res) => {
  try {
    const { search = '' } = req.query;

    const query = search
      ? {
          $or: [
            { user: { $regex: search, $options: 'i' } },
            { action: { $regex: search, $options: 'i' } },
            { status: { $regex: search, $options: 'i' } },
          ],
        }
      : {};

    const activities = await Activity.find(query)
      .sort({ createdAt: -1 })
      .limit(20);

    res.json({ success: true, data: activities });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = { getSummary, getChartData, getPieData, getActivities };
