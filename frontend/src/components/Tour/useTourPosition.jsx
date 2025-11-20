import { useEffect, useState } from 'react';

export default function useTourPosition(target, open) {
  const [rect, setRect] = useState(null);
  const [arrowDir, setArrowDir] = useState('up');

  useEffect(() => {
    if (!open) return;

    const updatePos = () => {
      const el = document.querySelector(target);
      if (!el) return;

      const r = el.getBoundingClientRect();
      setRect(r);

      // 若上方放不下 → 箭頭往上，氣泡放在下方
      // if (r.top < 160) setArrowDir('down');
      // else setArrowDir('up');
    };

    updatePos();
    window.addEventListener('resize', updatePos);
    window.addEventListener('scroll', updatePos);

    return () => {
      window.removeEventListener('resize', updatePos);
      window.removeEventListener('scroll', updatePos);
    };
  }, [target, open]);

  return { rect, arrowDir };
}
