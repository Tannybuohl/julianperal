import React from 'react';
import { ExternalLink, MessageSquare } from 'lucide-react';
import { motion } from 'motion/react';
import { ARTIST_PROFILE, VERIFIED_LINKS } from '../data/artistData';

const EASE_OUT_EXPO: [number, number, number, number] = [0.16, 1, 0.3, 1];

export const ConnectSection: React.FC = () => {
  return (
    <section id="connect" className="py-12 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Centered Headline */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.36, ease: EASE_OUT_EXPO }}
          className="text-center max-w-2xl mx-auto mb-12"
        >
          <p className="text-xs font-mono-tabular text-[#FF5500] mb-2">
            Official Channels · {ARTIST_PROFILE.location}
          </p>
          <h2 className="font-display text-4xl sm:text-6xl tracking-tight text-balance">
            <span className="text-[#F5EFEA]">CONNECT WITH </span>
            <span className="text-[#FF5500]">{ARTIST_PROFILE.name.toUpperCase()}</span>
          </h2>
          <p className="mt-3 text-sm sm:text-base text-[#A3968C]">
            Follow {ARTIST_PROFILE.name} across verified platforms or message him directly on
            BandLab.
          </p>
        </motion.div>

        {/* Bookings & Collabs BandLab Note */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.06, ease: EASE_OUT_EXPO }}
          className="rounded-2xl bg-[#15100D] border border-white/12 border-t-[#FF5500]/60 p-6 sm:p-10 mb-10"
        >
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <div className="min-w-0 max-w-2xl">
              <div className="inline-flex items-center gap-2 text-xs font-mono-tabular text-[#FF5500] mb-2">
                <MessageSquare className="w-3.5 h-3.5" aria-hidden="true" />
                <span>Direct Contact · BandLab</span>
              </div>
              <h3 className="font-display text-3xl sm:text-4xl text-[#F5EFEA]">
                BOOKINGS &amp; COLLABS
              </h3>
              <p className="mt-3 text-sm sm:text-base text-[#A3968C] leading-relaxed">
                For bookings, collaborations, and direct inquiries, the way to reach{' '}
                {ARTIST_PROFILE.name} is by direct message on his verified BandLab profile (
                <span className="text-[#F5EFEA] font-mono-tabular">le3ch3r</span>).
              </p>
            </div>

            <a
              href={VERIFIED_LINKS.bandlab}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-lg bg-[#FF5500] hover:bg-[#E62210] hover:-translate-y-0.5 hover:shadow-[0_10px_28px_-6px_rgba(255,85,0,0.45)] active:scale-[0.98] text-[#0D0A08] font-semibold text-sm transition-all duration-200 whitespace-nowrap shrink-0"
            >
              <span>Message on BandLab</span>
              <ExternalLink className="w-4 h-4" aria-hidden="true" />
            </a>
          </div>
        </motion.div>

        {/* Verified Official Streaming Platforms */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.14, ease: EASE_OUT_EXPO }}
        >
          <div className="flex flex-wrap items-center justify-between gap-2 mb-6">
            <h3 className="font-display text-2xl sm:text-3xl text-[#F5EFEA]">
              OFFICIAL STREAMING LINKS
            </h3>
            <p className="text-xs font-mono-tabular text-[#A3968C]">
              Verified Artist Profiles
            </p>
          </div>

          {/* Featured Wide BandLab Card */}
          <div className="min-w-0 rounded-xl bg-[#15100D] border border-white/12 hover:border-[#FF5500]/55 hover:-translate-y-0.5 hover:shadow-[0_12px_30px_-10px_rgba(255,85,0,0.28)] transition-all duration-200 p-6 mb-4 flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="min-w-0">
              <p className="text-xs font-mono-tabular text-[#FF5500] mb-1">
                Primary Catalog Hub
              </p>
              <h4 className="font-display text-3xl text-[#F5EFEA]">BANDLAB</h4>
              <p className="mt-1 text-sm text-[#A3968C]">
                Verified BandLab artist profile for {ARTIST_PROFILE.name} (le3ch3r).
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-6 sm:gap-10">
              <div>
                <p className="text-xs font-mono-tabular text-[#A3968C]">Followers</p>
                <p className="mt-0.5 font-display text-2xl text-[#F5EFEA] font-mono-tabular">
                  {ARTIST_PROFILE.bandlabFollowers}
                </p>
              </div>
              <div>
                <p className="text-xs font-mono-tabular text-[#A3968C]">Total Plays</p>
                <p className="mt-0.5 font-display text-2xl text-[#FFAA00] font-mono-tabular">
                  {ARTIST_PROFILE.bandlabTotalPlays}
                </p>
              </div>
              <a
                href={VERIFIED_LINKS.bandlab}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-lg bg-[#FF5500] hover:bg-[#E62210] hover:shadow-[0_8px_22px_-6px_rgba(255,85,0,0.45)] active:scale-[0.98] text-[#0D0A08] font-semibold text-xs transition-all duration-200 whitespace-nowrap shrink-0"
              >
                <span>Open BandLab</span>
                <ExternalLink className="w-3.5 h-3.5" aria-hidden="true" />
              </a>
            </div>
          </div>

          {/* Spotify & YouTube Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="min-w-0 rounded-xl bg-[#15100D] border border-white/12 hover:border-[#FFAA00]/55 hover:-translate-y-0.5 hover:shadow-[0_12px_28px_-10px_rgba(255,170,0,0.22)] transition-all duration-200 p-6 flex flex-col justify-between gap-5">
              <div className="min-w-0">
                <p className="text-xs font-mono-tabular text-[#FFAA00] mb-1">
                  Streaming
                </p>
                <h4 className="font-display text-2xl text-[#F5EFEA]">SPOTIFY</h4>
                <p className="mt-2 text-sm text-[#A3968C]">
                  Stream official {ARTIST_PROFILE.name} albums, EPs, and singles on Spotify.
                </p>
              </div>
              <a
                href={VERIFIED_LINKS.spotify}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-4 py-3 rounded-lg bg-[#0D0A08] hover:bg-white/10 border border-white/15 hover:border-[#FFAA00]/50 active:scale-[0.99] text-[#F5EFEA] font-medium text-xs transition-all duration-200 whitespace-nowrap"
              >
                <span>Open Spotify Artist Profile</span>
                <ExternalLink className="w-3.5 h-3.5 text-[#FFAA00]" aria-hidden="true" />
              </a>
            </div>

            <div className="min-w-0 rounded-xl bg-[#15100D] border border-white/12 hover:border-[#E62210]/55 hover:-translate-y-0.5 hover:shadow-[0_12px_28px_-10px_rgba(230,34,16,0.22)] transition-all duration-200 p-6 flex flex-col justify-between gap-5">
              <div className="min-w-0">
                <p className="text-xs font-mono-tabular text-[#E62210] mb-1">
                  Video &amp; Audio
                </p>
                <h4 className="font-display text-2xl text-[#F5EFEA]">YOUTUBE</h4>
                <p className="mt-2 text-sm text-[#A3968C]">
                  Official {VERIFIED_LINKS.youtubeChannelTitle} channel on YouTube.
                </p>
              </div>
              <a
                href={VERIFIED_LINKS.youtube}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-4 py-3 rounded-lg bg-[#0D0A08] hover:bg-white/10 border border-white/15 hover:border-[#E62210]/50 active:scale-[0.99] text-[#F5EFEA] font-medium text-xs transition-all duration-200 whitespace-nowrap"
              >
                <span>Open {VERIFIED_LINKS.youtubeChannelTitle}</span>
                <ExternalLink className="w-3.5 h-3.5 text-[#E62210]" aria-hidden="true" />
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
