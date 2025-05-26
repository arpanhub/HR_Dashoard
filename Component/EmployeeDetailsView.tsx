"use client";
import React from "react";
import { cn } from "@/lib/utils";
import { 
  Star, 
  Bookmark, 
  BookmarkCheck, 
  ArrowLeft, 
  Mail, 
  Phone, 
  MapPin, 
  Calendar,
  Badge,
  Briefcase,
  TrendingUp,
  Award,
  CheckCircle,
  Clock,
  MessageCircle
} from "lucide-react";
import { useRouter } from "next/navigation";
import { Spotlight } from "@/components/ui/spotlight";

interface Project {
  projectId: string;
  title: string;
  description: string;
  status: "completed" | "in-progress";
  feedback: string;
}

interface PerformanceHistory {
  month: string;
  rating: number;
}

interface Employee {
  id: string;
  name: string;
  email: string;
  phone: string;
  department: string;
  designation: string;
  profileImage: string;
  performanceRating: number;
  badges: string[];
  projects: Project[];
  feedback: string;
  bookmarked: boolean;
  dateJoined: string;
  location: string;
  isActive: boolean;
  skills: string[];
  performanceHistory: PerformanceHistory[];
}

interface EmployeeDetailsViewProps {
  employee: Employee;
  onBookmarkToggle: () => void;
}

