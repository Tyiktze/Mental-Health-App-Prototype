import { useState } from 'react';
import { Sun, Moon, Search, User, LogOut, Settings } from 'lucide-react';
import { Button } from './ui/button';
import { useTranslation } from "react-i18next";
import { AppCatalog } from './AppCatalog';
import type { App } from './FunctionPanel';

interface NavigationProps {
  isDarkMode: boolean;
  toggleDarkMode: () => void;
  onProfileClick: () => void;
  onLogout: () => void;
  onOpenApp: (appName: string) => void; // <- pass setActiveApp from BottomNavigation
}

export function Navigation({
  isDarkMode,
  toggleDarkMode,
  onProfileClick,
  onLogout,
  onOpenApp,
}: NavigationProps) {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [searchResults, setSearchResults] = useState<App[]>([]);
  const { t, i18n } = useTranslation();

  const handleSearchToggle = () => {
    setIsSearchOpen(prev => !prev);
    setIsProfileOpen(false);
  };

  const handleProfileToggle = () => {
    setIsProfileOpen(prev => !prev);
    setIsSearchOpen(false);
  };

  const handleSearch = (query: string) => {
    if (!query) return setSearchResults([]);
    const results = AppCatalog.filter(app =>
      app.name.toLowerCase().includes(query.toLowerCase())
    );
    setSearchResults(results);
  };

  return (
    <nav className="relative flex items-center justify-between p-4 border-b border-border bg-white dark:bg-black">
      {/* Left buttons */}
      <div className="flex items-center gap-2">
        {/* Dark mode toggle */}
        <Button
          variant="ghost"
          size="icon"
          className="rounded-full text-gray-700 dark:text-white"
          onClick={toggleDarkMode}
        >
          {isDarkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
        </Button>

        {/* Search */}
        <div className="relative">
          <Button
            variant="ghost"
            size="icon"
            className="rounded-full text-gray-700 dark:text-white"
            onClick={handleSearchToggle}
          >
            <Search className="h-5 w-5" />
          </Button>

          {isSearchOpen && (
            <div className="absolute left-0 mt-2 w-64 bg-white dark:bg-gray-800 border border-border rounded-xl shadow-lg p-2 z-50">
              <input
                type="text"
                placeholder={t("navigation.search") || "Search..."}
                className="w-full px-3 py-2 rounded-md border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-gray-100 focus:outline-none"
                onChange={(e) => handleSearch(e.target.value)}
              />

              {searchResults.length > 0 ? (
                <div className="mt-2 max-h-40 overflow-y-auto rounded-md border border-gray-200 dark:border-gray-700">
                  {searchResults.map(app => (
                    <div
                      key={app.id}
                      className="px-3 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer flex items-center gap-2"
                      onClick={() => {
                        onOpenApp(app.name); // ✅ opens the app
                        setIsSearchOpen(false);
                      }}
                    >
                      {app.icon}
                      <span className="flex-1">{app.name}</span>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="mt-2 text-sm text-gray-400 dark:text-gray-300">No results</p>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Profile */}
      <div className="relative">
        <Button
          variant="ghost"
          size="icon"
          className="rounded-full text-gray-700 dark:text-white"
          onClick={handleProfileToggle}
        >
          <User className="h-5 w-5" />
        </Button>
        {isProfileOpen && (
          <div className="absolute right-0 mt-2 bg-white dark:bg-gray-800 border border-border rounded-xl shadow-lg w-40 py-2">
            <button
              className="block w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
              onClick={() => {
                onProfileClick();
                setIsProfileOpen(false);
              }}
            >
              <Settings className="inline h-4 w-4 mr-2" /> {t("navigation.profile")}
            </button>
            <button
              className="block w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
              onClick={onLogout}
            >
              <LogOut className="inline h-4 w-4 mr-2" /> {t("navigation.logout")}
            </button>
          </div>
        )}
      </div>
    </nav>
  );
}
