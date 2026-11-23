import React from 'react';
import { ExternalLink, ListVideo } from 'lucide-react';
import { motion } from 'motion/react';
import {
  IVY_VIDEOS,
  VERIFIED_LINKS,
  YOUTUBE_PLAYLIST_EMBEDS,
  YOUTUBE_SINGLE_EMBEDS,
} from '../data/artistData';

const EASE_OUT_EXPO: [number, number, number, number] = [0.16, 1, 0.3, 1];

export const VideosSection: React.FC = () => {
  return (
    <section id="videos" className="py-12 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-14">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.36, ease: EASE_OUT_EXPO }}
          className="flex flex-col md:flex-row md:items-end justify-between gap-6"
        >
          <div className="min-w-0">
            <p className="text-xs font-mono-tabular text-[#FF5500] mb-2">
              {VERIFIED_LINKS.youtubeChannelTitle} · YouTube
            </p>
            <h2 className="font-display text-4xl sm:text-5xl text-[#F5EFEA] tracking-tight text-balance">
              VIDEOS
            </h2>
            <p className="mt-2 text-sm sm:text-base text-[#A3968C] max-w-2xl">
              Official video playlists and album streams from {VERIFIED_LINKS.youtubeChannelTitle}.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <a
              href={VERIFIED_LINKS.ivyPlaylist}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-[#15100D] hover:bg-[#1C1511] hover:-translate-y-0.5 border border-white/12 hover:border-[#FF5500]/50 text-xs font-medium text-[#F5EFEA] transition-all duration-200 whitespace-nowrap"
            >
              <ListVideo className="w-3.5 h-3.5 text-[#FFAA00]" aria-hidden="true" />
              <span>Ivy YouTube Playlist</span>
              <ExternalLink className="w-3.5 h-3.5 text-[#A3968C]" aria-hidden="true" />
            </a>

            <a
              href={VERIFIED_LINKS.youtube}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-[#FF5500] hover:bg-[#E62210] hover:-translate-y-0.5 hover:shadow-[0_8px_22px_-6px_rgba(255,85,0,0.45)] active:scale-[0.98] text-[#0D0A08] font-semibold text-xs transition-all duration-200 whitespace-nowrap"
            >
              <span>{VERIFIED_LINKS.youtubeChannelTitle}</span>
              <ExternalLink className="w-3.5 h-3.5" aria-hidden="true" />
            </a>
          </div>
        </motion.div>

        {/* Ivy EP — 5 Verified Playlist Videos */}
        <div>
          <div className="flex flex-wrap items-end justify-between gap-4 mb-6">
            <div>
              <p className="text-xs font-mono-tabular text-[#FF5500] mb-1">
                Ivy EP · 5 Videos
              </p>
              <h3 className="font-display text-3xl sm:text-4xl text-[#F5EFEA] tracking-tight">
                IVY PLAYLIST
              </h3>
            </div>
            <a
              href={VERIFIED_LINKS.ivyPlaylist}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-xs font-mono-tabular text-[#FFAA00] hover:text-[#FF5500] transition-colors whitespace-nowrap"
            >
              <span>Open Ivy Playlist on YouTube</span>
              <ExternalLink className="w-3.5 h-3.5" aria-hidden="true" />
            </a>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {IVY_VIDEOS.map((video, idx) => (
              <motion.article
                key={video.id}
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.36, delay: idx * 0.06, ease: EASE_OUT_EXPO }}
                className="min-w-0 rounded-xl overflow-hidden bg-[#15100D] border border-white/12 hover:border-[#FF5500]/55 hover:-translate-y-0.5 hover:shadow-[0_12px_30px_-10px_rgba(255,85,0,0.28)] transition-all duration-200"
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

                <div className="p-4 sm:p-5 flex flex-wrap items-center justify-between gap-3">
                  <div className="min-w-0">
                    <p className="text-xs font-mono-tabular text-[#FF5500]">
                      Track 0{idx + 1} · {VERIFIED_LINKS.youtubeChannelTitle}
                    </p>
                    <h4 className="font-display text-2xl text-[#F5EFEA] mt-0.5 break-words">
                      {video.title}
                    </h4>
                  </div>
                  <span className="font-mono-tabular text-xs text-[#FFAA00] shrink-0">
                    {video.duration}
                  </span>
                </div>
              </motion.article>
            ))}
          </div>
        </div>

        {/* TerceT & Thrice Album Playlists */}
        <div>
          <div className="flex flex-wrap items-end justify-between gap-4 mb-6">
            <div>
              <p className="text-xs font-mono-tabular text-[#FF5500] mb-1">
                Full-Length Album Playlists
              </p>
              <h3 className="font-display text-3xl sm:text-4xl text-[#F5EFEA] tracking-tight">
                TERCET &amp; THRICE
              </h3>
            </div>
            <p className="text-xs font-mono-tabular text-[#A3968C]">
              {VERIFIED_LINKS.youtubeChannelTitle}
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {YOUTUBE_PLAYLIST_EMBEDS.map((playlist, idx) => (
              <motion.article
                key={playlist.id}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.12 }}
                transition={{ duration: 0.36, delay: idx * 0.06, ease: EASE_OUT_EXPO }}
                className="min-w-0 rounded-xl overflow-hidden bg-[#15100D] border border-white/12 hover:border-[#FF5500]/55 hover:-translate-y-0.5 hover:shadow-[0_12px_30px_-10px_rgba(255,85,0,0.28)] transition-all duration-200"
              >
                <div className="relative w-full aspect-video bg-[#0D0A08]">
                  <iframe
                    title={`${playlist.title} Playlist — ${VERIFIED_LINKS.youtubeChannelTitle}`}
                    src={playlist.embedUrl}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    referrerPolicy="strict-origin-when-cross-origin"
                    allowFullScreen
                    loading="lazy"
                    className="w-full h-full border-0"
                  />
                </div>

                <div className="p-4 sm:p-5 flex flex-wrap items-center justify-between gap-3">
                  <div className="min-w-0">
                    <p className="text-xs font-mono-tabular text-[#FF5500]">
                      {playlist.itemCountLabel}
                      {playlist.note ? ` · ${playlist.note}` : ''}
                    </p>
                    <h4 className="font-display text-2xl text-[#F5EFEA] mt-0.5">
                      {playlist.title}
                    </h4>
                  </div>

                  <a
                    href={playlist.playlistUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#0D0A08] hover:bg-white/10 border border-white/12 hover:border-[#FF5500]/50 text-xs font-medium text-[#F5EFEA] transition-colors whitespace-nowrap shrink-0"
                  >
                    <span>YouTube Playlist</span>
                    <ExternalLink className="w-3.5 h-3.5 text-[#FFAA00]" aria-hidden="true" />
                  </a>
                </div>
              </motion.article>
            ))}
          </div>
        </div>

        {/* Verified Single Track Videos */}
        <div>
          <div className="flex flex-wrap items-end justify-between gap-4 mb-6">
            <div>
              <p className="text-xs font-mono-tabular text-[#FF5500] mb-1">
                Individual Releases
              </p>
              <h3 className="font-display text-3xl sm:text-4xl text-[#F5EFEA] tracking-tight">
                TRACK VIDEOS
              </h3>
            </div>
            <p className="text-xs font-mono-tabular text-[#A3968C]">
              3 Official Topic Videos
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {YOUTUBE_SINGLE_EMBEDS.map((item, idx) => (
              <motion.article
                key={item.id}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.12 }}
                transition={{ duration: 0.36, delay: idx * 0.06, ease: EASE_OUT_EXPO }}
                className="min-w-0 rounded-xl overflow-hidden bg-[#15100D] border border-white/12 hover:border-[#FF5500]/55 hover:-translate-y-0.5 hover:shadow-[0_12px_30px_-10px_rgba(255,85,0,0.28)] transition-all duration-200 flex flex-col"
              >
                <div className="relative w-full aspect-video bg-[#0D0A08]">
                  <iframe
                    title={`${item.title} — ${VERIFIED_LINKS.youtubeChannelTitle}`}
                    src={item.embedUrl}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    referrerPolicy="strict-origin-when-cross-origin"
                    allowFullScreen
                    loading="lazy"
                    className="w-full h-full border-0"
                  />
                </div>

                <div className="p-4 sm:p-5 flex items-center justify-between gap-3 mt-auto">
                  <div className="min-w-0">
                    <p className="text-xs font-mono-tabular text-[#FF5500]">
                      {item.itemCountLabel}
                      {item.duration ? ` · ${item.duration}` : ''}
                    </p>
                    <h4 className="font-display text-2xl text-[#F5EFEA] mt-0.5 truncate">
                      {item.title}
                    </h4>
                  </div>

                  <a
                    href={item.playlistUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#0D0A08] hover:bg-white/10 border border-white/12 hover:border-[#FF5500]/50 text-xs font-medium text-[#F5EFEA] transition-colors whitespace-nowrap shrink-0"
                  >
                    <span>Playlist</span>
                    <ExternalLink className="w-3.5 h-3.5 text-[#FFAA00]" aria-hidden="true" />
                  </a>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
