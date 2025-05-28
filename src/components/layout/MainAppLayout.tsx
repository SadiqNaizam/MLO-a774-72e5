import React from 'react';
import NavigationSidebar from './NavigationSidebar';
import TopHeader from './TopHeader';
import ChatSidebar from './ChatSidebar';
import { cn } from '@/lib/utils';

interface MainAppLayoutProps {
  children: React.ReactNode;
  className?: string;
}

const MainAppLayout: React.FC<MainAppLayoutProps> = ({ children, className }) => {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <NavigationSidebar />
      <TopHeader />
      <ChatSidebar />
      <main 
        className={cn(
          "flex-1 ml-60 mr-80 pt-16 overflow-y-auto",
          // Layout Requirements: mainContent: py-6 px-4 space-y-6. Apply here or in page templates.
          // For this component, we'll ensure the basic padding for content area is present.
          "py-6 px-4",
          className
        )}
      >
        {/* The 'space-y-6' and 'container' styles for MainContent should be applied within the page that uses this layout, or a wrapper here if always desired */} 
        {/* For instance, if FeedPost and Widgets need a specific container with gap: */} 
        {/* <div className="flex flex-col gap-6 max-w-3xl mx-auto"> {children} </div> */} 
        {/* For now, just render children directly, page takes care of inner layout */} 
        {children}
      </main>
    </div>
  );
};

export default MainAppLayout;
