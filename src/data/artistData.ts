export interface AlbumTrack {
  id: string;
  number: number;
  title: string;
  duration: string;
  albumId: string;
  albumTitle: string;
  coverUrl?: string;
  spotifyUrl?: string;
  spotifyTrackId?: string;
  spotifyEmbedUrl?: string;
  notOnSpotify?: boolean;
}

export interface Release {
  id: string;
  title: string;
  artistCredit: string;
  format: 'LP' | 'EP';
  releaseDate: string;
  trackCount: number;
  bandlabUrl: string;
  coverUrl: string;
  spotifyUrl?: string;
  spotifyEmbedUrl?: string;
  featured?: boolean;
  accentColor: string;
  tracks: AlbumTrack[];
}

export interface VideoItem {
  id: string;
  title: string;
  duration: string;
  embedUrl: string;
}

export interface PlaylistEmbedItem {
  id: string;
  title: string;
  itemCountLabel: string;
  playlistUrl: string;
  embedUrl: string;
  note?: string;
  duration?: string;
}

export const ARTIST_PROFILE = {
  name: 'Julian Peral',
  location: 'Miami, FL',
  genre: 'Electronic Synthwave',
  bandlabFollowers: '2.2K',
  bandlabTotalPlays: '85.2K',
  totalReleases: 6,
  totalTracks: 63,
  quote: {
    text: "How beautiful it would be if sorrow had not made sorrow more beautiful than beauty's self.",
    author: 'John Keats',
  },
  footer: '© 2026 Julian Peral, Miami, FL',
} as const;

export const VERIFIED_LINKS = {
  bandlab: 'https://www.bandlab.com/le3ch3r',
  spotify: 'https://open.spotify.com/artist/1qf0DzU4VQagMzh8PHkdcl',
  youtube: 'https://youtube.com/channel/UCelYybhpoLsCQ-2vsV-dA8A',
  youtubeChannelTitle: 'Julian Peral - Topic',
  ivyPlaylist: 'https://www.youtube.com/playlist?list=OLAK5uy_m7zl8FDC9ZrgYQPyPskuqemioqTqYpYsM',
  ivySpotifyAlbum: 'https://open.spotify.com/album/6WZn2N5GhqzfsvxqxLDjpi',
  ivySpotifyEmbed: 'https://open.spotify.com/embed/album/6WZn2N5GhqzfsvxqxLDjpi?utm_source=generator&theme=0',
  unconsoulableSpotify: 'https://open.spotify.com/track/5Hqjcy6mTDZldblbz0FxaM',
  unconsoulableSpotifyEmbed: 'https://open.spotify.com/embed/track/5Hqjcy6mTDZldblbz0FxaM?utm_source=generator&theme=0',
} as const;

export const COVER_URLS = {
  ivy: 'https://image-cdn-fa.spotifycdn.com/image/ab67616d00001e0270fcbcd8c957a2b3989fcea8',
  tercet: 'https://image-cdn-fa.spotifycdn.com/image/ab67616d00001e027afbb669d7d8cc8b357b942d',
  thrice: 'https://image-cdn-fa.spotifycdn.com/image/ab67616d00001e023d75c86eb0c470eb29868031',
  volatil3Dystopia: 'https://bl-prod-images.azureedge.net/v1.3/albums/0968087b-093d-4f7a-a756-3c434c407af4/640x640',
  aProcess: 'https://i.ytimg.com/vi/Z4jaBvjQCDU/hqdefault.jpg',
  julianPeral: 'https://bl-prod-images.azureedge.net/v1.3/albums/5b89d92d-e9e9-42b8-9f75-295f617288a3/640x640',
} as const;

function buildTracks(
  albumId: string,
  albumTitle: string,
  coverUrl: string,
  items: Array<{
    title: string;
    duration: string;
    spotifyTrackId?: string;
    notOnSpotify?: boolean;
  }>
): AlbumTrack[] {
  return items.map((item, idx) => ({
    id: `${albumId}-${idx + 1}`,
    number: idx + 1,
    title: item.title,
    duration: item.duration,
    albumId,
    albumTitle,
    coverUrl,
    spotifyTrackId: item.spotifyTrackId,
    spotifyUrl: item.spotifyTrackId
      ? `https://open.spotify.com/track/${item.spotifyTrackId}`
      : undefined,
    spotifyEmbedUrl: item.spotifyTrackId
      ? `https://open.spotify.com/embed/track/${item.spotifyTrackId}?utm_source=generator&theme=0`
      : undefined,
    notOnSpotify: item.notOnSpotify,
  }));
}

