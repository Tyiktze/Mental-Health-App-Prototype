import "./components/i18n";
import { useState, useEffect } from "react";
import { Navigation } from "./components/Navigation";
import { DailyQuotes } from "./components/DailyQuotes";
import { BottomNavigation } from "./components/BottomNavigation";
import CalendarApp from "./components/calendarApp";
import { Settings } from "./components/Settings";
import { FinanceApp } from "./components/finance";
import { MoodTracker } from "./components/MoodTracker";
import TherapistChatbot from "./components/therapist";

import LoginScreen from "./components/LoginScreen";
import Profile from "./components/Profile";


export default function App() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [openApp, setOpenApp] = useState<string | null>(null);
  const [user, setUser] = useState<{ username?: string } | null>(null);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [isDarkMode]);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  if (!user) {
    return (
      <LoginScreen
        onLogin={setUser}
        onGuest={() => setUser({ username: "Guest" })}
      />
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="max-w-7xl mx-auto">
        <Navigation
          isDarkMode={isDarkMode}
          toggleDarkMode={toggleDarkMode}
          onProfileClick={() => setOpenApp("Profile")}
          onLogout={() => setUser(null)}
          onOpenApp={(appName: string) => setOpenApp(appName)}
        />
        <DailyQuotes />
        <main className="flex-1 pb-20">
          {openApp === "Profile" && user ? (
            <Profile user={user} onClose={() => setOpenApp(null)} />
          ) : openApp === "Calendar" ? (
            <CalendarApp onClose={() => setOpenApp(null)} />
          ) : openApp === "Financial" ? (
            <FinanceApp onClose={() => setOpenApp(null)} />
          ) : openApp === "Mood Tracker" ? ( 
            <MoodTracker onClose={() => setOpenApp(null)} />
          ) : openApp === "Therapist" ? (
            <TherapistChatbot onClose={() => setOpenApp(null)} />
          ) : (
            <>
              
              <BottomNavigation setOpenApp={setOpenApp} />
            </>
          )}
        </main>
      </div>
      {/*
      <Settings 
        isOpen={isSettingsOpen} 
        onClose={() => setIsSettingsOpen(false)} 
      />
      */}
    </div>
  );
}
