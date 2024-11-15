"use client";
import React, { useState } from "react";
import { useParams } from "next/navigation"; // Access dynamic URL params
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip as TooltipRecharts,
  ResponsiveContainer,
} from "recharts";
import { ArrowLeft, RefreshCw, Download, Activity } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

// Define the type for parameterInfo
type ParameterInfo = {
  title: string;
  description: string;
  safeRange: string;
  importance: string;
};

type Data = {
  time: string;
  ph: number;
  turbidity: number;
  tds: number;
  conductivity: number;
};

// The `paramName` must be one of these keys
type ParameterName = keyof Data; // ph | turbidity | tds | conductivity

const parameterInfo: Record<string, ParameterInfo> = {
  ph: {
    title: "pH Level",
    description:
      "pH is a measure of how acidic/basic water is. The range goes from 0 to 14, with 7 being neutral.",
    safeRange: "6.5-8.5",
    importance: "Crucial for effective disinfection and water treatment.",
  },
  turbidity: {
    title: "Turbidity",
    description: "Turbidity measures the clarity of water.",
    safeRange: "< 1 NTU",
    importance: "Indicates filtration effectiveness.",
  },
  tds: {
    title: "TDS",
    description:
      "Total Dissolved Solids (TDS) measures the concentration of dissolved substances in water.",
    safeRange: "< 500 mg/L",
    importance: "Affects water taste and quality.",
  },
  conductivity: {
    title: "Conductivity",
    description:
      "Conductivity measures the water's ability to conduct electricity, indicating dissolved ions.",
    safeRange: "200-800 µS/cm",
    importance: "Helps monitor mineral content and filter performance.",
  },
};

const ParameterPage = () => {
 const params = useParams(); // Get the dynamic parameter from the URL
  const paramName: ParameterName = params.param as ParameterName; // Safely extract the parameter name
  const [darkMode, setDarkMode] = useState(false);

  // Filter the data based on the parameter from the URL
  const parameterData = data.map((item) => ({
    time: item.time,
    value: item[paramName],  // Safely access the parameter
  }));


  // Historical data for all parameters
  const [historicalData] = useState([
    { time: "00:00", ph: 7.1, turbidity: 1.7, tds: 142, conductivity: 248 },
    { time: "04:00", ph: 7.2, turbidity: 1.8, tds: 145, conductivity: 250 },
    { time: "08:00", ph: 7.3, turbidity: 1.9, tds: 148, conductivity: 252 },
    { time: "12:00", ph: 7.2, turbidity: 1.8, tds: 146, conductivity: 251 },
    { time: "16:00", ph: 7.1, turbidity: 1.7, tds: 144, conductivity: 249 },
    { time: "20:00", ph: 7.2, turbidity: 1.8, tds: 145, conductivity: 250 },
  ]);

  // Filter the data based on the parameter from the URL
  const parameterData = historicalData.map((data) => ({
    time: data.time,
    value: data[paramName],
  }));

  const exportToCSV = () => {
    const headers = ["Time", "Value"];
    const csvData = parameterData
      .map((row) => [row.time, row.value].join(","))
      .join("\n");
    const csvContent = [headers.join(","), csvData].join("\n");

    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.setAttribute("hidden", "");
    a.setAttribute("href", url);
    a.setAttribute("download", `${paramName}_readings.csv`);
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  const handleRefresh = () => {
    console.log("Refreshing data...");
  };

  return (
    <div className={`min-h-screen ${darkMode ? "bg-gray-950" : "bg-gray-50"}`}>
      <div className="max-w-7xl mx-auto p-6">
        {/* Header */}
        <div className="mb-8">
          <Link
            href="/"
            className={`inline-flex items-center mb-4 text-sm ${
              darkMode
                ? "text-gray-400 hover:text-gray-300"
                : "text-gray-600 hover:text-gray-800"
            }`}
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Dashboard
          </Link>

          <div className="flex items-center justify-between">
            <h1
              className={`text-4xl font-bold ${
                darkMode ? "text-gray-200" : "text-blue-900"
              }`}
            >
              {parameterInfo[paramName]?.title}
            </h1>
            <div className="flex items-center space-x-2">
              <Activity
                className={`w-8 h-8 ${
                  darkMode ? "text-blue-400" : "text-blue-600"
                }`}
              />
              <span
                className={`text-4xl font-bold ${
                  darkMode ? "text-gray-200" : "text-blue-900"
                }`}
              >
                {parameterData[parameterData.length - 1].value}
              </span>
            </div>
          </div>
        </div>

        {/* Info Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card
            className={
              darkMode
                ? "bg-gray-800 border-gray-700"
                : "bg-blue-50 border-blue-200"
            }
          >
            <CardHeader>
              <CardTitle
                className={darkMode ? "text-gray-200" : "text-blue-900"}
              >
                Safe Range
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className={darkMode ? "text-gray-300" : "text-gray-600"}>
                {parameterInfo[paramName]?.safeRange}
              </p>
            </CardContent>
          </Card>

          {/* Add more stat cards as needed */}
        </div>

        {/* Visualizations */}
        <Card
          className={`mb-8 ${
            darkMode
              ? "bg-gray-800 border-gray-700"
              : "bg-blue-50 border-blue-200"
          }`}
        >
          <CardHeader>
            <CardTitle className={darkMode ? "text-gray-200" : "text-blue-900"}>
              Trend Analysis
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div style={{ height: 400 }}>
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={parameterData}>
                  <CartesianGrid
                    strokeDasharray="3 3"
                    stroke={darkMode ? "#374151" : "#e5e7eb"}
                  />
                  <XAxis
                    dataKey="time"
                    stroke={darkMode ? "#9CA3AF" : "#4B5563"}
                  />
                  <YAxis stroke={darkMode ? "#9CA3AF" : "#4B5563"} />
                  <TooltipRecharts
                    contentStyle={{
                      backgroundColor: darkMode ? "#1F2937" : "#FFFFFF",
                    }}
                  />
                  <Area
                    type="monotone"
                    dataKey="value"
                    stroke="#3B82F6"
                    fill="#3B82F6"
                    fillOpacity={0.2}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Data Table */}
        <Card
          className={
            darkMode
              ? "bg-gray-800 border-gray-700"
              : "bg-blue-50 border-blue-200"
          }
        >
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle
                className={darkMode ? "text-gray-200" : "text-blue-900"}
              >
                Historical Data
              </CardTitle>
              <div className="flex space-x-2">
                <Button onClick={handleRefresh} variant="outline" size="sm">
                  <RefreshCw className="w-4 h-4 mr-2" />
                  Refresh
                </Button>
                <Button onClick={exportToCSV} variant="outline" size="sm">
                  <Download className="w-4 h-4 mr-2" />
                  Export CSV
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>{/* Table for Historical Data */}</CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ParameterPage;