export const DISCOGRAPHY: Release[] = [
  {
    id: 'ivy',
    title: 'Ivy',
    artistCredit: 'Julian Peral',
    format: 'EP',
    releaseDate: '19 Oct 2026',
    trackCount: 5,
    bandlabUrl: 'https://www.bandlab.com/le3ch3r/albums/d595897e-01cc-f111-bf5b-0022484af400',
    coverUrl: COVER_URLS.ivy,
    spotifyUrl: VERIFIED_LINKS.ivySpotifyAlbum,
    spotifyEmbedUrl: VERIFIED_LINKS.ivySpotifyEmbed,
    accentColor: '#FF5500',
    tracks: buildTracks('ivy', 'Ivy', COVER_URLS.ivy, [
      { title: 'Pow Wow (R.I.P. Afrika Bambaataa)', duration: '3:33' },
      { title: 'Unconsoulable', duration: '3:56', spotifyTrackId: '5Hqjcy6mTDZldblbz0FxaM' },
      { title: 'This for That', duration: '4:21' },
      { title: 'Into A Corner', duration: '3:07' },
      { title: 'Ode To The Awkward', duration: '4:04' },
    ]),
  },
  {
    id: 'tercet',
    title: 'TerceT',
    artistCredit: 'Julian Peral',
    format: 'LP',
    releaseDate: '4 Apr 2026',
    trackCount: 11,
    bandlabUrl: 'https://www.bandlab.com/le3ch3r/albums/7463649e-e42f-f111-8ef3-6045bd2d91c7',
    coverUrl: COVER_URLS.tercet,
    accentColor: '#E62210',
    tracks: buildTracks('tercet', 'TerceT', COVER_URLS.tercet, [
      { title: 'Waves from the Wind', duration: '3:12' },
      { title: 'All I need is one flower in my garden', duration: '3:48' },
      { title: 'Demeanor', duration: '3:54' },
      { title: 'The Paragon', duration: '3:12' },
      { title: 'Solitarily Confined', duration: '4:18' },
      { title: 'The Lake', duration: '3:46' },
      { title: 'Let there be ...', duration: '3:51' },
      { title: 'Th3 @llusionist (remix)', duration: '4:12' },
      { title: 'Kindred Spirits', duration: '3:50' },
      { title: 'Manifest Faith', duration: '4:14' },
      { title: 'Now You Ascend', duration: '4:19', spotifyTrackId: '24TQ9N6tNCdN7jF3LZeyjS' },
    ]),
  },
  {
    id: 'thrice',
    title: 'Thrice',
    artistCredit: 'Julian Peral',
    format: 'LP',
    releaseDate: '23 Feb 2026',
    trackCount: 11,
    bandlabUrl: 'https://www.bandlab.com/le3ch3r/albums/09afacf9-40c2-f011-8195-6045bd30a4b0',
    coverUrl: COVER_URLS.thrice,
    accentColor: '#FFAA00',
    tracks: buildTracks('thrice', 'Thrice', COVER_URLS.thrice, [
      { title: 'Now you Descend', duration: '2:23' },
      { title: "Jacob's Dream", duration: '3:56' },
      { title: 'For My Father', duration: '4:17' },
      { title: 'Judging the book', duration: '5:02', spotifyTrackId: '3TKFWVPJTDZ00ODE7y2wQJ' },
      { title: 'The Portal', duration: '3:40' },
      { title: 'Unforgiveable Ammends', duration: '3:15' },
      { title: 'InsitioN', duration: '3:29', spotifyTrackId: '0Ya8f2XRvkXV6vqz82opEQ' },
      { title: 'Fight!', duration: '3:56' },
      { title: 'Broad Daylight', duration: '4:31' },
      { title: 'The Commencement', duration: '3:19' },
      { title: 'Martian Mantra', duration: '5:00' },
    ]),
  },
  {
    id: 'volatil3-dystopia',
    title: 'Volatil3 Dystopia',
    artistCredit: 'Tinstar and Julian Peral',
    format: 'LP',
    releaseDate: '3 Dec 2025',
    trackCount: 13,
    bandlabUrl: 'https://www.bandlab.com/le3ch3r/albums/70795e73-facb-f011-8195-6045bd30a4b0',
    coverUrl: COVER_URLS.volatil3Dystopia,
    featured: true,
    accentColor: '#FF5500',
    tracks: buildTracks('volatil3-dystopia', 'Volatil3 Dystopia', COVER_URLS.volatil3Dystopia, [
      { title: 'Intro (V3)', duration: '3:00' },
      { title: 'SOLID STAT3', duration: '3:34' },
      { title: 'Sad Girl', duration: '3:51' },
      { title: 'Archit3ct', duration: '3:20' },
      { title: 'Trigger3d', duration: '2:21' },
      { title: 'S3x Thing', duration: '3:44' },
      { title: 'Interlud3', duration: '1:33' },
      { title: 'Not quite mys3lf', duration: '3:09', notOnSpotify: true },
      { title: 'Maybe', duration: '4:31' },
      { title: 'From the Outside (V3)', duration: '3:48' },
      { title: 'Do ros3s know...', duration: '3:49' },
      { title: 'Down in the park', duration: '2:34' },
      { title: 'Outro (V3)', duration: '2:32' },
    ]),
  },
  {
    id: 'a-process',
    title: 'A Process...',
    artistCredit: 'Julian Peral',
    format: 'LP',
    releaseDate: '29 Jul 2025',
    trackCount: 11,
    bandlabUrl: 'https://www.bandlab.com/le3ch3r/albums/da5a3a7f-7d34-f011-8b3d-000d3a930edb',
    coverUrl: COVER_URLS.aProcess,
    accentColor: '#E62210',
    tracks: buildTracks('a-process', 'A Process...', COVER_URLS.aProcess, [
      { title: 'intro (final)', duration: '0:56' },
      { title: 'Saw her first (s3mi 3xt3nd3d r3vis3d)', duration: '4:23' },
      { title: '3l3m3nt 115', duration: '3:33' },
      { title: 'Joyful Noize', duration: '4:17' },
      { title: 'Presence', duration: '4:42' },
      { title: 'Yeshua (revised)', duration: '2:53' },
      { title: 'The Need', duration: '3:50' },
      { title: 'In the key of...', duration: '3:07' },
      { title: '7/85', duration: '4:48' },
      { title: 'Fall Fighting', duration: '4:14' },
      { title: '3rd day', duration: '5:20' },
    ]),
  },
  {
    id: 'julian-peral',
    title: 'Julian Peral',
    artistCredit: 'Julian Peral',
    format: 'LP',
    releaseDate: '6 Mar 2025',
    trackCount: 12,
    bandlabUrl: 'https://www.bandlab.com/le3ch3r/albums/61e6d288-54eb-ef11-88f8-000d3a930f45',
    coverUrl: COVER_URLS.julianPeral,
    accentColor: '#FF5500',
    tracks: buildTracks('julian-peral', 'Julian Peral', COVER_URLS.julianPeral, [
      { title: 'Blessings', duration: '3:27' },
      { title: 'Juli', duration: '3:14' },
      { title: 'The one you want...', duration: '2:43' },
      { title: 'Hush Hush (3xt3nd3d)', duration: '4:37' },
      { title: 'The weight of the world', duration: '2:50' },
      { title: 'MaliciouS', duration: '3:12' },
      { title: 'IntenT', duration: '3:16' },
      { title: 'Angels', duration: '3:50' },
      { title: 'The Allusionist', duration: '3:44' },
      { title: 'STARTLE', duration: '2:01' },
      { title: 'Broken Her (3xt3nd3d)', duration: '4:47' },
      { title: 'Life for a Life', duration: '2:41' },
    ]),
  },
];

