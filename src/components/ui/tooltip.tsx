import React, { createContext, useContext, useState } from 'react';

interface TooltipContextType {
  tooltip: string | null;
  setTooltip: (text: string | null) => void;
}

const TooltipContext = createContext<TooltipContextType>({
  tooltip: null,
  setTooltip: () => {}
});

export const TooltipProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [tooltip, setTooltip] = useState<string | null>(null);

  return (
    <TooltipContext.Provider value={{ tooltip, setTooltip }}>
      {children}
    </TooltipContext.Provider>
  );
};

export const useTooltip = () => useContext(TooltipContext);
