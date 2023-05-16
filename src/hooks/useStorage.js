import { useState, useEffect } from 'react';

export const useStorage = (key, initialValue, raw) => {
  const getItem = (key) => {
    const item = localStorage.getItem(key);
    if (!item) {
      return undefined;
    }
    return typeof item === 'string' ? item : JSON.parse(item);
  };

  const setItem = (key, value) => {
    localStorage.setItem(key, raw ? value : JSON.stringify(value));
  };

  const [storedValue, setStoredValue] = useState(() => {
    return getItem(key) || initialValue;
  });

  const setValue = (value) => {
    setItem(key, value, raw);
    setStoredValue(value);
  };

  useEffect(() => {
    setStoredValue(getItem(key) || initialValue);
  }, [key, initialValue]);

  return [storedValue, setValue];
};
