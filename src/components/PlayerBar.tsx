import React, { useEffect, useState } from 'react';
import { ArrowUp, ExternalLink } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import { ARTIST_PROFILE, NAV_ITEMS, PageId, VERIFIED_LINKS } from '../data/artistData';

interface FooterAndSpotifyBarProps {
  onNavigate: (id: PageId) => void;
}

export const FooterAndSpotifyBar: React.FC<FooterAndSpotifyBarProps> = ({ onNavigate }) => {
  const [showBackToTop, setShowBackToTop] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setShowBackToTop(window.scrollY > 280);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleBackToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      {/* Clean Copyright, Page Links & Verified Platform Links Footer */}
      <footer className="border-t border-white/10 bg-[#0D0A08] pt-10 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex flex-wrap items-center justify-center sm:justify-start gap-3 text-xs text-[#A3968C]">
            <button
              type="button"
              onClick={() => onNavigate('home')}
              className="font-display text-lg text-[#F5EFEA] hover:text-[#FF5500] tracking-wide transition-colors"
            >
              JULIAN PERAL
            </button>
            <span aria-hidden="true">·</span>
            <span>{ARTIST_PROFILE.footer}</span>
          </div>

          <nav
            aria-label="Footer page navigation"
            className="flex flex-wrap items-center justify-center gap-4 sm:gap-5 text-xs text-[#A3968C]"
          >
            {NAV_ITEMS.map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => onNavigate(item.id)}
                className="hover:text-[#FF5500] transition-colors whitespace-nowrap"
              >
                {item.label}
              </button>
            ))}
          </nav>

          <div className="flex flex-wrap items-center justify-center gap-5 text-xs font-mono-tabular text-[#A3968C]">
            <a
              href={VERIFIED_LINKS.bandlab}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 hover:text-[#FF5500] transition-colors whitespace-nowrap"
            >
              <span>BandLab</span>
              <ExternalLink className="w-3 h-3" aria-hidden="true" />
            </a>
            <a
              href={VERIFIED_LINKS.spotify}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 hover:text-[#FFAA00] transition-colors whitespace-nowrap"
            >
              <span>Spotify</span>
              <ExternalLink className="w-3 h-3" aria-hidden="true" />
            </a>
            <a
              href={VERIFIED_LINKS.youtube}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 hover:text-[#E62210] transition-colors whitespace-nowrap"
            >
              <span>YouTube</span>
              <ExternalLink className="w-3 h-3" aria-hidden="true" />
            </a>
          </div>
        </div>
      </footer>

      {/* Fixed Back-to-Top Button above the slim bottom bar */}
      <AnimatePresence>
        {showBackToTop && (
          <motion.button
            type="button"
            initial={{ opacity: 0, y: 10, scale: 0.92 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.92 }}
            transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
            onClick={handleBackToTop}
            aria-label="Back to top"
            className="fixed bottom-16 sm:bottom-18 right-4 sm:right-6 z-40 w-10 h-10 rounded-full bg-[#FF5500] hover:bg-[#E62210] text-[#0D0A08] shadow-[0_8px_24px_-4px_rgba(255,85,0,0.55)] flex items-center justify-center transition-colors cursor-pointer"
          >
            <ArrowUp className="w-4 h-4 stroke-[2.5]" aria-hidden="true" />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Slim Persistent Bottom Spotify Link Bar */}
      <div
        role="region"
        aria-label="Stream Julian Peral on Spotify"
        className="fixed bottom-0 inset-x-0 z-40 h-12 sm:h-14 bg-[#120D0A]/95 backdrop-blur-md border-t border-white/12"
      >
        <div className="max-w-7xl mx-auto h-full px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-4">
          <div className="min-w-0 flex items-center gap-2.5 text-xs sm:text-sm">
            <span className="font-display tracking-wide text-[#F5EFEA] shrink-0">
              JULIAN PERAL
            </span>
            <span aria-hidden="true" className="text-[#A3968C] hidden sm:inline">
              ·
            </span>
            <span className="text-[#A3968C] truncate hidden sm:inline">
              {ARTIST_PROFILE.location} · {ARTIST_PROFILE.genre}
            </span>
          </div>

          <a
            href={VERIFIED_LINKS.spotify}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-3.5 sm:px-4 py-1.5 sm:py-2 rounded-lg bg-[#FF5500] hover:bg-[#E62210] text-[#0D0A08] font-semibold text-xs transition-colors whitespace-nowrap shrink-0"
          >
            <span>Listen on Spotify</span>
            <ExternalLink className="w-3.5 h-3.5" aria-hidden="true" />
          </a>
        </div>
      </div>
    </>
  );
};
