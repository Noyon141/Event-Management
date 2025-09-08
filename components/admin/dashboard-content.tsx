"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Toaster } from "@/components/ui/sonner";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { motion, Variants } from "framer-motion";
import { BarChart3, CalendarDays, List, Plus, Users } from "lucide-react";
import { useState } from "react";
import EventForm from "./event-form";
import EventsList from "./events-list";

export default function DashboardContent() {
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  const handleEventCreated = () => {
    setRefreshTrigger((prev) => prev + 1);
  };

  const pageVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
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
      variants={pageVariants}
      initial="hidden"
      animate="visible"
      className="min-h-screen bg-background p-4 md:p-6 lg:p-8"
    >
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header Section */}
        <motion.div variants={headerVariants} className="text-center space-y-4">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="p-3 rounded-xl border">
              <CalendarDays className="h-8 w-8 text-primary" />
            </div>
            <div>
              <h1 className="text-4xl font-bold text-foreground">
                Event Management Dashboard
              </h1>
              <p className="text-lg text-muted-foreground mt-2">
                Create, manage, and track your events with ease
              </p>
            </div>
          </div>
        </motion.div>

        {/* Stats Cards */}
        <motion.div
          variants={statsVariants}
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          <Card className="border shadow-sm">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                <Users className="h-4 w-4" />
                Total Events
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">24</div>
              <p className="text-xs text-muted-foreground">
                +2 from last month
              </p>
            </CardContent>
          </Card>

          <Card className="border shadow-sm">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                <CalendarDays className="h-4 w-4" />
                Upcoming Events
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">8</div>
              <p className="text-xs text-muted-foreground">Next 30 days</p>
            </CardContent>
          </Card>

          <Card className="border shadow-sm">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                <BarChart3 className="h-4 w-4" />
                Avg. Attendance
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">85%</div>
              <p className="text-xs text-muted-foreground">
                +5% from last month
              </p>
            </CardContent>
          </Card>
        </motion.div>

        {/* Main Content Tabs */}
        <motion.div
          variants={statsVariants}
          className="bg-background rounded-lg border shadow-sm"
        >
          <Tabs defaultValue="create" className="w-full">
            <div className="border-b bg-muted/50 px-6 py-4">
              <TabsList className="bg-background border shadow-sm">
                <TabsTrigger
                  value="create"
                  className="flex items-center gap-2 px-6 py-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
                >
                  <Plus className="h-4 w-4" />
                  Create Event
                </TabsTrigger>
                <TabsTrigger
                  value="manage"
                  className="flex items-center gap-2 px-6 py-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
                >
                  <List className="h-4 w-4" />
                  Manage Events
                </TabsTrigger>
              </TabsList>
            </div>

            <div className="p-6 md:p-8">
              <TabsContent value="create" className="mt-0">
                <div className="space-y-6">
                  <div className="text-center space-y-2">
                    <h2 className="text-2xl font-semibold">
                      Create a New Event
                    </h2>
                    <p className="text-muted-foreground">
                      Fill out the form below to create a new event for your
                      audience
                    </p>
                  </div>
                  <EventForm onEventCreated={handleEventCreated} />
                </div>
              </TabsContent>

              <TabsContent value="manage" className="mt-0">
                <div className="space-y-6">
                  <div className="text-center space-y-2">
                    <h2 className="text-2xl font-semibold">
                      Manage Your Events
                    </h2>
                    <p className="text-muted-foreground">
                      View, edit, and delete your existing events
                    </p>
                  </div>
                  <EventsList refreshTrigger={refreshTrigger} />
                </div>
              </TabsContent>
            </div>
          </Tabs>
        </motion.div>
      </div>

      <Toaster position="bottom-right" expand={true} richColors closeButton />
    </motion.div>
  );
}
