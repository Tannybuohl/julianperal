import React, { useEffect, useRef, useState } from 'react';
import { ArrowRight, Check, Disc3, ExternalLink, PlayCircle, Share2 } from 'lucide-react';
import { motion } from 'motion/react';
import {
  ALL_TRACK_TITLES,
  AlbumTrack,
  ARTIST_PROFILE,
  DISCOGRAPHY,
  FEATURED_TRACKS,
  IVY_VIDEOS,
  PageId,
  VERIFIED_LINKS,
} from '../data/artistData';
import { copyTextToClipboard } from '../utils/clipboard';
import { ReleaseCover } from './ReleaseCover';

interface HomeSectionProps {
  onNavigate: (id: PageId) => void;
}

const EASE_OUT_EXPO: [number, number, number, number] = [0.16, 1, 0.3, 1];

interface AnimatedCounterProps {
  target: number;
  decimals?: number;
  suffix?: string;
}

const AnimatedCounter: React.FC<AnimatedCounterProps> = ({
  target,
  decimals = 0,
  suffix = '',
}) => {
  const [display, setDisplay] = useState<string>(() =>
    decimals > 0 ? target.toFixed(decimals) : String(target)
  );
  const [hasAnimated, setHasAnimated] = useState(false);
  const ref = useRef<HTMLSpanElement | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || hasAnimated) return;

    const prefersReduced =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) {
      setDisplay(`${decimals > 0 ? target.toFixed(decimals) : target}`);
      setHasAnimated(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (!entries.some((entry) => entry.isIntersecting)) return;
        setHasAnimated(true);
        observer.disconnect();

        const duration = 900;
        const startTime = performance.now();
        const step = (now: number) => {
          const progress = Math.min(1, (now - startTime) / duration);
          const eased = 1 - Math.pow(1 - progress, 3);
          const current = target * eased;
          setDisplay(decimals > 0 ? current.toFixed(decimals) : String(Math.round(current)));
          if (progress < 1) {
            window.requestAnimationFrame(step);
          } else {
            setDisplay(decimals > 0 ? target.toFixed(decimals) : String(target));
          }
        };
        window.requestAnimationFrame(step);
      },
      { threshold: 0.25 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [target, decimals, hasAnimated]);

  return (
    <span ref={ref}>
      {display}
      {suffix}
    </span>
  );
};

