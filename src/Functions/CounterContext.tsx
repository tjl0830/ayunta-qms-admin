import React, { createContext, useContext, useState, ReactNode } from "react";

interface CounterContextType {
  selectedCounter: string;
  setSelectedCounter: (counter: string) => void;
}

const CounterContext = createContext<CounterContextType | undefined>(undefined);

export const CounterProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [selectedCounter, setSelectedCounter] = useState<string>("");

  return (
    <CounterContext.Provider value={{ selectedCounter, setSelectedCounter }}>
      {children}
    </CounterContext.Provider>
  );
};

export const useCounter = (): CounterContextType => {
  const context = useContext(CounterContext);
  if (!context) {
    throw new Error("useCounter must be used within a CounterProvider");
  }
  return context;
};
