// Shared temporary storage for development
import { Event } from "@/types/events";

export const tempEvents: Event[] = [
  {
    id: 1,
    title: "Tech Conference 2025",
    description:
      "A comprehensive technology conference featuring the latest innovations in AI, web development, and cloud computing. Join industry leaders and networking opportunities.",
    date: "2025-12-15T10:00:00Z",
    location: "Convention Center, New York",
    status: "upcoming",
    created_at: "2025-09-01T10:00:00Z",
    updated_at: "2025-09-01T10:00:00Z",
  },
  {
    id: 2,
    title: "Team Building Workshop",
    description:
      "Interactive workshop designed to strengthen team collaboration and communication skills through fun activities and exercises.",
    date: "2025-10-20T14:30:00Z",
    location: "Company Headquarters",
    status: "upcoming",
    created_at: "2025-09-02T10:00:00Z",
    updated_at: "2025-09-02T10:00:00Z",
  },
  {
    id: 3,
    title: "Product Launch Meetup",
    description:
      "Exclusive preview of our new product line with demonstrations, Q&A sessions, and networking with fellow professionals.",
    date: "2025-08-15T09:00:00Z",
    location: "Downtown Event Space",
    status: "completed",
    created_at: "2025-08-01T10:00:00Z",
    updated_at: "2025-08-16T10:00:00Z",
  },
  {
    id: 4,
    title: "Summer Networking Event",
    description:
      "Casual outdoor networking event with food, drinks, and great conversations. Perfect for making new professional connections.",
    date: "2025-07-10T18:00:00Z",
    location: "Central Park Pavilion",
    status: "completed",
    created_at: "2025-07-01T10:00:00Z",
    updated_at: "2025-07-11T10:00:00Z",
  },
];

export function addEvent(
  event: Omit<Event, "id" | "created_at" | "updated_at"> & { id?: number }
) {
  const now = new Date().toISOString();
  const newEvent: Event = {
    id: event.id || Date.now(),
    title: event.title,
    description: event.description,
    date: event.date,
    location: event.location,
    status: event.status || "upcoming",
    created_at: now,
    updated_at: now,
  };
  tempEvents.push(newEvent);
  return newEvent;
}

export function updateEvent(
  id: number,
  updates: Partial<Omit<Event, "id" | "created_at">>
) {
  const index = tempEvents.findIndex((event) => event.id === id);
  if (index !== -1) {
    tempEvents[index] = {
      ...tempEvents[index],
      ...updates,
      updated_at: new Date().toISOString(),
    };
    return tempEvents[index];
  }
  return null;
}

export function removeEvent(id: number) {
  const index = tempEvents.findIndex((event) => event.id === id);
  if (index !== -1) {
    tempEvents.splice(index, 1);
    return true;
  }
  return false;
}

export function getEvents() {
  return tempEvents;
}

export function getEventById(id: number) {
  return tempEvents.find((event) => event.id === id);
}
