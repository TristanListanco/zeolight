// app/[parameter]/page.js
"use client";
import React, { useState, use } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  ArrowLeft,
  Download,
  CheckCircle,
  XCircle,
  Info,
  RefreshCw,
  RotateCcw,
  Droplets,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";

import Link from "next/link";
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  LineChart,
  Line,
  XAxis,
  YAxis,
} from "recharts";

const ParameterPage = ({ params: paramsPromise }) => {
  // Unwrap the params promise using React.use()
  const params = use(paramsPromise);
  const [historicalData] = useState([
    { time: "00:00", ph: 7.1, turbidity: 1.7, tds: 142, conductivity: 248 },
    { time: "04:00", ph: 7.2, turbidity: 1.8, tds: 145, conductivity: 250 },
    { time: "08:00", ph: 7.3, turbidity: 1.9, tds: 148, conductivity: 252 },
    { time: "12:00", ph: 7.2, turbidity: 1.8, tds: 146, conductivity: 251 },
    { time: "16:00", ph: 7.1, turbidity: 1.7, tds: 144, conductivity: 249 },
    { time: "20:00", ph: 7.2, turbidity: 1.8, tds: 145, conductivity: 250 },
  ]);

  // Add backwashing state
  const [backwashingState, setBackwashingState] = useState({
    isActive: false,
    lastBackwash: "2024-11-19 14:30",
    nextScheduled: "2024-11-21 14:30",
    cyclesDone: 245,
    efficiency: "97%",
    duration: "10 minutes",
    waterSaved: "2500L",
  });

  const [sensorStatus] = useState({
    isConnected: true,
    lastCalibration: "2024-11-15",
    accuracy: "98%",
    batteryLevel: "85%",
    maintenance: "Good",
    signalStrength: "Strong",
  });

  // Add backwashing control functions
  const startBackwashing = () => {
    setBackwashingState((prev) => ({
      ...prev,
      isActive: true,
    }));
    // In a real application, you would trigger the actual backwashing process here
    setTimeout(() => {
      setBackwashingState((prev) => ({
        ...prev,
        isActive: false,
        lastBackwash: new Date().toLocaleString(),
        cyclesDone: prev.cyclesDone + 1,
      }));
    }, 10000); // Simulate 10 second backwashing cycle
  };

  const parameterInfo = {
    ph: {
      name: "pH Level",
      unit: "pH",
      description: "Measure of water's acidity or alkalinity",
      safeRange: "6.5-8.5",
      color: "#3b82f6",
      details: {
        importance:
          "pH is crucial for water quality as it affects chemical reactions, biological processes, and the effectiveness of water treatment.",
        effects:
          "Extreme pH levels can corrode pipes, affect taste, and impact aquatic life.",
        measurement:
          "Measured using a pH probe that detects hydrogen ion concentration.",
        maintenance:
          "Regular calibration using buffer solutions is recommended.",
      },
      sensor: {
        type: "Digital pH Sensor",
        model: "PHT-2000",
        accuracy: "±0.1 pH",
        range: "0-14 pH",
      },
    },
    turbidity: {
      name: "Turbidity",
      unit: "NTU",
      description: "Measure of water clarity",
      safeRange: "< 1 NTU",
      color: "#22c55e",
      details: {
        importance:
          "Turbidity indicates water clarity and can signal presence of contaminants.",
        effects:
          "High turbidity can shelter harmful organisms and reduce disinfection effectiveness.",
        measurement:
          "Measured using light scatter principles with a nephelometer.",
        maintenance: "Regular cleaning of optical surfaces is essential.",
      },
      sensor: {
        type: "Optical Turbidity Sensor",
        model: "TBD-1500",
        accuracy: "±2% of reading",
        range: "0-1000 NTU",
      },
    },
    tds: {
      name: "Total Dissolved Solids",
      unit: "mg/L",
      description: "Measure of dissolved substances in water",
      safeRange: "< 500 mg/L",
      color: "#f59e0b",
      details: {
        importance: "TDS indicates mineral content and overall water quality.",
        effects:
          "High TDS can affect taste and indicate presence of harmful contaminants.",
        measurement:
          "Measured using conductivity and temperature compensation.",
        maintenance: "Regular electrode cleaning and calibration required.",
      },
      sensor: {
        type: "Digital TDS Sensor",
        model: "TDS-3000",
        accuracy: "±2%",
        range: "0-1000 mg/L",
      },
    },
    conductivity: {
      name: "Conductivity",
      unit: "µS/cm",
      description: "Measure of water's ability to conduct electricity",
      safeRange: "200-800 µS/cm",
      color: "#8b5cf6",
      details: {
        importance:
          "Conductivity indicates dissolved ion content and mineralization.",
        effects:
          "Abnormal levels can indicate pollution or water quality issues.",
        measurement: "Measured using electrodes that detect ionic content.",
        maintenance: "Regular electrode cleaning and calibration needed.",
      },
      sensor: {
        type: "Digital Conductivity Sensor",
        model: "CON-4000",
        accuracy: "±1%",
        range: "0-2000 µS/cm",
      },
    },
  };

  const parameter = params.parameter;
  const info = parameterInfo[parameter];

  const getSensorStatusColor = (status) => {
    return status ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800";
  };

  const exportToCSV = () => {
    const headers = ["Time", `${info.name} (${info.unit})`];
    const dataRows = historicalData.map(
      (data) => `${data.time},${data[parameter]}`
    );
    const csvContent = [headers.join(","), ...dataRows].join("\n");

    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", `${parameter}_data.csv`);
    document.body.appendChild(link);
    link.click();
    link.remove();
  };

  

  if (!info) {
    return (
      <div className="p-6">
        <h1>Parameter not found</h1>
        <Link href="/">
          <Button>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Dashboard
          </Button>
        </Link>
      </div>
    );
  }
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="p-6 max-w-7xl mx-auto space-y-6">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-white p-6 rounded-lg shadow-sm">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="flex items-center gap-4">
              <Link href="/">
                <Button variant="outline" size="sm">
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Back
                </Button>
              </Link>
              <h1 className="text-2xl font-bold text-gray-900">
                {info.name} Analysis
              </h1>
            </div>
            <p className="text-gray-500">{info.description}</p>
          </div>
          <div className="flex items-center gap-3">
            <Badge
              variant="outline"
              className={`${
                sensorStatus.isConnected
                  ? "bg-green-50 text-green-700"
                  : "bg-red-50 text-red-700"
              }`}
            >
              {sensorStatus.isConnected ? (
                <CheckCircle className="w-4 h-4 mr-2" />
              ) : (
                <XCircle className="w-4 h-4 mr-2" />
              )}
              Sensor {sensorStatus.isConnected ? "Online" : "Offline"}
            </Badge>
            <Button
              onClick={() => window.location.reload()}
              variant="outline"
              size="sm"
            >
              <RefreshCw className="w-4 h-4 mr-2" />
              Refresh
            </Button>
          </div>
        </div>

        {/* Sensor Status Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Current Status */}
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">
                Sensor Status
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-500">Signal</span>
                  <Badge variant="secondary">
                    {sensorStatus.signalStrength}
                  </Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-500">Battery</span>
                  <Badge variant="secondary">{sensorStatus.batteryLevel}</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-500">
                    Last Calibration
                  </span>
                  <Badge variant="secondary">
                    {sensorStatus.lastCalibration}
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Sensor Details */}
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">
                Sensor Details
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-500">Model</span>
                  <Badge variant="secondary">{info.sensor.model}</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-500">Accuracy</span>
                  <Badge variant="secondary">{info.sensor.accuracy}</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-500">Range</span>
                  <Badge variant="secondary">{info.sensor.range}</Badge>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Parameter Info */}
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">
                Parameter Info
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-500">Safe Range</span>
                  <Badge variant="secondary">{info.safeRange}</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-500">Unit</span>
                  <Badge variant="secondary">{info.unit}</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-500">Status</span>
                  <Badge className="bg-green-100 text-green-800">Normal</Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* New Backwashing Status Card */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <Droplets className="h-4 w-4" />
              Backwashing Status
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-500">Status</span>
                <Badge
                  className={
                    backwashingState.isActive
                      ? "bg-blue-100 text-blue-800"
                      : "bg-green-100 text-green-800"
                  }
                >
                  {backwashingState.isActive ? "In Progress" : "Ready"}
                </Badge>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-500">Last Cycle</span>
                <span className="text-sm">{backwashingState.lastBackwash}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-500">Next Scheduled</span>
                <span className="text-sm">
                  {backwashingState.nextScheduled}
                </span>
              </div>
              <Button
                className="w-full mt-2"
                onClick={startBackwashing}
                disabled={backwashingState.isActive}
              >
                <RotateCcw className="mr-2 h-4 w-4" />
                {backwashingState.isActive
                  ? "Backwashing..."
                  : "Start Backwash"}
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex justify-between items-center">
              Backwashing Performance
              <Info className="h-4 w-4 text-gray-400" />
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="space-y-2">
                <h3 className="text-sm font-medium text-gray-500">
                  Total Cycles
                </h3>
                <p className="text-2xl font-bold">
                  {backwashingState.cyclesDone}
                </p>
              </div>
              <div className="space-y-2">
                <h3 className="text-sm font-medium text-gray-500">
                  Efficiency
                </h3>
                <p className="text-2xl font-bold">
                  {backwashingState.efficiency}
                </p>
              </div>
              <div className="space-y-2">
                <h3 className="text-sm font-medium text-gray-500">
                  Cycle Duration
                </h3>
                <p className="text-2xl font-bold">
                  {backwashingState.duration}
                </p>
              </div>
              <div className="space-y-2">
                <h3 className="text-sm font-medium text-gray-500">
                  Water Saved
                </h3>
                <p className="text-2xl font-bold">
                  {backwashingState.waterSaved}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex justify-between items-center">
                Historical Trend
                <Info className="h-4 w-4 text-gray-400" />
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={historicalData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="time" />
                    <YAxis />
                    <Tooltip />
                    <Area
                      type="monotone"
                      dataKey={parameter}
                      name={info.name}
                      stroke={info.color}
                      fill={info.color}
                      fillOpacity={0.2}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex justify-between items-center">
                Real-time Monitoring
                <Info className="h-4 w-4 text-gray-400" />
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={historicalData.slice(-5)}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="time" />
                    <YAxis />
                    <Tooltip />
                    <Line
                      type="monotone"
                      dataKey={parameter}
                      name={info.name}
                      stroke={info.color}
                      strokeWidth={2}
                      dot={{ r: 4 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Data Table */}
        <Card>
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle>Historical Data</CardTitle>
              <Button onClick={exportToCSV} variant="outline">
                <Download className="mr-2 h-4 w-4" />
                Export CSV
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-gray-50">
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Time
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      {info.name} ({info.unit})
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {historicalData.map((data, index) => {
                    const value = data[parameter];
                    const [min, max] = info.safeRange.split("-");
                    const isNormal =
                      value >= parseFloat(min) && value <= parseFloat(max);

                    return (
                      <tr key={index}>
                        <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-500">
                          {data.time}
                        </td>
                        <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-900">
                          {value}
                        </td>
                        <td className="px-4 py-2 whitespace-nowrap">
                          <Badge
                            className={
                              isNormal
                                ? "bg-green-100 text-green-800"
                                : "bg-red-100 text-red-800"
                            }
                          >
                            {isNormal ? "Normal" : "Abnormal"}
                          </Badge>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ParameterPage;
