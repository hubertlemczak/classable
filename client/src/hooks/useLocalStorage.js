import { useEffect, useState } from 'react';

const useLocalStorage = (key, initialValue) => {
  const [value, setValue] = useState(() => {
    const storage = localStorage.getItem(key);
    if (storage) {
      return storage;
    }
    return typeof storage === 'function' ? initialValue() : initialValue;
  });

  useEffect(() => {
    localStorage.setItem(key, value);
  }, [value, key]);

  return [value, setValue];
};

export default useLocalStorage;
