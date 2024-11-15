"use client";
import React, { useState } from "react";
import {
  Bell,
  Sun,
  Moon,
  User,
  Camera,
  Thermometer,
  Droplets,
  Activity,
  Fish,
  Shell,
  Timer,
  PillBottle,
} from "lucide-react";
import {
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  AreaChart,
  Area,
  BarChart,
  Legend,
  Bar,
} from "recharts";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardDescription,
} from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

// Sample data for charts
const waterQualityData = [
  { time: "00:00", temp: 28, ph: 7.2, oxygen: 6.8, salinity: 32 },
  { time: "04:00", temp: 27.5, ph: 7.3, oxygen: 6.9, salinity: 31 },
  { time: "08:00", temp: 28.2, ph: 7.1, oxygen: 6.7, salinity: 33 },
  { time: "12:00", temp: 29.1, ph: 7.4, oxygen: 6.5, salinity: 32 },
  { time: "16:00", temp: 28.8, ph: 7.2, oxygen: 6.6, salinity: 31 },
  { time: "20:00", temp: 28.3, ph: 7.3, oxygen: 6.8, salinity: 32 },
];

// Additional sample data for new visualizations
const moltingData = [
  { status: "Pre-molt", count: 15 },
  { status: "Molting", count: 8 },
  { status: "Post-molt", count: 12 },
  { status: "Inter-molt", count: 65 },
];

const feedingData = [
  { time: "06:00", amount: 2.5, consumption: 2.3 },
  { time: "12:00", amount: 3.0, consumption: 2.8 },
  { time: "18:00", amount: 2.8, consumption: 2.6 },
  { time: "00:00", amount: 2.0, consumption: 1.8 },
];

const healthMetrics = [
  { date: "2024-03-10", survived: 98, mortality: 2 },
  { date: "2024-03-11", survived: 97, mortality: 1 },
  { date: "2024-03-12", survived: 97, mortality: 0 },
  { date: "2024-03-13", survived: 96, mortality: 1 },
  { date: "2024-03-14", survived: 96, mortality: 0 },
];

const notifications = [
  {
    id: 1,
    message: "High temperature alert in Tank A",
    time: "2 minutes ago",
    type: "warning",
  },
  {
    id: 2,
    message: "Feeding schedule completed",
    time: "15 minutes ago",
    type: "success",
  },
  {
    id: 3,
    message: "Water quality check required",
    time: "1 hour ago",
    type: "info",
  },
  {
    id: 4,
    message: "System maintenance due",
    time: "2 hours ago",
    type: "warning",
  },
];

const waterParameters = [
  {
    name: "Temperature",
    value: "28.5°C",
    icon: <Thermometer size={20} className="text-[#E14733]" />,
    color: "#E14733",
    status: "Optimal",
    range: "26-30°C",
  },
  {
    name: "pH Level",
    value: "7.2",
    icon: <PillBottle size={20} className="text-[#EB755B]" />,
    color: "#EB755B",
    status: "Normal",
    range: "7.0-7.5",
  },
  {
    name: "Dissolved Oxygen",
    value: "6.8 mg/L",
    icon: <Droplets size={20} className="text-[#FF6565]" />,
    color: "#FF6565",
    status: "Good",
    range: "6.5-8.0 mg/L",
  },
  {
    name: "Salinity",
    value: "32 ppt",
    icon: <Activity size={20} className="text-[#FFA39D]" />,
    color: "#FFA39D",
    status: "Normal",
    range: "30-34 ppt",
  },
];

const anomalyLogs = [
  {
    id: 1,
    timestamp: "2024-03-14 09:23",
    type: "Temperature Spike",
    value: "31.2°C",
    status: "Resolved",
  },
  {
    id: 2,
    timestamp: "2024-03-14 11:45",
    type: "Low Oxygen",
    value: "5.8 mg/L",
    status: "Active",
  },
  {
    id: 3,
    timestamp: "2024-03-14 14:30",
    type: "pH Fluctuation",
    value: "7.8",
    status: "Monitoring",
  },
  {
    id: 4,
    timestamp: "2024-03-14 16:15",
    type: "High Salinity",
    value: "35 ppt",
    status: "Resolved",
  },
];

