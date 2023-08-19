import "./App.css";
import React from "react";
import { CharacterSheet } from "./components/CharacterSheet/CharacterSheet";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

export const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="App">
        <CharacterSheet />
      </div>
    </QueryClientProvider>
  );
};
