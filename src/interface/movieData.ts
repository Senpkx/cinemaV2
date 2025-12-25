import type { TranslationIframe } from "./translationIframe";

export interface MovieData {
  name: string;
  year: number;
  category: number;
  token_movie: string;
  genre: string;
  age_restrictions: number;
  rating_mpaa: string;
  rating_kp: number;
  rating_imdb: number;
  poster: string;
  description: string;
  translation: string;
  translation_iframe: TranslationIframe;
  iframe: string;
}

export type filteredData = Partial<
  Pick<
    MovieData,
    | "age_restrictions"
    | "poster"
    | "name"
    | "genre"
    | "year"
    | "rating_imdb"
    | "token_movie"
    | "description"
    | "rating_kp"
    | "rating_mpaa"
    | "iframe"
  >
>;
