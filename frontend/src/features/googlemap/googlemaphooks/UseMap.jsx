import { useContext, createContext } from 'react';

export const LocationContext = createContext();

export const useLocation = () => {
  return useContext(LocationContext);
};
