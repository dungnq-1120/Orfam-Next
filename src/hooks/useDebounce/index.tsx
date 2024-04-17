import { useEffect, useState } from "react";

export default function useDebounce(value: string, timer: number) {
  const [debounceValue, setDebounceValue] = useState<string>(value);
  useEffect(() => {
    const timeout = setTimeout(() => {
      setDebounceValue(value);
    }, timer);

    return () => {
      clearTimeout(timeout);
    };
  }, [value, timer]);

  return debounceValue;
}
