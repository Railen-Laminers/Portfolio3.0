// App.jsx
import React, { useState, useEffect } from 'react';
import { ReactLenis } from 'lenis/react';
import ProfileHeader from './components/sections/ProfileHeader';
import ProfileSection from './components/sections/ProfileSection';
import Sidebar from './components/sections/Sidebar';
import Feed from './components/sections/Feed';
import LoadingScreen from './components/LoadingScreen';
import Navbar from './components/Navbar';
import LoginModal from './components/LoginModal';

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [isRevealed, setIsRevealed] = useState(false);

  // State for login modal visibility
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

  // When loading finishes, trigger the reveal sequence after a tiny pause
  useEffect(() => {
    if (!isLoading) {
      const timer = setTimeout(() => setIsRevealed(true), 150);
      return () => clearTimeout(timer);
    }
  }, [isLoading]);

  return (
    <>
      {isLoading && <LoadingScreen onLoadingComplete={() => setIsLoading(false)} />}

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
        {/* Navbar – hidden while loading, reveals with its own delay */}
        {!isLoading && (
          <div
            className={`fixed top-0 left-0 w-full z-50 transition-all duration-700 ease-out ${isRevealed ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'
              }`}
            style={{ transitionDelay: '0ms' }}
          >
            {/* pass the login handler */}
            <Navbar onLoginClick={() => setIsLoginModalOpen(true)} />
          </div>
        )}

        {/* Main content container */}
        <div
          className={`relative z-10 max-w-[1480px] mx-auto px-4 sm:px-6 lg:px-8 pb-[60px] min-h-screen ${!isLoading ? 'pt-20' : 'pt-0'
            }`}
        >
          {/* ProfileHeader */}
          <div
            className={`transition-all duration-700 ease-out ${isRevealed ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
            style={{ transitionDelay: '100ms' }}
          >
            <ProfileHeader />
          </div>

          <hr className="my-6 border-t border-border-glass" />

          {/* ProfileSection */}
          <div
            className={`transition-all duration-700 ease-out ${isRevealed ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
            style={{ transitionDelay: '300ms' }}
          >
            <ProfileSection />
          </div>

          <hr className="my-6 border-t border-border-glass" />

          {/* Sidebar + Feed row */}
          <div className="flex flex-col lg:flex-row gap-6 sm:gap-8 mt-2 items-center lg:items-start">
            {/* Sidebar */}
            <div
              className={`w-full lg:w-auto transition-all duration-700 ease-out ${isRevealed ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                }`}
              style={{ transitionDelay: '500ms' }}
            >
              <Sidebar />
            </div>

            {/* Feed */}
            <main className="flex-1 min-w-0 w-full">
              <div
                className={`transition-all duration-700 ease-out ${isRevealed ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                  }`}
                style={{ transitionDelay: '700ms' }}
              >
                <Feed />
              </div>
            </main>
          </div>
        </div>
      </ReactLenis>

      {/* Render the login modal */}
      <LoginModal
        isOpen={isLoginModalOpen}
        onClose={() => setIsLoginModalOpen(false)}
      />
    </>
  );
}

export default App;