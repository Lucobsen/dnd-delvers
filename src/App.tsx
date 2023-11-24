import React, { lazy } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Provider } from "react-redux";
import { store } from "./store/store";
import { styled } from "@mui/material";
import { NavBar } from "./components/Navbar/Navbar";
import { Footer } from "./components/Footer/Footer";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

const HoardPage = lazy(() => import("./pages/Hoard"));
const HeroPage = lazy(() => import("./pages/Hero"));
const SkillPage = lazy(() => import("./pages/Skills"));
const InventoryPage = lazy(() => import("./pages/Inventory"));
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
              <Route path="/" element={<HoardPage />} />
              <Route path="/:id/details" element={<HeroPage />} />
              <Route path="/:id/skills" element={<SkillPage />} />
              <Route path="/:id/inventory" element={<InventoryPage />} />
              <Route path="/:id/feats" element={<FeatsPage />} />
              <Route path="/:id/spells" element={<SpellsPage />} />
            </Routes>
            <Footer />
          </BrowserRouter>
        </AppWrapper>
      </Provider>
    </QueryClientProvider>
  );
};
