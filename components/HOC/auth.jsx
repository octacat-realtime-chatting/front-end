import { useIsomorphicLayoutEffect } from '@/hooks';
import React, { useState } from 'react';

// eslint-disable-next-line react/display-name
export const withAuth = (Component) => (props) => {
  useIsomorphicLayoutEffect(() => {
    console.log('render ');
  }, []);
  return <Component {...props} />;
};
