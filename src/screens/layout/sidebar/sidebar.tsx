import { useCallback, type FC } from "react";
import style from "./sidebar.module.scss";
import { getMovies } from "../../../service/axios";
import { useMovieList } from "../../../hooks/MovieListContex";
import { useNavigate } from "react-router-dom";
import {
  getByLocalStorage,
  setToLocalStorage,
} from "../../../service/localstorage";
import type { ApiResponse } from "../../../interface/apiResponse";
import type { filteredData, MovieData } from "../../../interface/movieData";

export const Sidebar: FC = () => {
  const { setIsActive, isActive, setMoviesList } = useMovieList();
  const navigate = useNavigate();

  const genres = [
    "аниме",
    "биография",
    "боевик",
    "вестерн",
    "военный",
    "детектив",
    "детский",
    "документальный",
    "драма",
    "игра",
    "история",
    "комедия",
    "концерт",
    "короткометражка",
    "криминал",
    "мелодрама",
    "музыка",
    "мультфильм",
    "мюзикл",
    "новости",
    "приключения",
    "реальное ТВ",
    "семейный",
    "спорт",
    "ток-шоу",
    "триллер",
    "ужасы",
    "фантастика",
    "фильм-нуар",
    "фэнтези",
    "церемония",
    "uhd|4k",
    "2025",
  ];

  const handleClick = useCallback(
    async (genre: string): Promise<void> => {
      try {
        const cache = getByLocalStorage(genre);
        if (cache) {
          setMoviesList(cache);
          setIsActive(genre);
          navigate(`list/${genre}`);
          return;
        }

        const response = await getMovies<ApiResponse<MovieData[]>>({ genre });
        const filteredData: filteredData[] = response.data.map((item) => ({
          age_restrictions: item.age_restrictions,
          poster: item.poster,
          name: item.name,
          genre: item.genre,
          year: item.year,
          rating_imdb: item.rating_imdb,
          token_movie: item.token_movie,
        }));

        setToLocalStorage({ key: genre, value: filteredData });
        setIsActive(genre);
        setMoviesList(response.data);
        navigate(`list/${genre}`);
      } catch (error) {}
    },

    [navigate]
  );
  return (
    <aside className={style.aside}>
      <nav>
        <ul className={style.genre_list}>
          {genres.map((genre, inx) => (
            <li
              key={inx}
              className={
                isActive === genre
                  ? `${style.genre} ${style.active}`
                  : style.genre
              }
              onClick={(e) => {
                e.preventDefault();
                handleClick(genre);
              }}
            >
              <button>{genre}</button>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
};
