import { useEffect } from 'react';

export function useDebounceEffect(fn, waitTime, deps) {
  useEffect(() => {
    const timeout = setTimeout(fn, waitTime);

    return () => {
      clearTimeout(timeout);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
}
