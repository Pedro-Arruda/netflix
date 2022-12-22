import { Route } from "react-router";
import { Routes } from "react-router-dom";
import { Home } from "./pages/Home/Home";
import { MovieDetails } from "./pages/MovieDetails/MovieDetails";

export const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/details/:id" element={<MovieDetails />} />
    </Routes>
  );
};
