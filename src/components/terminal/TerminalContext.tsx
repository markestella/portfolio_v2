"use client";

import { createContext, useContext, useReducer, type ReactNode } from "react";

// Types
export interface TerminalLine {
  id: string;
  type: "input" | "output" | "error" | "ascii" | "json" | "system";
  content: string | React.ReactNode;
  timestamp: Date;
}

interface TerminalState {
  history: TerminalLine[];
  currentInput: string;
  commandHistory: string[];
  historyIndex: number;
  isLoading: boolean;
  theme: "leather" | "dark";
}

type TerminalAction =
  | { type: "ADD_LINE"; payload: TerminalLine }
  | { type: "SET_INPUT"; payload: string }
  | { type: "CLEAR_HISTORY" }
  | { type: "ADD_TO_COMMAND_HISTORY"; payload: string }
  | { type: "SET_HISTORY_INDEX"; payload: number }
  | { type: "SET_LOADING"; payload: boolean }
  | { type: "TOGGLE_THEME" };

// Initial state
const initialState: TerminalState = {
  history: [],
  currentInput: "",
  commandHistory: [],
  historyIndex: -1,
  isLoading: false,
  theme: "leather",
};

// Reducer
function terminalReducer(state: TerminalState, action: TerminalAction): TerminalState {
  switch (action.type) {
    case "ADD_LINE":
      return {
        ...state,
        history: [...state.history, action.payload],
      };
    
    case "SET_INPUT":
      return {
        ...state,
        currentInput: action.payload,
      };
    
    case "CLEAR_HISTORY":
      return {
        ...state,
        history: [],
        historyIndex: -1,
      };
    
    case "ADD_TO_COMMAND_HISTORY":
      return {
        ...state,
        commandHistory: [...state.commandHistory, action.payload],
        historyIndex: -1,
      };
    
    case "SET_HISTORY_INDEX":
      return {
        ...state,
        historyIndex: action.payload,
      };
    
    case "SET_LOADING":
      return {
        ...state,
        isLoading: action.payload,
      };
    
    case "TOGGLE_THEME":
      return {
        ...state,
        theme: state.theme === "leather" ? "dark" : "leather",
      };
    
    default:
      return state;
  }
}

// Context
interface TerminalContextType {
  state: TerminalState;
  dispatch: React.Dispatch<TerminalAction>;
  addLine: (line: Omit<TerminalLine, "id" | "timestamp">) => void;
  clearHistory: () => void;
  setInput: (input: string) => void;
  navigateHistory: (direction: "up" | "down") => void;
}

const TerminalContext = createContext<TerminalContextType | null>(null);

// Provider
export function TerminalProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(terminalReducer, initialState);

  const addLine = (line: Omit<TerminalLine, "id" | "timestamp">) => {
    dispatch({
      type: "ADD_LINE",
      payload: {
        ...line,
        id: `${line.type}-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
        timestamp: new Date(),
      },
    });
  };

  const clearHistory = () => {
    dispatch({ type: "CLEAR_HISTORY" });
  };

  const setInput = (input: string) => {
    dispatch({ type: "SET_INPUT", payload: input });
  };

  const navigateHistory = (direction: "up" | "down") => {
    const { commandHistory, historyIndex } = state;
    
    if (direction === "up") {
      const newIndex = Math.min(historyIndex + 1, commandHistory.length - 1);
      dispatch({ type: "SET_HISTORY_INDEX", payload: newIndex });
      
      if (newIndex >= 0 && newIndex < commandHistory.length) {
        const command = commandHistory[commandHistory.length - 1 - newIndex];
        dispatch({ type: "SET_INPUT", payload: command });
      }
    } else {
      const newIndex = Math.max(historyIndex - 1, -1);
      dispatch({ type: "SET_HISTORY_INDEX", payload: newIndex });
      
      if (newIndex >= 0) {
        const command = commandHistory[commandHistory.length - 1 - newIndex];
        dispatch({ type: "SET_INPUT", payload: command });
      } else {
        dispatch({ type: "SET_INPUT", payload: "" });
      }
    }
  };

  return (
    <TerminalContext.Provider
      value={{
        state,
        dispatch,
        addLine,
        clearHistory,
        setInput,
        navigateHistory,
      }}
    >
      {children}
    </TerminalContext.Provider>
  );
}

// Hook
export function useTerminal() {
  const context = useContext(TerminalContext);
  if (!context) {
    throw new Error("useTerminal must be used within a TerminalProvider");
  }
  return context;
}

// Utility function to generate unique IDs
export function generateId(prefix: string = "line"): string {
  return `${prefix}-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
}
