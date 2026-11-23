import React from 'react';
import { ArrowRight, ExternalLink } from 'lucide-react';
import { motion } from 'motion/react';
import { AlbumTrack, ARTIST_PROFILE, COVER_URLS, PageId, VERIFIED_LINKS } from '../data/artistData';
import { ReleaseCover } from './ReleaseCover';

interface HeroSectionProps {
  featuredTrack: AlbumTrack;
  onNavigate: (id: PageId) => void;
}

const EASE_OUT_EXPO: [number, number, number, number] = [0.16, 1, 0.3, 1];

export const HeroSection: React.FC<HeroSectionProps> = ({ featuredTrack, onNavigate }) => {
  return (
    <section id="hero" className="relative pt-8 pb-14 sm:pt-14 sm:pb-18 bg-studio-grid border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top editorial metadata line */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, ease: EASE_OUT_EXPO }}
          className="flex flex-wrap items-center justify-between gap-3 pb-6 sm:pb-8 text-xs font-mono-tabular text-[#A3968C]"
        >
          <div className="flex flex-wrap items-center gap-2 min-w-0">
            <span className="text-[#FF5500] font-medium">{ARTIST_PROFILE.location}</span>
            <span aria-hidden="true">·</span>
            <span>{ARTIST_PROFILE.genre}</span>
          </div>
          <div className="flex flex-wrap items-center gap-2 min-w-0">
            <span>BandLab {ARTIST_PROFILE.bandlabFollowers} Followers</span>
            <span aria-hidden="true">·</span>
            <span>{ARTIST_PROFILE.bandlabTotalPlays} Total Plays</span>
          </div>
        </motion.div>

        {/* 2-Column Split Hero */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-stretch">
          {/* Left Typographic Column */}
          <div className="lg:col-span-6 min-w-0 flex flex-col justify-between py-2">
            <div>
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35, delay: 0.02, ease: EASE_OUT_EXPO }}
                className="text-sm font-medium text-[#FFAA00] tracking-wide mb-3"
              >
                Miami, Florida · Electronic Synthwave Artist
              </motion.p>

              <h1 className="font-display text-[clamp(3.25rem,11vw,6.25rem)] leading-[0.94] tracking-tight text-balance">
                <motion.span
                  initial={{ opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.42, delay: 0.06, ease: EASE_OUT_EXPO }}
                  className="block text-[#F5EFEA]"
                >
                  JULIAN
                </motion.span>
                <motion.span
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.44, delay: 0.18, ease: EASE_OUT_EXPO }}
                  className="block bg-gradient-to-r from-[#FF5500] via-[#FFAA00] to-[#E62210] bg-clip-text text-transparent"
                >
                  PERAL
                </motion.span>
              </h1>

              {/* Verified John Keats Quote fading in after headline */}
              <motion.blockquote
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45, delay: 0.3, ease: EASE_OUT_EXPO }}
                className="mt-8 pl-4 border-l border-[#FF5500]/50 max-w-xl"
              >
                <p className="text-base sm:text-lg italic leading-relaxed text-[#F5EFEA]/90">
                  “{ARTIST_PROFILE.quote.text}”
                </p>
                <footer className="mt-2.5 text-xs font-mono-tabular text-[#FFAA00]">
                  — {ARTIST_PROFILE.quote.author}
                </footer>
              </motion.blockquote>
            </div>

            {/* Primary CTA Actions */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.38, ease: EASE_OUT_EXPO }}
              className="mt-8 flex flex-wrap items-center gap-3 sm:gap-4"
            >
              <a
                href={VERIFIED_LINKS.spotify}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2.5 px-5 sm:px-6 py-3.5 rounded-lg bg-[#FF5500] hover:bg-[#E62210] hover:-translate-y-0.5 hover:shadow-[0_10px_28px_-6px_rgba(255,85,0,0.45)] active:scale-[0.98] text-[#0D0A08] font-semibold text-sm transition-all duration-200 whitespace-nowrap shrink-0"
              >
                <span>Listen on Spotify</span>
                <ExternalLink className="w-4 h-4" aria-hidden="true" />
              </a>

              <a
                href={VERIFIED_LINKS.youtube}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2.5 px-5 sm:px-6 py-3.5 rounded-lg bg-[#15100D] hover:bg-[#1C1511] hover:-translate-y-0.5 text-[#F5EFEA] border border-white/15 hover:border-[#FF5500]/55 hover:shadow-[0_8px_24px_-8px_rgba(255,85,0,0.3)] active:scale-[0.98] font-medium text-sm transition-all duration-200 whitespace-nowrap shrink-0"
              >
                <span>Watch on YouTube</span>
                <ExternalLink className="w-4 h-4 text-[#FF5500]" aria-hidden="true" />
              </a>

              <button
                type="button"
                onClick={() => onNavigate('music')}
                className="inline-flex items-center gap-2 px-3 py-3.5 rounded-lg text-sm font-medium text-[#A3968C] hover:text-[#FFAA00] hover:translate-x-0.5 transition-all duration-200 whitespace-nowrap shrink-0"
              >
                <span>All 63 Tracks</span>
                <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </button>
            </motion.div>
          </div>

          {/* Right Abstract CSS Fire Gradient Showcase & Real Spotify Embed */}
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.48, delay: 0.12, ease: EASE_OUT_EXPO }}
            className="lg:col-span-6 min-w-0 flex flex-col justify-between rounded-xl overflow-hidden bg-[#15100D] border border-white/12 shadow-[0_24px_60px_-20px_rgba(0,0,0,0.9)]"
          >
            {/* Pure CSS Abstract Fire Gradient Band + Real Ivy Cover Thumbnail */}
            <div
              className="relative p-6 sm:p-8 flex items-center gap-5 min-h-[180px]"
              style={{
                background:
                  'radial-gradient(circle at 85% 20%, rgba(255, 170, 0, 0.28), transparent 48%), radial-gradient(circle at 25% 80%, rgba(230, 34, 16, 0.26), transparent 55%), linear-gradient(135deg, #24120B 0%, #15100D 60%, #0D0A08 100%)',
              }}
            >
              <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-xl overflow-hidden border border-white/15 shadow-lg shrink-0">
                <ReleaseCover title="Ivy" coverUrl={COVER_URLS.ivy} accentColor="#FF5500" />
              </div>

              <div className="min-w-0">
                <p className="text-xs font-mono-tabular text-[#FFAA00]">
                  Featured Single · {featuredTrack.albumTitle} EP
                </p>
                <h2 className="font-display text-3xl sm:text-4xl text-[#F5EFEA] mt-1 break-words">
                  {featuredTrack.title}
                </h2>
                <p className="text-xs font-mono-tabular text-[#A3968C] mt-1.5">
                  {ARTIST_PROFILE.name} · {featuredTrack.duration}
                </p>
              </div>
            </div>

            {/* Real Spotify Featured Single Embed for Unconsoulable */}
            <div className="p-4 sm:p-6 bg-[#15100D] border-t border-white/10 min-w-0">
              <div className="w-full overflow-hidden rounded-xl bg-[#0D0A08] border border-white/8">
                <iframe
                  title="Unconsoulable — Julian Peral on Spotify"
                  src={VERIFIED_LINKS.unconsoulableSpotifyEmbed}
                  width="100%"
                  height="152"
                  frameBorder="0"
                  allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                  loading="lazy"
                  className="block w-full"
                />
              </div>

              <div className="mt-4 pt-3 border-t border-white/8 flex flex-wrap items-center justify-between gap-3 text-xs">
                <div className="flex flex-wrap items-center gap-4">
                  <a
                    href={VERIFIED_LINKS.unconsoulableSpotify}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 font-mono-tabular text-[#FFAA00] hover:text-[#FF5500] transition-colors"
                  >
                    <span>Open Track on Spotify</span>
                    <ExternalLink className="w-3 h-3" aria-hidden="true" />
                  </a>
                  <a
                    href={VERIFIED_LINKS.bandlab}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-mono-tabular text-[#A3968C] hover:text-[#FFAA00] transition-colors"
                  >
                    BandLab ↗
                  </a>
                </div>
                <button
                  type="button"
                  onClick={() => onNavigate('music')}
                  className="font-mono-tabular text-[#FF5500] hover:text-[#FFAA00] transition-colors"
                >
                  Full Tracklists →
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
