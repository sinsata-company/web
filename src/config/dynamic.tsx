'use client';

import { useEffect, useState } from 'react';

export const Dynamic = ({ children }: { children: React.ReactNode }) => {
    const [hasMounted, setHasMounted] = useState(false);
  
    useEffect(() => {
      setHasMounted(true);
    }, []);
  
    if (!hasMounted) {
      // null 대신 빈 div 반환
      return <div style={{ visibility: 'hidden' }}></div>;
    }
  
    return <>{children}</>;
  };