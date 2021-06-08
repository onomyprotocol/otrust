import { useCallback, useState } from 'react';

export function useAsyncFn(fn) {
  const [{ isWorking, error }, setState] = useState({
    error: null,
    isWorking: false,
  });

  const cb = useCallback(
    async (...args) => {
      let result;
      setState({
        error: null,
        isWorking: true,
      });
      try {
        result = await fn(...args);
        setState({
          error: null,
          isWorking: false,
        });
      } catch (error) {
        setState({
          error,
          isWorking: false,
        });
        throw error;
      }
      return result;
    },
    [fn],
  );

  return [cb, isWorking, error];
}