export default function EmployeeDetailsView({ employee, onBookmarkToggle }: EmployeeDetailsViewProps) {
  const router = useRouter();

  const handleBack = () => {
    router.back();
  };

  const getRatingColor = (rating: number) => {
    if (rating >= 4.5) return "text-green-400";
    if (rating >= 4.0) return "text-blue-400";
    if (rating >= 3.5) return "text-yellow-400";
    return "text-orange-400";
  };

  const getRatingBgColor = (rating: number) => {
    if (rating >= 4.5) return "bg-green-400/10 border-green-400/20";
    if (rating >= 4.0) return "bg-blue-400/10 border-blue-400/20";
    if (rating >= 3.5) return "bg-yellow-400/10 border-yellow-400/20";
    return "bg-orange-400/10 border-orange-400/20";
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getStatusColor = (status: string) => {
    return status === 'completed' ? 'text-green-400' : 'text-blue-400';
  };

  const getStatusBg = (status: string) => {
    return status === 'completed' ? 'bg-green-400/10 border-green-400/20' : 'bg-blue-400/10 border-blue-400/20';
  };

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-black/[0.96] antialiased">
      {/* Background grid */}
      <div
        className={cn(
          "pointer-events-none absolute inset-0 [background-size:40px_40px] select-none",
          "[background-image:linear-gradient(to_right,#171717_1px,transparent_1px),linear-gradient(to_bottom,#171717_1px,transparent_1px)]"
        )}
      />

      <Spotlight className="-top-20 -left-10 opacity-70" fill="white" />

      {/* Header */}
      <div className="relative z-10 p-4 sm:p-6 md:p-8">
        <div className="flex items-center justify-between mb-6">
          <button
            onClick={handleBack}
            className="flex items-center gap-2 text-neutral-400 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            Back to Dashboard
          </button>

          <button
            onClick={onBookmarkToggle}
            className="p-2 rounded-lg bg-black/50 hover:bg-black/80 transition-colors"
          >
            {employee.bookmarked ? (
              <BookmarkCheck className="w-5 h-5 text-yellow-400" />
            ) : (
              <Bookmark className="w-5 h-5 text-neutral-400 hover:text-yellow-400" />
            )}
          </button>
        </div>

        {/* Employee Header Card */}
        <div className="bg-black/40 border border-neutral-800 rounded-xl p-6 sm:p-8 backdrop-blur-sm mb-8">
          <div className="flex flex-col lg:flex-row items-start gap-6">
            {/* Profile Section */}
            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 flex-1">
              <div className="relative">
                <img
                  src={employee.profileImage}
                  alt={employee.name}
                  className="w-24 h-24 sm:w-32 sm:h-32 rounded-full object-cover border-2 border-neutral-700"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = `https://ui-avatars.com/api/?name=${encodeURIComponent(employee.name)}&background=1f1f1f&color=ffffff&size=128`;
                  }}
                />
                <div className={cn(
                  "absolute -bottom-1 -right-1 w-6 h-6 rounded-full border-2 border-black",
                  employee.isActive ? "bg-green-400" : "bg-red-400"
                )} />
              </div>

              <div className="text-center sm:text-left flex-1">
                <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2">
                  {employee.name}
                </h1>
                <p className="text-lg text-neutral-300 mb-1">{employee.designation}</p>
                <p className="text-neutral-400 mb-4">{employee.department}</p>

                <div className="flex flex-col sm:flex-row gap-4 text-sm text-neutral-400">
                  <div className="flex items-center gap-2">
                    <Mail className="w-4 h-4" />
                    {employee.email}
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone className="w-4 h-4" />
                    {employee.phone}
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4" />
                    {employee.location}
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    Joined {formatDate(employee.dateJoined)}
                  </div>
                </div>
              </div>
            </div>

            {/* Rating Section */}
            <div className="flex flex-col items-center gap-4">
              <div className={cn(
                "flex items-center gap-3 px-4 py-2 rounded-full border",
                getRatingBgColor(employee.performanceRating)
              )}>
                <Star className={cn("w-5 h-5", getRatingColor(employee.performanceRating))} fill="currentColor" />
                <span className={cn("text-lg font-semibold", getRatingColor(employee.performanceRating))}>
                  {employee.performanceRating.toFixed(1)}
                </span>
              </div>
              <p className="text-xs text-neutral-500 text-center">Performance Rating</p>
            </div>
          </div>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-8">
            {/* Skills Section */}
            <div className="bg-black/40 border border-neutral-800 rounded-xl p-6 backdrop-blur-sm">
              <div className="flex items-center gap-2 mb-4">
                <Badge className="w-5 h-5 text-blue-400" />
                <h2 className="text-xl font-semibold text-white">Skills</h2>
              </div>
              <div className="flex flex-wrap gap-2">
                {employee.skills.map((skill, index) => (
                  <span
                    key={index}
                    className="px-3 py-2 bg-neutral-800/80 text-neutral-300 rounded-lg border border-neutral-700/50 text-sm"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            {/* Projects Section */}
            <div className="bg-black/40 border border-neutral-800 rounded-xl p-6 backdrop-blur-sm">
              <div className="flex items-center gap-2 mb-6">
                <Briefcase className="w-5 h-5 text-green-400" />
                <h2 className="text-xl font-semibold text-white">Projects</h2>
              </div>
              <div className="space-y-4">
                {employee.projects.map((project) => (
                  <div key={project.projectId} className="border border-neutral-700 rounded-lg p-4">
                    <div className="flex items-start justify-between mb-3">
                      <h3 className="text-lg font-medium text-white">{project.title}</h3>
                      <div className={cn(
                        "flex items-center gap-1 px-2 py-1 rounded-full border text-xs",
                        getStatusBg(project.status)
                      )}>
                        {project.status === 'completed' ? (
                          <CheckCircle className="w-3 h-3" />
                        ) : (
                          <Clock className="w-3 h-3" />
                        )}
                        <span className={getStatusColor(project.status)}>
                          {project.status === 'completed' ? 'Completed' : 'In Progress'}
                        </span>
                      </div>
                    </div>
                    <p className="text-neutral-400 text-sm mb-3">{project.description}</p>
                    <div className="flex items-center gap-2 text-neutral-500 text-xs">
                      <MessageCircle className="w-3 h-3" />
                      {project.feedback}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Feedback Section */}
            <div className="bg-black/40 border border-neutral-800 rounded-xl p-6 backdrop-blur-sm">
              <div className="flex items-center gap-2 mb-4">
                <MessageCircle className="w-5 h-5 text-purple-400" />
                <h2 className="text-xl font-semibold text-white">Overall Feedback</h2>
              </div>
              <p className="text-neutral-300 leading-relaxed">{employee.feedback}</p>
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-8">
            {/* Badges Section */}
            <div className="bg-black/40 border border-neutral-800 rounded-xl p-6 backdrop-blur-sm">
              <div className="flex items-center gap-2 mb-4">
                <Award className="w-5 h-5 text-yellow-400" />
                <h2 className="text-xl font-semibold text-white">Badges</h2>
              </div>
              <div className="space-y-2">
                {employee.badges.map((badge, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-2 p-3 bg-gradient-to-r from-yellow-400/10 to-orange-400/10 border border-yellow-400/20 rounded-lg"
                  >
                    <Award className="w-4 h-4 text-yellow-400" />
                    <span className="text-neutral-200 text-sm">{badge}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Performance History */}
            <div className="bg-black/40 border border-neutral-800 rounded-xl p-6 backdrop-blur-sm">
              <div className="flex items-center gap-2 mb-4">
                <TrendingUp className="w-5 h-5 text-blue-400" />
                <h2 className="text-xl font-semibold text-white">Performance History</h2>
              </div>
              <div className="space-y-3">
                {employee.performanceHistory.map((history, index) => (
                  <div key={index} className="flex items-center justify-between p-3 border border-neutral-700 rounded-lg">
                    <span className="text-neutral-300 text-sm">{history.month}</span>
                    <div className={cn(
                      "flex items-center gap-1 px-2 py-1 rounded-full",
                      getRatingBgColor(history.rating)
                    )}>
                      <Star className={cn("w-3 h-3", getRatingColor(history.rating))} fill="currentColor" />
                      <span className={cn("text-xs font-medium", getRatingColor(history.rating))}>
                        {history.rating.toFixed(1)}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}