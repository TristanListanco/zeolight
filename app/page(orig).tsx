"use client";
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";

import {
  Activity,
  Power,
  AlertTriangle,
  Settings,
  RefreshCw,
  Bell,
  Calendar,
  Clock,
  Download,
  Sun,
  Moon,
  Mail,
  HelpCircle,
  FileText,
  Home,
} from "lucide-react";
import Link from "next/link";

const WaterQualityDashboard = () => {
  const [systemPower, setSystemPower] = useState(true);
  const [autoMaintenance, setAutoMaintenance] = useState(true);
  const [notifications, setNotifications] = useState(true);
  const [currentView, setCurrentView] = useState("dashboard");
  const [darkMode, setDarkMode] = useState(false);

  // ... (keep all existing state and data)

  // Sample data
  const [readings] = useState({
    currentPH: 7.2,
    currentTurbidity: 1.8,
    currentTDS: 145,
    currentConductivity: 250,
  });

  const readingDescriptions = {
    PH: {
      tooltip: "pH level indicates water's acidity or alkalinity (0-14 scale)",
      details:
        "pH is a measure of how acidic/basic water is. The range goes from 0 to 14, with 7 being neutral.",
      safeRange: "6.5-8.5",
      importance: "Crucial for effective disinfection and water treatment.",
    },
    Turbidity: {
      tooltip: "Turbidity measures water clarity and particle content",
      details:
        "Turbidity is the cloudiness or haziness of water caused by suspended particles.",
      safeRange: "< 1 NTU",
      importance:
        "Indicates filtration effectiveness and potential contamination.",
    },
    TDS: {
      tooltip: "Total Dissolved Solids - measures dissolved minerals in water",
      details:
        "TDS represents the total concentration of dissolved substances in water.",
      safeRange: "< 500 mg/L",
      importance: "Affects water taste and quality of filtered output.",
    },
    Conductivity: {
      tooltip: "Electrical conductivity indicates ion concentration",
      details:
        "Conductivity measures water's ability to conduct electricity, indicating dissolved ion content.",
      safeRange: "200-800 µS/cm",
      importance:
        "Helps monitor dissolved mineral content and filter performance.",
    },
  };

  const [historicalData] = useState([
    { time: "00:00", ph: 7.1, turbidity: 1.7, tds: 142, conductivity: 248 },
    { time: "04:00", ph: 7.2, turbidity: 1.8, tds: 145, conductivity: 250 },
    { time: "08:00", ph: 7.3, turbidity: 1.9, tds: 148, conductivity: 252 },
    { time: "12:00", ph: 7.2, turbidity: 1.8, tds: 146, conductivity: 251 },
    { time: "16:00", ph: 7.1, turbidity: 1.7, tds: 144, conductivity: 249 },
    { time: "20:00", ph: 7.2, turbidity: 1.8, tds: 145, conductivity: 250 },
  ]);

  const [systemActivity] = useState([
    { time: "09:45", event: "Filter backwash completed", type: "maintenance" },
    {
      time: "08:30",
      event: "Water quality check - All parameters normal",
      type: "check",
    },
    {
      time: "07:15",
      event: "System self-diagnostic completed",
      type: "system",
    },
  ]);

  const [predictiveAnalysis] = useState({
    nextMaintenance: "2024-11-15",
    filterLifeRemaining: "85%",
    anomalyProbability: "2%",
    recommendations:
      "System operating optimally. Next maintenance recommended in 4 days.",
  });

  const MainDashboard = () => (
    <>
      {/* System Controls */}
      <Card
        className={`mb-6 ${
          darkMode
            ? "bg-gray-800 border-gray-700"
            : "bg-blue-50 border-blue-200"
        }`}
      >
        <CardHeader>
          <CardTitle className={darkMode ? "text-gray-200" : "text-blue-900"}>
            System Controls
          </CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div
            className={`flex items-center justify-between p-2 rounded-lg ${
              darkMode ? "bg-gray-700" : "bg-white"
            }`}
          >
            <div className="flex items-center">
              <Power
                className={`mr-2 h-4 w-4 ${
                  darkMode ? "text-blue-400" : "text-blue-600"
                }`}
              />
              <span className={darkMode ? "text-gray-200" : "text-gray-900"}>
                System Power
              </span>
            </div>
            <Switch
              checked={systemPower}
              onCheckedChange={setSystemPower}
              className={darkMode ? "bg-blue-500" : "bg-blue-600"}
            />
          </div>
          <div
            className={`flex items-center justify-between p-2 rounded-lg ${
              darkMode ? "bg-gray-700" : "bg-white"
            }`}
          >
            <div className="flex items-center">
              <RefreshCw
                className={`mr-2 h-4 w-4 ${
                  darkMode ? "text-blue-400" : "text-blue-600"
                }`}
              />
              <span className={darkMode ? "text-gray-200" : "text-gray-900"}>
                Auto Maintenance
              </span>
            </div>
            <Switch
              checked={autoMaintenance}
              onCheckedChange={setAutoMaintenance}
              className={darkMode ? "bg-blue-500" : "bg-blue-600"}
            />
          </div>
          <div
            className={`flex items-center justify-between p-2 rounded-lg ${
              darkMode ? "bg-gray-700" : "bg-white"
            }`}
          >
            <div className="flex items-center">
              <Bell
                className={`mr-2 h-4 w-4 ${
                  darkMode ? "text-blue-400" : "text-blue-600"
                }`}
              />
              <span className={darkMode ? "text-gray-200" : "text-gray-900"}>
                Notifications
              </span>
            </div>
            <Switch
              checked={notifications}
              onCheckedChange={setNotifications}
              className={darkMode ? "bg-blue-500" : "bg-blue-600"}
            />
          </div>
        </CardContent>
      </Card>

      {/* Current Readings */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {Object.entries(historicalData[0]).map(([param, _]) => {
          // Create a dynamic URL for each parameter (e.g., /parameters/ph)
          if (param !== "time") {
            return (
              <Link href={`/${param}`} key={param}>
                <Card
                  className={`${
                    darkMode
                      ? "bg-gray-800 border-gray-700"
                      : "bg-blue-50 border-blue-200"
                  } hover:shadow-lg transition-shadow duration-200`}
                >
                  <CardHeader className="pb-2">
                    <CardTitle
                      className={`text-sm font-medium ${
                        darkMode ? "text-gray-200" : "text-blue-900"
                      }`}
                    >
                      {param.charAt(0).toUpperCase() + param.slice(1)}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center">
                      <Activity
                        className={`mr-2 h-4 w-4 ${
                          darkMode ? "text-blue-400" : "text-blue-600"
                        }`}
                      />
                      <span
                        className={`text-2xl font-bold ${
                          darkMode ? "text-gray-200" : "text-blue-900"
                        }`}
                      >
                        {_}
                      </span>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            );
          }
          return null;
        })}
      </div>

      {/* Predictive Analysis */}
      <Card
        className={`mb-6 ${
          darkMode
            ? "bg-gray-800 border-gray-700"
            : "bg-blue-50 border-blue-200"
        }`}
      >
        <CardHeader>
          <CardTitle className={darkMode ? "text-gray-200" : "text-blue-900"}>
            Predictive Analysis
          </CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div
            className={`p-4 rounded-lg ${
              darkMode ? "bg-gray-700" : "bg-white"
            }`}
          >
            <h3
              className={`font-semibold mb-2 ${
                darkMode ? "text-gray-200" : "text-blue-900"
              }`}
            >
              Next Maintenance
            </h3>
            <div className="flex items-center">
              <Calendar
                className={`mr-2 h-4 w-4 ${
                  darkMode ? "text-blue-400" : "text-blue-600"
                }`}
              />
              <span className={darkMode ? "text-gray-300" : "text-gray-600"}>
                {predictiveAnalysis.nextMaintenance}
              </span>
            </div>
          </div>
          <div
            className={`p-4 rounded-lg ${
              darkMode ? "bg-gray-700" : "bg-white"
            }`}
          >
            <h3
              className={`font-semibold mb-2 ${
                darkMode ? "text-gray-200" : "text-blue-900"
              }`}
            >
              Filter Life
            </h3>
            <div className="flex items-center">
              <Activity
                className={`mr-2 h-4 w-4 ${
                  darkMode ? "text-blue-400" : "text-blue-600"
                }`}
              />
              <span className={darkMode ? "text-gray-300" : "text-gray-600"}>
                {predictiveAnalysis.filterLifeRemaining}
              </span>
            </div>
          </div>
          <div
            className={`p-4 rounded-lg ${
              darkMode ? "bg-gray-700" : "bg-white"
            }`}
          >
            <h3
              className={`font-semibold mb-2 ${
                darkMode ? "text-gray-200" : "text-blue-900"
              }`}
            >
              Anomaly Probability
            </h3>
            <div className="flex items-center">
              <AlertTriangle
                className={`mr-2 h-4 w-4 ${
                  darkMode ? "text-blue-400" : "text-blue-600"
                }`}
              />
              <span className={darkMode ? "text-gray-300" : "text-gray-600"}>
                {predictiveAnalysis.anomalyProbability}
              </span>
            </div>
          </div>
          <div
            className={`p-4 rounded-lg ${
              darkMode ? "bg-gray-700" : "bg-white"
            }`}
          >
            <h3
              className={`font-semibold mb-2 ${
                darkMode ? "text-gray-200" : "text-blue-900"
              }`}
            >
              Recommendations
            </h3>
            <p
              className={`text-sm ${
                darkMode ? "text-gray-300" : "text-gray-600"
              }`}
            >
              {predictiveAnalysis.recommendations}
            </p>
          </div>
        </CardContent>
      </Card>

      <Card
        className={`mb-6 ${
          darkMode
            ? "bg-gray-800 border-gray-700"
            : "bg-blue-50 border-blue-200"
        }`}
      >
        <CardHeader>
          <CardTitle className={darkMode ? "text-gray-200" : "text-blue-900"}>
            System Activity
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {systemActivity.map((activity, index) => (
              <div
                key={index}
                className={`flex items-center p-3 rounded-lg ${
                  darkMode ? "bg-gray-700" : "bg-white"
                }`}
              >
                <Clock
                  className={`mr-2 h-4 w-4 ${
                    darkMode ? "text-blue-400" : "text-blue-600"
                  }`}
                />
                <span
                  className={`text-sm font-medium mr-2 ${
                    darkMode ? "text-gray-200" : "text-gray-900"
                  }`}
                >
                  {activity.time}
                </span>
                <span
                  className={`text-sm ${
                    darkMode ? "text-gray-300" : "text-gray-600"
                  }`}
                >
                  {activity.event}
                </span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </>
  );

  const SettingsView = () => (
    <Card className="bg-blue-50">
      <CardHeader>
        <CardTitle className="text-blue-900">Settings</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="bg-white p-4 rounded-lg">
          <h3 className="font-semibold text-blue-900 mb-4">User Profile</h3>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span>Name</span>
              <span>John Doe</span>
            </div>
            <div className="flex items-center justify-between">
              <span>Email</span>
              <span>john@example.com</span>
            </div>
            <div className="flex items-center justify-between">
              <span>Role</span>
              <span>Administrator</span>
            </div>
          </div>
        </div>

        <div className="bg-white p-4 rounded-lg">
          <h3 className="font-semibold text-blue-900 mb-4">Software Update</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span>Current Version</span>
              <span>v2.1.0</span>
            </div>
            <div className="flex items-center justify-between">
              <span>Latest Version</span>
              <span>v2.1.1</span>
            </div>
            <Button className="w-full bg-blue-600 hover:bg-blue-700">
              Update System Software
            </Button>
          </div>
        </div>

        <div className="bg-white p-4 rounded-lg">
          <h3 className="font-semibold text-blue-900 mb-4">Data Management</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span>Auto Backup</span>
              <Switch className="bg-blue-600" />
            </div>
            <Button className="w-full bg-blue-600 hover:bg-blue-700">
              <Download className="mr-2 h-4 w-4" />
              Export System Data
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );

  const Toolbar = () => (
    <div
      className={`sticky top-0 z-50 w-full border-b ${
        darkMode ? "bg-gray-900 border-gray-800" : "bg-white border-gray-200"
      }`}
    >
      <div className="flex h-16 items-center px-4">
        <div className="flex items-center space-x-4">
          <Home
            className={`h-6 w-6 ${
              darkMode ? "text-gray-200" : "text-blue-600"
            }`}
          />
          <span
            className={`font-bold text-lg ${
              darkMode ? "text-gray-200" : "text-blue-900"
            }`}
          >
            ZeoLight
          </span>
        </div>

        <div className="ml-auto flex items-center space-x-4">
          <Button variant="ghost" size="icon">
            <HelpCircle
              className={`h-5 w-5 ${
                darkMode ? "text-gray-200" : "text-gray-600"
              }`}
            />
          </Button>
          <Button variant="ghost" size="icon">
            <FileText
              className={`h-5 w-5 ${
                darkMode ? "text-gray-200" : "text-gray-600"
              }`}
            />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setDarkMode(!darkMode)}
          >
            {darkMode ? (
              <Sun className="h-5 w-5 text-gray-200" />
            ) : (
              <Moon className="h-5 w-5 text-gray-600" />
            )}
          </Button>
        </div>
      </div>
    </div>
  );

  const Footer = () => (
    <footer
      className={`mt-auto py-6 border-t ${
        darkMode
          ? "bg-gray-900 border-gray-800 text-gray-200"
          : "bg-white border-gray-200 text-gray-600"
      }`}
    >
      <div className="max-w-6xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3
              className={`font-semibold mb-2 ${
                darkMode ? "text-gray-200" : "text-blue-900"
              }`}
            >
              Contact Us
            </h3>
            <div className="flex items-center space-x-2">
              <Mail className="h-4 w-4" />
              <a
                href="mailto:zeolightinnovations@gmail.com"
                className="hover:underline"
              >
                zeolightinnovations@gmail.com
              </a>
            </div>
          </div>
          <div className="text-right">
            <p className="text-sm">
              © 2024 Mindanao State University - Iligan Institute of Technology
            </p>
            <p className="text-sm">All Rights Reserved</p>
          </div>
        </div>
      </div>
    </footer>
  );

  // Modify the main return statement to include Toolbar and Footer
  return (
    <div
      className={`min-h-screen flex flex-col ${
        darkMode ? "bg-gray-950" : "bg-gray-50"
      }`}
    >
      <Toolbar />
      <div className="flex-grow p-6">
        <div className="max-w-6xl mx-auto">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h1
                className={`text-3xl font-bold mb-2 ${
                  darkMode ? "text-gray-200" : "text-blue-900"
                }`}
              >
                ZeoLight Water Quality Dashboard
              </h1>
              <p className={darkMode ? "text-gray-400" : "text-blue-600"}>
                Real-time monitoring of your water filtration system
              </p>
            </div>
            <div className="flex gap-2">
              <Button
                variant={currentView === "dashboard" ? "default" : "outline"}
                className={currentView === "dashboard" ? "bg-blue-600" : ""}
                onClick={() => setCurrentView("dashboard")}
              >
                <Activity className="mr-2 h-4 w-4" />
                Dashboard
              </Button>
              <Button
                variant={currentView === "settings" ? "default" : "outline"}
                className={currentView === "settings" ? "bg-blue-600" : ""}
                onClick={() => setCurrentView("settings")}
              >
                <Settings className="mr-2 h-4 w-4" />
                Settings
              </Button>
            </div>
          </div>

          {currentView === "dashboard" ? <MainDashboard /> : <SettingsView />}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default WaterQualityDashboard;
