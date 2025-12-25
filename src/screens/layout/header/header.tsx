import { useCallback, type FC } from "react";
import { getMovies } from "../../../service/axios";
import style from "./header.module.scss";
import { Search } from "./search/search";
import { useMovieList } from "../../../hooks/MovieListContex";
import { Popcorn } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import {
  getByLocalStorage,
  setToLocalStorage,
} from "../../../service/localstorage";
import type { ApiResponse } from "../../../interface/apiResponse";
import type { MovieData } from "../../../interface/movieData";
import type { filteredData } from "../../../interface/movieData";

export const Header: FC = () => {
  const { isActive, setIsActive, setMoviesList } = useMovieList();
  const navigate = useNavigate();

  const listData = [
    { path: "movie", name: "Фильмы" },
    { path: "serial", name: "Сериалы" },
    { path: "tv-show", name: "TV show" },
  ];

  const handleClick = useCallback(
    async (list: string) => {
      try {
        const cached = getByLocalStorage(list);
        if (cached) {
          setMoviesList(cached);
          setIsActive(list);
          navigate(`list/${list}`);
          return;
        }
        const response = await getMovies<ApiResponse<MovieData[]>>({
          list,
        });

        const filteredData: filteredData[] = response.data.map((item) => ({
          age_restrictions: item.age_restrictions,
          poster: item.poster,
          name: item.name,
          genre: item.genre,
          year: item.year,
          rating_imdb: item.rating_imdb,
          token_movie: item.token_movie,
        }));

        setToLocalStorage({ key: list, value: filteredData });
        setMoviesList(response.data);
        setIsActive(list);
        navigate(`list/${list}`);
      } catch (error) {
        console.error("Ошибка при загрузке списка:", error);
      }
    },
    [navigate]
  );

  return (
    <div className={style.container}>
      <Link
        to="/"
        onClick={() => {
          setIsActive("");
        }}
      >
        <Popcorn className={style.logo} />
      </Link>
      <header className={style.header}>
        <nav>
          <ul className={style.list}>
            {listData.map((item) => (
              <li
                key={item.path}
                onClick={() => {
                  handleClick(item.path);
                }}
                className={
                  isActive === item.path
                    ? `${style.link} ${style.active}`
                    : style.link
                }
              >
                <button>{item.name}</button>
              </li>
            ))}
          </ul>
        </nav>
        <Search />
      </header>
    </div>
  );
};
