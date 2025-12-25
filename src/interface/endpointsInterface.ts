import type { ReactNode } from "react";

export interface IEndpoints {
  name?: string | undefined;
  year?: number;
}

export interface IChildrenProps {
  children: ReactNode;
}

export interface params extends IEndpoints {
  list?: string;
  token_movie?: string;
  genre?: string;
}
