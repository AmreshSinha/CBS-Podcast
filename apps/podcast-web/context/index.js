import { createContext, useState } from "react";

export const GlobalContext = createContext();

export default function ContextProvider({ children }) {
  const [episode, setEpisode] = useState({});
  console.log(episode);
  return (
    <GlobalContext.Provider value={episode}>{children}</GlobalContext.Provider>
  );
}
