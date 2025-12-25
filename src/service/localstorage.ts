import type { filteredData } from "../interface/movieData";

type TItem = {
  value: filteredData[];
  expired: number;
};

type TLocalStorageProps = {
  key: string;
  value: filteredData[];
  ttl?: number;
};

export const setToLocalStorage = ({
  key,
  value,
  ttl = 3600000,
}: TLocalStorageProps) => {
  const item: TItem = {
    value: value,
    expired: Date.now() + ttl,
  };

  localStorage.setItem(key, JSON.stringify(item));
};

export const getByLocalStorage = (key: string): filteredData[] | null => {
  const cache = localStorage.getItem(key);

  if (!cache) return null;

  try {
    const item: TItem = JSON.parse(cache);

    if (Date.now() > item.expired) {
      localStorage.removeItem(key);
      return null;
    }
    return item.value;
  } catch (error) {
    console.error("Error parsing localStorage item", error);
    return null;
  }
};
