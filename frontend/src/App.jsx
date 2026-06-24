import React from 'react';
import { ReactLenis } from 'lenis/react';
import ProfileHeader from './components/sections/ProfileHeader';
import ProfileSection from './components/sections/ProfileSection';
import Sidebar from './components/sections/Sidebar';
import Feed from './components/sections/Feed';

function App() {
  return (
    <ReactLenis
      root
      options={{
        lerp: 0.08,
        smoothWheel: true,
        smoothTouch: false,
        touchMultiplier: 1.2,
        wheelMultiplier: 1.2,
        infinite: false,
      }}
    >
      <div className="relative z-10 max-w-[1480px] mx-auto px-4 sm:px-6 lg:px-8 pb-[60px] min-h-screen">
        <ProfileHeader />
        <hr className="my-6 border-t border-border-glass" />
        <ProfileSection />
        <hr className="my-6 border-t border-border-glass" />
        <div className="flex flex-col lg:flex-row gap-6 sm:gap-8 mt-2 items-center lg:items-start">
          <Sidebar />
          <main className="flex-1 min-w-0 w-full">
            <Feed />
          </main>
        </div>
      </div>
    </ReactLenis>
  );
}

export default App;