// Chronological timeline order (debut -> latest)
export const CAREER_TIMELINE: Release[] = [...DISCOGRAPHY].reverse();

// Featured tracks with verified parent album covers & verified Spotify availability (no unverified per-track play counts)
export const FEATURED_TRACKS: AlbumTrack[] = [
  DISCOGRAPHY[0].tracks[1], // Unconsoulable
  DISCOGRAPHY[3].tracks[7], // Not quite mys3lf (Not on Spotify)
  DISCOGRAPHY[2].tracks[3], // Judging the book
  DISCOGRAPHY[1].tracks[10], // Now You Ascend
  DISCOGRAPHY[2].tracks[6], // InsitioN
];

export const ALL_TRACK_TITLES: string[] = DISCOGRAPHY.flatMap((album) =>
  album.tracks.map((track) => track.title)
);

export const IVY_VIDEOS: VideoItem[] = [
  {
    id: 'TvYI3LMmx0g',
    title: 'Pow Wow',
    duration: '3:34',
    embedUrl: 'https://www.youtube-nocookie.com/embed/TvYI3LMmx0g',
  },
  {
    id: '457SFim20pQ',
    title: 'Unconsoulable',
    duration: '3:59',
    embedUrl: 'https://www.youtube-nocookie.com/embed/457SFim20pQ',
  },
  {
    id: '5mzECxXlsQI',
    title: 'This for That',
    duration: '4:22',
    embedUrl: 'https://www.youtube-nocookie.com/embed/5mzECxXlsQI',
  },
  {
    id: 'KAA2gh0xTBQ',
    title: 'Into a Corner',
    duration: '3:08',
    embedUrl: 'https://www.youtube-nocookie.com/embed/KAA2gh0xTBQ',
  },
  {
    id: 'NoKkPNHNv1k',
    title: 'Ode to the Awkward',
    duration: '4:05',
    embedUrl: 'https://www.youtube-nocookie.com/embed/NoKkPNHNv1k',
  },
];

