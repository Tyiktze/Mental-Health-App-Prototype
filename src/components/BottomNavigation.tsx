import { useState, useEffect } from "react";
import { DoorClosed, Plus, Settings, MoreHorizontal } from "lucide-react";
import { Button } from "./ui/button";
import { useTranslation } from "react-i18next";
import { Navigation } from "./Navigation";

import FunctionPanel from "./FunctionPanel";
import { Settings as SettingsPanel } from "./Settings";
import { More } from "./More";
import { AddModal } from "./AddModal";
import { AppCatalog } from "./AppCatalog";

// Import your actual apps
import CalendarApp from "./calendarApp";
import { FinanceApp } from "./finance";
import { MoodTracker } from "./MoodTracker";
import TherapistChatbot from "./therapist";

export function BottomNavigation() {
  const { t, i18n } = useTranslation();
  const [language, setLanguage] = useState(i18n.language || "en");

  const [activeTab, setActiveTab] = useState("home");
  const [isAddOpen, setIsAddOpen] = useState(false);

  // ✅ Persisted apps
  const [apps, setApps] = useState<
    { id: number; name: string; icon?: React.ReactNode }[]
  >([]);

  // ✅ Load saved apps from localStorage
  useEffect(() => {
    const saved = localStorage.getItem("userApps");
    if (saved) {
      try {
        const parsed = JSON.parse(saved);

        // Rebuild with proper icons from AppCatalog
        const restored = parsed
          .map((id: number) => AppCatalog.find((a) => a.id === id))
          .filter(Boolean);

        setApps(restored as typeof apps);
      } catch {
        console.error("Failed to parse userApps");
      }
    }
  }, []);

  // ✅ Save apps whenever they change
  useEffect(() => {
    const ids = apps.map((a) => a.id);
    localStorage.setItem("userApps", JSON.stringify(ids));
  }, [apps]);

  // ✅ Track currently open app
  const [activeApp, setActiveApp] = useState<string | null>(null);

  // ✅ Add app from modal
  const handleAddApp = (appName: string) => {
    const appDef = AppCatalog.find((a) => a.name === appName);
    if (!appDef) return;

    if (apps.some((a) => a.id === appDef.id)) return; // prevent duplicates

    setApps((prev) => [...prev, appDef]);
  };

  // Delete app from FunctionPanel
  const handleDeleteApp = (id: number) => {
    setApps((prev) => prev.filter((a) => a.id !== id));
  };

  // Render app full screen if opened
  if (activeApp) {
    if (activeApp === "Calendar") {
      return <CalendarApp onClose={() => setActiveApp(null)} />;
    }
    if (activeApp === "Financial") {
      return <FinanceApp onClose={() => setActiveApp(null)} />;
    }
    if (activeApp === "Mood Tracker") {
      return <MoodTracker onClose={() => setActiveApp(null)} />;
    }
    if (activeApp === "Therapist") {
      return <TherapistChatbot onClose={() => setActiveApp(null)} />;
    }

    return (
      <div className="p-6">
        <h2 className="text-2xl font-bold">{activeApp}</h2>
        <p>This app isn’t implemented yet.</p>
        <Button onClick={() => setActiveApp(null)} className="mt-4">
          Close
        </Button>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen">
      {/* ----------- Main Content Area ----------- */}
      <div className="flex-1 overflow-y-auto">
        {activeTab === "home" && (
          <FunctionPanel
            apps={apps}
            onDelete={handleDeleteApp}
            onOpen={(name) => setActiveApp(name)} // ✅ open app
          />
        )}
        {activeTab === "settings" && <SettingsPanel />}
        {activeTab === "more" && <More />}
      </div>
      
      {/* ----------- Add Modal ----------- */}
      <AddModal
        isOpen={isAddOpen}
        onClose={() => setIsAddOpen(false)}
        onAdd={handleAddApp}
      />

      {/* ----------- Bottom Nav ----------- */}
      <div className="fixed bottom-0 left-0 right-0 bg-background border-t border-border">
        <div className="max-w-7xl mx-auto px-4 py-3">
          <div className="flex items-center justify-around">
            {/* Home */}
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setActiveTab("home")}
              className={`flex flex-col gap-1 h-auto py-2 ${
                activeTab === "home" ? "text-primary" : ""
              }`}
            >
              <DoorClosed className="h-5 w-5" />
              <span className="text-xs">{t("bottom.home")}</span>
            </Button>

            {/* Add */}
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsAddOpen(true)}
              className="flex flex-col gap-1 h-auto py-2"
            >
              <Plus className="h-5 w-5" />
              <span className="text-xs">{t("bottom.add")}</span>
            </Button>

            {/* Settings */}
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setActiveTab("settings")}
              className={`flex flex-col gap-1 h-auto py-2 ${
                activeTab === "settings" ? "text-primary" : ""
              }`}
            >
              <Settings className="h-5 w-5" />
              <span className="text-xs">{t("bottom.settings")}</span>
            </Button>

            {/* More */}
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setActiveTab("more")}
              className={`flex flex-col gap-1 h-auto py-2 ${
                activeTab === "more" ? "text-primary" : ""
              }`}
            >
              <MoreHorizontal className="h-5 w-5" />
              <span className="text-xs">{t("bottom.more")}</span>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
