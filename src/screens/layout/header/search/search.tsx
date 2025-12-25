import React, { useRef, useState, type FC } from "react";
import type { IEndpoints } from "../../../../interface/endpointsInterface";
import style from "./search.module.scss";
import { useMovieList } from "../../../../hooks/MovieListContex";
import { useNavigate } from "react-router-dom";
import { handleButton } from "../../../../components/handleButton";

export const Search: FC = () => {
  const [inputValue, setInputValue] = useState<IEndpoints>({ name: "" });
  const [error, setError] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  const { setMovieData } = useMovieList();

  const handleClick = async (): Promise<void> => {
    try {
      const response = await handleButton({ setError, inputValue });
      if (!response) {
        setError("Нет данных");
        return;
      }
      console.log(response);
      setMovieData(response);
      navigate(`movie/${inputValue.name}`);
      setInputValue({ name: "" });
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const value = inputRef.current?.value ?? "";
    const currentValue = e.target.value;

    if (!currentValue.trim()) {
      setError("не может быть пустым");
      setInputValue({ name: currentValue });
      setIsLoading(true);

      return;
    }
    if (/^[a-zA-Zа-яА-ЯёЁ0-9\s]*$/.test(currentValue)) {
      setError("");
      setIsLoading(false);
      setInputValue({ name: value });
    } else {
      setError("только буквы и цыфры");
    }
  };
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleClick();
    }
  };
  return (
    <div className={style.container}>
      <div>
        <input
          className={style.input}
          type="text"
          onChange={handleInput}
          value={inputValue.name}
          ref={inputRef}
          onKeyDown={handleKeyDown}
          placeholder="Название фильма и год"
        />

        {error && <div className={style.error}>{error}</div>}
      </div>
      <button
        className={style.button}
        disabled={isLoading}
        onClick={handleClick}
      >
        {!isLoading ? "Найти" : "Поиск..."}
      </button>
    </div>
  );
};
