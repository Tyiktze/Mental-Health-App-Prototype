import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";

export function DailyQuotes() {
  const { t } = useTranslation();

  const quotes = [
    { text: t("quotes.quote1"), author: "Steve Jobs" },
    { text: t("quotes.quote2"), author: "Theodore Roosevelt" },
    { text: t("quotes.quote3"), author: "Winston Churchill" },
    { text: t("quotes.quote4"), author: "Eleanor Roosevelt" },
    { text: t("quotes.quote5"), author: "Super idol" }
  ];

  const [currentQuote, setCurrentQuote] = useState(quotes[0]);

  useEffect(() => {
    const today = new Date();
    const dayOfYear = Math.floor(
      (today.getTime() - new Date(today.getFullYear(), 0, 0).getTime()) /
        1000 /
        60 /
        60 /
        24
    );
    const quoteIndex = dayOfYear % quotes.length;
    setCurrentQuote(quotes[quoteIndex]);
  }, [t]); // re-run when language changes

  return (
    <div className="p-6 border-t border-border bg">
      <h2 className="mb-4">{t("dailyQuotes")}</h2>
      <blockquote className="italic text-lg mb-2">
        "{currentQuote.text}"
      </blockquote>
      <cite className="text-muted-foreground">
        {t("quoteBy", { author: currentQuote.author })}
      </cite>
    </div>
  );
}
