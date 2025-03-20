import { type RefObject, useLayoutEffect, useCallback } from 'react';
import { useRouter, usePathname } from 'next/navigation';

interface ScrollRestoration {
  ref?: RefObject<HTMLElement>; // 선택적으로 특정 HTMLElement를 참조할 수 있는 ref
}

export const useScrollRestoration = ({ ref }: ScrollRestoration = { ref: undefined }) => {
  const router = useRouter();
  const pathname = usePathname();

  const saveScrollPos = useCallback(() => {
    const scrollPos = {
      x: window.pageXOffset || document.documentElement.scrollLeft,
      y: window.pageYOffset || document.documentElement.scrollTop
    };
    sessionStorage.setItem(`scrollPos_${pathname}`, JSON.stringify(scrollPos));
  }, [pathname]);

  const restoreScrollPos = useCallback(() => {
    const scrollPos = sessionStorage.getItem(`scrollPos_${pathname}`);
    if (scrollPos) {
      const { x, y } = JSON.parse(scrollPos);
      window.scrollTo(x, y);
    }
  }, [pathname]);

  useLayoutEffect(() => {
    if (typeof window === 'undefined') return;
    
    window.history.scrollRestoration = 'manual';

    const handlePopState = () => {
      const scrollPos = sessionStorage.getItem(`scrollPos_${pathname}`);
      if (scrollPos) {
        const { x, y } = JSON.parse(scrollPos);
        requestAnimationFrame(() => window.scrollTo(x, y));
      }
    };

    window.addEventListener('popstate', handlePopState);
    window.addEventListener('beforeunload', saveScrollPos);
    
    return () => {
      saveScrollPos();
      window.removeEventListener('popstate', handlePopState);
      window.removeEventListener('beforeunload', saveScrollPos);
    };
  }, [pathname, saveScrollPos]);
};