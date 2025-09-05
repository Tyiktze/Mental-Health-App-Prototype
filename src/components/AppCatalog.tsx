import { CalendarDays, IdCard, Angry, DollarSign, MessageSquare, Smile } from "lucide-react";

export const AppCatalog = [
  {
    id: 1,
    name: "Therapist",
    icon: <MessageSquare className="h-16 w-16 stroke-1 mb-4 text-black-500 dark:text-white" />,
  },
  {
    id: 2,
    name: "Financial",
    icon: <IdCard className="h-16 w-16 stroke-1 mb-4 text-black-500 dark:text-white" />,
  },
  {
    id: 3,
    name: "Calendar",
    icon: <CalendarDays className="h-16 w-16 stroke-1 mb-4 text-black-500 dark:text-white" />,
      
  },
  {
    id: 4,
    name: "Mood Tracker",
    icon: <Smile className="h-20 w-20 stroke-1 mb-4 text-black-600 dark:text-white" />,
  },
];
