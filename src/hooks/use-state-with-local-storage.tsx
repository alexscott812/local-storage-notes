import { useState, useEffect, useCallback } from 'react';

const useStateWithLocalStorage = (key: string) => {
  const [value, setValue] = useState<string>(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item || '';
    } catch (error) {
      console.warn(error);
      return '';
    }
  });

  useEffect(() => {
    const onLocalStorageChange = (e: StorageEvent) => {
      if (
        (e.storageArea === localStorage) &&
        (e.key === key) &&
        (e.oldValue !== e.newValue)
      ) {
        setValue(e.newValue || '');
      }
    };
    window.addEventListener('storage', onLocalStorageChange);
    return () => {
      window.removeEventListener('storage', onLocalStorageChange);
    }
  }, [key]);

  const setPersistedValue = useCallback((newState: string) => {
    try {
      localStorage.setItem(key, newState);
    } catch (error) {
      console.warn(error);
    }
    setValue(newState);
  }, [key]);

  return [value, setPersistedValue] as const;
};

export default useStateWithLocalStorage;
