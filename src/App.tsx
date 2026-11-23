import { useCallback, useEffect, useState } from 'react';
import { AnimatePresence, motion, MotionConfig } from 'motion/react';
import { AboutSection } from './components/AboutSection';
import { AlbumsSection } from './components/AlbumsSection';
import { ConnectSection } from './components/ConnectSection';
import { Header } from './components/Header';
import { HeroSection } from './components/HeroSection';
import { HomeSection } from './components/HomeSection';
import { MusicSection } from './components/MusicSection';
import { FooterAndSpotifyBar } from './components/PlayerBar';
import { VideosSection } from './components/VideosSection';
import { FEATURED_TRACKS, NAV_ITEMS, PageId } from './data/artistData';

const VALID_PAGES = new Set<PageId>(NAV_ITEMS.map((item) => item.id));
const EASE_OUT_EXPO: [number, number, number, number] = [0.16, 1, 0.3, 1];

function getInitialPage(): PageId {
  const hash = window.location.hash.replace('#', '').toLowerCase() as PageId;
  return VALID_PAGES.has(hash) ? hash : 'home';
}

export default function App() {
  const [activePage, setActivePage] = useState<PageId>(getInitialPage);
  const featuredTrack = FEATURED_TRACKS[0];

  // Sync browser back/forward navigation with client-side pages
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '').toLowerCase() as PageId;
      if (VALID_PAGES.has(hash)) {
        setActivePage(hash);
        window.scrollTo({ top: 0, behavior: 'auto' });
      }
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const handleNavigate = useCallback((id: PageId) => {
    setActivePage(id);
    if (window.location.hash !== `#${id}`) {
      window.history.pushState(null, '', `#${id}`);
    }
    window.scrollTo({ top: 0, behavior: 'auto' });
  }, []);

  return (
    <MotionConfig reducedMotion="user">
      <div className="min-h-screen flex flex-col bg-[#0D0A08] text-[#F5EFEA] overflow-x-hidden">
        <Header activePage={activePage} onNavigate={handleNavigate} />

        <main className="flex-1">
          <AnimatePresence mode="wait">
            <motion.div
              key={activePage}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.22, ease: EASE_OUT_EXPO }}
            >
              {activePage === 'home' && (
                <>
                  <HeroSection
                    featuredTrack={featuredTrack}
                    onNavigate={handleNavigate}
                  />
                  <HomeSection onNavigate={handleNavigate} />
                </>
              )}

              {activePage === 'music' && <MusicSection onNavigate={handleNavigate} />}

              {activePage === 'albums' && <AlbumsSection />}

              {activePage === 'about' && <AboutSection onNavigate={handleNavigate} />}

              {activePage === 'videos' && <VideosSection />}

              {activePage === 'connect' && <ConnectSection />}
            </motion.div>
          </AnimatePresence>
        </main>

        <FooterAndSpotifyBar onNavigate={handleNavigate} />
      </div>
    </MotionConfig>
  );
}
