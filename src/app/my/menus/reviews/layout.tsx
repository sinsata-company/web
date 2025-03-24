'use client';

import React from 'react';
import useUserMenuStore from '@/components/user-menu/user-menu.store'
import { useEffect } from 'react'

const Layout = ({ children }: { children: React.ReactNode }) => {
  const { setHideAppBar } = useUserMenuStore();

  useEffect(() => {
    setHideAppBar(true);

    return () => {
    	setHideAppBar(false);
    }
  }, []);

	return (
		<div className="px-0">
			{children}
		</div>
	);
};

export default Layout;