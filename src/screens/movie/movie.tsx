import type { FC } from "react";
import { useMovieList } from "../../hooks/MovieListContex";
import style from "./movies.module.scss";

const Movie: FC = () => {
  const { movieData } = useMovieList();

  return (
    <div className={style.container}>
      {movieData ? (
        <>
          <div className={style.movie_info}>
            <img
              className={style.poster}
              src={movieData.poster || "/not-found.webp"}
              alt=""
            />
            <div className={style.main_info}>
              <div className={style.name}>{movieData.name}</div>
              <div className={style.description}>{movieData.description}</div>
              <div>
                <div className={style.year_age}>
                  {movieData.year}
                  <div className={style.age}>
                    {movieData.age_restrictions
                      ? "+" + movieData.age_restrictions
                      : ""}
                  </div>
                </div>
              </div>
              {movieData.genre}
              <div className={style.ratings}>
                <div>
                  {" "}
                  {movieData.rating_imdb
                    ? `IMDb:   ${movieData.rating_imdb}`
                    : ""}
                </div>
                <div>
                  {movieData.rating_kp ? `KP:   ${movieData.rating_kp}` : ""}
                </div>
                <div>
                  {movieData.rating_mpaa
                    ? `MPAA: ${movieData.rating_mpaa}`
                    : ""}
                </div>
              </div>
            </div>
          </div>
          <iframe
            className={style.ifame}
            src={movieData.iframe}
            title={movieData.name}
            frameBorder="0"
            allowFullScreen
            loading="lazy"
          />
        </>
      ) : (
        <div>Not Found Movie</div>
      )}
    </div>
  );
};

export default Movie;
