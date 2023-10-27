import "./App.css";
import React from "react";
import { Hero } from "./components/Hero/Hero";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Provider } from "react-redux";
import { store } from "./store/store";

const queryClient = new QueryClient();

export const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        <div className="App">
          <Hero />
        </div>
      </Provider>
    </QueryClientProvider>
  );
};
