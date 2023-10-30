import { Routes, Route } from "react-router-dom";
import { Suspense, lazy } from "react";
import PeopleDetailsPage from "../../pages/PeopleDetailsPage";
import { CircularProgress } from "@mui/material";

const PeoplesPage = lazy(() => import("../../pages/PeoplesPage"));
const FavoritesPage = lazy(() => import("../../pages/FavoritesPage"));

export const AppRouter = () => {
  return (
    <Suspense fallback={<CircularProgress />}>
      <Routes>
        <Route path="/peoples" element={<PeoplesPage />} />
        <Route path="/people/:id" element={<PeopleDetailsPage />} />
        <Route path="/favorites" element={<FavoritesPage />} />
        <Route path="*" element={<></>} />
      </Routes>
    </Suspense>
  );
};
