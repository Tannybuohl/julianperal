import React, { useState } from 'react';
import { ExternalLink, Menu, X } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import { NAV_ITEMS, PageId, VERIFIED_LINKS } from '../data/artistData';

interface HeaderProps {
  activePage: PageId;
  onNavigate: (id: PageId) => void;
}

export const Header: React.FC<HeaderProps> = ({ activePage, onNavigate }) => {
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleNavClick = (id: PageId) => {
    setMobileOpen(false);
    onNavigate(id);
  };

  return (
    <header className="sticky top-0 z-40 w-full bg-[#0D0A08]/95 backdrop-blur-md border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-14 sm:h-16 flex items-center justify-between gap-8">
        {/* Zone 1: Single text element wordmark */}
        <a
          href="#home"
          onClick={(e) => {
            e.preventDefault();
            handleNavClick('home');
          }}
          className="font-display text-2xl tracking-wide text-[#F5EFEA] hover:text-[#FF5500] transition-colors whitespace-nowrap shrink-0"
        >
          JULIAN PERAL
        </a>

        {/* Zone 2: Concise single-line page navigation links with animated active indicator */}
        <nav aria-label="Primary navigation" className="hidden md:flex items-center gap-6">
          {NAV_ITEMS.map((item) => {
            const isActive = activePage === item.id;
            return (
              <a
                key={item.id}
                href={`#${item.id}`}
                aria-current={isActive ? 'page' : undefined}
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick(item.id);
                }}
                className={`relative py-1.5 text-sm font-medium transition-colors duration-200 whitespace-nowrap shrink-0 ${
                  isActive ? 'text-[#FF5500]' : 'text-[#A3968C] hover:text-[#F5EFEA]'
                }`}
              >
                {item.label}
                {isActive && (
                  <motion.span
                    layoutId="activeNavUnderline"
                    aria-hidden="true"
                    transition={{ type: 'spring', stiffness: 460, damping: 36 }}
                    className="absolute left-0 right-0 -bottom-0.5 h-0.5 bg-[#FF5500]"
                  />
                )}
              </a>
            );
          })}
        </nav>

        {/* Zone 3: Single primary action */}
        <div className="flex items-center gap-3 shrink-0">
          <a
            href={VERIFIED_LINKS.spotify}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-[#FF5500] hover:bg-[#E62210] hover:shadow-[0_0_20px_rgba(255,85,0,0.4)] active:scale-[0.98] text-[#0D0A08] font-semibold text-xs tracking-wide transition-all duration-200 whitespace-nowrap shrink-0"
          >
            <span>Listen on Spotify</span>
            <ExternalLink className="w-3.5 h-3.5" aria-hidden="true" />
          </a>

          <button
            type="button"
            onClick={() => setMobileOpen((prev) => !prev)}
            aria-expanded={mobileOpen}
            aria-label={mobileOpen ? 'Close navigation menu' : 'Open navigation menu'}
            className="md:hidden inline-flex items-center justify-center w-11 h-11 rounded-lg border border-white/15 bg-[#15100D] text-[#F5EFEA] hover:border-[#FF5500]/50 transition-colors"
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Animated Mobile Navigation Drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
            className="md:hidden border-t border-white/10 bg-[#15100D] px-4 py-4"
          >
            <nav aria-label="Mobile navigation" className="flex flex-col gap-1">
              {NAV_ITEMS.map((item) => {
                const isActive = activePage === item.id;
                return (
                  <a
                    key={item.id}
                    href={`#${item.id}`}
                    aria-current={isActive ? 'page' : undefined}
                    onClick={(e) => {
                      e.preventDefault();
                      handleNavClick(item.id);
                    }}
                    className={`px-3 py-3 rounded-lg text-sm font-medium transition-colors ${
                      isActive
                        ? 'bg-[#FF5500]/15 text-[#FF5500]'
                        : 'text-[#F5EFEA] hover:bg-white/5'
                    }`}
                  >
                    {item.label}
                  </a>
                );
              })}
              <a
                href={VERIFIED_LINKS.spotify}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-2 inline-flex items-center justify-center gap-2 px-4 py-3 rounded-lg bg-[#FF5500] text-[#0D0A08] font-semibold text-sm"
              >
                <span>Listen on Spotify</span>
                <ExternalLink className="w-4 h-4" aria-hidden="true" />
              </a>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};
