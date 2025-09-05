import { useState, useEffect, useRef } from "react";
import { Button } from "./ui/button";
import { ArrowLeft } from "lucide-react";

type MoodEntry = {
  date: string;
  mood: string;
  diary: string;
  drawing?: string;
};

export function MoodTracker({ onClose }: { onClose: () => void }) {
  const today = new Date().toISOString().split("T")[0];
  const [entries, setEntries] = useState<Record<string, MoodEntry>>({});
  const [mood, setMood] = useState("");
  const [diary, setDiary] = useState("");
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [isDrawing, setIsDrawing] = useState(false);

  // Brush settings
  const [brushColor, setBrushColor] = useState("#000000");
  const [brushSize, setBrushSize] = useState(3);
  const [eraserMode, setEraserMode] = useState(false);

  // Load saved entries
  useEffect(() => {
    const saved = localStorage.getItem("moodEntries");
    if (saved) {
      const parsed = JSON.parse(saved);
      setEntries(parsed);

      if (parsed[today]) {
        setMood(parsed[today].mood);
        setDiary(parsed[today].diary);

        if (parsed[today].drawing && canvasRef.current) {
          const ctx = canvasRef.current.getContext("2d");
          const img = new Image();
          img.src = parsed[today].drawing;
          img.onload = () => ctx?.drawImage(img, 0, 0);
        }
      }
    }
  }, []);

  // Save today's entry
  const saveEntry = () => {
    let drawingData = "";
    if (canvasRef.current) {
      drawingData = canvasRef.current.toDataURL();
    }

    const updated = {
      ...entries,
      [today]: { date: today, mood, diary, drawing: drawingData },
    };
    setEntries(updated);
    localStorage.setItem("moodEntries", JSON.stringify(updated));
  };

  // Drawing logic
  const startDrawing = (e: React.MouseEvent) => {
    setIsDrawing(true);
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.beginPath();
    ctx.moveTo(e.nativeEvent.offsetX, e.nativeEvent.offsetY);
  };

  const draw = (e: React.MouseEvent) => {
    if (!isDrawing) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.lineCap = "round";
    ctx.lineWidth = brushSize;

    if (eraserMode) {
      ctx.globalCompositeOperation = "destination-out"; // erase
      ctx.lineTo(e.nativeEvent.offsetX, e.nativeEvent.offsetY);
      ctx.stroke();
    } else {
      ctx.globalCompositeOperation = "source-over"; // draw normally
      ctx.strokeStyle = brushColor;
      ctx.lineTo(e.nativeEvent.offsetX, e.nativeEvent.offsetY);
      ctx.stroke();
    }
  };

  const stopDrawing = () => {
    setIsDrawing(false);
  };

  const clearCanvas = () => {
    if (!canvasRef.current) return;
    const ctx = canvasRef.current.getContext("2d");
    ctx?.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
  };

  const history = Object.values(entries).sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  return (
    <div className="p-6 max-w-3xl mx-auto">
      {/* Back Button */}
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

      <h1 className="text-2xl font-bold mb-6">Mood Tracker</h1>

      {/* Today's Entry */}
      <section className="mb-10">
        <h2 className="text-xl font-semibold mb-3">Today ({today})</h2>

        {/* Mood Picker */}
        <div className="mb-4">
          <h3 className="font-semibold mb-2">How are you feeling?</h3>
          <div className="flex gap-2 text-2xl">
            {["😊", "😐", "😢", "😡", "🤩"].map((emoji) => (
              <button
                key={emoji}
                onClick={() => setMood(emoji)}
                className={`p-2 border rounded ${
                  mood === emoji ? "bg-blue-500 text-white" : ""
                }`}
              >
                {emoji}
              </button>
            ))}
          </div>
        </div>

        {/* Diary */}
        <div className="mb-4">
          <h3 className="font-semibold mb-2">Write your diary</h3>
          <textarea
            value={diary}
            onChange={(e) => setDiary(e.target.value)}
            className="w-full border px-3 py-2 rounded h-32 bg-input-background dark:bg-gray-800 dark:text-white"
          />
        </div>

        {/* Drawing Pad */}
        <div className="mb-4">
          <h3 className="font-semibold mb-2">Draw your thoughts</h3>

          {/* Controls */}
          <div className="flex items-center gap-4 mb-3 flex-wrap">
            <input
              type="color"
              value={brushColor}
              onChange={(e) => setBrushColor(e.target.value)}
              className="w-10 h-10 border rounded"
              disabled={eraserMode}
            />
            {["#000000", "#ff0000", "#00ff00", "#0000ff", "#ffff00"].map(
              (c) => (
                <button
                  key={c}
                  onClick={() => setBrushColor(c)}
                  className="w-8 h-8 rounded-full border"
                  style={{ backgroundColor: c }}
                  disabled={eraserMode}
                />
              )
            )}
            <label className="flex items-center gap-2">
              Size:
              <input
                type="range"
                min={1}
                max={20}
                value={brushSize}
                onChange={(e) => setBrushSize(parseInt(e.target.value))}
              />
            </label>
            <Button
              variant={eraserMode ? "destructive" : "outline"}
              onClick={() => setEraserMode(!eraserMode)}
            >
              {eraserMode ? "Eraser On" : "Eraser Off"}
            </Button>
          </div>

          <canvas
            ref={canvasRef}
            width={500}
            height={300}
            className="border rounded bg-white dark:bg-gray-900"
            onMouseDown={startDrawing}
            onMouseMove={draw}
            onMouseUp={stopDrawing}
            onMouseLeave={stopDrawing}
          />
          <div className="mt-2 flex gap-2">
            <Button onClick={clearCanvas} variant="destructive">
              Clear Drawing
            </Button>
          </div>
        </div>

        <Button onClick={saveEntry} className="bg-green-600 hover:bg-green-700">
          Save Entry
        </Button>
      </section>

      {/* History */}
      <section>
        <h2 className="text-xl font-semibold mb-4">History</h2>
        <div className="space-y-6 max-h-[400px] overflow-y-auto pr-2">
          {history.length === 0 && <p className="text-gray-500">No history yet.</p>}
          {history.map((entry) => (
            <div
              key={entry.date}
              className="border rounded-lg p-4 bg-muted dark:bg-gray-800"
            >
              <h3 className="font-bold text-lg mb-2">
                {entry.date} — {entry.mood || "No mood set"}
              </h3>
              {entry.diary && <p className="mb-2 whitespace-pre-wrap">{entry.diary}</p>}
              {entry.drawing && (
                <img
                  src={entry.drawing}
                  alt={`Drawing on ${entry.date}`}
                  className="w-full max-w-md border rounded"
                />
              )}
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
