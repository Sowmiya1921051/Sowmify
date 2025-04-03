import  { useState } from 'react';
import { Track } from '../types';

interface AlbumViewProps {
  track: Track;
}

const AlbumView = ({ track }: AlbumViewProps) => {
  const [imageError, setImageError] = useState(false);
  
  const handleImageError = () => {
    setImageError(true);
  };
  
  return (
    <div className="album-view">
      {imageError ? (
        <div className="album-art" style={{ 
          backgroundColor: track.color,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '24px',
          fontWeight: 'bold',
          color: 'white'
        }}>
          {track.title.charAt(0)}{track.artistName.charAt(0)}
        </div>
      ) : (
        <img 
          src={track.thumbnail} 
          alt={track.title} 
          className="album-art" 
          onError={handleImageError}
        />
      )}
      <div className="track-title">{track.title}</div>
      <div className="artist-name">{track.artistName}</div>
    </div>
  );
};

export default AlbumView;
 