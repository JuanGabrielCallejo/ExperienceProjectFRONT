import { useEffect, useState } from "react";

export const useLocalStorage = (key, defaultValue) => {
  const localStorageValue = localStorage.getItem(key);
  const [state, setState] = useState(localStorageValue ? (localStorageValue) : defaultValue);
  useEffect(() => {
    if (state) {
      localStorage.setItem(key, state);
    }
  }, [key, state]);

  return [state, setState];
};
