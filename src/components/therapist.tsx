import React, { useState } from 'react';
import { Button } from "./ui/button";
import { ArrowLeft } from "lucide-react";
import { responsePatterns, defaultResponses } from "./therapistResponses";

interface TherapistChatbotProps {
  onClose?: () => void;
}

const TherapistChatbot: React.FC<TherapistChatbotProps> = ({ onClose }) => {
  const [demand, setDemand] = useState('');
  const [messages, setMessages] = useState<{ sender: string; text: string }[]>([]);
  const [loading, setLoading] = useState(false);

  const getSemiAIResponse = (input: string): Promise<string> => {
    return new Promise(resolve => {
      setTimeout(() => {
        const lowerInput = input.toLowerCase();
        for (const pattern of responsePatterns) {
          if (pattern.keywords.some(kw => lowerInput.includes(kw))) {
            const reply = pattern.responses[Math.floor(Math.random() * pattern.responses.length)];
            return resolve(reply);
          }
        }
        const reply = defaultResponses[Math.floor(Math.random() * defaultResponses.length)];
        resolve(reply);
      }, 900);
    });
  };

  const handleSend = async () => {
    if (!demand.trim()) return;
    setMessages(prev => [...prev, { sender: 'user', text: demand }]);
    setLoading(true);

    const response = await getSemiAIResponse(demand);
    setMessages(prev => [...prev, { sender: 'therapist', text: response }]);

    setDemand('');
    setLoading(false);
  };

  return (
    <div className="p-6 max-w-xl mx-auto">
      <div className="mb-4">
        <Button variant="ghost" onClick={onClose} className="flex items-center gap-2">
          <ArrowLeft className="h-4 w-4" />
          Back
        </Button>
      </div>

      <div className="max-w-md mx-auto p-5 rounded-lg border dark:border-gray-700 bg-white dark:bg-gray-800">
        <h2 className="text-xl font-semibold mb-3 text-gray-900 dark:text-gray-100">Therapist Chatbot</h2>

        <div className="min-h-[150px] mb-3 p-3 rounded bg-gray-100 dark:bg-gray-900 overflow-y-auto max-h-72">
          {messages.map((msg, idx) => (
            <div
              key={idx}
              className={`mb-2 text-sm ${msg.sender === 'user' ? 'text-right' : 'text-left'}`}
            >
              <strong className="mr-1">{msg.sender === 'user' ? 'You' : 'Therapist'}:</strong>
              <span className="text-gray-800 dark:text-gray-200">{msg.text}</span>
            </div>
          ))}
          {loading && <div className="italic text-gray-500 dark:text-gray-400">Therapist is typing...</div>}
        </div>

        <div className="flex gap-2">
          <input
            type="text"
            value={demand}
            onChange={e => setDemand(e.target.value)}
            placeholder="Describe your demand..."
            className="flex-1 px-3 py-2 border rounded dark:border-gray-700 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-primary"
            disabled={loading}
          />
          <button
            onClick={handleSend}
            disabled={loading || !demand.trim()}
            className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default TherapistChatbot;
