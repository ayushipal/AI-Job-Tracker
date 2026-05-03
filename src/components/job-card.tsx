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

  // ✅ UPDATE STATUS (IMPORTANT FIX)
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
    <Card className="overflow-hidden transition-all duration-300 border-0 shadow-xl group bg-white/80 backdrop-blur-sm hover:-translate-y-2 hover:bg-white hover:shadow-2xl">
      <CardHeader className="pb-4">
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1">
            <CardTitle className="mb-2 text-xl font-bold text-gray-900 line-clamp-1 group-hover:text-indigo-600">
              {job.title}
            </CardTitle>

            <CardDescription className="mb-3 text-lg font-semibold text-gray-800">
              {job.company}
            </CardDescription>

            <div className="flex flex-wrap items-center gap-3 mb-4">
              <Badge className="px-4 py-2 font-bold text-blue-800 bg-blue-100">
                {statusConfig.label}
              </Badge>

              {job.location && (
                <div className="flex items-center gap-1 text-sm text-gray-600">
                  <MapPin className="w-4 h-4" />
                  {job.location}
                </div>
              )}

              <div className="flex items-center gap-1 text-sm text-gray-500">
                <Calendar className="w-4 h-4" />
                {new Date(job.createdAt).toLocaleDateString()}
              </div>
            </div>
          </div>
        </div>
      </CardHeader>

      <CardContent className="pt-0 pb-6">
        {job.description && (
          <p className="mb-6 text-gray-600 line-clamp-4">
            {job.description}
          </p>
        )}

        {job.url && (
          <Button variant="outline" size="sm" asChild className="w-full mb-3">
            <a href={job.url} target="_blank">
              <ExternalLink className="w-4 h-4 mr-2" />
              View Application
            </a>
          </Button>
        )}

        <div className="flex gap-3 pt-2 opacity-0 group-hover:opacity-100">
          
          {/* ✅ EDIT BUTTON NOW WORKS */}
          <Button
            variant="outline"
            size="sm"
            className="flex-1"
            onClick={handleUpdateStatus}
          >
            <Edit className="w-4 h-4 mr-2" />
            Edit
          </Button>

          <Button
            variant="destructive"
            size="sm"
            className="flex-1"
            onClick={handleDelete}
          >
            <Trash2 className="w-4 h-4 mr-2" />
            Delete
          </Button>

          <Button size="sm" className="flex-1">
            <Brain className="w-4 h-4 mr-2" />
            AI Analyze
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}