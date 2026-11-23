import React, { useState } from 'react';
import { Check, ExternalLink, Share2 } from 'lucide-react';
import { motion } from 'motion/react';
import {
  AlbumTrack,
  ARTIST_PROFILE,
  DISCOGRAPHY,
  FEATURED_TRACKS,
  PageId,
  VERIFIED_LINKS,
} from '../data/artistData';
import { copyTextToClipboard } from '../utils/clipboard';
import { ReleaseCover } from './ReleaseCover';

interface MusicSectionProps {
  onNavigate: (id: PageId) => void;
}

const EASE_OUT_EXPO: [number, number, number, number] = [0.16, 1, 0.3, 1];

export const MusicSection: React.FC<MusicSectionProps> = ({ onNavigate }) => {
  const spotifyTracks = FEATURED_TRACKS.filter((t) => Boolean(t.spotifyEmbedUrl));
  const [selectedEmbedTrack, setSelectedEmbedTrack] = useState<AlbumTrack>(spotifyTracks[0]);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const handleShare = async (track: AlbumTrack) => {
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
    <section id="music" className="py-12 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Row */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.36, ease: EASE_OUT_EXPO }}
          className="flex flex-wrap items-end justify-between gap-6 mb-10"
        >
          <div className="min-w-0">
            <p className="text-xs font-mono-tabular text-[#FF5500] mb-2">
              Complete Catalog · {ARTIST_PROFILE.totalReleases} Releases · {ARTIST_PROFILE.totalTracks} Tracks
            </p>
            <h2 className="font-display text-4xl sm:text-5xl text-[#F5EFEA] tracking-tight text-balance">
              FULL TRACKLISTS
            </h2>
            <p className="mt-2 text-sm sm:text-base text-[#A3968C] max-w-2xl">
              All {ARTIST_PROFILE.totalTracks} verified tracks across {ARTIST_PROFILE.totalReleases}{' '}
              releases by {ARTIST_PROFILE.name}, grouped by album with exact durations and verified
              Spotify links.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <a
              href={VERIFIED_LINKS.bandlab}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-[#15100D] hover:bg-[#1C1511] hover:-translate-y-0.5 border border-white/12 hover:border-[#FF5500]/50 text-xs font-medium text-[#F5EFEA] transition-all duration-200 whitespace-nowrap shrink-0"
            >
              <span>BandLab Profile</span>
              <ExternalLink className="w-3.5 h-3.5 text-[#FF5500]" aria-hidden="true" />
            </a>

            <a
              href={VERIFIED_LINKS.spotify}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-[#FF5500] hover:bg-[#E62210] hover:-translate-y-0.5 hover:shadow-[0_8px_22px_-6px_rgba(255,85,0,0.45)] active:scale-[0.98] text-[#0D0A08] font-semibold text-xs transition-all duration-200 whitespace-nowrap shrink-0"
            >
              <span>Open Spotify</span>
              <ExternalLink className="w-3.5 h-3.5" aria-hidden="true" />
            </a>
          </div>
        </motion.div>

        {/* 2-Column Layout: All 63 Tracks Grouped by Album + Sticky Spotify Embed Player */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left: Full Tracklists Grouped by Album */}
          <div className="lg:col-span-7 min-w-0 space-y-8">
            {DISCOGRAPHY.map((album, albumIdx) => (
              <motion.div
                key={album.id}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.06 }}
                transition={{ duration: 0.36, delay: albumIdx * 0.04, ease: EASE_OUT_EXPO }}
                className="rounded-2xl bg-[#15100D] border border-white/12 overflow-hidden"
              >
                {/* Album Group Header with Real Cover Art */}
                <div className="p-4 sm:p-6 border-b border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-[#19130F]">
                  <div className="flex items-center gap-4 min-w-0">
                    <div className="w-16 h-16 sm:w-20 sm:h-20 aspect-square rounded-xl overflow-hidden border border-white/12 shrink-0 group">
                      <ReleaseCover
                        title={album.title}
                        coverUrl={album.coverUrl}
                        accentColor={album.accentColor}
                      />
                    </div>
                    <div className="min-w-0">
                      <p className="text-xs font-mono-tabular text-[#FF5500]">
                        {album.format} · {album.trackCount} Tracks · {album.releaseDate}
                      </p>
                      <h3 className="font-display text-2xl sm:text-3xl text-[#F5EFEA] mt-0.5 break-words">
                        {album.title}
                      </h3>
                      {album.artistCredit !== ARTIST_PROFILE.name && (
                        <p className="text-xs font-mono-tabular text-[#A3968C] mt-0.5">
                          {album.artistCredit}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center gap-2 shrink-0">
                    <a
                      href={album.bandlabUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg bg-[#0D0A08] hover:bg-white/10 border border-white/12 hover:border-[#FF5500]/50 text-xs font-mono-tabular text-[#F5EFEA] transition-colors whitespace-nowrap"
                    >
                      <span>BandLab Album</span>
                      <ExternalLink className="w-3 h-3 text-[#FF5500]" aria-hidden="true" />
                    </a>
                    {album.spotifyUrl && (
                      <a
                        href={album.spotifyUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg bg-[#FF5500] hover:bg-[#E62210] text-[#0D0A08] font-semibold text-xs transition-colors whitespace-nowrap"
                      >
                        <span>Spotify</span>
                        <ExternalLink className="w-3 h-3" aria-hidden="true" />
                      </a>
                    )}
                  </div>
                </div>

                {/* Track Rows */}
                <div className="divide-y divide-white/8">
                  {album.tracks.map((track) => {
                    const isSelectedInEmbed = selectedEmbedTrack.id === track.id;
                    const isCopied = copiedId === track.id;
                    const numLabel = track.number.toString().padStart(2, '0');

                    return (
                      <div
                        key={track.id}
                        className={`group px-4 sm:px-6 py-3.5 transition-colors hover:bg-[#1C1511] flex flex-col sm:flex-row sm:items-center justify-between gap-3 ${
                          isSelectedInEmbed ? 'bg-[#1C1511]/90' : ''
                        }`}
                      >
                        <div className="flex items-start sm:items-center gap-3.5 min-w-0">
                          <span
                            className={`font-mono-tabular text-xs font-semibold w-6 pt-0.5 sm:pt-0 shrink-0 ${
                              isSelectedInEmbed
                                ? 'text-[#FF5500]'
                                : 'text-[#A3968C] group-hover:text-[#FF5500]'
                            }`}
                          >
                            {numLabel}
                          </span>
                          <div className="w-9 h-9 aspect-square rounded overflow-hidden border border-white/10 shrink-0">
                            <ReleaseCover
                              title={album.title}
                              coverUrl={album.coverUrl}
                              accentColor={album.accentColor}
                            />
                          </div>
                          <div className="min-w-0">
                            <p className="text-sm sm:text-base font-medium text-[#F5EFEA] break-words">
                              {track.title}
                            </p>
                            <p className="text-xs font-mono-tabular text-[#A3968C]">
                              {track.duration}
                            </p>
                          </div>
                        </div>

                        <div className="flex flex-wrap items-center gap-2 shrink-0 sm:pl-2">
                          {track.spotifyUrl ? (
                            <>
                              <button
                                type="button"
                                onClick={() => setSelectedEmbedTrack(track)}
                                className={`px-2.5 py-1.5 rounded-lg text-xs font-mono-tabular transition-colors whitespace-nowrap ${
                                  isSelectedInEmbed
                                    ? 'bg-[#FF5500] text-[#0D0A08] font-semibold'
                                    : 'bg-[#0D0A08] hover:bg-white/10 text-[#F5EFEA] border border-white/12'
                                }`}
                              >
                                {isSelectedInEmbed ? 'In Player' : 'Play'}
                              </button>
                              <a
                                href={track.spotifyUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-[#FF5500]/15 hover:bg-[#FF5500] text-[#FF5500] hover:text-[#0D0A08] border border-[#FF5500]/40 text-xs font-semibold transition-colors whitespace-nowrap"
                              >
                                <span>Listen on Spotify</span>
                                <ExternalLink className="w-3 h-3" aria-hidden="true" />
                              </a>
                            </>
                          ) : track.notOnSpotify ? (
                            <span className="text-xs font-mono-tabular text-[#A3968C] px-2.5 py-1.5 rounded-lg bg-[#0D0A08] border border-white/8">
                              Not on Spotify
                            </span>
                          ) : null}

                          <button
                            type="button"
                            onClick={() => void handleShare(track)}
                            aria-label={`Share ${track.title}`}
                            className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-[#0D0A08] hover:bg-white/10 border border-white/12 hover:border-[#FF5500]/45 text-xs font-mono-tabular text-[#F5EFEA] transition-colors whitespace-nowrap"
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
                      </div>
                    );
                  })}
                </div>
              </motion.div>
            ))}
          </div>

          {/* Right: Real Spotify Embed Player + BandLab Summary */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.42, delay: 0.1, ease: EASE_OUT_EXPO }}
            className="lg:col-span-5 min-w-0 space-y-6 lg:sticky lg:top-20"
          >
            <div className="rounded-xl bg-[#15100D] border border-white/12 p-5 sm:p-6">
              <div className="flex flex-wrap items-center justify-between gap-2 text-xs font-mono-tabular text-[#A3968C] mb-4">
                <span className="text-[#FF5500] font-medium">Spotify Player</span>
                <span>
                  {selectedEmbedTrack.albumTitle} · {selectedEmbedTrack.duration}
                </span>
              </div>

              <div className="flex items-center gap-4 mb-4">
                <div className="w-14 h-14 aspect-square rounded-lg overflow-hidden border border-white/12 shrink-0">
                  <ReleaseCover
                    title={selectedEmbedTrack.albumTitle}
                    coverUrl={selectedEmbedTrack.coverUrl}
                  />
                </div>
                <h3 className="font-display text-2xl sm:text-3xl text-[#F5EFEA] break-words min-w-0">
                  {selectedEmbedTrack.title}
                </h3>
              </div>

              {/* Real Spotify Track Embed */}
              {selectedEmbedTrack.spotifyEmbedUrl && (
                <div className="w-full overflow-hidden rounded-xl bg-[#0D0A08] border border-white/10 mb-5">
                  <iframe
                    key={selectedEmbedTrack.id}
                    title={`${selectedEmbedTrack.title} — Julian Peral on Spotify`}
                    src={selectedEmbedTrack.spotifyEmbedUrl}
                    width="100%"
                    height="152"
                    frameBorder="0"
                    allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                    loading="lazy"
                    className="block w-full"
                  />
                </div>
              )}

              {/* Switch between Spotify-verified Top Tracks */}
              <div>
                <p className="text-xs font-mono-tabular text-[#A3968C] mb-2.5">
                  Verified Spotify Tracks
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {spotifyTracks.map((track) => {
                    const active = track.id === selectedEmbedTrack.id;
                    return (
                      <button
                        key={track.id}
                        type="button"
                        onClick={() => setSelectedEmbedTrack(track)}
                        className={`min-w-0 text-left px-3 py-2.5 rounded-lg border text-xs transition-colors ${
                          active
                            ? 'bg-[#FF5500] text-[#0D0A08] border-[#FF5500] font-semibold'
                            : 'bg-[#0D0A08] text-[#F5EFEA] border-white/10 hover:border-[#FF5500]/50'
                        }`}
                      >
                        <span className="block truncate">{track.title}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Verified BandLab Totals */}
            <div className="rounded-xl bg-[#15100D] border border-white/10 p-5 flex items-center justify-between gap-4">
              <div className="min-w-0">
                <p className="text-sm font-semibold text-[#F5EFEA]">BandLab Catalog Totals</p>
                <p className="text-xs text-[#A3968C] mt-0.5">
                  {ARTIST_PROFILE.bandlabFollowers} followers · {ARTIST_PROFILE.bandlabTotalPlays}{' '}
                  total plays · {ARTIST_PROFILE.totalTracks} tracks
                </p>
              </div>
              <button
                type="button"
                onClick={() => onNavigate('albums')}
                className="text-xs font-mono-tabular text-[#FF5500] hover:text-[#FFAA00] transition-colors shrink-0"
              >
                Albums →
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
