import { Link } from 'react-router-dom';

const NotFound = () => (
  <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center p-4">
    <div className="text-center">
      <p className="text-8xl font-bold text-primary-500 mb-4">404</p>
      <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Page Not Found</h1>
      <p className="text-gray-500 dark:text-gray-400 mb-6">
        The page you're looking for doesn't exist.
      </p>
      <Link to="/dashboard" className="btn-primary inline-block">
        Go to Dashboard
      </Link>
    </div>
  </div>
);

export default NotFound;