// Add this section after your existing CardContent in the Analytics Summary card
const AnalyticsSummaryContent = ({ darkMode }) => (
  <div className="space-y-4">
    {/* Existing Growth Rate and Feeding Efficiency */}
    <div
      className={`p-4 ${darkMode ? "bg-gray-800" : "bg-gray-100"} rounded-lg`}
    >
      <div className="flex justify-between items-center mb-2">
        <span className="text-sm font-medium">Growth Rate</span>
        <span className="text-[#E14733] font-bold">+2.3%</span>
      </div>
      <div
        className={`w-full ${
          darkMode ? "bg-gray-700" : "bg-gray-200"
        } rounded-full h-2`}
      >
        <div
          className="bg-[#E14733] h-2 rounded-full"
          style={{ width: "70%" }}
        ></div>
      </div>
    </div>

    {/* Molting Activity */}
    <div
      className={`p-4 ${darkMode ? "bg-gray-800" : "bg-gray-100"} rounded-lg`}
    >
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <Shell size={16} className="text-[#EB755B]" />
          <span className="text-sm font-medium">Molting Activity</span>
        </div>
        <span className="text-[#EB755B] font-bold">8 Active</span>
      </div>
      <div className="mt-2">
        <div className="grid grid-cols-2 gap-2 text-sm">
          <div
            className={`p-2 ${
              darkMode ? "bg-gray-700" : "bg-gray-200"
            } rounded`}
          >
            <span className="block text-xs">Pre-molt</span>
            <span className="font-bold">15 crabs</span>
          </div>
          <div
            className={`p-2 ${
              darkMode ? "bg-gray-700" : "bg-gray-200"
            } rounded`}
          >
            <span className="block text-xs">Post-molt</span>
            <span className="font-bold">12 crabs</span>
          </div>
        </div>
      </div>
    </div>

    {/* Feeding Status */}
    <div
      className={`p-4 ${darkMode ? "bg-gray-800" : "bg-gray-100"} rounded-lg`}
    >
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <Timer size={16} className="text-[#FF6565]" />
          <span className="text-sm font-medium">Next Feeding</span>
        </div>
        <span className="text-[#FF6565] font-bold">2h 15m</span>
      </div>
      <div className="mt-2">
        <div className="text-xs">Last feeding consumption rate</div>
        <div className="text-2xl font-bold">92%</div>
      </div>
    </div>
  </div>
);

