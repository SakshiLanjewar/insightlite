import { useState } from 'react';
import Navbar from '../components/Navbar';
import { useToast } from '../components/Toast';
import { useAuth } from '../context/AuthContext';
import { getInitials, formatDate } from '../utils/helpers';
import api from '../utils/api';

const Profile = () => {
  const { user, updateUser } = useAuth();
  const { showToast, ToastContainer } = useToast();

  const [form, setForm] = useState({
    name: user?.name || '',
    email: user?.email || '',
    password: '',
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const payload = { name: form.name, email: form.email };
      if (form.password) payload.password = form.password;
      const res = await api.put('/users/profile', payload);
      updateUser(res.data.user);
      showToast('Profile updated successfully!', 'success');
      setForm((prev) => ({ ...prev, password: '' }));
    } catch (err) {
      showToast(err.response?.data?.message || 'Failed to update profile', 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <ToastContainer />
      <Navbar />

      <main className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">My Profile</h2>
          <p className="text-gray-500 dark:text-gray-400 mt-1 text-sm">
            Manage your personal information and account settings
          </p>
        </div>

        {/* Profile Header */}
        <div className="card mb-6">
          <div className="flex items-center gap-5">
            <div className="w-20 h-20 rounded-2xl bg-primary-500 flex items-center justify-center text-white text-2xl font-bold flex-shrink-0 shadow-lg">
              {getInitials(user?.name)}
            </div>
            <div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white">{user?.name}</h3>
              <p className="text-gray-500 dark:text-gray-400 text-sm">{user?.email}</p>
              <div className="flex items-center gap-2 mt-2">
                <span className={`inline-flex px-2.5 py-0.5 rounded-full text-xs font-semibold capitalize
                  ${user?.role === 'admin'
                    ? 'bg-primary-100 dark:bg-primary-500/10 text-primary-600 dark:text-primary-400'
                    : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400'
                  }`}>
                  {user?.role}
                </span>
                <span className="text-xs text-gray-400 dark:text-gray-500">
                  Member since {user?.createdAt ? formatDate(user.createdAt) : 'N/A'}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Edit Form */}
        <div className="card">
          <h4 className="text-base font-semibold text-gray-900 dark:text-white mb-5">
            Update Information
          </h4>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="label">Full Name</label>
              <input type="text" name="name" value={form.name} onChange={handleChange} className="input-field" placeholder="Your full name" />
            </div>
            <div>
              <label className="label">Email Address</label>
              <input type="email" name="email" value={form.email} onChange={handleChange} className="input-field" placeholder="your@email.com" />
            </div>
            <div>
              <label className="label">
                New Password{' '}
                <span className="text-gray-400 font-normal">(leave blank to keep current)</span>
              </label>
              <input type="password" name="password" value={form.password} onChange={handleChange} className="input-field" placeholder="Min. 6 characters" />
            </div>
            <div className="flex justify-end pt-2">
              <button type="submit" disabled={loading} className="btn-primary">
                {loading ? (
                  <span className="flex items-center gap-2">
                    <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Saving...
                  </span>
                ) : 'Save Changes'}
              </button>
            </div>
          </form>
        </div>

        {/* Account Details */}
        <div className="card mt-6">
          <h4 className="text-base font-semibold text-gray-900 dark:text-white mb-4">Account Details</h4>
          <dl className="space-y-3 text-sm">
            {[
              { label: 'User ID', value: user?.id },
              { label: 'Account Type', value: user?.role === 'admin' ? '⭐ Administrator' : '👤 Standard User' },
              { label: 'Joined', value: user?.createdAt ? formatDate(user.createdAt) : 'N/A' },
            ].map(({ label, value }) => (
              <div key={label} className="flex justify-between py-2 border-b border-gray-50 dark:border-gray-700 last:border-0">
                <dt className="text-gray-500 dark:text-gray-400">{label}</dt>
                <dd className="text-gray-800 dark:text-gray-200 font-medium font-mono text-xs sm:text-sm">{value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </main>
    </div>
  );
};

export default Profile;
