export type Event = {
  id: number;
  title: string;
  description: string;
  date: string;
  location: string;
  status: "upcoming" | "completed" | "cancelled";
  created_at?: string;
  updated_at?: string;
};
