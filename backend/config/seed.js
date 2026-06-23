const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config({ path: '../.env' });

const User = require('../models/User');
const Analytics = require('../models/Analytics');
const Activity = require('../models/Activity');

const analyticsData = [
  { month: 'Jan', year: 2024, sales: 400, revenue: 24000, orders: 120, newUsers: 45 },
  { month: 'Feb', year: 2024, sales: 300, revenue: 18000, orders: 98, newUsers: 38 },
  { month: 'Mar', year: 2024, sales: 600, revenue: 36000, orders: 180, newUsers: 72 },
  { month: 'Apr', year: 2024, sales: 800, revenue: 48000, orders: 240, newUsers: 91 },
  { month: 'May', year: 2024, sales: 500, revenue: 30000, orders: 150, newUsers: 65 },
  { month: 'Jun', year: 2024, sales: 900, revenue: 54000, orders: 270, newUsers: 110 },
  { month: 'Jul', year: 2024, sales: 1100, revenue: 66000, orders: 330, newUsers: 145 },
  { month: 'Aug', year: 2024, sales: 850, revenue: 51000, orders: 255, newUsers: 98 },
  { month: 'Sep', year: 2024, sales: 700, revenue: 42000, orders: 210, newUsers: 87 },
  { month: 'Oct', year: 2024, sales: 950, revenue: 57000, orders: 285, newUsers: 120 },
  { month: 'Nov', year: 2024, sales: 1200, revenue: 72000, orders: 360, newUsers: 160 },
  { month: 'Dec', year: 2024, sales: 1500, revenue: 90000, orders: 450, newUsers: 200 },
];

const activitiesData = [
  { user: 'Rahul Sharma', action: 'Purchased Pro Plan', type: 'sale', amount: 1999, status: 'completed' },
  { user: 'Priya Patel', action: 'New signup', type: 'signup', amount: null, status: 'completed' },
  { user: 'Amit Kumar', action: 'Placed Order #1042', type: 'order', amount: 599, status: 'pending' },
  { user: 'Sneha Reddy', action: 'Requested Refund', type: 'refund', amount: 299, status: 'refunded' },
  { user: 'Vikram Singh', action: 'Purchased Basic Plan', type: 'sale', amount: 499, status: 'completed' },
  { user: 'Ananya Gupta', action: 'New signup', type: 'signup', amount: null, status: 'completed' },
  { user: 'Ravi Verma', action: 'Placed Order #1043', type: 'order', amount: 1299, status: 'completed' },
  { user: 'Meera Joshi', action: 'Purchased Enterprise Plan', type: 'sale', amount: 4999, status: 'completed' },
  { user: 'Suresh Nair', action: 'Placed Order #1044', type: 'order', amount: 899, status: 'failed' },
  { user: 'Deepika Rao', action: 'New signup', type: 'signup', amount: null, status: 'completed' },
  { user: 'Arjun Mehta', action: 'Purchased Pro Plan', type: 'sale', amount: 1999, status: 'completed' },
  { user: 'Kavya Iyer', action: 'Placed Order #1045', type: 'order', amount: 749, status: 'pending' },
  { user: 'Naveen Pillai', action: 'Requested Refund', type: 'refund', amount: 499, status: 'refunded' },
  { user: 'Sunita Bose', action: 'New signup', type: 'signup', amount: null, status: 'completed' },
  { user: 'Rohit Tiwari', action: 'Placed Order #1046', type: 'order', amount: 2499, status: 'completed' },
];

const seedDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/insightlite');
    console.log('✅ Connected to MongoDB');

    // Clear existing data
    await Analytics.deleteMany();
    await Activity.deleteMany();
    console.log('🗑️  Cleared existing analytics and activity data');

    // Insert sample data
    await Analytics.insertMany(analyticsData);
    console.log('📊 Inserted analytics data');

    await Activity.insertMany(activitiesData);
    console.log('📋 Inserted activity data');

    // Create a demo admin user if not exists
    const existingAdmin = await User.findOne({ email: 'admin@insightlite.com' });
    if (!existingAdmin) {
      await User.create({
        name: 'Admin User',
        email: 'admin@insightlite.com',
        password: 'admin123',
        role: 'admin',
      });
      console.log('👤 Created demo admin user: admin@insightlite.com / admin123');
    }

    console.log('\n✨ Database seeded successfully!');
    console.log('📧 Demo login: admin@insightlite.com');
    console.log('🔑 Password: admin123');
    process.exit(0);
  } catch (error) {
    console.error('❌ Seeding error:', error.message);
    process.exit(1);
  }
};

seedDatabase();
