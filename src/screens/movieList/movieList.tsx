import { useCallback, type FC } from "react";
import { useMovieList } from "../../hooks/MovieListContex";
import style from "./movieList.module.scss";
// import { getMovieByToken } from "../../service/axios";
import { useNavigate } from "react-router-dom";
import { getMovies } from "../../service/axios";
import type { ApiResponse } from "../../interface/apiResponse";
import type { MovieData } from "../../interface/movieData";

const MovieList: FC = () => {
  const { moviesList, setMovieData, setIsActive } = useMovieList();
  const navigate = useNavigate();
  const handleClick = useCallback(
    async (id: string | undefined): Promise<void> => {
      try {
        const response = await getMovies<ApiResponse<MovieData>>({
          token_movie: id,
        });
        setMovieData(response.data);
        navigate(`/movie/${id}`);
        setIsActive("");
      } catch (error) {
        console.log(error);
      }
    },
    [navigate]
  );

  return (
    <div className={style.container}>
      {moviesList ? (
        moviesList.map((item, inx) => (
          <div
            className={style.content}
            key={inx}
            onClick={(e) => {
              e.preventDefault();
              handleClick(item.token_movie);
            }}
          >
            {item.poster ? (
              <img className={style.poster} src={item.poster} alt="" />
            ) : (
              <img className={style.notfound} src="/not-found.webp" alt="" />
            )}
            <div className={style.info}>
              <div className={style.name}>{item.name}</div>
              <div className={style.genre}>{item.genre}</div>
              <div className={style.secound_info}>
                <div>{item.year}</div>
                <div>
                  {item.age_restrictions ? "+" + item.age_restrictions : ""}
                </div>
                <div>IMDb:{item.rating_imdb}</div>
              </div>
            </div>
          </div>
        ))
      ) : (
        <div>Not found movies</div>
      )}
    </div>
  );
};
export default MovieList;
