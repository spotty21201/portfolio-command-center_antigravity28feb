import { createContext, useContext, useState, ReactNode } from 'react';

export type Currency = 'IDR' | 'USD';
export type Role = 'CEO' | 'Risk Officer' | 'BU CEO';

interface AppState {
  currency: Currency;
  setCurrency: (c: Currency) => void;
  role: Role;
  setRole: (r: Role) => void;
  dateRange: string;
  setDateRange: (d: string) => void;
}

const AppContext = createContext<AppState | undefined>(undefined);

export function AppProvider({ children }: { children: ReactNode }) {
  const [currency, setCurrency] = useState<Currency>('IDR');
  const [role, setRole] = useState<Role>('CEO');
  const [dateRange, setDateRange] = useState<string>('YTD 2026');

  return (
    <AppContext.Provider value={{ currency, setCurrency, role, setRole, dateRange, setDateRange }}>
      {children}
    </AppContext.Provider>
  );
}

export function useAppStore() {
  const context = useContext(AppContext);
  if (!context) throw new Error('useAppStore must be used within AppProvider');
  return context;
}