export const HomeSection: React.FC<HomeSectionProps> = ({ onNavigate }) => {
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const ivyRelease = DISCOGRAPHY[0];
  const volatil3Release = DISCOGRAPHY.find((r) => r.featured) ?? DISCOGRAPHY[3];

  const handleShareTrack = async (track: AlbumTrack) => {
    const shareTarget = track.spotifyUrl ?? window.location.href;
    const copied = await copyTextToClipboard(shareTarget);
    if (copied) {
      setCopiedId(track.id);
      window.setTimeout(() => {
        setCopiedId((current) => (current === track.id ? null : current));
      }, 2000);
    }
  };

  return (
    <div className="divide-y divide-white/10">
      {/* (a) Animated Stats Band + (b) Listen Everywhere Row */}
      <section className="py-10 sm:py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="min-w-0 p-5 rounded-xl bg-[#15100D] border border-white/10 hover:border-[#FF5500]/45 transition-colors">
              <p className="text-xs font-mono-tabular text-[#A3968C]">BandLab Followers</p>
              <p className="mt-2 font-display text-3xl sm:text-4xl text-[#FF5500] font-mono-tabular">
                <AnimatedCounter target={2.2} decimals={1} suffix="K" />
              </p>
            </div>

            <div className="min-w-0 p-5 rounded-xl bg-[#15100D] border border-white/10 hover:border-[#FFAA00]/45 transition-colors">
              <p className="text-xs font-mono-tabular text-[#A3968C]">Total Plays</p>
              <p className="mt-2 font-display text-3xl sm:text-4xl text-[#FFAA00] font-mono-tabular">
                <AnimatedCounter target={85.2} decimals={1} suffix="K" />
              </p>
            </div>

            <div className="min-w-0 p-5 rounded-xl bg-[#15100D] border border-white/10 hover:border-[#FF5500]/45 transition-colors">
              <p className="text-xs font-mono-tabular text-[#A3968C]">Releases</p>
              <p className="mt-2 font-display text-3xl sm:text-4xl text-[#F5EFEA] font-mono-tabular">
                <AnimatedCounter target={ARTIST_PROFILE.totalReleases} />
              </p>
            </div>

            <div className="min-w-0 p-5 rounded-xl bg-[#15100D] border border-white/10 hover:border-[#E62210]/45 transition-colors">
              <p className="text-xs font-mono-tabular text-[#A3968C]">Tracks</p>
              <p className="mt-2 font-display text-3xl sm:text-4xl text-[#F5EFEA] font-mono-tabular">
                <AnimatedCounter target={ARTIST_PROFILE.totalTracks} />
              </p>
            </div>
          </div>

          {/* (b) Listen Everywhere Row */}
          <div className="rounded-xl bg-[#15100D] border border-white/10 p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <p className="text-xs font-mono-tabular text-[#FFAA00] uppercase tracking-wider shrink-0">
              Listen Everywhere
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 flex-1 sm:max-w-2xl">
              <a
                href={VERIFIED_LINKS.bandlab}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-between gap-2 px-4 py-2.5 rounded-lg bg-[#0D0A08] hover:bg-[#FF5500] text-[#F5EFEA] hover:text-[#0D0A08] border border-white/12 hover:border-[#FF5500] text-xs font-semibold transition-colors"
              >
                <span>BandLab</span>
                <ExternalLink className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
              </a>
              <a
                href={VERIFIED_LINKS.spotify}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-between gap-2 px-4 py-2.5 rounded-lg bg-[#0D0A08] hover:bg-[#FFAA00] text-[#F5EFEA] hover:text-[#0D0A08] border border-white/12 hover:border-[#FFAA00] text-xs font-semibold transition-colors"
              >
                <span>Spotify</span>
                <ExternalLink className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
              </a>
              <a
                href={VERIFIED_LINKS.youtube}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-between gap-2 px-4 py-2.5 rounded-lg bg-[#0D0A08] hover:bg-[#E62210] text-[#F5EFEA] hover:text-[#0D0A08] border border-white/12 hover:border-[#E62210] text-xs font-semibold transition-colors"
              >
                <span>YouTube</span>
                <ExternalLink className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* (d) Scrolling Ticker / Marquee of Real Track Names */}
      <div
        aria-label="Catalog track names ticker"
        className="w-full overflow-hidden bg-[#15100D]/80 py-3.5 select-none"
      >
        <div className="animate-marquee flex items-center gap-6 text-xs font-mono-tabular text-[#A3968C]">
          {[...ALL_TRACK_TITLES, ...ALL_TRACK_TITLES].map((title, idx) => (
            <span key={`${title}-${idx}`} className="inline-flex items-center gap-6 whitespace-nowrap">
              <span className={idx % 3 === 0 ? 'text-[#FF5500]' : idx % 3 === 1 ? 'text-[#F5EFEA]' : 'text-[#FFAA00]'}>
                {title}
              </span>
              <span aria-hidden="true" className="text-white/25">
                ·
              </span>
            </span>
          ))}
        </div>
      </div>

      {/* Latest Release Spotlight: Ivy EP */}
      <motion.section
        initial={{ opacity: 0, y: 18 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.08 }}
        transition={{ duration: 0.42, ease: EASE_OUT_EXPO }}
        className="py-14 sm:py-18"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap items-end justify-between gap-4 mb-8">
            <div className="min-w-0">
              <p className="text-xs font-mono-tabular text-[#FF5500] mb-2">
                Latest Release · {ivyRelease.releaseDate}
              </p>
              <h2 className="font-display text-4xl sm:text-6xl text-[#F5EFEA] tracking-tight text-balance">
                IVY EP
              </h2>
            </div>
            <p className="text-xs font-mono-tabular text-[#FFAA00]">
              {ivyRelease.format} · {ivyRelease.trackCount} Tracks · {ivyRelease.releaseDate}
            </p>
          </div>

          <div className="rounded-2xl bg-[#15100D] border border-[#FF5500]/45 shadow-[0_24px_60px_-24px_rgba(255,85,0,0.3)] p-5 sm:p-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left: Cover + Info + 5 Verified Tracks */}
            <div className="lg:col-span-6 min-w-0 flex flex-col justify-between h-full">
              <div>
                <div className="flex flex-col sm:flex-row sm:items-center gap-5 mb-6">
                  <div className="w-28 h-28 sm:w-32 sm:h-32 aspect-square rounded-xl overflow-hidden border border-white/12 shrink-0 group">
                    <ReleaseCover
                      title={ivyRelease.title}
                      coverUrl={ivyRelease.coverUrl}
                      accentColor={ivyRelease.accentColor}
                    />
                  </div>
                  <div className="min-w-0">
                    <div className="flex flex-wrap items-center gap-2 text-xs font-mono-tabular text-[#A3968C] mb-2">
                      <span className="text-[#FF5500] font-semibold">Latest Release</span>
                      <span aria-hidden="true">·</span>
                      <span>{ivyRelease.format}</span>
                      <span aria-hidden="true">·</span>
                      <span>{ivyRelease.trackCount} Tracks</span>
                    </div>
                    <h3 className="font-display text-3xl sm:text-4xl text-[#F5EFEA]">
                      {ivyRelease.title}
                    </h3>
                    <p className="text-xs font-mono-tabular text-[#A3968C] mt-1">
                      Released {ivyRelease.releaseDate}
                    </p>
                  </div>
                </div>

                {/* Five Verified Ivy EP Tracks in Exact Order */}
                <div className="rounded-xl bg-[#0D0A08] border border-white/10 p-4">
                  <p className="text-xs font-mono-tabular text-[#FFAA00] mb-3">
                    Tracklist · {ivyRelease.trackCount} Tracks
                  </p>
                  <ol className="divide-y divide-white/8">
                    {ivyRelease.tracks.map((track) => (
                      <li
                        key={track.id}
                        className="py-2.5 first:pt-0 last:pb-0 flex items-center justify-between gap-3 text-sm"
                      >
                        <div className="flex items-center gap-3 min-w-0">
                          <span className="font-mono-tabular text-xs text-[#FF5500] w-5 shrink-0">
                            0{track.number}
                          </span>
                          <span className="text-[#F5EFEA] font-medium break-words">
                            {track.title}
                          </span>
                        </div>
                        <span className="text-xs font-mono-tabular text-[#A3968C] shrink-0">
                          {track.duration}
                        </span>
                      </li>
                    ))}
                  </ol>
                </div>
              </div>

              <div className="mt-6 flex flex-wrap items-center gap-3">
                <a
                  href={VERIFIED_LINKS.ivySpotifyAlbum}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-3 rounded-lg bg-[#FF5500] hover:bg-[#E62210] hover:-translate-y-0.5 hover:shadow-[0_10px_24px_-6px_rgba(255,85,0,0.45)] active:scale-[0.98] text-[#0D0A08] font-semibold text-xs sm:text-sm transition-all duration-200 whitespace-nowrap shrink-0"
                >
                  <span>Open Ivy on Spotify</span>
                  <ExternalLink className="w-4 h-4" aria-hidden="true" />
                </a>

                <a
                  href={ivyRelease.bandlabUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-3 rounded-lg bg-[#1C1511] hover:bg-white/10 text-[#F5EFEA] border border-white/12 hover:border-[#FF5500]/45 text-xs sm:text-sm font-medium transition-colors whitespace-nowrap shrink-0"
                >
                  <span>BandLab</span>
                  <ExternalLink className="w-3.5 h-3.5 text-[#FF5500]" aria-hidden="true" />
                </a>

                <button
                  type="button"
                  onClick={() => onNavigate('videos')}
                  className="inline-flex items-center gap-2 px-4 py-3 rounded-lg text-[#FFAA00] hover:text-[#FF5500] text-xs sm:text-sm font-medium transition-colors whitespace-nowrap shrink-0"
                >
                  <PlayCircle className="w-4 h-4" aria-hidden="true" />
                  <span>Watch Ivy Videos</span>
                </button>
              </div>
            </div>

            {/* Right: Real Spotify Album Embed for Ivy EP */}
            <div className="lg:col-span-6 min-w-0">
              <div className="w-full overflow-hidden rounded-xl bg-[#0D0A08] border border-white/10">
                <iframe
                  title="Ivy EP — Julian Peral on Spotify"
                  src={VERIFIED_LINKS.ivySpotifyEmbed}
                  width="100%"
                  height="380"
                  frameBorder="0"
                  allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                  loading="lazy"
                  className="block w-full"
                />
              </div>
            </div>
          </div>
        </div>
      </motion.section>

      {/* Featured Release Spotlight: Volatil3 Dystopia LP */}
      <motion.section
        initial={{ opacity: 0, y: 18 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.08 }}
        transition={{ duration: 0.42, ease: EASE_OUT_EXPO }}
        className="py-14 sm:py-18"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap items-end justify-between gap-4 mb-8">
            <div className="min-w-0">
              <p className="text-xs font-mono-tabular text-[#FF5500] mb-2">
                Featured Release Spotlight
              </p>
              <h2 className="font-display text-3xl sm:text-5xl text-[#F5EFEA] tracking-tight text-balance">
                VOLATIL3 DYSTOPIA
              </h2>
            </div>
            <p className="text-xs font-mono-tabular text-[#A3968C]">
              {volatil3Release.format} · {volatil3Release.trackCount} Tracks · {volatil3Release.releaseDate}
            </p>
          </div>

          <div className="group rounded-2xl bg-[#15100D] border border-white/12 hover:border-[#FF5500]/40 transition-colors duration-300 p-5 sm:p-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-4 min-w-0">
              <div className="relative aspect-square rounded-xl overflow-hidden border border-white/10">
                <ReleaseCover
                  title={volatil3Release.title}
                  coverUrl={volatil3Release.coverUrl}
                  accentColor={volatil3Release.accentColor}
                />
              </div>
            </div>

            <div className="lg:col-span-8 min-w-0 flex flex-col justify-between">
              <div>
                <div className="flex flex-wrap items-center gap-3 text-xs font-mono-tabular text-[#A3968C] mb-4">
                  <span className="text-[#FF5500] font-medium">{volatil3Release.format} Release</span>
                  <span aria-hidden="true">·</span>
                  <span>{volatil3Release.trackCount} Tracks</span>
                  <span aria-hidden="true">·</span>
                  <span>Released {volatil3Release.releaseDate}</span>
                </div>

                <h3 className="font-display text-3xl sm:text-4xl text-[#F5EFEA]">
                  {volatil3Release.title}
                </h3>

                <p className="mt-4 text-base text-[#A3968C] leading-relaxed max-w-2xl">
                  A 13-track full-length electronic synthwave album by{' '}
                  {volatil3Release.artistCredit}, released {volatil3Release.releaseDate}. Part of a
                  six-release discography totaling {ARTIST_PROFILE.totalTracks} tracks from{' '}
                  {ARTIST_PROFILE.location}.
                </p>

                <div className="mt-6 pt-6 border-t border-white/10 grid grid-cols-2 sm:grid-cols-3 gap-6">
                  <div>
                    <p className="text-xs font-mono-tabular text-[#A3968C]">Release Date</p>
                    <p className="mt-1 text-sm font-semibold text-[#F5EFEA]">
                      {volatil3Release.releaseDate}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs font-mono-tabular text-[#A3968C]">Track Total</p>
                    <p className="mt-1 text-sm font-semibold font-mono-tabular text-[#F5EFEA]">
                      {volatil3Release.trackCount} Tracks
                    </p>
                  </div>
                  <div>
                    <p className="text-xs font-mono-tabular text-[#A3968C]">Format</p>
                    <p className="mt-1 text-sm font-semibold text-[#FFAA00]">
                      Full-Length {volatil3Release.format}
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-8 flex flex-wrap items-center gap-4">
                <a
                  href={volatil3Release.bandlabUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2.5 px-5 py-3 rounded-lg bg-[#FF5500] hover:bg-[#E62210] hover:-translate-y-0.5 hover:shadow-[0_10px_24px_-6px_rgba(255,85,0,0.45)] active:scale-[0.98] text-[#0D0A08] font-semibold text-sm transition-all duration-200 whitespace-nowrap shrink-0"
                >
                  <span>Listen on BandLab</span>
                  <ExternalLink className="w-4 h-4" aria-hidden="true" />
                </a>

                <button
                  type="button"
                  onClick={() => onNavigate('albums')}
                  className="inline-flex items-center gap-2 px-5 py-3 rounded-lg bg-[#1C1511] hover:bg-white/10 hover:-translate-y-0.5 text-[#F5EFEA] border border-white/12 hover:border-[#FF5500]/45 active:scale-[0.98] text-sm font-medium transition-all duration-200 whitespace-nowrap shrink-0"
                >
                  <Disc3 className="w-4 h-4 text-[#FF5500]" aria-hidden="true" />
                  <span>Open Albums</span>
                  <ArrowRight className="w-4 h-4" aria-hidden="true" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </motion.section>

      {/* Featured Tracks Preview (with parent album real cover & Share buttons) */}
      <motion.section
        initial={{ opacity: 0, y: 18 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.08 }}
        transition={{ duration: 0.42, ease: EASE_OUT_EXPO }}
        className="py-14 sm:py-18"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap items-end justify-between gap-4 mb-8">
            <div className="min-w-0">
              <p className="text-xs font-mono-tabular text-[#FF5500] mb-2">
                Selected Tracks · Verified Durations
              </p>
              <h2 className="font-display text-3xl sm:text-5xl text-[#F5EFEA] tracking-tight text-balance">
                FEATURED TRACKS
              </h2>
            </div>
            <button
              type="button"
              onClick={() => onNavigate('music')}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-[#15100D] hover:bg-[#1C1511] hover:-translate-y-0.5 border border-white/12 hover:border-[#FF5500]/50 text-xs font-medium text-[#F5EFEA] transition-all duration-200 whitespace-nowrap shrink-0"
            >
              <span>View All {ARTIST_PROFILE.totalTracks} Tracks</span>
              <ArrowRight className="w-3.5 h-3.5 text-[#FF5500]" aria-hidden="true" />
            </button>
          </div>

          <div className="space-y-3">
            {FEATURED_TRACKS.map((track, idx) => {
              const isCopied = copiedId === track.id;
              return (
                <motion.div
                  key={track.id}
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.08 }}
                  transition={{ duration: 0.32, delay: idx * 0.05, ease: EASE_OUT_EXPO }}
                  className="group rounded-xl p-4 bg-[#15100D] border border-white/10 hover:border-[#FF5500]/55 hover:-translate-y-0.5 hover:shadow-[0_6px_22px_-6px_rgba(255,85,0,0.24)] transition-all duration-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                >
                  <div className="flex items-center gap-3.5 min-w-0">
                    <div className="w-12 h-12 aspect-square rounded-lg overflow-hidden border border-white/10 shrink-0">
                      <ReleaseCover title={track.albumTitle} coverUrl={track.coverUrl} />
                    </div>
                    <div className="min-w-0">
                      <p className="text-sm sm:text-base font-semibold text-[#F5EFEA] break-words">
                        {track.title}
                      </p>
                      <p className="text-xs font-mono-tabular text-[#A3968C] mt-0.5">
                        <span>{track.albumTitle}</span>
                        <span aria-hidden="true"> · </span>
                        <span className="text-[#FFAA00]">{track.duration}</span>
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center gap-2.5 shrink-0">
                    {track.spotifyUrl ? (
                      <a
                        href={track.spotifyUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg bg-[#FF5500]/15 hover:bg-[#FF5500] text-[#FF5500] hover:text-[#0D0A08] border border-[#FF5500]/40 text-xs font-semibold transition-colors whitespace-nowrap"
                      >
                        <span>Listen on Spotify</span>
                        <ExternalLink className="w-3 h-3" aria-hidden="true" />
                      </a>
                    ) : (
                      <span className="text-xs font-mono-tabular text-[#A3968C] px-2 py-1">
                        Not on Spotify
                      </span>
                    )}

                    <button
                      type="button"
                      onClick={() => void handleShareTrack(track)}
                      aria-label={`Share ${track.title}`}
                      className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg bg-[#0D0A08] hover:bg-white/10 border border-white/12 hover:border-[#FF5500]/45 text-xs font-mono-tabular text-[#F5EFEA] transition-colors whitespace-nowrap"
                    >
                      {isCopied ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-[#FFAA00]" aria-hidden="true" />
                          <span className="text-[#FFAA00]">Copied</span>
                        </>
                      ) : (
                        <>
                          <Share2 className="w-3.5 h-3.5 text-[#A3968C]" aria-hidden="true" />
                          <span>Share</span>
                        </>
                      )}
                    </button>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </motion.section>

      {/* (c) Latest Videos Strip (Ivy Playlist Videos linking to Videos Page) */}
      <motion.section
        initial={{ opacity: 0, y: 18 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.08 }}
        transition={{ duration: 0.42, ease: EASE_OUT_EXPO }}
        className="py-14 sm:py-18"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap items-end justify-between gap-4 mb-8">
            <div className="min-w-0">
              <p className="text-xs font-mono-tabular text-[#FF5500] mb-2">
                {VERIFIED_LINKS.youtubeChannelTitle} · Ivy Playlist
              </p>
              <h2 className="font-display text-3xl sm:text-5xl text-[#F5EFEA] tracking-tight text-balance">
                LATEST VIDEOS
              </h2>
            </div>

            <button
              type="button"
              onClick={() => onNavigate('videos')}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-[#FF5500] hover:bg-[#E62210] hover:-translate-y-0.5 hover:shadow-[0_8px_22px_-6px_rgba(255,85,0,0.45)] active:scale-[0.98] text-[#0D0A08] font-semibold text-xs transition-all duration-200 whitespace-nowrap shrink-0"
            >
              <span>Open Videos Page</span>
              <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {IVY_VIDEOS.map((video, idx) => (
              <motion.article
                key={video.id}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.08 }}
                transition={{ duration: 0.36, delay: idx * 0.05, ease: EASE_OUT_EXPO }}
                className="min-w-0 rounded-xl overflow-hidden bg-[#15100D] border border-white/10 hover:border-[#FF5500]/55 transition-colors"
              >
                <div className="relative w-full aspect-video bg-[#0D0A08]">
                  <iframe
                    title={`${video.title} — ${VERIFIED_LINKS.youtubeChannelTitle}`}
                    src={video.embedUrl}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    referrerPolicy="strict-origin-when-cross-origin"
                    allowFullScreen
                    loading="lazy"
                    className="w-full h-full border-0"
                  />
                </div>
                <div className="p-4 flex items-center justify-between gap-3">
                  <h3 className="font-display text-xl text-[#F5EFEA] break-words">{video.title}</h3>
                  <span className="font-mono-tabular text-xs text-[#FFAA00] shrink-0">
                    {video.duration}
                  </span>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Discography Preview */}
      <motion.section
        initial={{ opacity: 0, y: 18 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.08 }}
        transition={{ duration: 0.42, ease: EASE_OUT_EXPO }}
        className="py-14 sm:py-18"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap items-end justify-between gap-4 mb-8">
            <div className="min-w-0">
              <p className="text-xs font-mono-tabular text-[#FF5500] mb-2">
                {ARTIST_PROFILE.totalReleases} Releases · {ARTIST_PROFILE.totalTracks} Tracks Total
              </p>
              <h2 className="font-display text-3xl sm:text-5xl text-[#F5EFEA] tracking-tight text-balance">
                VERIFIED DISCOGRAPHY
              </h2>
            </div>

            <button
              type="button"
              onClick={() => onNavigate('albums')}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-[#15100D] hover:bg-[#1C1511] border border-white/12 hover:border-[#FF5500]/50 text-xs font-medium text-[#F5EFEA] transition-colors whitespace-nowrap shrink-0"
            >
              <span>Explore All Releases</span>
              <ArrowRight className="w-3.5 h-3.5 text-[#FF5500]" aria-hidden="true" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {DISCOGRAPHY.map((release, idx) => (
              <motion.button
                key={release.id}
                type="button"
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.08 }}
                transition={{ duration: 0.36, delay: idx * 0.06, ease: EASE_OUT_EXPO }}
                onClick={() => onNavigate('albums')}
                className="min-w-0 text-left group rounded-xl overflow-hidden bg-[#15100D] border border-white/10 hover:border-[#FF5500]/65 hover:-translate-y-1 hover:shadow-[0_14px_32px_-10px_rgba(255,85,0,0.3)] transition-all duration-200"
              >
                <div className="relative aspect-square overflow-hidden border-b border-white/10">
                  <ReleaseCover
                    title={release.title}
                    coverUrl={release.coverUrl}
                    accentColor={release.accentColor}
                  />
                  <div className="pointer-events-none absolute inset-x-0 bottom-0 p-4 bg-gradient-to-t from-[#0D0A08]/90 via-[#0D0A08]/45 to-transparent flex items-end justify-between gap-2">
                    <span className="text-xs font-mono-tabular text-[#FFAA00]">
                      {release.format} · {release.trackCount} Tracks
                    </span>
                    <span className="text-xs font-mono-tabular text-[#F5EFEA]/90">
                      {release.releaseDate}
                    </span>
                  </div>
                </div>
                <div className="p-4 flex items-center justify-between gap-3">
                  <div className="min-w-0">
                    <h3 className="font-display text-2xl text-[#F5EFEA] group-hover:text-[#FF5500] transition-colors break-words">
                      {release.title}
                    </h3>
                    <p className="text-xs text-[#A3968C] mt-0.5">
                      {release.format} · {release.releaseDate}
                    </p>
                  </div>
                  <span className="text-xs font-mono-tabular text-[#FF5500] group-hover:translate-x-0.5 transition-transform shrink-0">
                    View →
                  </span>
                </div>
              </motion.button>
            ))}
          </div>
        </div>
      </motion.section>
    </div>
  );
};
