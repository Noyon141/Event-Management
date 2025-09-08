"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { motion, Variants } from "framer-motion";
import { Calendar, Check, FileText, MapPin, Plus, Type } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

interface EventFormProps {
  onEventCreated?: () => void;
}

export default function EventForm({ onEventCreated }: EventFormProps) {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    date: "",
    location: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const resetForm = () => {
    setFormData({
      title: "",
      description: "",
      date: "",
      location: "",
    });
    setIsSuccess(false);
  };

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const res = await fetch("/api/events", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        setIsSuccess(true);
        toast.success("Event Created Successfully!");
        resetForm();
        onEventCreated?.();
      } else {
        throw new Error("Failed to create event");
      }
    } catch (error) {
      toast.error("Failed to create event. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  }

  const containerVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.04, 0.62, 0.23, 0.98],
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  const buttonVariants = {
    idle: { scale: 1 },
    hover: { scale: 1.02 },
    tap: { scale: 0.98 },
    success: { scale: 1.05, backgroundColor: "#10b981" },
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="w-full max-w-2xl mx-auto"
    >
      <Card className="shadow-lg border bg-background">
        <CardHeader className="space-y-1 pb-6">
          <motion.div
            variants={itemVariants}
            className="flex items-center gap-2"
          >
            <div className="p-2 rounded-lg border">
              <Plus className="h-5 w-5 text-primary" />
            </div>
            <CardTitle className="text-2xl font-bold">
              Create New Event
            </CardTitle>
          </motion.div>
          <motion.div variants={itemVariants}>
            <CardDescription className="text-base">
              Fill in the details below to create a new event for your audience.
            </CardDescription>
          </motion.div>
        </CardHeader>

        <CardContent className="space-y-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            <motion.div variants={itemVariants} className="space-y-2">
              <Label
                htmlFor="title"
                className="flex items-center gap-2 text-sm font-medium"
              >
                <Type className="h-4 w-4 text-muted-foreground" />
                Event Title
              </Label>
              <Input
                id="title"
                name="title"
                placeholder="Enter the event title..."
                value={formData.title}
                onChange={handleInputChange}
                required
                className="transition-all duration-200 focus:scale-[1.01] hover:shadow-md"
              />
            </motion.div>

            <motion.div variants={itemVariants} className="space-y-2">
              <Label
                htmlFor="description"
                className="flex items-center gap-2 text-sm font-medium"
              >
                <FileText className="h-4 w-4 text-muted-foreground" />
                Description
              </Label>
              <Textarea
                id="description"
                name="description"
                placeholder="Provide a detailed description of the event..."
                value={formData.description}
                onChange={handleInputChange}
                rows={4}
                className="transition-all duration-200 focus:scale-[1.01] hover:shadow-md resize-none"
              />
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <motion.div variants={itemVariants} className="space-y-2">
                <Label
                  htmlFor="date"
                  className="flex items-center gap-2 text-sm font-medium"
                >
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  Date & Time
                </Label>
                <Input
                  id="date"
                  name="date"
                  type="datetime-local"
                  value={formData.date}
                  onChange={handleInputChange}
                  required
                  className="transition-all duration-200 focus:scale-[1.01] hover:shadow-md"
                />
              </motion.div>

              <motion.div variants={itemVariants} className="space-y-2">
                <Label
                  htmlFor="location"
                  className="flex items-center gap-2 text-sm font-medium"
                >
                  <MapPin className="h-4 w-4 text-muted-foreground" />
                  Location
                </Label>
                <Input
                  id="location"
                  name="location"
                  placeholder="Enter the event location..."
                  value={formData.location}
                  onChange={handleInputChange}
                  required
                  className="transition-all duration-200 focus:scale-[1.01] hover:shadow-md"
                />
              </motion.div>
            </div>

            <motion.div variants={itemVariants} className="pt-4">
              <motion.div
                variants={buttonVariants}
                initial="idle"
                whileHover="hover"
                whileTap="tap"
                animate={isSuccess ? "success" : "idle"}
              >
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full h-12 text-base font-medium relative overflow-hidden group"
                >
                  <motion.div
                    className="flex items-center gap-2"
                    animate={isSubmitting ? { x: -20 } : { x: 0 }}
                  >
                    {isSubmitting ? (
                      <>
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{
                            duration: 1,
                            repeat: Infinity,
                            ease: "linear",
                          }}
                          className="h-4 w-4 border-2 border-white border-t-transparent rounded-full"
                        />
                        Creating Event...
                      </>
                    ) : isSuccess ? (
                      <>
                        <Check className="h-4 w-4" />
                        Event Created!
                      </>
                    ) : (
                      <>
                        <Plus className="h-4 w-4" />
                        Create Event
                      </>
                    )}
                  </motion.div>

                  {/* Background animation */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-primary/80 to-primary opacity-0 group-hover:opacity-100"
                    transition={{ duration: 0.3 }}
                  />
                </Button>
              </motion.div>
            </motion.div>
          </form>
        </CardContent>
      </Card>
    </motion.div>
  );
}
