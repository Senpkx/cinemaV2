import type { IEndpoints } from "../interface/endpointsInterface";

export const extractFromInput = (name: string): IEndpoints => {
  if (!name) {
    return { name: "" };
  }
  const lastElem = Number(name.slice(-4));
  if (!isNaN(lastElem)) {
    return {
      name: name.slice(0, -4).trim(),
      year: lastElem,
    };
  }
  return {
    name: name,
  };
};
