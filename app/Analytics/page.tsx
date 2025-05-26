"use client";
import React, { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { Spotlight } from "@/components/ui/spotlight";
import { Label } from "@/components/ui/label";
import { 
  TrendingUp, 
  Users, 
  Award, 
  Star, 
  BarChart3, 
  PieChart, 
  Activity,
  Building2,
  UserCheck,
  UserX,
  Calendar,
  Trophy,
  Filter
} from "lucide-react";
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  BarChart, 
  Bar, 
  PieChart as RechartsPieChart, 
  Cell 
} from "recharts";
import { useEmployees } from "@/hooks/useEmployeeHooks";
import toast from 'react-hot-toast';

// Type definitions
interface Employee {
  id: string;
  name: string;
  department: string;
  performanceRating?: number;
  skills?: string[];
  badges?: string[];
  isActive: boolean;
  bookmarked: boolean;
}

interface DepartmentData {
  department: string;
  count: number;
  percentage: string;
}

interface PerformanceData {
  range: string;
  count: number;
  percentage: string;
}

interface MonthlyTrendData {
  month: string;
  avgRating: number;
  employees: number;
}

interface SkillData {
  skill: string;
  count: number;
}

interface BadgeData {
  badge: string;
  count: number;
}

interface AnalyticsData {
  departmentData: DepartmentData[];
  performanceData: PerformanceData[];
  monthlyTrend: MonthlyTrendData[];
  topSkills: SkillData[];
  topBadges: BadgeData[];
  totalEmployees: number;
  activeEmployees: number;
  inactiveEmployees: number;
  avgPerformanceRating: string;
  bookmarkedCount: number;
}

interface StatCardProps {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  value: string | number;
  subtitle?: string;
  color?: "blue" | "green" | "yellow" | "red" | "purple";
}

interface ChartCardProps {
  title: string;
  children: React.ReactNode;
  icon: React.ComponentType<{ className?: string }>;
}

