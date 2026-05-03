"use client";

import axios from "axios";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import {
  Edit,
  Trash2,
  Brain,
  ExternalLink,
  MapPin,
  Calendar,
} from "lucide-react";
import { Job } from "@/types/job";

interface JobCardProps {
  job: Job;
  onDelete: () => void;
  onRefresh: () => void;
}

export function JobCard({ job, onDelete, onRefresh }: JobCardProps) {
  
  // ✅ DELETE
  const handleDelete = async () => {
    if (confirm(`Delete "${job.title}" at ${job.company}?`)) {
      try {
        await axios.delete(`/api/jobs/${job.id}`);
        onDelete();
      } catch (error) {
        alert("Failed to delete job");
      }
    }
  };

  // UPDATE STATUS (IMPORTANT FIX)
  const handleUpdateStatus = async () => {
    try {
      const newStatus = prompt(
        "Enter new status: APPLIED / INTERVIEW / OFFER / REJECTED",
        job.status
      );

      if (!newStatus) return;

      await axios.put(`/api/jobs/${job.id}`, {
        title: job.title,
        company: job.company,
        description: job.description,
        status: newStatus,
      });

      onRefresh(); // refresh UI
    } catch (error) {
      console.error(error);
      alert("Failed to update job");
    }
  };

  const getStatusConfig = (status: string) => {
    const config = {
      APPLIED: { color: "blue", label: "📝 Applied" },
      INTERVIEW: { color: "emerald", label: "🎤 Interview" },
      OFFER: { color: "green", label: "🎉 Offer" },
      REJECTED: { color: "red", label: "❌ Rejected" },
    };
    return config[status as keyof typeof config] || config.APPLIED;
  };

  const statusConfig = getStatusConfig(job.status);

  return (
    <Card className="group overflow-hidden border-0 bg-white/80 shadow-xl backdrop-blur-sm transition-all duration-300 hover:-translate-y-2 hover:bg-white hover:shadow-2xl">
      <CardHeader className="pb-4">
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1">
            <CardTitle className="mb-2 line-clamp-1 text-xl font-bold text-gray-900 group-hover:text-indigo-600">
              {job.title}
            </CardTitle>

            <CardDescription className="mb-3 text-lg font-semibold text-gray-800">
              {job.company}
            </CardDescription>

            <div className="mb-4 flex flex-wrap items-center gap-3">
              <Badge className="bg-blue-100 px-4 py-2 font-bold text-blue-800">
                {statusConfig.label}
              </Badge>

              {job.location && (
                <div className="flex items-center gap-1 text-sm text-gray-600">
                  <MapPin className="h-4 w-4" />
                  {job.location}
                </div>
              )}

              <div className="flex items-center gap-1 text-sm text-gray-500">
                <Calendar className="h-4 w-4" />
                {new Date(job.createdAt).toLocaleDateString()}
              </div>
            </div>
          </div>
        </div>
      </CardHeader>

      <CardContent className="pt-0 pb-6">
        {job.description && (
          <p className="mb-6 line-clamp-4 text-gray-600">
            {job.description}
          </p>
        )}

        {job.url && (
          <Button variant="outline" size="sm" asChild className="mb-3 w-full">
            <a href={job.url} target="_blank">
              <ExternalLink className="mr-2 h-4 w-4" />
              View Application
            </a>
          </Button>
        )}

        <div className="flex gap-3 pt-2 opacity-0 group-hover:opacity-100">
          
          {/* EDIT BUTTON NOW WORKS */}
          <Button
            variant="outline"
            size="sm"
            className="flex-1"
            onClick={handleUpdateStatus}
          >
            <Edit className="mr-2 h-4 w-4" />
            Edit
          </Button>

          <Button
            variant="destructive"
            size="sm"
            className="flex-1"
            onClick={handleDelete}
          >
            <Trash2 className="mr-2 h-4 w-4" />
            Delete
          </Button>

          <Button size="sm" className="flex-1">
            <Brain className="mr-2 h-4 w-4" />
            AI Analyze
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}