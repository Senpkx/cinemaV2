import { useEffect, type FC } from "react";
import MovieList from "../movieList/movieList";
import { getMovies } from "../../service/axios";
import { useMovieList } from "../../hooks/MovieListContex";
import type { ApiResponse } from "../../interface/apiResponse";
import type { MovieData } from "../../interface/movieData";
import {
  getByLocalStorage,
  setToLocalStorage,
} from "../../service/localstorage";

const Home: FC = () => {
  const { setMoviesList } = useMovieList();

  useEffect(() => {
    const getMovieInHome = async (): Promise<void> => {
      const cache = getByLocalStorage("2025");
      console.log(cache);
      if (cache) {
        setMoviesList(cache);
      }
      try {
        const response = await getMovies<ApiResponse<MovieData[]>>({
          genre: "2025",
        });

        setToLocalStorage({ key: "2025", value: response.data });
        setMoviesList(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    getMovieInHome();
  }, []);

  return <MovieList />;
};
export default Home;
