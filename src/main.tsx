import { StrictMode } from "react";
import "./global.scss";
import { lazy } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { MovieProvider } from "./hooks/MovieListContex";
import { createRoot } from "react-dom/client";

const Layout = lazy(() => import("./screens/layout/layout"));
const MovieList = lazy(() => import("./screens/movieList/movieList"));
const Movie = lazy(() => import("./screens/movie/movie"));
const Home = lazy(() => import("./screens/home/home"));

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <MovieProvider>
        <Layout />
      </MovieProvider>
    ),
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "list/:list",
        element: <MovieList />,
      },
      {
        path: "movie/:id",
        element: <Movie />,
      },
    ],
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
