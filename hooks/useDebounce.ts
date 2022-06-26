import { useEffect, useState } from 'react';

const useDebounce = (value: string) => {
  const [debouncedState, setDecouncedState] = useState(value);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDecouncedState(value);
    }, 300);

    return () => clearTimeout(timer);
  }, [value]);

  return debouncedState;
};

export default useDebounce;
