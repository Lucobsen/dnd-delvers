import "./App.css";
import React from "react";
import { Hero } from "./components/Hero/Hero";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

export const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="App">
        <Hero />
      </div>
    </QueryClientProvider>
  );
};
