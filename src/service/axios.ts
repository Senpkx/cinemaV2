import axios from "axios";
import type { params } from "../interface/endpointsInterface";

export const AxiosBase = axios.create({
  baseURL: "https://api.apbugall.org",
  timeout: 10000,
  params: { token: "04941a9a3ca3ac16e2b4327347bbc1" },
});

export const getMovies = async <T>({
  genre,
  list,
  token_movie,
  name,
  year,
}: params): Promise<T> => {
  try {
    const response = await AxiosBase.get<T>("/", {
      params: {
        genre,
        list,
        token_movie,
        name,
        year,
      },
      paramsSerializer: (params) => {
        return Object.entries(params)
          .map(([key, value]) => {
            if (genre) {
              if (key === "list" && !value) return "list";
            }
            if (value === "uhd|4k") return "uhd=true";
            if (value === "2025") return "year=2025";
            if (value) {
              return `${key}=${encodeURIComponent(value)}`;
            }
          })
          .join("&");
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};
