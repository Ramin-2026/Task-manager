import { useEffect, useState } from "react";

// مثل useState کار می‌کند ولی مقدار را در LocalStorage هم ذخیره می‌کند.
export default function useLocalStorage(key, initialValue) {
  const [value, setValue] = useState(() => {
    try {
      const saved = localStorage.getItem(key);
      return saved ? JSON.parse(saved) : initialValue;
    } catch {
      return initialValue;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch {
      // ذخیره‌سازی در دسترس نیست؛ برنامه بدون آن هم کار می‌کند.
    }
  }, [key, value]);

  return [value, setValue];
}
