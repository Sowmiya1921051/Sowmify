export  interface Track {
  id: string;
  title: string;
  artistName: string;
  thumbnail: string;
  musicUrl: string;
  duration: string;
  color: string;
}

export interface AppState {
  currentTab: 'forYou' | 'favorites' | 'recentlyPlayed';
  currentTrack: Track | null;
  tracks: Track[];
  filteredTracks: Track[];
  searchQuery: string;
  isPlaying: boolean;
  isSidebarOpen: boolean;
  favorites: string[];
  recentlyPlayed: string[];
  volume: number;
  currentProgress: number;
  duration: number;
}
 