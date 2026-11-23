import React, { useEffect, useState } from 'react';
import { Check, ExternalLink, Share2, X } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import { AlbumTrack, ARTIST_PROFILE, DISCOGRAPHY, Release } from '../data/artistData';
import { copyTextToClipboard } from '../utils/clipboard';
import { ReleaseCover } from './ReleaseCover';

type FilterType = 'ALL' | 'LP' | 'EP';
const EASE_OUT_EXPO: [number, number, number, number] = [0.16, 1, 0.3, 1];

export const AlbumsSection: React.FC = () => {
  const [filter, setFilter] = useState<FilterType>('ALL');
  const [selectedRelease, setSelectedRelease] = useState<Release | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  useEffect(() => {
    if (!selectedRelease) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setSelectedRelease(null);
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [selectedRelease]);

  const filteredReleases = DISCOGRAPHY.filter((release) => {
    if (filter === 'ALL') return true;
    return release.format === filter;
  });

  const lpCount = DISCOGRAPHY.filter((r) => r.format === 'LP').length;
  const epCount = DISCOGRAPHY.filter((r) => r.format === 'EP').length;

  const handleShareTrack = async (track: AlbumTrack) => {
    const shareTarget = track.spotifyUrl ?? window.location.href;
    const ok = await copyTextToClipboard(shareTarget);
    if (ok) {
      setCopiedId(track.id);
      window.setTimeout(() => {
        setCopiedId((cur) => (cur === track.id ? null : cur));
      }, 2000);
    }
  };

  return (
    <section id="albums" className="py-12 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header & Interactive Filter Controls */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.36, ease: EASE_OUT_EXPO }}
          className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10"
        >
          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-2 text-xs font-mono-tabular text-[#A3968C] mb-2">
              <span className="text-[#FF5500] font-medium">Catalog</span>
              <span aria-hidden="true">·</span>
              <span>{ARTIST_PROFILE.totalReleases} Releases</span>
              <span aria-hidden="true">·</span>
              <span>{ARTIST_PROFILE.totalTracks} Tracks Total</span>
            </div>
            <h2 className="font-display text-4xl sm:text-5xl text-[#F5EFEA] tracking-tight text-balance">
              DISCOGRAPHY &amp; ALBUMS
            </h2>
            <p className="mt-2 text-sm sm:text-base text-[#A3968C] max-w-2xl">
              Complete verified catalog from {ARTIST_PROFILE.name} ({ARTIST_PROFILE.location}).
              Select any release to open its full tracklist detail view.
            </p>
          </div>

          {/* Functional Segmented Filter Tabs */}
          <div
            role="group"
            aria-label="Filter discography by release format"
            className="inline-flex flex-wrap items-center gap-1 p-1 rounded-lg bg-[#15100D] border border-white/10 self-start md:self-auto"
          >
            <button
              type="button"
              onClick={() => setFilter('ALL')}
              className={`px-3.5 py-2 rounded-md text-xs font-mono-tabular font-medium transition-all duration-200 whitespace-nowrap shrink-0 ${
                filter === 'ALL'
                  ? 'bg-[#FF5500] text-[#0D0A08] shadow-sm'
                  : 'text-[#A3968C] hover:text-[#F5EFEA]'
              }`}
            >
              All Releases ({DISCOGRAPHY.length})
            </button>
            <button
              type="button"
              onClick={() => setFilter('LP')}
              className={`px-3.5 py-2 rounded-md text-xs font-mono-tabular font-medium transition-all duration-200 whitespace-nowrap shrink-0 ${
                filter === 'LP'
                  ? 'bg-[#FF5500] text-[#0D0A08] shadow-sm'
                  : 'text-[#A3968C] hover:text-[#F5EFEA]'
              }`}
            >
              LPs ({lpCount})
            </button>
            <button
              type="button"
              onClick={() => setFilter('EP')}
              className={`px-3.5 py-2 rounded-md text-xs font-mono-tabular font-medium transition-all duration-200 whitespace-nowrap shrink-0 ${
                filter === 'EP'
                  ? 'bg-[#FF5500] text-[#0D0A08] shadow-sm'
                  : 'text-[#A3968C] hover:text-[#F5EFEA]'
              }`}
            >
              EPs ({epCount})
            </button>
          </div>
        </motion.div>

        {/* Staggered Discography Grid */}
        <div key={filter} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredReleases.map((release: Release, idx: number) => (
            <motion.article
              key={release.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.38,
                delay: idx * 0.06,
                ease: EASE_OUT_EXPO,
              }}
              className="min-w-0 group flex flex-col rounded-xl overflow-hidden bg-[#15100D] border border-white/12 hover:border-[#FF5500]/65 hover:-translate-y-1 hover:shadow-[0_14px_34px_-10px_rgba(255,85,0,0.32)] transition-all duration-200"
            >
              {/* Square Real Cover Art Frame */}
              <button
                type="button"
                onClick={() => setSelectedRelease(release)}
                aria-label={`Open ${release.title} details and tracklist`}
                className="relative aspect-square w-full overflow-hidden border-b border-white/10 text-left cursor-pointer"
              >
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
              </button>

              {/* Card Body */}
              <div className="p-5 flex-1 flex flex-col justify-between min-w-0">
                <div className="min-w-0">
                  <div className="flex items-center justify-between gap-2 text-xs font-mono-tabular text-[#A3968C] mb-1.5">
                    <span>{release.format === 'LP' ? 'Full-Length Album' : 'Extended Play'}</span>
                    <span>{release.trackCount} Tracks</span>
                  </div>
                  <h3 className="font-display text-2xl sm:text-3xl text-[#F5EFEA] group-hover:text-[#FF5500] transition-colors tracking-tight break-words">
                    {release.title}
                  </h3>
                  <p className="mt-2 text-sm text-[#A3968C]">
                    Released {release.releaseDate} · {ARTIST_PROFILE.name}
                  </p>
                </div>

                <div className="mt-5 pt-4 border-t border-white/10 space-y-3">
                  <button
                    type="button"
                    onClick={() => setSelectedRelease(release)}
                    className="w-full py-2.5 px-4 rounded-lg bg-[#FF5500] hover:bg-[#E62210] active:scale-[0.98] text-[#0D0A08] font-semibold text-xs transition-all duration-150"
                  >
                    View Tracklist ({release.trackCount} Tracks)
                  </button>

                  <div className="flex flex-wrap items-center gap-2">
                    <a
                      href={release.bandlabUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg bg-[#0D0A08] hover:bg-white/10 border border-white/12 hover:border-[#FF5500]/50 text-[#F5EFEA] font-medium text-xs transition-colors whitespace-nowrap"
                    >
                      <span>BandLab</span>
                      <ExternalLink className="w-3 h-3 text-[#FF5500]" aria-hidden="true" />
                    </a>

                    {release.spotifyUrl && (
                      <a
                        href={release.spotifyUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg bg-[#0D0A08] hover:bg-white/10 border border-white/12 hover:border-[#FFAA00]/50 text-[#F5EFEA] font-medium text-xs transition-colors whitespace-nowrap"
                      >
                        <span>Spotify</span>
                        <ExternalLink className="w-3 h-3 text-[#FFAA00]" aria-hidden="true" />
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>

      {/* Release Detail Modal with Real Cover Art & Verified Tracklist */}
      <AnimatePresence>
        {selectedRelease && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.18 }}
            role="dialog"
            aria-modal="true"
            aria-labelledby="release-detail-title"
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
            onClick={() => setSelectedRelease(null)}
          >
            <motion.div
              initial={{ opacity: 0, y: 16, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 12, scale: 0.98 }}
              transition={{ duration: 0.22, ease: EASE_OUT_EXPO }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-3xl max-h-[88vh] overflow-y-auto rounded-2xl bg-[#15100D] border border-[#FF5500]/40 p-5 sm:p-8 shadow-2xl"
            >
              <button
                type="button"
                onClick={() => setSelectedRelease(null)}
                aria-label="Close release detail view"
                className="absolute top-4 right-4 w-10 h-10 rounded-lg bg-[#0D0A08] border border-white/15 hover:border-[#FF5500] text-[#F5EFEA] flex items-center justify-center transition-colors"
              >
                <X className="w-4 h-4" />
              </button>

              {/* Header: Square Cover + Metadata */}
              <div className="flex flex-col sm:flex-row sm:items-center gap-6 pr-10 pb-6 border-b border-white/10">
                <div className="w-36 h-36 sm:w-40 sm:h-40 aspect-square rounded-xl overflow-hidden border border-white/15 shrink-0">
                  <ReleaseCover
                    title={selectedRelease.title}
                    coverUrl={selectedRelease.coverUrl}
                    accentColor={selectedRelease.accentColor}
                  />
                </div>

                <div className="min-w-0">
                  <p className="text-xs font-mono-tabular text-[#FF5500]">
                    {selectedRelease.format} · {selectedRelease.trackCount} Tracks ·{' '}
                    {selectedRelease.releaseDate}
                  </p>
                  <h3
                    id="release-detail-title"
                    className="font-display text-3xl sm:text-5xl text-[#F5EFEA] mt-1 break-words"
                  >
                    {selectedRelease.title}
                  </h3>
                  <p className="text-sm text-[#A3968C] mt-1">{ARTIST_PROFILE.name}</p>

                  <div className="mt-4 flex flex-wrap items-center gap-2.5">
                    <a
                      href={selectedRelease.bandlabUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-[#FF5500] hover:bg-[#E62210] text-[#0D0A08] font-semibold text-xs transition-colors whitespace-nowrap"
                    >
                      <span>Open on BandLab</span>
                      <ExternalLink className="w-3.5 h-3.5" aria-hidden="true" />
                    </a>
                    {selectedRelease.spotifyUrl && (
                      <a
                        href={selectedRelease.spotifyUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-[#0D0A08] hover:bg-white/10 border border-white/15 text-[#F5EFEA] font-medium text-xs transition-colors whitespace-nowrap"
                      >
                        <span>Open on Spotify</span>
                        <ExternalLink className="w-3.5 h-3.5 text-[#FFAA00]" aria-hidden="true" />
                      </a>
                    )}
                  </div>
                </div>
              </div>

              {/* Complete Verified Tracklist */}
              <div className="mt-6">
                <p className="text-xs font-mono-tabular text-[#FFAA00] mb-3">
                  Tracklist ({selectedRelease.tracks.length} Tracks)
                </p>
                <ol className="divide-y divide-white/8 rounded-xl bg-[#0D0A08] border border-white/10">
                  {selectedRelease.tracks.map((track) => {
                    const isCopied = copiedId === track.id;
                    return (
                      <li
                        key={track.id}
                        className="px-4 py-3 flex flex-col sm:flex-row sm:items-center justify-between gap-2.5"
                      >
                        <div className="flex items-start sm:items-center gap-3 min-w-0">
                          <span className="font-mono-tabular text-xs text-[#FF5500] w-6 pt-0.5 sm:pt-0 shrink-0">
                            {track.number.toString().padStart(2, '0')}
                          </span>
                          <span className="text-sm text-[#F5EFEA] font-medium break-words">
                            {track.title}
                          </span>
                        </div>

                        <div className="flex flex-wrap items-center gap-2.5 shrink-0 pl-9 sm:pl-0">
                          <span className="font-mono-tabular text-xs text-[#A3968C]">
                            {track.duration}
                          </span>

                          {track.spotifyUrl ? (
                            <a
                              href={track.spotifyUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-1 px-2.5 py-1 rounded bg-[#FF5500]/15 hover:bg-[#FF5500] text-[#FF5500] hover:text-[#0D0A08] text-xs font-semibold transition-colors whitespace-nowrap"
                            >
                              <span>Spotify</span>
                              <ExternalLink className="w-3 h-3" aria-hidden="true" />
                            </a>
                          ) : track.notOnSpotify ? (
                            <span className="text-[11px] font-mono-tabular text-[#A3968C]">
                              Not on Spotify
                            </span>
                          ) : null}

                          <button
                            type="button"
                            onClick={() => void handleShareTrack(track)}
                            aria-label={`Share ${track.title}`}
                            className="inline-flex items-center gap-1 px-2 py-1 rounded border border-white/12 hover:border-[#FF5500]/50 text-xs font-mono-tabular text-[#F5EFEA] transition-colors whitespace-nowrap"
                          >
                            {isCopied ? (
                              <>
                                <Check className="w-3 h-3 text-[#FFAA00]" aria-hidden="true" />
                                <span className="text-[#FFAA00]">Copied</span>
                              </>
                            ) : (
                              <>
                                <Share2 className="w-3 h-3 text-[#A3968C]" aria-hidden="true" />
                                <span>Share</span>
                              </>
                            )}
                          </button>
                        </div>
                      </li>
                    );
                  })}
                </ol>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};
