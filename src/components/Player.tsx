import  { useEffect, useRef, useState, useCallback } from 'react';
import { Play, Pause, SkipBack, SkipForward, Volume2, VolumeX } from 'lucide-react';
import { Track } from '../types';
import AudioManager from '../utils/audio-manager';

interface PlayerProps {
  currentTrack: Track | null;
  isPlaying: boolean;
  togglePlay: () => void;
  onNext: () => void;
  onPrevious: () => void;
  volume: number;
  setVolume: (volume: number) => void;
  onProgress: (progress: number) => void;
  onDuration: (duration: number) => void;
}

const Player = ({ 
  currentTrack, 
  isPlaying, 
  togglePlay, 
  onNext, 
  onPrevious,
  volume,
  setVolume,
  onProgress,
  onDuration
}: PlayerProps) => {
  const [currentTime, setCurrentTime] = useState(0);
  const [audioDuration, setAudioDuration] = useState(0);
  const audioManager = useRef(AudioManager.getInstance());
  const [isAudioError, setIsAudioError] = useState(false);
  
  // Memoize handlers to prevent re-creation on every render
  const handleTimeUpdate = useCallback(() => {
    const time = audioManager.current.getCurrentTime();
    setCurrentTime(time);
    // Only update progress if time has actually changed
    if (time > 0 && Math.abs(time - currentTime) > 0.1) {
      onProgress(time);
    }
  }, [currentTime, onProgress]);
  
  const handleDurationChange = useCallback(() => {
    const duration = audioManager.current.getDuration();
    // Only update if duration has changed significantly
    if (duration > 0 && Math.abs(duration - audioDuration) > 0.5) {
      setAudioDuration(duration);
      onDuration(duration);
    }
  }, [audioDuration, onDuration]);
  
  // Load track and handle play/pause
  useEffect(() => {
    if (!currentTrack) return;
    
    // Reset error state when track changes
    setIsAudioError(false);
    
    // Load the track when it changes
    audioManager.current.loadTrack(currentTrack.id);
    
    const playTrack = async () => {
      if (isPlaying) {
        try {
          await audioManager.current.play();
        } catch (error) {
          console.error("Error playing audio:", error);
          setIsAudioError(true);
        }
      } else {
        audioManager.current.pause();
      }
    };
    
    playTrack();
    audioManager.current.setVolume(volume);
  }, [currentTrack, isPlaying, volume]);
  
  // Set up event listeners
  useEffect(() => {
    const manager = audioManager.current;
    
    const handleEnded = () => {
      onNext();
    };
    
    const handleError = () => {
      setIsAudioError(true);
      // If error, move to next track after a delay
      setTimeout(() => {
        onNext();
      }, 3000);
    };
    
    manager.addEventListener('timeupdate', handleTimeUpdate);
    manager.addEventListener('durationchange', handleDurationChange);
    manager.addEventListener('ended', handleEnded);
    manager.addEventListener('error', handleError);
    
    // Initialize with current values (once, not on every render)
    const initialDuration = manager.getDuration();
    if (initialDuration > 0 && Math.abs(initialDuration - audioDuration) > 0.5) {
      setAudioDuration(initialDuration);
      onDuration(initialDuration);
    }
    
    return () => {
      manager.removeEventListener('timeupdate', handleTimeUpdate);
      manager.removeEventListener('durationchange', handleDurationChange);
      manager.removeEventListener('ended', handleEnded);
      manager.removeEventListener('error', handleError);
    };
  }, [handleTimeUpdate, handleDurationChange, onNext, audioDuration, onDuration]);
  
  // Clean up on unmount
  useEffect(() => {
    return () => {
      audioManager.current.cleanup();
    };
  }, []);
  
  const handleProgressChange = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!audioDuration) return;
    
    const progressBar = e.currentTarget;
    const rect = progressBar.getBoundingClientRect();
    const pos = (e.clientX - rect.left) / rect.width;
    const newTime = pos * audioDuration;
    
    audioManager.current.setCurrentTime(newTime);
  };
  
  const handleVolumeChange = (e: React.MouseEvent<HTMLDivElement>) => {
    const volumeBar = e.currentTarget;
    const rect = volumeBar.getBoundingClientRect();
    const pos = (e.clientX - rect.left) / rect.width;
    const newVolume = Math.max(0, Math.min(1, pos));
    
    setVolume(newVolume);
  };
  
  const formatTime = (time: number) => {
    if (isNaN(time)) return "0:00";
    
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };
  
  return (
    <div className="player-container">
      <div className="now-playing">
        {currentTrack && (
          <>
            <img 
              src={currentTrack.thumbnail} 
              alt={currentTrack.title} 
              className="album-cover"
              onError={(e) => {
                // Set a fallback image if loading fails
                (e.target as HTMLImageElement).src = 'https://placehold.co/60x60/121212/FFFFFF?text=Music';
              }} 
            />
            <div className="track-info">
              <div className="track-title">{currentTrack.title}</div>
              <div className="artist-name">{currentTrack.artistName}</div>
              {isAudioError && <div className="error-message">Unable to play this track</div>}
            </div>
          </>
        )}
      </div>
      
      <div className="player-controls">
        <div className="control-buttons">
          <div className="control-btn" onClick={onPrevious}>
            <SkipBack size={18} />
          </div>
          
          <div className={`play-pause-btn ${isPlaying ? 'playing' : ''}`} onClick={togglePlay}>
            {isPlaying ? <Pause size={18} /> : <Play size={18} />}
          </div>
          
          <div className="control-btn" onClick={onNext}>
            <SkipForward size={18} />
          </div>
        </div>
        
        <div className="progress-bar">
          <div className="time">{formatTime(currentTime)}</div>
          
          <div className="progress" onClick={handleProgressChange}>
            <div 
              className="progress-filled" 
              style={{ width: `${audioDuration ? (currentTime / audioDuration) * 100 : 0}%` }} 
            />
          </div>
          
          <div className="time">{formatTime(audioDuration)}</div>
        </div>
      </div>
      
      <div className="volume-control">
        <div className="volume-icon" onClick={() => setVolume(volume > 0 ? 0 : 1)}>
          {volume === 0 ? <VolumeX size={18} /> : <Volume2 size={18} />}
        </div>
        
        <div className="volume-slider" onClick={handleVolumeChange}>
          <div className="volume-level" style={{ width: `${volume * 100}%` }} />
        </div>
      </div>
    </div>
  );
};

export default Player;
 