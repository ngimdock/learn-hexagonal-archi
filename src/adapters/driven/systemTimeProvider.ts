import { TimeProvider } from "../../hexagon/ports/driven/timeProvider";

export const systemTimeProvider = (): TimeProvider => {
  return {
    getTime: () => new Date(),
  };
};
