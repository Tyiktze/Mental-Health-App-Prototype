import { useState, useEffect } from "react";
import { Card } from "./ui/card";
import { Star, X } from "lucide-react";
import { useTranslation, Trans } from "react-i18next";

export type App = {
  id: number;
  name: string;
  icon?: React.ReactNode;
};

export default function FunctionPanel({
  apps,
  onDelete,
  onOpen,
}: {
  apps: App[];
  onDelete: (id: number) => void;
  onOpen: (name: string) => void;
}) {
  const [favourites, setFavourites] = useState<number[]>([]);
  const { t, i18n } = useTranslation();
  const [language, setLanguage] = useState(i18n.language || "en");

  // Load favourites from localStorage
  useEffect(() => {
    const saved = localStorage.getItem("favouriteApps");
    if (saved) {
      setFavourites(JSON.parse(saved));
    }
  }, []);

  // Save favourites when changed
  useEffect(() => {
    localStorage.setItem("favouriteApps", JSON.stringify(favourites));
  }, [favourites]);

  const toggleFavourite = (id: number) => {
    setFavourites((prev) =>
      prev.includes(id) ? prev.filter((fav) => fav !== id) : [...prev, id]
    );
  };

  if (apps.length === 0) {
    return (
      <div className="p-6 text-center text-gray-500">
        <p className="text-lg">
          <Trans
            i18nKey="functionPanel.addNewApp"
            components={{ 1: <span className="font-semibold" /> }}
          />
        </p>
      </div>
    );
  }

  const sortedApps = [...apps].sort((a, b) => {
    const aFav = favourites.includes(a.id);
    const bFav = favourites.includes(b.id);
    if (aFav === bFav) return 0;
    return aFav ? -1 : 1;
  });

  return (
    <div className="p-6">
      <div className="flex flex-col gap-8">
        {sortedApps.map((app) => {
          const isFav = favourites.includes(app.id);
          return (
            <Card
              key={app.id}
              onClick={() => onOpen(app.name)}
              className="relative p-10 h-80 flex flex-col items-center justify-center border-2 border-dashed border-gray-300 hover:border-gray-400 transition-all cursor-pointer"
            >
              {/* ⭐ Favourite toggle */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  toggleFavourite(app.id);
                }}
                className="absolute top-3 left-3"
              >
                <Star
                  className={`h-6 w-6 ${
                    isFav ? "fill-yellow-400 text-yellow-400" : "text-gray-400"
                  }`}
                />
              </button>

              {/* ❌ Delete button */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onDelete(app.id);
                }}
                className="absolute top-3 right-3 text-gray-400 hover:text-red-500"
              >
                <X className="h-6 w-6" />
              </button>

              {app.icon}
              <h3 className="text-2xl font-semibold">{app.name}</h3>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