// Sample data structure based on your employee object
const generateAnalyticsData = (employees: Employee[]): AnalyticsData | null => {
  if (!employees || employees.length === 0) return null;

  // Department distribution
  const departmentStats: Record<string, number> = employees.reduce((acc, emp) => {
    acc[emp.department] = (acc[emp.department] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const departmentData: DepartmentData[] = Object.entries(departmentStats).map(([dept, count]) => ({
    department: dept,
    count: count as number,
    percentage: (((count as number) / employees.length) * 100).toFixed(1)
  }));

  // Performance distribution
  const performanceRanges: Record<string, number> = {
    'Excellent (4.5+)': 0,
    'Good (4.0-4.4)': 0,
    'Average (3.5-3.9)': 0,
    'Needs Improvement (<3.5)': 0
  };

  employees.forEach(emp => {
    const rating = emp.performanceRating || 0;
    if (rating >= 4.5) performanceRanges['Excellent (4.5+)']++;
    else if (rating >= 4.0) performanceRanges['Good (4.0-4.4)']++;
    else if (rating >= 3.5) performanceRanges['Average (3.5-3.9)']++;
    else performanceRanges['Needs Improvement (<3.5)']++;
  });

  const performanceData: PerformanceData[] = Object.entries(performanceRanges).map(([range, count]) => ({
    range,
    count,
    percentage: ((count / employees.length) * 100).toFixed(1)
  }));

  // Monthly performance trend (mock data based on performance history)
  const monthlyTrend: MonthlyTrendData[] = [
    { month: 'Sep 2024', avgRating: 3.8, employees: employees.length },
    { month: 'Oct 2024', avgRating: 3.9, employees: employees.length },
    { month: 'Nov 2024', avgRating: 4.0, employees: employees.length },
    { month: 'Dec 2024', avgRating: 4.1, employees: employees.length },
    { month: 'Jan 2025', avgRating: 4.0, employees: employees.length },
    { month: 'Feb 2025', avgRating: 4.2, employees: employees.length },
  ];

  // Skills analysis
  const skillsCount: Record<string, number> = {};
  employees.forEach(emp => {
    if (emp.skills && Array.isArray(emp.skills)) {
      emp.skills.forEach(skill => {
        skillsCount[skill] = (skillsCount[skill] || 0) + 1;
      });
    }
  });

  const topSkills: SkillData[] = Object.entries(skillsCount)
    .sort(([,a], [,b]) => (b as number) - (a as number))
    .slice(0, 8)
    .map(([skill, count]) => ({ skill, count: count as number }));

  // Status distribution
  const activeCount = employees.filter(emp => emp.isActive).length;
  const inactiveCount = employees.length - activeCount;

  // Badge analysis
  const badgeCount: Record<string, number> = {};
  employees.forEach(emp => {
    if (emp.badges && Array.isArray(emp.badges)) {
      emp.badges.forEach(badge => {
        badgeCount[badge] = (badgeCount[badge] || 0) + 1;
      });
    }
  });

  const topBadges: BadgeData[] = Object.entries(badgeCount)
    .sort(([,a], [,b]) => (b as number) - (a as number))
    .slice(0, 5)
    .map(([badge, count]) => ({ badge, count: count as number }));

  return {
    departmentData,
    performanceData,
    monthlyTrend,
    topSkills,
    topBadges,
    totalEmployees: employees.length,
    activeEmployees: activeCount,
    inactiveEmployees: inactiveCount,
    avgPerformanceRating: (employees.reduce((sum, emp) => sum + (emp.performanceRating || 0), 0) / employees.length).toFixed(2),
    bookmarkedCount: employees.filter(emp => emp.bookmarked).length
  };
};

const CHART_COLORS = ['#60a5fa', '#34d399', '#fbbf24', '#f87171', '#a78bfa', '#fb7185', '#38bdf8', '#4ade80'];

export default function Analytics(): JSX.Element {
  const [filterPeriod, setFilterPeriod] = useState<string>("all");
  const { employees, isLoading, hasLoaded } = useEmployees();
  const [analyticsData, setAnalyticsData] = useState<AnalyticsData | null>(null);

  useEffect(() => {
    if (hasLoaded && employees && employees.length > 0) {
      const data = generateAnalyticsData(employees as Employee[]);
      setAnalyticsData(data);
      if (data) {
        toast.success(`Analytics generated for ${employees.length} employees!`, { icon: "📊" });
      }
    }
  }, [hasLoaded, employees]);

  const StatCard: React.FC<StatCardProps> = ({ 
    icon: Icon, 
    title, 
    value, 
    subtitle, 
    color = "blue" 
  }) => (
    <div className="bg-black/40 border border-neutral-800 rounded-xl p-6 backdrop-blur-sm hover:bg-black/60 transition-all duration-300">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-neutral-400 text-sm mb-1">{title}</p>
          <p className={cn("text-2xl font-bold mb-1", 
            color === "blue" && "text-blue-400",
            color === "green" && "text-green-400",
            color === "yellow" && "text-yellow-400",
            color === "red" && "text-red-400",
            color === "purple" && "text-purple-400"
          )}>
            {value}
          </p>
          {subtitle && <p className="text-neutral-500 text-xs">{subtitle}</p>}
        </div>
        <div className={cn("p-3 rounded-lg",
          color === "blue" && "bg-blue-400/10",
          color === "green" && "bg-green-400/10",
          color === "yellow" && "bg-yellow-400/10",
          color === "red" && "bg-red-400/10",
          color === "purple" && "bg-purple-400/10"
        )}>
          <Icon className={cn("w-6 h-6",
            color === "blue" && "text-blue-400",
            color === "green" && "text-green-400",
            color === "yellow" && "text-yellow-400",
            color === "red" && "text-red-400",
            color === "purple" && "text-purple-400"
          )} />
        </div>
      </div>
    </div>
  );

  const ChartCard: React.FC<ChartCardProps> = ({ title, children, icon: Icon }) => (
    <div className="bg-black/40 border border-neutral-800 rounded-xl p-6 backdrop-blur-sm">
      <div className="flex items-center gap-2 mb-6">
        <Icon className="w-5 h-5 text-blue-400" />
        <h3 className="text-lg font-semibold text-white">{title}</h3>
      </div>
      {children}
    </div>
  );

  if (isLoading) {
    return (
      <div className="relative min-h-screen w-full overflow-hidden bg-black/[0.96] antialiased">
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-white mb-4"></div>
            <p className="text-neutral-400">Loading analytics...</p>
          </div>
        </div>
      </div>
    );
  }

  if (!analyticsData) {
    return (
      <div className="relative min-h-screen w-full overflow-hidden bg-black/[0.96] antialiased">
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center">
            <p className="text-neutral-400 text-lg mb-2">No data available</p>
            <p className="text-neutral-500 text-sm">Please ensure employees are loaded first</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-black/[0.96] antialiased">
      {/* Background grid */}
      <div className={cn(
        "pointer-events-none absolute inset-0 [background-size:40px_40px] select-none",
        "[background-image:linear-gradient(to_right,#171717_1px,transparent_1px),linear-gradient(to_bottom,#171717_1px,transparent_1px)]"
      )} />

      {/* Header Section */}
      <div className="relative z-10 flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6 p-4 sm:p-6 md:p-8">
        <div className="flex-1 max-w-full lg:max-w-2xl">
          <Spotlight className="-top-20 -left-10 opacity-70" fill="white" />
          <h1 className="bg-opacity-50 bg-gradient-to-b from-neutral-50 to-neutral-400 bg-clip-text text-xl sm:text-2xl md:text-3xl lg:text-4xl font-semibold text-transparent leading-tight">
            HR Analytics Dashboard
          </h1>
          <p className="text-neutral-400 mt-2 max-w-2xl">
            Comprehensive insights into your workforce performance, skills, and trends
          </p>
        </div>

        <div className="flex-shrink-0 w-full sm:w-80 lg:w-80 lg:ml-8">
          <div className="flex flex-col space-y-2">
            <Label htmlFor="filter" className="text-neutral-300 text-sm">
              Time Period
            </Label>
            <select
              id="filter"
              value={filterPeriod}
              onChange={(e) => setFilterPeriod(e.target.value)}
              className="bg-black/50 border border-neutral-700 text-white rounded-md px-3 py-2 focus:border-neutral-500 focus:outline-none"
            >
              <option value="all">All Time</option>
              <option value="6months">Last 6 Months</option>
              <option value="3months">Last 3 Months</option>
              <option value="1month">Last Month</option>
            </select>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 p-4 sm:p-6 md:p-8 pt-0 sm:pt-2 space-y-8">
        {/* Key Metrics */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-4 sm:gap-6">
          <StatCard
            icon={Users}
            title="Total Employees"
            value={analyticsData.totalEmployees}
            subtitle="Active workforce"
            color="blue"
          />
          <StatCard
            icon={UserCheck}
            title="Active Status"
            value={analyticsData.activeEmployees}
            subtitle={`${analyticsData.inactiveEmployees} inactive`}
            color="green"
          />
          <StatCard
            icon={Star}
            title="Avg Performance"
            value={analyticsData.avgPerformanceRating}
            subtitle="Out of 5.0"
            color="yellow"
          />
          <StatCard
            icon={Trophy}
            title="Bookmarked"
            value={analyticsData.bookmarkedCount}
            subtitle="Star performers"
            color="purple"
          />
          <StatCard
            icon={Building2}
            title="Departments"
            value={analyticsData.departmentData.length}
            subtitle="Active departments"
            color="blue"
          />
        </div>

        {/* Charts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Performance Trend */}
          <ChartCard title="Performance Trend" icon={TrendingUp}>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={analyticsData.monthlyTrend}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                  <XAxis dataKey="month" stroke="#9CA3AF" fontSize={12} />
                  <YAxis stroke="#9CA3AF" fontSize={12} domain={[3, 5]} />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: '#1f1f1f', 
                      border: '1px solid #374151',
                      borderRadius: '8px',
                      color: '#fff'
                    }}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="avgRating" 
                    stroke="#60a5fa" 
                    strokeWidth={3}
                    dot={{ fill: '#60a5fa', strokeWidth: 2, r: 6 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </ChartCard>

          {/* Department Distribution */}
          <ChartCard title="Department Distribution" icon={Building2}>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={analyticsData.departmentData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                  <XAxis dataKey="department" stroke="#9CA3AF" fontSize={12} />
                  <YAxis stroke="#9CA3AF" fontSize={12} />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: '#1f1f1f', 
                      border: '1px solid #374151',
                      borderRadius: '8px',
                      color: '#fff'
                    }}
                  />
                  <Bar dataKey="count" fill="#34d399" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </ChartCard>

          {/* Performance Distribution */}
          <ChartCard title="Performance Distribution" icon={Star}>
            <div className="space-y-3">
              {analyticsData.performanceData.map((item, index) => (
                <div key={item.range} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div 
                      className="w-4 h-4 rounded-full"
                      style={{ backgroundColor: CHART_COLORS[index] }}
                    />
                    <span className="text-neutral-300 text-sm">{item.range}</span>
                  </div>
                  <div className="text-right">
                    <span className="text-white font-medium">{item.count}</span>
                    <span className="text-neutral-400 text-sm ml-2">({item.percentage}%)</span>
                  </div>
                </div>
              ))}
            </div>
          </ChartCard>

          {/* Top Skills */}
          <ChartCard title="Top Skills" icon={Award}>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={analyticsData.topSkills} layout="horizontal">
                  <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                  <XAxis type="number" stroke="#9CA3AF" fontSize={12} />
                  <YAxis dataKey="skill" type="category" stroke="#9CA3AF" fontSize={12} width={80}/>
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: '#1f1f1f', 
                      border: '1px solid #374151',
                      borderRadius: '8px',
                      color: '#fff'
                    }}
                  />
                  <Bar dataKey="count" fill="#a78bfa" radius={[0, 4, 4, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </ChartCard>
        </div>

        {/* Additional Insights */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Top Badges */}
          <ChartCard title="Most Common Badges" icon={Trophy}>
            <div className="space-y-4">
              {analyticsData.topBadges.map((badge, index) => (
                <div key={`${badge.badge}-${index}`} className="flex items-center justify-between p-3 border border-neutral-700 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-yellow-400/10 flex items-center justify-center">
                      <Trophy className="w-4 h-4 text-yellow-400" />
                    </div>
                    <span className="text-neutral-200">{badge.badge}</span>
                  </div>
                  <span className="text-yellow-400 font-medium">{badge.count}</span>
                </div>
              ))}
            </div>
          </ChartCard>

          {/* Quick Stats */}
          <ChartCard title="Quick Insights" icon={Activity}>
            <div className="space-y-4">
              <div className="p-4 border border-neutral-700 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-neutral-300">Most Common Department</span>
                  <span className="text-blue-400 font-medium">
                    {analyticsData.departmentData.sort((a,b) => b.count - a.count)[0]?.department || 'N/A'}
                  </span>
                </div>
                <div className="text-xs text-neutral-500">
                  {analyticsData.departmentData.sort((a,b) => b.count - a.count)[0]?.count || 0} employees
                </div>
              </div>
              
              <div className="p-4 border border-neutral-700 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-neutral-300">Most Popular Skill</span>
                  <span className="text-green-400 font-medium">
                    {analyticsData.topSkills[0]?.skill || 'N/A'}
                  </span>
                </div>
                <div className="text-xs text-neutral-500">
                  {analyticsData.topSkills[0]?.count || 0} employees have this skill
                </div>
              </div>

              <div className="p-4 border border-neutral-700 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-neutral-300">Employee Engagement</span>
                  <span className="text-purple-400 font-medium">
                    {((analyticsData.bookmarkedCount / analyticsData.totalEmployees) * 100).toFixed(1)}%
                  </span>
                </div>
                <div className="text-xs text-neutral-500">
                  Bookmarked as star performers
                </div>
              </div>
            </div>
          </ChartCard>
        </div>
      </div>
    </div>
  );
}