/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { createContext, useContext, useState } from 'react';

const myHistoryContext = createContext<any>(null);

type CProps = {
  children: React.ReactNode;
};

export function MyHistoryProvider({ children }: CProps) {
  const [myHistory, setMyHistory] = useState<any[]>([]);

  const push = (location: any[]) => setMyHistory([...myHistory, location]);

  return (
    <myHistoryContext.Provider value={{ myHistory, push }}>
      {children}
    </myHistoryContext.Provider>
  );
}

export const useMyHistory = () => useContext(myHistoryContext);
