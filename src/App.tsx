import React from "react";
import { Hero } from "./components/Hero/Hero";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Provider } from "react-redux";
import { store } from "./store/store";
import { styled } from "@mui/material";

const AppWrapper = styled("div")`
  text-align: center;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-size: calc(10px + 2vmin);
  color: white;
`;

const queryClient = new QueryClient();

export const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        <AppWrapper>
          <Hero />
        </AppWrapper>
      </Provider>
    </QueryClientProvider>
  );
};
