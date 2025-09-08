// Shared temporary storage for development
export const tempEvents: Array<{
  id: number;
  title: string;
  description: string;
  date: string;
  location: string;
  created_at?: string;
}> = [];

export function addEvent(event: {
  id: number;
  title: string;
  description: string;
  date: string;
  location: string;
  created_at?: string;
}) {
  tempEvents.push(event);
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
