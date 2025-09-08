"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { Event } from "@/types/events";
import { motion, Variants } from "framer-motion";
import {
  Calendar,
  CheckCircle,
  Clock,
  Edit3,
  MapPin,
  RefreshCw,
  Trash2,
  Users,
  XCircle,
} from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";

interface EventsContentProps {
  initialEvents?: Event[];
}

export default function EventsContent({
  initialEvents = [],
}: EventsContentProps) {
  const [events, setEvents] = useState<Event[]>(initialEvents);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchEvents = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await fetch("/api/events", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (response.ok) {
        const data = await response.json();
        setEvents(data);
      } else {
        const errorMessage = `Failed to fetch events: ${response.status}`;
        setError(errorMessage);
        toast.error(errorMessage);
      }
    } catch (error) {
      const errorMessage =
        "Unable to connect to server. Please check if the server is running.";
      console.error("Error fetching events:", error);
      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // Always fetch fresh data when component mounts
    fetchEvents();
  }, []);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return {
      date: date.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      }),
      time: date.toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };
  };

  const isUpcoming = (event: Event) => {
    const eventDate = new Date(event.date);
    const now = new Date();
    return (
      eventDate > now &&
      event.status !== "completed" &&
      event.status !== "cancelled"
    );
  };

  const isPast = (event: Event) => {
    const eventDate = new Date(event.date);
    const now = new Date();
    return eventDate <= now || event.status === "completed";
  };

  const upcomingEvents = events.filter((event) => isUpcoming(event));
  const pastEvents = events.filter((event) => isPast(event));

  const handleMarkCompleted = async (eventId: number) => {
    try {
      const response = await fetch(`/api/events/${eventId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status: "completed" }),
      });

      if (response.ok) {
        const { event: updatedEvent } = await response.json();
        setEvents(
          events.map((event) => (event.id === eventId ? updatedEvent : event))
        );
        toast.success("Event marked as completed");
      } else {
        toast.error("Failed to update event");
      }
    } catch (error) {
      console.error("Error updating event:", error);
      toast.error("Failed to update event");
    }
  };

  const handleCancelEvent = async (eventId: number) => {
    try {
      const response = await fetch(`/api/events/${eventId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status: "cancelled" }),
      });

      if (response.ok) {
        const { event: updatedEvent } = await response.json();
        setEvents(
          events.map((event) => (event.id === eventId ? updatedEvent : event))
        );
        toast.success("Event cancelled");
      } else {
        toast.error("Failed to cancel event");
      }
    } catch (error) {
      console.error("Error cancelling event:", error);
      toast.error("Failed to cancel event");
    }
  };

  const handleDeleteEvent = async (eventId: number) => {
    if (
      !confirm(
        "Are you sure you want to delete this event? This action cannot be undone."
      )
    ) {
      return;
    }

    try {
      const response = await fetch(`/api/events/${eventId}`, {
        method: "DELETE",
      });

      if (response.ok) {
        setEvents(events.filter((event) => event.id !== eventId));
        toast.success("Event deleted successfully");
      } else {
        toast.error("Failed to delete event");
      }
    } catch (error) {
      console.error("Error deleting event:", error);
      toast.error("Failed to delete event");
    }
  };

  const getStatusBadge = (event: Event) => {
    const eventDate = new Date(event.date);
    const now = new Date();

    if (event.status === "completed") {
      return (
        <Badge
          variant="default"
          className="bg-green-100 text-green-800 text-xs"
        >
          Completed
        </Badge>
      );
    }

    if (event.status === "cancelled") {
      return (
        <Badge variant="destructive" className="text-xs">
          Cancelled
        </Badge>
      );
    }

    if (eventDate > now) {
      return (
        <Badge variant="default" className="text-xs">
          Upcoming
        </Badge>
      );
    }

    return (
      <Badge variant="secondary" className="text-xs">
        Past
      </Badge>
    );
  };

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.6,
        staggerChildren: 0.1,
      },
    },
  };

  const cardVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.4,
        ease: [0.04, 0.62, 0.23, 0.98],
      },
    },
  };

  const statsVariants: Variants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.4,
        ease: [0.04, 0.62, 0.23, 0.98],
      },
    },
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="container mx-auto px-4 py-8"
    >
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <motion.div variants={cardVariants} className="text-center space-y-4">
          <div className="flex items-center justify-center gap-4">
            <div>
              <h1 className="text-4xl font-bold text-foreground">Events</h1>
              <p className="text-lg text-muted-foreground">
                Discover and manage your events
              </p>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={fetchEvents}
              disabled={loading}
              className="ml-4"
            >
              <RefreshCw
                className={`h-4 w-4 mr-2 ${loading ? "animate-spin" : ""}`}
              />
              Refresh
            </Button>
          </div>
        </motion.div>

        {/* Error Display */}
        {error && (
          <motion.div variants={cardVariants} className="text-center">
            <Card className="border-red-200 bg-red-50">
              <CardContent className="pt-6">
                <p className="text-red-600">{error}</p>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={fetchEvents}
                  className="mt-2"
                >
                  Try Again
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        )}

        {/* Loading Display */}
        {loading && !error && (
          <motion.div variants={cardVariants} className="text-center">
            <div className="flex items-center justify-center gap-2">
              <RefreshCw className="h-5 w-5 animate-spin" />
              <span>Loading events...</span>
            </div>
          </motion.div>
        )}

        {/* Stats Cards */}
        <motion.div
          variants={statsVariants}
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          <Card className="border shadow-sm">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                Total Events
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">
                {events.length}
              </div>
              <p className="text-xs text-muted-foreground">All time</p>
            </CardContent>
          </Card>

          <Card className="border shadow-sm">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                <Clock className="h-4 w-4" />
                Upcoming Events
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">
                {upcomingEvents.length}
              </div>
              <p className="text-xs text-muted-foreground">Active events</p>
            </CardContent>
          </Card>

          <Card className="border shadow-sm">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                <Users className="h-4 w-4" />
                Past Events
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">
                {pastEvents.length}
              </div>
              <p className="text-xs text-muted-foreground">Completed/Past</p>
            </CardContent>
          </Card>
        </motion.div>

        {/* Upcoming Events Section */}
        {upcomingEvents.length > 0 && (
          <motion.div variants={cardVariants}>
            <h2 className="text-2xl font-semibold mb-6">Upcoming Events</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {upcomingEvents.map((event, index) => {
                const { date, time } = formatDate(event.date);

                return (
                  <motion.div
                    key={event.id}
                    variants={cardVariants}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Card className="group hover:shadow-lg transition-all duration-300 border bg-background h-full">
                      <CardHeader className="pb-3">
                        <div className="flex items-start justify-between">
                          <div className="space-y-1 flex-1">
                            <CardTitle className="text-lg font-bold group-hover:text-primary transition-colors line-clamp-2">
                              {event.title}
                            </CardTitle>
                            <div className="flex items-center gap-1 text-sm text-muted-foreground">
                              {getStatusBadge(event)}
                            </div>
                          </div>
                        </div>
                      </CardHeader>

                      <CardContent className="space-y-4">
                        {event.description && (
                          <p className="text-sm text-muted-foreground line-clamp-3">
                            {event.description}
                          </p>
                        )}

                        <div className="space-y-2">
                          <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <Calendar className="h-4 w-4" />
                            <span>{date}</span>
                          </div>
                          <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <Clock className="h-4 w-4" />
                            <span>{time}</span>
                          </div>
                          <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <MapPin className="h-4 w-4" />
                            <span className="line-clamp-1">
                              {event.location}
                            </span>
                          </div>
                        </div>

                        <div className="pt-2 space-y-2">
                          <div className="grid grid-cols-2 gap-2">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleMarkCompleted(event.id)}
                              className="text-xs"
                            >
                              <CheckCircle className="h-3 w-3 mr-1" />
                              Complete
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleCancelEvent(event.id)}
                              className="text-xs"
                            >
                              <XCircle className="h-3 w-3 mr-1" />
                              Cancel
                            </Button>
                          </div>
                          <div className="grid grid-cols-2 gap-2">
                            <Button
                              variant="outline"
                              size="sm"
                              className="text-xs"
                            >
                              <Edit3 className="h-3 w-3 mr-1" />
                              Edit
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleDeleteEvent(event.id)}
                              className="text-xs text-red-600 hover:text-red-700"
                            >
                              <Trash2 className="h-3 w-3 mr-1" />
                              Delete
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        )}

        {/* Past Events Section */}
        {pastEvents.length > 0 && (
          <motion.div variants={cardVariants}>
            <h2 className="text-2xl font-semibold mb-6">Past Events</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {pastEvents.map((event, index) => {
                const { date, time } = formatDate(event.date);

                return (
                  <motion.div
                    key={event.id}
                    variants={cardVariants}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Card className="group hover:shadow-lg transition-all duration-300 border bg-background h-full opacity-75">
                      <CardHeader className="pb-3">
                        <div className="flex items-start justify-between">
                          <div className="space-y-1 flex-1">
                            <CardTitle className="text-lg font-bold line-clamp-2">
                              {event.title}
                            </CardTitle>
                            <div className="flex items-center gap-1 text-sm text-muted-foreground">
                              {getStatusBadge(event)}
                            </div>
                          </div>
                        </div>
                      </CardHeader>

                      <CardContent className="space-y-4">
                        {event.description && (
                          <p className="text-sm text-muted-foreground line-clamp-3">
                            {event.description}
                          </p>
                        )}

                        <div className="space-y-2">
                          <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <Calendar className="h-4 w-4" />
                            <span>{date}</span>
                          </div>
                          <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <Clock className="h-4 w-4" />
                            <span>{time}</span>
                          </div>
                          <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <MapPin className="h-4 w-4" />
                            <span className="line-clamp-1">
                              {event.location}
                            </span>
                          </div>
                        </div>

                        <div className="pt-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleDeleteEvent(event.id)}
                            className="w-full text-xs text-red-600 hover:text-red-700"
                          >
                            <Trash2 className="h-3 w-3 mr-1" />
                            Delete
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        )}

        {/* No Events State */}
        {events.length === 0 && (
          <motion.div variants={cardVariants} className="text-center py-12">
            <div className="mx-auto w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-4">
              <Calendar className="h-8 w-8 text-gray-400" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              No events yet
            </h3>
            <p className="text-gray-500">
              Create your first event to get started.
            </p>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
}
