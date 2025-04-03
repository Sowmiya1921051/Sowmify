import  { MoreHorizontal, Heart } from 'lucide-react';
import { Track } from '../types';
import { Dropdown } from 'react-bootstrap';
import { forwardRef } from 'react';

interface TrackItemProps {
  track: Track;
  isActive: boolean;
  onSelect: (track: Track) => void;
  onFavoriteToggle: (trackId: string) => void;
  isFavorite: boolean;
}

const TrackItem = ({ track, isActive, onSelect, onFavoriteToggle, isFavorite }: TrackItemProps) => {
  return (
    <div 
      className={`track-item ${isActive ? 'active' : ''}`} 
      onClick={() => onSelect(track)}
    >
      <img src={track.thumbnail} alt={track.title} className="album-cover" />
      <div className="track-info">
        <div className="track-title">{track.title}</div>
        <div className="artist-name">{track.artistName}</div>
      </div>
      <div className="track-duration">{track.duration}</div>
      <div className="track-actions" onClick={(e) => e.stopPropagation()}>
        <Dropdown>
          <Dropdown.Toggle as={CustomToggle} id={`dropdown-${track.id}`}>
            <MoreHorizontal size={18} />
          </Dropdown.Toggle>
          <Dropdown.Menu>
            <Dropdown.Item onClick={() => onFavoriteToggle(track.id)}>
              {isFavorite ? 'Remove from Favorites' : 'Add to Favorites'}
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
        {isFavorite && <Heart size={16} className="ml-2" color="#1db954" />}
      </div>
    </div>
  );
};

// Use forwardRef to fix the ref warning
const CustomToggle = forwardRef(({ children, onClick }: any, ref: any) => (
  <div
    ref={ref}
    onClick={(e) => {
      e.preventDefault();
      onClick(e);
    }}
    style={{ cursor: 'pointer' }}
  >
    {children}
  </div>
));

export default TrackItem;
 