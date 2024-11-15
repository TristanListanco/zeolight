export type DashboardContextType = {
  darkMode: boolean;
  setDarkMode: (value: boolean) => void;
  currentView: string;
  setCurrentView: (value: string) => void;
  systemPower: boolean;
  setSystemPower: (value: boolean) => void;
  autoMaintenance: boolean;
  setAutoMaintenance: (value: boolean) => void;
  notifications: boolean;
  setNotifications: (value: boolean) => void;
};

export type ReadingType = {
  currentPH: number;
  currentTurbidity: number;
  currentTDS: number;
  currentConductivity: number;
};

export type HistoricalDataType = {
  time: string;
  ph: number;
  turbidity: number;
  tds: number;
  conductivity: number;
};