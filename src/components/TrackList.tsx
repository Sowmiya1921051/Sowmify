import  { useState, useEffect } from 'react';
import TrackItem from './TrackItem';
import { Track } from '../types';
import AlbumView from './AlbumView';
import EmptyState from './EmptyState';

interface TrackListProps {
  tracks: Track[];
  currentTrack: Track | null;
  onTrackSelect: (track: Track) => void;
  onFavoriteToggle: (trackId: string) => void;
  favorites: string[];
  isLoading?: boolean;
}

const TrackList = ({ 
  tracks, 
  currentTrack, 
  onTrackSelect, 
  onFavoriteToggle, 
  favorites,
  isLoading = false
}: TrackListProps) => {
  const [isVisible, setIsVisible] = useState(false);
  
  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsVisible(true);
    }, 100);
    
    return () => clearTimeout(timeout);
  }, []);
  
  if (isLoading) {
    return (
      <div className="loading-animation">
        <div className="spinner"></div>
      </div>
    );
  }
  
  if (tracks.length === 0) {
    return <EmptyState message="No tracks found. Try a different search or category." />;
  }
  
  return (
    <div className={`track-list-container ${isVisible ? 'fade-in' : ''}`}>
      {currentTrack && <AlbumView track={currentTrack} />}
      
      <div className="track-list">
        {tracks.map((track) => (
          <TrackItem
            key={track.id}
            track={track}
            isActive={currentTrack?.id === track.id}
            onSelect={onTrackSelect}
            onFavoriteToggle={onFavoriteToggle}
            isFavorite={favorites.includes(track.id)}
          />
        ))}
      </div>
    </div>
  );
};

export default TrackList;
 