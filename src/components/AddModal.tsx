import { Dialog } from "@headlessui/react";
import { Button } from "./ui/button";
import { AppCatalog } from "./AppCatalog";
import { useTranslation } from "react-i18next";
import { useState } from "react";
import { Animated } from "./Animated";

interface AddModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (appName: string) => void;
}

export function AddModal({ isOpen, onClose, onAdd }: AddModalProps) {
  const { t, i18n } = useTranslation();
  const [language, setLanguage] = useState(i18n.language || "en");

  return (
    <Dialog open={isOpen} onClose={onClose} className="relative z-50">
      {/* Overlay */}
      <div className="fixed inset-0 bg-black/30" aria-hidden="true" />

      {/* Centered panel */}
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <Animated>
          <div className="bg-white dark:bg-card rounded-lg p-6 w-full max-w-sm shadow-lg">
            <h2 className="text-lg font-medium mb-4">{t("addModal.addNew")}</h2>

            {/* App Picker */}
            <div className="grid grid-cols-2 gap-4">
              {AppCatalog.map((app) => (
                <button
                  key={app.id}
                  onClick={() => {
                    onAdd(app.name);
                    onClose();
                  }}
                  className="flex flex-col items-center p-4 border rounded-lg hover:bg-accent transition"
                >
                  {/* Icon */}
                  <div className="h-16 w-16 flex items-center justify-center">
                    {app.icon}
                  </div>

                  {/* Name */}
                  <span className="mt-2 text-sm font-medium text-center">
                    {app.name}
                  </span>
                </button>
              ))}
            </div>

            {/* Cancel button */}
            <div className="flex justify-end mt-6">
              <Button variant="ghost" onClick={onClose}>
                {t("addModal.cancel")}
              </Button>
            </div>
          </div>
        </Animated>
      </div>
    </Dialog>
  );
}
