"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Event } from "@/types/events";
import { motion, Variants } from "framer-motion";
import {
  Activity,
  ArrowRight,
  CalendarDays,
  Clock,
  Eye,
  MapPin,
  TrendingUp,
  Users,
} from "lucide-react";

interface EventsContentProps {
  events: Event[];
}

export default function EventsContent({ events }: EventsContentProps) {
  const pageVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: [0.04, 0.62, 0.23, 0.98],
        staggerChildren: 0.1,
      },
    },
  };

  const headerVariants: Variants = {
    hidden: { opacity: 0, y: -20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.04, 0.62, 0.23, 0.98],
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

  const eventCardVariants: Variants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.4,
        ease: [0.04, 0.62, 0.23, 0.98],
      },
    },
  };

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

  const upcomingEvents = events.filter(
    (event) => new Date(event.date) > new Date()
  );
  const totalAttendees = events.length * 45; // Mock data

  return (
    <motion.div
      variants={pageVariants}
      initial="hidden"
      animate="visible"
      className="min-h-screen bg-background"
    >
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-7xl mx-auto space-y-8">
          {/* Header Section */}
          <motion.div
            variants={headerVariants}
            className="text-center space-y-4"
          >
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="p-3 rounded-xl border">
                <CalendarDays className="h-8 w-8 text-primary" />
              </div>
              <div>
                <h1 className="text-4xl font-bold text-foreground">
                  Events Dashboard
                </h1>
                <p className="text-lg text-muted-foreground mt-2">
                  Welcome to your event management dashboard! You are
                  authenticated
                </p>
              </div>
            </div>
          </motion.div>

          {/* Stats Cards */}
          <motion.div
            variants={headerVariants}
            className="grid grid-cols-1 md:grid-cols-3 gap-6"
          >
            <motion.div variants={cardVariants}>
              <Card className="border shadow-sm hover:shadow-md transition-shadow duration-300">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                    <CalendarDays className="h-4 w-4" />
                    Total Events
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-primary">
                    {events.length}
                  </div>
                  <p className="text-xs text-muted-foreground">
                    All time events
                  </p>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div variants={cardVariants}>
              <Card className="border shadow-sm hover:shadow-md transition-shadow duration-300">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                    <Users className="h-4 w-4" />
                    Total Attendees
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-primary">
                    {totalAttendees}
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Across all events
                  </p>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div variants={cardVariants}>
              <Card className="border shadow-sm hover:shadow-md transition-shadow duration-300">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                    <TrendingUp className="h-4 w-4" />
                    Upcoming Events
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-primary">
                    {upcomingEvents.length}
                  </div>
                  <p className="text-xs text-muted-foreground">Next 30 days</p>
                </CardContent>
              </Card>
            </motion.div>
          </motion.div>

          {/* Events Section */}
          {events.length > 0 ? (
            <motion.div variants={headerVariants} className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-semibold text-foreground">
                  Your Events
                </h2>
                <Button variant="outline" className="flex items-center gap-2">
                  View All
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {events.map((event, index) => {
                  const { date, time } = formatDate(event.date);
                  const isUpcoming = new Date(event.date) > new Date();

                  return (
                    <motion.div
                      key={event.id}
                      variants={eventCardVariants}
                      initial="hidden"
                      animate="visible"
                      transition={{ delay: index * 0.1 }}
                      whileHover={{
                        y: -4,
                        transition: { duration: 0.2 },
                      }}
                    >
                      <Card className="group border shadow-sm hover:shadow-lg transition-all duration-300 cursor-pointer h-full">
                        <CardHeader className="pb-3">
                          <div className="flex items-start justify-between">
                            <div className="space-y-1 flex-1">
                              <div className="flex items-center gap-2">
                                <CardTitle className="text-lg font-bold group-hover:text-primary transition-colors line-clamp-1">
                                  {event.title}
                                </CardTitle>
                                <Badge
                                  variant={isUpcoming ? "default" : "secondary"}
                                  className="ml-auto"
                                >
                                  {isUpcoming ? "Upcoming" : "Past"}
                                </Badge>
                              </div>
                              <div className="space-y-1">
                                <div className="flex items-center gap-1 text-sm text-muted-foreground">
                                  <CalendarDays className="h-3 w-3" />
                                  <span>{date}</span>
                                  <Clock className="h-3 w-3 ml-2" />
                                  <span>{time}</span>
                                </div>
                                <div className="flex items-center gap-1 text-sm text-muted-foreground">
                                  <MapPin className="h-3 w-3" />
                                  <span className="line-clamp-1">
                                    {event.location}
                                  </span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </CardHeader>

                        {event.description && (
                          <>
                            <Separator />
                            <CardContent className="pt-3">
                              <p className="text-sm text-muted-foreground leading-relaxed line-clamp-3">
                                {event.description}
                              </p>
                              <div className="mt-3 flex items-center justify-between">
                                <div className="flex items-center gap-1 text-xs text-muted-foreground">
                                  <Users className="h-3 w-3" />
                                  <span>45 attendees</span>
                                </div>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  className="opacity-0 group-hover:opacity-100 transition-opacity"
                                >
                                  <Eye className="h-3 w-3 mr-1" />
                                  View
                                </Button>
                              </div>
                            </CardContent>
                          </>
                        )}
                      </Card>
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>
          ) : (
            <motion.div variants={headerVariants} className="text-center py-12">
              <div className="mx-auto w-24 h-24 border rounded-full flex items-center justify-center mb-4">
                <CalendarDays className="h-8 w-8 text-muted-foreground" />
              </div>
              <h3 className="text-lg font-medium text-foreground mb-2">
                No events yet
              </h3>
              <p className="text-muted-foreground mb-4">
                Get started by creating your first event.
              </p>
              <Button className="flex items-center gap-2">
                <CalendarDays className="h-4 w-4" />
                Create Your First Event
              </Button>
            </motion.div>
          )}

          {/* Recent Activity Section */}
          <motion.div variants={headerVariants} className="space-y-6">
            <div className="flex items-center gap-2">
              <Activity className="h-5 w-5 text-primary" />
              <h2 className="text-xl font-semibold text-foreground">
                Recent Activity
              </h2>
            </div>

            <motion.div variants={cardVariants}>
              <Card className="border shadow-sm">
                <CardContent className="p-6">
                  {events.length > 0 ? (
                    <div className="space-y-4">
                      <div className="flex items-center gap-3">
                        <div className="w-2 h-2 bg-primary rounded-full"></div>
                        <div className="flex-1">
                          <p className="text-sm font-medium">
                            Latest event created
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {events[events.length - 1]?.title} was added to your
                            events
                          </p>
                        </div>
                        <span className="text-xs text-muted-foreground">
                          Just now
                        </span>
                      </div>
                      <Separator />
                      <div className="flex items-center gap-3">
                        <div className="w-2 h-2 bg-muted rounded-full"></div>
                        <div className="flex-1">
                          <p className="text-sm font-medium">
                            Dashboard accessed
                          </p>
                          <p className="text-xs text-muted-foreground">
                            You viewed your events dashboard
                          </p>
                        </div>
                        <span className="text-xs text-muted-foreground">
                          2 min ago
                        </span>
                      </div>
                    </div>
                  ) : (
                    <p className="text-muted-foreground text-center py-4">
                      No recent activity
                    </p>
                  )}
                </CardContent>
              </Card>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}
