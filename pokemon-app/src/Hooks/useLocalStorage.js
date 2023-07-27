import { useState, useEffect } from "react";

/**
 * Custom hook that syncs a state to local storage.
 * Allows for persisting state across sessions.
 *
 * @param {string} key - The key used to store the state in local storage.
 * @param {*} defaultValue - The default value used when the key doesn't exist in local storage.
 *
 * @returns {Array} A state variable and a setter function, similar to `useState`.
 */
export function useLocalStorage(key, defaultValue) {
  const [state, setState] = useState(() => {
    try {
      const storedValue = window.localStorage.getItem(key);
      return storedValue ? JSON.parse(storedValue) : defaultValue;
    } catch (error) {
      console.error(`Failed to retrieve ${key} from localStorage`, error);
      return defaultValue;
    }
  });

  useEffect(() => {
    try {
      window.localStorage.setItem(key, JSON.stringify(state));
    } catch (error) {
      console.error(`Failed to save ${key} to localStorage`, error);
    }
  }, [state, key]);

  return [state, setState];
}
