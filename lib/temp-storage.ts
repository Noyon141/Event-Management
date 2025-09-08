// Shared temporary storage for development
export let tempEvents: any[] = [
  {
    id: 1,
    title: "Sample Event",
    description: "This is a sample event for testing",
    date: "2025-01-15T10:00:00",
    location: "Conference Room A",
  },
];

export function addEvent(event: any) {
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