// Add this component for the new data tables section
const DataTables = ({ darkMode }) => (
  <Card className="lg:col-span-3">
    <CardHeader className="bg-gradient-to-r from-[#AD3400] to-[#E14733] text-white rounded-t-lg">
      <CardTitle>System Logs</CardTitle>
      <CardDescription className="text-gray-100">
        Recent Anomalies and Events
      </CardDescription>
    </CardHeader>
    <CardContent className="pt-6">
      <Table>
        <TableCaption>A list of recent system anomalies</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Timestamp</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Value</TableHead>
            <TableHead>Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {anomalyLogs.map((log) => (
            <TableRow key={log.id}>
              <TableCell>{log.timestamp}</TableCell>
              <TableCell className="font-medium">{log.type}</TableCell>
              <TableCell>{log.value}</TableCell>
              <TableCell>
                <span
                  className={`px-2 py-1 rounded-full text-xs ${
                    log.status === "Active"
                      ? "bg-red-100 text-red-800"
                      : log.status === "Resolved"
                      ? "bg-green-100 text-green-800"
                      : "bg-yellow-100 text-yellow-800"
                  }`}
                >
                  {log.status}
                </span>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </CardContent>
  </Card>
);

// Add this component for additional charts
const AdditionalCharts = ({ darkMode }) => (
  <>
    <Card className="lg:col-span-2">
      <CardHeader className="bg-gradient-to-r from-[#AD3400] to-[#E14733] text-white rounded-t-lg">
        <CardTitle>Feeding Patterns</CardTitle>
        <CardDescription className="text-gray-100">
          Amount vs. Consumption
        </CardDescription>
      </CardHeader>
      <CardContent className="pt-6">
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={feedingData}>
              <CartesianGrid strokeDasharray="3 3" strokeOpacity={0.1} />
              <XAxis dataKey="time" />
              <YAxis />
              <Tooltip
                contentStyle={{
                  backgroundColor: darkMode
                    ? "rgba(30, 30, 30, 0.9)"
                    : "rgba(255, 255, 255, 0.9)",
                  border: "1px solid #E14733",
                }}
              />
              <Legend />
              <Bar dataKey="amount" name="Feed Amount" fill="#E14733" />
              <Bar dataKey="consumption" name="Consumption" fill="#EB755B" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>

    <Card>
      <CardHeader className="bg-gradient-to-r from-[#AD3400] to-[#E14733] text-white rounded-t-lg">
        <CardTitle>Population Health</CardTitle>
        <CardDescription className="text-gray-100">
          Survival Rate Analysis
        </CardDescription>
      </CardHeader>
      <CardContent className="pt-6">
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={healthMetrics}>
              <CartesianGrid strokeDasharray="3 3" strokeOpacity={0.1} />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip
                contentStyle={{
                  backgroundColor: darkMode
                    ? "rgba(30, 30, 30, 0.9)"
                    : "rgba(255, 255, 255, 0.9)",
                  border: "1px solid #E14733",
                }}
              />
              <Area
                type="monotone"
                dataKey="survived"
                stroke="#4CAF50"
                fill="#4CAF50"
                fillOpacity={0.2}
              />
              <Area
                type="monotone"
                dataKey="mortality"
                stroke="#FF6565"
                fill="#FF6565"
                fillOpacity={0.2}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  </>
);

export default function Dashboard() {
  const [darkMode, setDarkMode] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);

  return (
    <div
      className={`min-h-screen ${
        darkMode ? "bg-gray-900 text-white" : "bg-gray-50 text-gray-900"
      }`}
    >
      {/* Header */}
      <header className="sticky top-0 z-50 bg-gradient-to-r from-[#AD3400] to-[#E14733] text-white shadow-lg">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <Fish className="w-8 h-8" />
              <div>
                <h1 className="text-2xl font-bold">VertiCrab</h1>
                <p className="text-xs opacity-90">
                  Smart Aquaculture Monitoring
                </p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <button
                onClick={() => setDarkMode(!darkMode)}
                className="p-2 rounded-full hover:bg-white/20 transition-colors"
              >
                {darkMode ? <Sun size={20} /> : <Moon size={20} />}
              </button>
              <div className="relative">
                <button
                  onClick={() => setShowNotifications(!showNotifications)}
                  className="p-2 rounded-full hover:bg-white/20 transition-colors"
                >
                  <Bell size={20} />
                  <span className="absolute -top-1 -right-1 bg-[#FF6565] text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    4
                  </span>
                </button>
                {showNotifications && (
                  <Card className="absolute right-0 mt-2 w-80 shadow-xl">
                    <CardHeader className="bg-gradient-to-r from-[#AD3400] to-[#E14733] text-white">
                      <CardTitle className="text-lg">Notifications</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-2 mt-2">
                      {notifications.map((notification) => (
                        <Alert
                          key={notification.id}
                          variant={
                            notification.type === "warning"
                              ? "destructive"
                              : "default"
                          }
                        >
                          <AlertDescription className="flex justify-between items-start">
                            <span>{notification.message}</span>
                            <span className="text-xs opacity-70">
                              {notification.time}
                            </span>
                          </AlertDescription>
                        </Alert>
                      ))}
                    </CardContent>
                  </Card>
                )}
              </div>
              <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 hover:bg-white/30 transition-colors">
                <User size={20} />
                <span>Admin</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto p-6 space-y-6">
        {/* Status Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {waterParameters.map((param, index) => (
            // Then in the render section, modify the card content to use the icon directly:
            <Card
              key={index}
              className="border-l-4"
              style={{ borderLeftColor: param.color }}
            >
              <CardContent className="pt-6">
                <div className="flex justify-between items-start mb-2">
                  <div className="flex items-center gap-2">
                    {param.icon} {/* Direct usage of the icon JSX */}
                    <h3 className="font-medium">{param.name}</h3>
                  </div>
                  <span className="text-xs px-2 py-1 rounded-full bg-green-100 text-green-800">
                    {param.status}
                  </span>
                </div>
                <div className="mt-4">
                  <div className="text-2xl font-bold">{param.value}</div>
                  <div className="text-xs text-gray-500">
                    Range: {param.range}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Live Camera View */}
          <Card className="lg:col-span-2">
            <CardHeader className="bg-gradient-to-r from-[#AD3400] to-[#E14733] text-white rounded-t-lg">
              <CardTitle>Live Camera Feed</CardTitle>
              <CardDescription className="text-gray-100">
                Tank A - Real-time Monitoring
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="relative aspect-video bg-black rounded-lg overflow-hidden">
                <img
                  src="/api/placeholder/800/450"
                  alt="Live camera feed"
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-4 left-4 flex items-center gap-2 bg-red-500 px-2 py-1 rounded-full text-white text-sm">
                  <Camera size={16} />
                  <span>LIVE</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Analytics Summary */}
          <Card>
            <CardHeader className="bg-gradient-to-r from-[#AD3400] to-[#E14733] text-white rounded-t-lg">
              <CardTitle>Analytics Summary</CardTitle>
              <CardDescription className="text-gray-100">
                System Overview
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-6">
              <AnalyticsSummaryContent darkMode={darkMode} />
            </CardContent>
          </Card>

          {/* Charts */}
          <Card className="lg:col-span-3">
            <CardHeader className="bg-gradient-to-r from-[#AD3400] to-[#E14733] text-white rounded-t-lg">
              <CardTitle>Water Quality Trends</CardTitle>
              <CardDescription className="text-gray-100">
                24-hour Analysis
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={waterQualityData}>
                    <CartesianGrid strokeDasharray="3 3" strokeOpacity={0.1} />
                    <XAxis dataKey="time" />
                    <YAxis />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "rgba(255, 255, 255, 0.9)",
                        border: "1px solid #E14733",
                      }}
                    />
                    <Area
                      type="monotone"
                      dataKey="temp"
                      stroke="#E14733"
                      fill="url(#colorTemp)"
                      strokeWidth={2}
                    />
                    <defs>
                      <linearGradient
                        id="colorTemp"
                        x1="0"
                        y1="0"
                        x2="0"
                        y2="1"
                      >
                        <stop
                          offset="5%"
                          stopColor="#E14733"
                          stopOpacity={0.3}
                        />
                        <stop
                          offset="95%"
                          stopColor="#E14733"
                          stopOpacity={0}
                        />
                      </linearGradient>
                    </defs>
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </div>

        <AdditionalCharts darkMode={darkMode} />
        <DataTables darkMode={darkMode} />
      </main>

      {/* Footer */}
      <footer className="mt-8 bg-gradient-to-r from-[#AD3400] to-[#E14733] text-white py-8">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
            <div className="text-center md:text-left">
              <h3 className="font-bold text-lg mb-2">VertiCrab</h3>
              <p className="text-sm opacity-90">Smart Aquaculture Solutions</p>
            </div>
            <div className="text-center">
              <p className="text-sm opacity-90">Contact us at:</p>
              <p className="font-medium">verticrab@gmail.com</p>
            </div>
            <div className="text-center md:text-right">
              <p className="font-medium">MSU Iligan Institute of Technology</p>
              <p className="text-sm opacity-90">
                Advancing Aquaculture Technology
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
