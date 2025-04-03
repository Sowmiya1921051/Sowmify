import  { useState, useEffect } from 'react';
import { Menu } from 'lucide-react';
import Sidebar from './components/Sidebar';
import SearchBar from './components/SearchBar';
import TrackList from './components/TrackList';
import Player from './components/Player';
import { tracks } from './data/tracks';
import { AppState, Track } from './types';
import {
  saveToLocalStorage,
  getFromLocalStorage,
  saveToSessionStorage,
  getFromSessionStorage
} from './utils/storage';

function App() {
  const [state, setState] = useState<AppState>({
    currentTab: 'forYou',
    currentTrack: null,
    tracks: tracks,
    filteredTracks: tracks,
    searchQuery: '',
    isPlaying: false,
    isSidebarOpen: window.innerWidth > 768,
    favorites: getFromLocalStorage<string[]>('favorites', []),
    recentlyPlayed: getFromSessionStorage<string[]>('recentlyPlayed', []),
    volume: getFromLocalStorage<number>('volume', 0.8),
    currentProgress: 0,
    duration: 0
  });

  // Background gradient based on current track
  const backgroundGradient = state.currentTrack
    ? { background: `linear-gradient(to bottom, ${state.currentTrack.color}, var(--primary-color) 90%)` }
    : { background: 'var(--primary-color)' };

  // Filter tracks based on search query
  useEffect(() => {
    if (state.searchQuery.trim() === '') {
      setState(prev => ({
        ...prev,
        filteredTracks: prev.tracks
      }));
    } else {
      const filtered = state.tracks.filter(track => 
        track.title.toLowerCase().includes(state.searchQuery.toLowerCase())
      );
      setState(prev => ({
        ...prev,
        filteredTracks: filtered
      }));
    }
  }, [state.searchQuery, state.tracks]);

  // Get tracks based on current tab
  const getDisplayedTracks = (): Track[] => {
    if (state.currentTab === 'favorites') {
      return state.filteredTracks.filter(track => state.favorites.includes(track.id));
    } 
    if (state.currentTab === 'recentlyPlayed') {
      const recentTracks: Track[] = [];
      // Get tracks in the order they were played
      state.recentlyPlayed.forEach(id => {
        const track = state.filteredTracks.find(t => t.id === id);
        if (track) recentTracks.push(track);
      });
      return recentTracks;
    }
    return state.filteredTracks;
  };

  // Handle track selection
  const handleTrackSelect = (track: Track) => {
    // Add to recently played
    const updatedRecentlyPlayed = [
      track.id,
      ...state.recentlyPlayed.filter(id => id !== track.id)
    ].slice(0, 10); // Keep only the last 10

    saveToSessionStorage('recentlyPlayed', updatedRecentlyPlayed);

    setState(prev => ({
      ...prev,
      currentTrack: track,
      isPlaying: true,
      recentlyPlayed: updatedRecentlyPlayed
    }));
  };

  // Toggle play/pause
  const togglePlay = () => {
    setState(prev => ({
      ...prev,
      isPlaying: !prev.isPlaying
    }));
  };

  // Handle next track
  const handleNext = () => {
    const currentTracks = getDisplayedTracks();
    if (currentTracks.length === 0 || !state.currentTrack) return;

    const currentIndex = currentTracks.findIndex(track => track.id === state.currentTrack?.id);
    const nextIndex = (currentIndex + 1) % currentTracks.length;
    handleTrackSelect(currentTracks[nextIndex]);
  };

  // Handle previous track
  const handlePrevious = () => {
    const currentTracks = getDisplayedTracks();
    if (currentTracks.length === 0 || !state.currentTrack) return;

    const currentIndex = currentTracks.findIndex(track => track.id === state.currentTrack?.id);
    const prevIndex = (currentIndex - 1 + currentTracks.length) % currentTracks.length;
    handleTrackSelect(currentTracks[prevIndex]);
  };

  // Toggle sidebar on mobile
  const toggleSidebar = () => {
    setState(prev => ({
      ...prev,
      isSidebarOpen: !prev.isSidebarOpen
    }));
  };

  // Toggle favorite status
  const toggleFavorite = (trackId: string) => {
    const isFavorite = state.favorites.includes(trackId);
    const updatedFavorites = isFavorite
      ? state.favorites.filter(id => id !== trackId)
      : [...state.favorites, trackId];
    
    saveToLocalStorage('favorites', updatedFavorites);
    setState(prev => ({
      ...prev,
      favorites: updatedFavorites
    }));
  };

  // Set volume
  const setVolume = (volume: number) => {
    saveToLocalStorage('volume', volume);
    setState(prev => ({
      ...prev,
      volume
    }));
  };

  // Set current progress
  const setCurrentProgress = (progress: number) => {
    setState(prev => ({
      ...prev,
      currentProgress: progress
    }));
  };

  // Set duration
  const setDuration = (duration: number) => {
    setState(prev => ({
      ...prev,
      duration
    }));
  };

  // Set current tab
  const setCurrentTab = (tab: AppState['currentTab']) => {
    setState(prev => ({
      ...prev,
      currentTab: tab,
      searchQuery: '' // Reset search when changing tabs
    }));
  };

  // Set search query
  const setSearchQuery = (searchQuery: string) => {
    setState(prev => ({
      ...prev,
      searchQuery
    }));
  };

  return (
    <div className="app-container">
      <div className="background-gradient" style={backgroundGradient} />
      
      <Sidebar 
        currentTab={state.currentTab}
        setCurrentTab={setCurrentTab}
        isSidebarOpen={state.isSidebarOpen}
        toggleSidebar={toggleSidebar}
      />
      
      <div className="main-content">
        <div className="header">
          <div className="toggle-menu" onClick={toggleSidebar}>
            <Menu size={24} />
          </div>
          
          <SearchBar 
            searchQuery={state.searchQuery}
            setSearchQuery={setSearchQuery}
          />
        </div>
        
        <h2 className="section-title">
          {state.currentTab === 'forYou' && 'For You'}
          {state.currentTab === 'favorites' && 'Favorites'}
          {state.currentTab === 'recentlyPlayed' && 'Recently Played'}
        </h2>
        
        <TrackList
          tracks={getDisplayedTracks()}
          currentTrack={state.currentTrack}
          onTrackSelect={handleTrackSelect}
          onFavoriteToggle={toggleFavorite}
          favorites={state.favorites}
          isLoading={false}
        />
      </div>
      
      <Player
        currentTrack={state.currentTrack}
        isPlaying={state.isPlaying}
        togglePlay={togglePlay}
        onNext={handleNext}
        onPrevious={handlePrevious}
        volume={state.volume}
        setVolume={setVolume}
        onProgress={setCurrentProgress}
        onDuration={setDuration}
      />
    </div>
  );
}

export default App;
 