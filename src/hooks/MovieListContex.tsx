import { createContext, useContext, useState, type FC } from "react";
import type { filteredData } from "../interface/movieData";
import type { IChildrenProps } from "../interface/endpointsInterface";

interface IMovieContextType {
  moviesList: filteredData[];
  setMoviesList: (movies: filteredData[]) => void;

  isActive: string;
  setIsActive: (isActive: string) => void;

  movieData: filteredData | null;
  setMovieData: (movieData: filteredData) => void;
}
const MovieListContext = createContext<IMovieContextType | undefined>(
  undefined
);

export const MovieProvider: FC<IChildrenProps> = ({ children }) => {
  const [moviesList, setMoviesList] = useState<filteredData[]>([]);
  const [isActive, setIsActive] = useState<string>("");
  const [movieData, setMovieData] = useState<filteredData | null>(null);
  return (
    <MovieListContext
      value={{
        moviesList,
        setMoviesList,
        isActive,
        setIsActive,
        movieData,
        setMovieData,
      }}
    >
      {children}
    </MovieListContext>
  );
};

export const useMovieList = () => {
  const context = useContext(MovieListContext);
  if (!context) {
    throw new Error("context error");
  }
  return context;
};
