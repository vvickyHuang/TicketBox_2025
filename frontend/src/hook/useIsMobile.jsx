import { useState, useEffect } from 'react';

export function useIsMobile(breakpoint = 640) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkScreen = () => {
      setIsMobile(window.innerWidth < breakpoint);
    };

    checkScreen(); // 初始化判斷
    window.addEventListener('resize', checkScreen);

    return () => {
      window.removeEventListener('resize', checkScreen);
    };
  }, [breakpoint]);

  return isMobile;
}
