import React from 'react';
import { ArrowRight, ExternalLink } from 'lucide-react';
import { motion } from 'motion/react';
import { ARTIST_PROFILE, CAREER_TIMELINE, DISCOGRAPHY, PageId } from '../data/artistData';
import { ReleaseCover } from './ReleaseCover';

interface AboutSectionProps {
  onNavigate: (id: PageId) => void;
}

const EASE_OUT_EXPO: [number, number, number, number] = [0.16, 1, 0.3, 1];

export const AboutSection: React.FC<AboutSectionProps> = ({ onNavigate }) => {
  const earliestRelease = DISCOGRAPHY[DISCOGRAPHY.length - 1];
  const latestRelease = DISCOGRAPHY[0];

  return (
    <section id="about" className="py-12 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.36, ease: EASE_OUT_EXPO }}
          className="flex flex-wrap items-end justify-between gap-4"
        >
          <div className="min-w-0">
            <p className="text-xs font-mono-tabular text-[#FF5500] mb-2">
              Artist Profile · {ARTIST_PROFILE.location}
            </p>
            <h2 className="font-display text-4xl sm:text-5xl text-[#F5EFEA] tracking-tight text-balance">
              ABOUT {ARTIST_PROFILE.name.toUpperCase()}
            </h2>
          </div>
          <p className="text-xs font-mono-tabular text-[#A3968C]">
            {ARTIST_PROFILE.name} · {ARTIST_PROFILE.genre}
          </p>
        </motion.div>

        {/* Large John Keats Quote Design Moment */}
        <motion.blockquote
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.42, delay: 0.04, ease: EASE_OUT_EXPO }}
          className="relative rounded-2xl bg-[#15100D] border border-[#FF5500]/30 p-7 sm:p-12 overflow-hidden"
        >
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -top-24 -right-24 w-72 h-72 rounded-full opacity-25 blur-3xl"
            style={{
              background:
                'radial-gradient(circle, rgba(255,85,0,0.65) 0%, rgba(230,34,16,0.25) 55%, transparent 75%)',
            }}
          />
          <div className="relative max-w-4xl">
            <p className="text-xs font-mono-tabular text-[#FF5500] mb-4">
              Selected Epigraph
            </p>
            <p className="font-display text-3xl sm:text-5xl lg:text-[3.25rem] leading-[1.08] tracking-tight text-[#F5EFEA] text-balance">
              “{ARTIST_PROFILE.quote.text}”
            </p>
            <footer className="mt-6 flex items-center gap-3 text-xs sm:text-sm font-mono-tabular text-[#FFAA00]">
              <span className="h-px w-8 bg-[#FF5500]" aria-hidden="true" />
              <span>— {ARTIST_PROFILE.quote.author}</span>
            </footer>
          </div>
        </motion.blockquote>

        {/* Biography & Verified Stats */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.08, ease: EASE_OUT_EXPO }}
            className="lg:col-span-7 min-w-0 p-6 sm:p-8 rounded-xl bg-[#15100D] border border-white/12"
          >
            <div className="flex flex-wrap items-center justify-between gap-2 text-xs font-mono-tabular text-[#A3968C] mb-4">
              <span className="text-[#FF5500] font-medium">Biography</span>
              <span>{ARTIST_PROFILE.location}</span>
            </div>

            <h3 className="font-display text-2xl sm:text-3xl text-[#F5EFEA] tracking-tight">
              ELECTRONIC SYNTHWAVE FROM MIAMI, FL
            </h3>

            <div className="mt-4 space-y-4 text-base text-[#A3968C] leading-relaxed">
              <p>
                {ARTIST_PROFILE.name} is an electronic synthwave artist based in{' '}
                {ARTIST_PROFILE.location}. Starting with his self-titled debut LP{' '}
                <span className="text-[#F5EFEA]">{earliestRelease.title}</span> on{' '}
                {earliestRelease.releaseDate}, his discography has grown across six consecutive
                projects to{' '}
                <span className="text-[#F5EFEA]">
                  {ARTIST_PROFILE.totalReleases} releases and {ARTIST_PROFILE.totalTracks} tracks
                </span>
                , leading to his latest EP{' '}
                <span className="text-[#F5EFEA]">{latestRelease.title}</span> ({latestRelease.releaseDate}).
              </p>
              <p>
                Across BandLab, his catalog has reached{' '}
                <span className="text-[#FFAA00] font-mono-tabular">
                  {ARTIST_PROFILE.bandlabTotalPlays} total plays
                </span>{' '}
                and{' '}
                <span className="text-[#FF5500] font-mono-tabular">
                  {ARTIST_PROFILE.bandlabFollowers} followers
                </span>
                , spanning full-length albums{' '}
                <span className="text-[#F5EFEA]">Julian Peral</span>,{' '}
                <span className="text-[#F5EFEA]">A Process...</span>,{' '}
                <span className="text-[#F5EFEA]">Volatil3 Dystopia</span>,{' '}
                <span className="text-[#F5EFEA]">Thrice</span>,{' '}
                <span className="text-[#F5EFEA]">TerceT</span>, and the five-track EP{' '}
                <span className="text-[#F5EFEA]">Ivy</span>.
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.12, ease: EASE_OUT_EXPO }}
            className="lg:col-span-5 min-w-0 space-y-4"
          >
            <div className="grid grid-cols-2 gap-3">
              {[
                {
                  label: 'BandLab Followers',
                  value: ARTIST_PROFILE.bandlabFollowers,
                  color: 'text-[#FF5500]',
                },
                {
                  label: 'Total Plays',
                  value: ARTIST_PROFILE.bandlabTotalPlays,
                  color: 'text-[#FFAA00]',
                },
                {
                  label: 'Releases',
                  value: String(ARTIST_PROFILE.totalReleases),
                  color: 'text-[#F5EFEA]',
                },
                {
                  label: 'Total Tracks',
                  value: String(ARTIST_PROFILE.totalTracks),
                  color: 'text-[#F5EFEA]',
                },
              ].map((stat) => (
                <div
                  key={stat.label}
                  className="min-w-0 p-4 sm:p-5 rounded-xl bg-[#15100D] border border-white/10 hover:border-[#FF5500]/45 transition-colors duration-200"
                >
                  <p className="text-xs font-mono-tabular text-[#A3968C] truncate">
                    {stat.label}
                  </p>
                  <p className={`mt-1.5 font-display text-3xl font-mono-tabular ${stat.color}`}>
                    {stat.value}
                  </p>
                </div>
              ))}
            </div>

            <div className="p-5 sm:p-6 rounded-xl bg-[#15100D] border border-white/10 flex flex-wrap items-center justify-between gap-4">
              <div className="min-w-0">
                <p className="font-display text-2xl text-[#F5EFEA]">
                  EXPLORE THE CATALOG
                </p>
                <p className="text-xs text-[#A3968C] mt-1">
                  {ARTIST_PROFILE.totalReleases} releases · {ARTIST_PROFILE.totalTracks} tracks
                </p>
              </div>
              <div className="flex flex-wrap items-center gap-2.5 shrink-0">
                <button
                  type="button"
                  onClick={() => onNavigate('albums')}
                  className="px-4 py-2.5 rounded-lg bg-[#1C1511] hover:bg-white/10 hover:-translate-y-0.5 border border-white/12 hover:border-[#FF5500]/45 text-xs font-medium text-[#F5EFEA] transition-all duration-200 whitespace-nowrap"
                >
                  Albums
                </button>
                <button
                  type="button"
                  onClick={() => onNavigate('connect')}
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-[#FF5500] hover:bg-[#E62210] hover:-translate-y-0.5 hover:shadow-[0_8px_22px_-6px_rgba(255,85,0,0.45)] active:scale-[0.98] text-[#0D0A08] font-semibold text-xs transition-all duration-200 whitespace-nowrap"
                >
                  <span>Connect</span>
                  <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
                </button>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Career Timeline in Chronological Release Order */}
        <div>
          <div className="flex flex-wrap items-end justify-between gap-4 mb-6">
            <div>
              <p className="text-xs font-mono-tabular text-[#FF5500] mb-1">
                Chronological Discography
              </p>
              <h3 className="font-display text-3xl sm:text-4xl text-[#F5EFEA] tracking-tight">
                RELEASE TIMELINE
              </h3>
            </div>
            <p className="text-xs font-mono-tabular text-[#A3968C]">
              {earliestRelease.releaseDate} — {latestRelease.releaseDate}
            </p>
          </div>

          <div className="relative pl-6 sm:pl-8 space-y-4 before:content-[''] before:absolute before:left-2.5 sm:before:left-3 before:top-4 before:bottom-4 before:w-px before:bg-gradient-to-b before:from-[#FF5500] before:via-[#E62210]/60 before:to-[#FFAA00]">
            {CAREER_TIMELINE.map((release, idx) => (
              <motion.article
                key={release.id}
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{ duration: 0.34, delay: idx * 0.04, ease: EASE_OUT_EXPO }}
                className="relative min-w-0 rounded-xl bg-[#15100D] border border-white/12 hover:border-[#FF5500]/50 p-4 sm:p-5 transition-colors duration-200"
              >
                <span
                  aria-hidden="true"
                  className="absolute -left-[22px] sm:-left-[26px] top-7 w-3 h-3 rounded-full bg-[#FF5500] ring-4 ring-[#0D0A08]"
                />

                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="flex items-center gap-4 min-w-0">
                    <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-lg overflow-hidden shrink-0 border border-white/10">
                      <ReleaseCover
                        coverUrl={release.coverUrl}
                        title={release.title}
                        accentColor={release.accentColor}
                      />
                    </div>
                    <div className="min-w-0">
                      <div className="flex flex-wrap items-center gap-2 text-xs font-mono-tabular">
                        <span className="text-[#FFAA00]">{release.releaseDate}</span>
                        <span className="text-white/25">·</span>
                        <span className="text-[#FF5500]">{release.format}</span>
                        {idx === 0 && (
                          <>
                            <span className="text-white/25">·</span>
                            <span className="text-[#A3968C]">Debut Album</span>
                          </>
                        )}
                        {idx === CAREER_TIMELINE.length - 1 && (
                          <>
                            <span className="text-white/25">·</span>
                            <span className="text-[#FFAA00]">Latest Release</span>
                          </>
                        )}
                      </div>
                      <h4 className="font-display text-2xl sm:text-3xl text-[#F5EFEA] mt-0.5 truncate">
                        {release.title}
                      </h4>
                      <p className="text-xs font-mono-tabular text-[#A3968C] mt-0.5">
                        {release.trackCount} tracks
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2.5 shrink-0">
                    <a
                      href={release.bandlabUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-[#0D0A08] hover:bg-white/10 border border-white/12 hover:border-[#FF5500]/50 text-xs font-medium text-[#F5EFEA] transition-colors whitespace-nowrap"
                    >
                      <span>BandLab</span>
                      <ExternalLink className="w-3.5 h-3.5 text-[#FF5500]" aria-hidden="true" />
                    </a>
                    {release.spotifyUrl && (
                      <a
                        href={release.spotifyUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-[#FF5500] hover:bg-[#E62210] text-[#0D0A08] font-semibold text-xs transition-colors whitespace-nowrap"
                      >
                        <span>Spotify</span>
                        <ExternalLink className="w-3.5 h-3.5" aria-hidden="true" />
                      </a>
                    )}
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
