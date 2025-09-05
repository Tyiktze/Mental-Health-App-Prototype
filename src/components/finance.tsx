import { useState, useEffect } from "react";
import { Button } from "./ui/button";
import { ArrowLeft, X } from "lucide-react";

type Record = { id: number; title: string; amount: number };

export function FinanceApp({ onClose }: { onClose: () => void }) {
  const [records, setRecords] = useState<Record[]>([]);
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");

  // Load saved data on mount
  useEffect(() => {
    const saved = localStorage.getItem("financeRecords");
    if (saved) {
      setRecords(JSON.parse(saved));
    }
  }, []);

  // Save data whenever records change
  useEffect(() => {
    localStorage.setItem("financeRecords", JSON.stringify(records));
  }, [records]);

  const addRecord = () => {
    if (title.trim() && amount.trim()) {
      setRecords([
        ...records,
        { id: Date.now(), title, amount: parseFloat(amount) },
      ]);
      setTitle("");
      setAmount("");
    }
  };

  const deleteRecord = (id: number) => {
    setRecords(records.filter((r) => r.id !== id));
  };

  const total = records.reduce((sum, r) => sum + r.amount, 0);

  return (
    <div className="p-6 max-w-xl mx-auto">
      {/* 🔙 Back Button */}
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

      <h1 className="text-2xl font-bold mb-4">Financial Records</h1>

      <div className="flex gap-2 mb-4">
        <input
          type="text"
          placeholder="Description"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="flex-1 border px-3 py-2 rounded bg-input-background dark:bg-gray-800 dark:text-white"
        />
        <input
          type="number"
          placeholder="Amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="w-32 border px-3 py-2 rounded bg-input-background dark:bg-gray-800 dark:text-white"
        />
        <button
          onClick={addRecord}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Add
        </button>
      </div>

      <div className="mb-4">
        <h2 className="text-lg font-semibold">Total: ${total.toFixed(2)}</h2>
      </div>

      <ul className="space-y-2">
        {records.map((record) => (
          <li
            key={record.id}
            className="flex justify-between items-center border-b pb-1 text-sm"
          >
            <span>{record.title}</span>
            <span>${record.amount.toFixed(2)}</span>
            <button
              onClick={() => deleteRecord(record.id)}
              className="text-red-500 hover:text-red-700 ml-2"
            >
              <X className="h-4 w-4" />
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
