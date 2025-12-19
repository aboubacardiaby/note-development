import { Link } from 'react-router-dom';

export const Header = () => {
  return (
    <header className="sticky top-0 z-50 glass shadow-soft border-b border-white border-opacity-20 animate-fade-in">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <Link to="/" className="flex items-center gap-3 group">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-primary-600 to-accent-600 rounded-lg blur-sm opacity-50 group-hover:opacity-75 transition-opacity" />
              <h1 className="relative text-2xl font-bold gradient-text px-2">NoteDevelopment</h1>
            </div>
            <span className="text-sm text-dark-500 group-hover:text-dark-700 transition-colors">
              AI-Powered Meeting Notes
            </span>
          </Link>

          <nav className="flex space-x-2">
            <Link
              to="/notes"
              className="px-4 py-2 rounded-lg text-sm font-medium text-dark-700 hover:text-primary-600 hover:bg-white hover:bg-opacity-60 hover:shadow-soft transition-all duration-200 hover:-translate-y-0.5"
            >
              Notes
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
};
