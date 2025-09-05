import { useState, useEffect } from "react";
import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { ChevronLeft, ChevronRight, Plus, ArrowLeft, X } from "lucide-react";

const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

export default function CalendarApp({ onClose }: { onClose: () => void }) {
  const today = new Date();
  const [currentMonth, setCurrentMonth] = useState(today.getMonth());
  const [currentYear, setCurrentYear] = useState(today.getFullYear());
  const [events, setEvents] = useState<{ date: string; title: string }[]>([]);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);

  // Load saved events
  useEffect(() => {
    const saved = localStorage.getItem("calendar-events");
    if (saved) {
      setEvents(JSON.parse(saved));
    }
  }, []);

  // Save events whenever they change
  useEffect(() => {
    localStorage.setItem("calendar-events", JSON.stringify(events));
  }, [events]);

  // 🔢 Get first + last days
  const firstDayOfMonth = new Date(currentYear, currentMonth, 1);
  const lastDayOfMonth = new Date(currentYear, currentMonth + 1, 0);

  const prevMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear((y) => y - 1);
    } else {
      setCurrentMonth((m) => m - 1);
    }
  };

  const nextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear((y) => y + 1);
    } else {
      setCurrentMonth((m) => m + 1);
    }
  };

  const handleAddEvent = () => {
    if (!selectedDate) return;
    const title = prompt("Enter event name:");
    if (title) {
      setEvents([...events, { date: selectedDate, title }]);
    }
  };

  const handleDeleteEvent = (date: string, index: number) => {
    const updated = events.filter(
      (e, i) => !(e.date === date && i === index)
    );
    setEvents(updated);
  };

  const days: (number | null)[] = [];
  // Fill blanks before start of month
  for (let i = 0; i < firstDayOfMonth.getDay(); i++) {
    days.push(null);
  }
  // Fill actual days
  for (let i = 1; i <= lastDayOfMonth.getDate(); i++) {
    days.push(i);
  }

  return (
    <div
      className="p-6 shadow-lg rounded-2xl flex-1
                 bg-white/20 border border-white/30
                 backdrop-blur-xl backdrop-saturate-150
                 text-gray-900 dark:text-gray-100
                 dark:bg-black/30 dark:border-white/10"
    >
      {/* 🔙 Back / Close Button */}
      <div className="mb-4">
        <Button
          variant="ghost"
          onClick={onClose}
          className="flex items-center gap-2"
        >
          <ArrowLeft className="h-4 w-4" />
          Back
        </Button>
      </div>

      <Card
        className="p-6 shadow-lg rounded-2xl flex-1
                   bg-white/30 dark:bg-black/30
                   border border-white/30 dark:border-white/10
                   backdrop-blur-md"
      >
        {/* 🔼 Month Header */}
        <div className="flex items-center justify-between mb-6">
          <Button variant="ghost" onClick={prevMonth}>
            <ChevronLeft />
          </Button>
          <h2 className="text-xl font-bold">
            {new Date(currentYear, currentMonth).toLocaleString("default", {
              month: "long",
            })}{" "}
            {currentYear}
          </h2>
          <Button variant="ghost" onClick={nextMonth}>
            <ChevronRight />
          </Button>
        </div>

        {/* 📅 Weekday row */}
        <div className="grid grid-cols-7 gap-2 text-center font-medium mb-2">
          {daysOfWeek.map((day) => (
            <div key={day}>{day}</div>
          ))}
        </div>

        {/* 📆 Dates grid */}
        <div className="grid grid-cols-7 gap-2">
          {days.map((day, idx) => {
            const dateStr =
              day !== null
                ? `${currentYear}-${currentMonth + 1}-${day}`
                : null;

            const isToday =
              day &&
              day === today.getDate() &&
              currentMonth === today.getMonth() &&
              currentYear === today.getFullYear();

            const hasEvent = dateStr
              ? events.some((e) => e.date === dateStr)
              : false;

            return (
              <button
                key={idx}
                onClick={() => dateStr && setSelectedDate(dateStr)}
                className={`h-20 border rounded-lg flex flex-col justify-between p-1 transition ${
                  day
                    ? "hover:bg-accent/40 dark:hover:bg-accent/20"
                    : "bg-transparent cursor-default border-none"
                } ${
                  isToday
                    ? "border-blue-500"
                    : "border-gray-300 dark:border-gray-700"
                } ${
                  selectedDate === dateStr
                    ? "bg-blue-100 dark:bg-blue-900/40"
                    : ""
                }`}
              >
                <span className="text-sm">{day ?? ""}</span>
                {hasEvent && (
                  <span className="text-xs bg-blue-500 text-white rounded px-1">
                    Event
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* ➕ Event Manager */}
        {selectedDate && (
          <div className="mt-6">
            <h3 className="font-semibold mb-2">
              Events on {selectedDate}:
            </h3>
            <ul className="space-y-1">
              {events
                .filter((e) => e.date === selectedDate)
                .map((e, i) => (
                  <li
                    key={i}
                    className="flex justify-between items-center 
                               bg-gray-100 dark:bg-gray-800 
                               rounded px-2 py-1 text-sm"
                  >
                    <span>{e.title}</span>
                    <button
                      onClick={() => handleDeleteEvent(selectedDate, i)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </li>
                ))}
            </ul>
            <Button onClick={handleAddEvent} className="mt-2">
              <Plus className="h-4 w-4 mr-2" /> Add Event
            </Button>
          </div>
        )}
      </Card>
    </div>
  );
}

