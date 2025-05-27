import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "@/pages/login";
import GamePage from "@/pages/game";
import HistoryPage from "@/pages/history";
import Navbar from "@/features/ui/Navbar/Navbar";
import PrivateRoute from "@/features/auth/ui/PrivateRoute/PrivateRoute";
import { useAppSelector } from "./providers/store";

const App: React.FC = () => {
  const { isAuthenticated } = useAppSelector((state) => state.auth);

  return (
    <>
      {isAuthenticated && <Navbar />}
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route
          path="/game"
          element={
            <PrivateRoute>
              <GamePage />
            </PrivateRoute>
          }
        />
        <Route
          path="/history"
          element={
            <PrivateRoute>
              <HistoryPage />
            </PrivateRoute>
          }
        />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </>
  );
};

export default App;