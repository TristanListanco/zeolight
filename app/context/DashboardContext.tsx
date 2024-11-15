"use client";
import React, { createContext, useContext, useState } from 'react';
import { DashboardContextType } from '@/lib/types/dashboard';

const DashboardContext = createContext<DashboardContextType | undefined>(undefined);

export function DashboardProvider({ children }: { children: React.ReactNode }) {
  const [darkMode, setDarkMode] = useState(false);
  const [currentView, setCurrentView] = useState('dashboard');
  const [systemPower, setSystemPower] = useState(true);
  const [autoMaintenance, setAutoMaintenance] = useState(true);
  const [notifications, setNotifications] = useState(true);

  return (
    <DashboardContext.Provider value={{
      darkMode,
      setDarkMode,
      currentView,
      setCurrentView,
      systemPower,
      setSystemPower,
      autoMaintenance,
      setAutoMaintenance,
      notifications,
      setNotifications,
    }}>
      {children}
    </DashboardContext.Provider>
  );
}

export const useDashboard = () => {
  const context = useContext(DashboardContext);
  if (context === undefined) {
    throw new Error('useDashboard must be used within a DashboardProvider');
  }
  return context;
};