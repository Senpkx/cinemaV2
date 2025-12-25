import type { ApiResponse } from "../interface/apiResponse";
import type { IEndpoints } from "../interface/endpointsInterface";
import type { MovieData } from "../interface/movieData";
import { getMovies } from "../service/axios";
import { extractFromInput } from "./extractFromInput";

type THandleButton = {
  setError: (error: string) => void;
  inputValue: IEndpoints;
};

export const handleButton = async ({
  setError,
  inputValue,
}: THandleButton): Promise<MovieData | null> => {
  if (!inputValue.name) {
    return null;
  }
  const endPoints = extractFromInput(inputValue.name);

  console.log(endPoints);

  try {
    const response = await getMovies<ApiResponse<MovieData>>(endPoints);
    if (response.status === "error") {
      setError(response.status);
      return response.data;
    }
    setError("");
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
