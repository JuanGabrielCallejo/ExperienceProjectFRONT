import { useEffect, useState } from "react";

export const useLocalStorage = (key, defaultValue) => {
  const localStorageValue = localStorage.getItem(key);
  const [state, setState] = useState(localStorageValue ? JSON.parse(localStorageValue) : defaultValue);
  useEffect(() => {
    if (state) {
      localStorage.setItem(key, JSON.stringify(state));
    }
  }, [key, state]);

  return [state, setState];
};