export const YOUTUBE_PLAYLIST_EMBEDS: PlaylistEmbedItem[] = [
  {
    id: 'tercet-playlist',
    title: 'TerceT',
    itemCountLabel: '11 videos',
    playlistUrl: 'https://www.youtube.com/playlist?list=OLAK5uy_n4IsW6t6PztcpPvXi3m7Ci_Ss8KHIZ3-8',
    embedUrl: 'https://www.youtube-nocookie.com/embed/videoseries?list=OLAK5uy_n4IsW6t6PztcpPvXi3m7Ci_Ss8KHIZ3-8',
    note: 'First video: Waves from the Wind',
  },
  {
    id: 'thrice-playlist',
    title: 'Thrice',
    itemCountLabel: '11 videos',
    playlistUrl: 'https://www.youtube.com/playlist?list=OLAK5uy_llkwD2j6tFDjxkzSByKtE3b_BmmjRDpZI',
    embedUrl: 'https://www.youtube-nocookie.com/embed/videoseries?list=OLAK5uy_llkwD2j6tFDjxkzSByKtE3b_BmmjRDpZI',
    note: 'First video: Now you Descend',
  },
];

export const YOUTUBE_SINGLE_EMBEDS: PlaylistEmbedItem[] = [
  {
    id: 'jacobs-dream',
    title: "Jacob's Dream",
    itemCountLabel: '1 video',
    duration: '3:57',
    playlistUrl: 'https://www.youtube.com/playlist?list=OLAK5uy_mNszn7BJP1f1EBDrsSX7V6HWmviZYtjkM',
    embedUrl: 'https://www.youtube-nocookie.com/embed/F6E1jBO7nbI',
  },
  {
    id: 'element-115',
    title: 'Element 115',
    itemCountLabel: '1 video',
    duration: '3:34',
    playlistUrl: 'https://www.youtube.com/playlist?list=OLAK5uy_lwKkgLIlGCI_BJ5HrElCR_t5orI39YqRk',
    embedUrl: 'https://www.youtube-nocookie.com/embed/Z4jaBvjQCDU',
  },
  {
    id: 'the-need',
    title: 'The Need',
    itemCountLabel: '1 video',
    duration: '3:51',
    playlistUrl: 'https://www.youtube.com/playlist?list=OLAK5uy_kUfV9aqyl5CnNIQVrZpWWVTBs9recVfk4',
    embedUrl: 'https://www.youtube-nocookie.com/embed/evGMti9Myz8',
  },
];

export const NAV_ITEMS = [
  { id: 'home', label: 'Home' },
  { id: 'music', label: 'Music' },
  { id: 'albums', label: 'Albums' },
  { id: 'about', label: 'About' },
  { id: 'videos', label: 'Videos' },
  { id: 'connect', label: 'Connect' },
] as const;

export type PageId = (typeof NAV_ITEMS)[number]['id'];
export type SectionId = PageId;
