import React, { lazy } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Provider } from "react-redux";
import { store } from "./store/store";
import { ThemeProvider, styled } from "@mui/material";
import { NavBar } from "./components/Navbar/Navbar";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { HeroEditor } from "./pages/HeroEditor";
import { Analytics } from "@vercel/analytics/react";
import { theme } from "./theme";

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
      <ThemeProvider theme={theme}>
        <Provider store={store}>
          <AppWrapper>
            <BrowserRouter future={{ v7_startTransition: true }}>
              <NavBar />
              <Routes>
                <Route path="/" element={<HoardPage />} />
                <Route path="/:id" element={<HeroEditor />}>
                  <Route path="details" element={<HeroPage />} />
                  <Route path="skills" element={<SkillPage />} />
                  <Route path="inventory" element={<InventoryPage />} />
                  <Route path="feats" element={<FeatsPage />} />
                  <Route path="spells" element={<SpellsPage />} />
                </Route>
              </Routes>
            </BrowserRouter>
            <Analytics />
          </AppWrapper>
        </Provider>
      </ThemeProvider>
    </QueryClientProvider>
  );
};
