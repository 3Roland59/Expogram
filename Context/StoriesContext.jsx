import React, { createContext, useContext } from "react";
import useFetchStories from "../Hooks/useFetchStories";

const StoriesContext = createContext();

export const StoriesProvider = ({ children }) => {
  const { stories, updatedStories } = useFetchStories();


  return (
    <StoriesContext.Provider value={{ stories, updatedStories }}>
      {children}
    </StoriesContext.Provider>
  );
};

export const useStoriesContext = () => useContext(StoriesContext);
