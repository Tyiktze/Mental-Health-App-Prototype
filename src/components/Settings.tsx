import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Animated } from "./Animated";
import { Button } from './ui/button';
import { Sun, Moon } from 'lucide-react';

interface SettingsProps {
  isDarkMode: boolean;
  toggleDarkMode: () => void;
}

export function Settings({ isDarkMode, toggleDarkMode }: SettingsProps) {
  const [fontSize, setFontSize] = useState(14);
  const [notifications, setNotifications] = useState(true);
  const [compactMode, setCompactMode] = useState(false);

  const { t, i18n } = useTranslation();
  const [language, setLanguage] = useState(i18n.language || "en");

  return (
    <Animated>
      <div
        className="p-6 space-y-6 rounded-2xl shadow-xl
                   bg-white/30 dark:bg-black/30
                   border border-white/20 dark:border-white/10
                   backdrop-blur-md backdrop-saturate-150
                   max-w-md mx-auto"
      >
        <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-4">
           {t("settings")}
        </h2>

        {/* Font Size */}
        <div className="py-2">
          <label className="block mb-2 font-medium">{t("fontSize")}</label>
          <div className="flex items-center gap-3">
            <input
              type="range"
              min="12"
              max="20"
              value={fontSize}
              onChange={(e) => {
                const size = Number(e.target.value);
                setFontSize(size);
                document.documentElement.style.setProperty("--font-size", `${size}px`);
              }}
              className="w-full accent-blue-500"
            />
            <span className="text-sm">{fontSize}px</span>
          </div>
        </div>

        {/* Language */}
        <div className="py-2">
          <label className="block mb-2 font-medium">{t("language")}</label>
          <select
            value={language}
            onChange={(e) => {
              setLanguage(e.target.value);
              i18n.changeLanguage(e.target.value);
            }}
            className="border border-gray-300 dark:border-gray-600 
                       rounded-lg px-3 py-2 bg-white/50 dark:bg-gray-800/50 
                       focus:ring-2 focus:ring-blue-400 outline-none w-full"
          >
            <option value="en">English</option>
            <option value="zh">中文</option>
            <option value="es">Español</option>
            <option value="fr">Français</option>
          </select>
        </div>

        {/* Reset */}
        <div className="pt-4">
          <button
            onClick={() => {
              setFontSize(14);
              setLanguage("en");
              i18n.changeLanguage("en");
              setNotifications(true);
              setCompactMode(false);
            }}
            className="w-full py-2 rounded-xl
                       bg-red-500 hover:bg-red-600 
                       text-white text-center font-semibold transition"
          >
            {t("reset")}
          </button>
        </div>
      </div>
    </Animated>
  );
}
