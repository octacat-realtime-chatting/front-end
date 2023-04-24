import React from 'react';
import Sidebar from '../../components/sidebar';

export default function ContentLayout({ children }) {
  return (
    <div className="flex flex-row gap-10 max-h-screen min-h-screen p-6">
      <Sidebar />
      <div className="relative col-span-5">
        {children}
      </div>
    </div>
  );
}
