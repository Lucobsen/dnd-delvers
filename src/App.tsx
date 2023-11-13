import React, { lazy } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Provider } from "react-redux";
import { store } from "./store/store";
import { styled } from "@mui/material";
import { NavBar } from "./components/Navbar/Navbar";
import { Footer } from "./components/Footer/Footer";
import { BrowserRouter, Route, Routes } from "react-router-dom";

const HeroPage = lazy(() => import("./pages/Hero"));
const SkillPage = lazy(() => import("./pages/Skills"));
const FeatsPage = lazy(() => import("./pages/Feats"));
const SpellsPage = lazy(() => import("./pages/Spells"));

const AppWrapper = styled("div")`
  text-align: center;
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
          <BrowserRouter future={{ v7_startTransition: true }}>
            <NavBar />
            <Routes>
              <Route path="/" element={<HeroPage />} />
              <Route path="/skills" element={<SkillPage />} />
              <Route path="/feats" element={<FeatsPage />} />
              <Route path="/spells" element={<SpellsPage />} />
            </Routes>
            <Footer />
          </BrowserRouter>
        </AppWrapper>
      </Provider>
    </QueryClientProvider>
  );
};
