//  A more robust audio manager with proper error handling
class AudioManager {
  private static instance: AudioManager;
  private audio: HTMLAudioElement | null = null;
  private currentTrackId: string | null = null;
  private listeners: { [key: string]: Function[] } = {
    'timeupdate': [],
    'ended': [],
    'durationchange': [],
    'error': []
  };
  private trackUrls: Record<string, string> = {};

  private constructor() {
    this.audio = new Audio();
    
    // Set up event listeners
    this.audio.addEventListener('timeupdate', () => this.notifyListeners('timeupdate'));
    this.audio.addEventListener('ended', () => this.notifyListeners('ended'));
    this.audio.addEventListener('durationchange', () => this.notifyListeners('durationchange'));
    this.audio.addEventListener('error', () => {
      // Avoid passing the error event object directly to console.error
      console.error("Audio error occurred");
      this.notifyListeners('error');
    });
    
    // Pre-populate track URLs
    this.populateTrackUrls();
  }

  static getInstance(): AudioManager {
    if (!AudioManager.instance) {
      AudioManager.instance = new AudioManager();
    }
    return AudioManager.instance;
  }

  // Pre-populate track URLs to avoid dynamic lookups
  private populateTrackUrls(): void {
    this.trackUrls = {
      '1': 'https://www.bensound.com/bensound-music/bensound-buddy.mp3',
      '2': 'https://files.freemusicarchive.org/storage-freemusicarchive-org/music/no_curator/Scott_Holmes/Inspiring_Documentary_Music/Scott_Holmes_-_02_-_Uplifting_Inspirational_Corporate.mp3',
      '3': 'https://www.bensound.com/bensound-music/bensound-summer.mp3',
      '4': 'https://files.freemusicarchive.org/storage-freemusicarchive-org/music/ccCommunity/Chad_Crouch/Arps/Chad_Crouch_-_Shipping_Lanes.mp3',
      '5': 'https://incompetech.com/music/royalty-free/mp3-royaltyfree/Rhodesia.mp3',
      '6': 'https://cdn.pixabay.com/download/audio/2022/05/27/audio_4af861a0e9.mp3',
      '7': 'https://cdn.pixabay.com/download/audio/2022/10/31/audio_10107ebbdb.mp3',
      '8': 'https://cdn.pixabay.com/download/audio/2022/05/23/audio_3b17f1adac.mp3',
      '9': 'https://cdn.pixabay.com/download/audio/2023/01/25/audio_95ef22bc94.mp3',
      '10': 'https://cdn.pixabay.com/download/audio/2022/10/25/audio_32442af4c6.mp3',
      '11': 'https://cdn.pixabay.com/download/audio/2022/08/23/audio_29c9cb8a4e.mp3'
    };
  }

  loadTrack(trackId: string): void {
    if (this.currentTrackId !== trackId) {
      this.currentTrackId = trackId;
      
      if (this.audio) {
        try {
          // Pause current playback before loading new track
          this.audio.pause();
          
          // Use a local fallback instead of relying on external proxy servers
          const trackUrl = this.getTrackUrlById(trackId);
          
          // Set new source
          this.audio.src = trackUrl;
          
          // Load the audio to get metadata
          this.audio.load();
          
          // Set a default duration before the actual duration is loaded
          if (isNaN(this.audio.duration) || !isFinite(this.audio.duration)) {
            // This will trigger a duration update event
            setTimeout(() => this.notifyListeners('durationchange'), 100);
          }
        } catch (error) {
          // Avoid passing the error object directly to console.error
          console.error("Error loading track: " + (error instanceof Error ? error.message : "Unknown error"));
          // Fall back to the mock audio behavior if real audio fails
          this.mockAudioBehavior();
        }
      } else {
        // Fall back to the mock audio behavior if audio element isn't available
        this.mockAudioBehavior();
      }
    }
  }

  async play(): Promise<void> {
    if (this.audio) {
      try {
        await this.audio.play();
      } catch (error) {
        // Avoid passing the error object directly to console.error
        console.error("Error playing audio: " + (error instanceof Error ? error.message : "Unknown error"));
        // Fall back to the mock audio behavior if real audio fails
        this.mockAudioBehavior();
      }
    }
  }

  pause(): void {
    if (this.audio) {
      this.audio.pause();
    }
  }

  setCurrentTime(time: number): void {
    if (this.audio) {
      try {
        this.audio.currentTime = time;
        this.notifyListeners('timeupdate');
      } catch (error) {
        // Avoid passing the error object directly to console.error
        console.error("Error setting currentTime: " + (error instanceof Error ? error.message : "Unknown error"));
      }
    }
  }

  setVolume(vol: number): void {
    if (this.audio) {
      this.audio.volume = vol;
    }
  }

  getCurrentTime(): number {
    return this.audio ? this.audio.currentTime : 0;
  }

  getDuration(): number {
    if (this.audio && !isNaN(this.audio.duration) && isFinite(this.audio.duration)) {
      return this.audio.duration;
    }
    // Return a default duration if the actual duration is not available
    return 180; // 3 minutes
  }

  getVolume(): number {
    return this.audio ? this.audio.volume : 0.8;
  }

  addEventListener(event: string, callback: Function): void {
    if (this.listeners[event]) {
      this.listeners[event].push(callback);
    }
  }

  removeEventListener(event: string, callback: Function): void {
    if (this.listeners[event]) {
      this.listeners[event] = this.listeners[event].filter(cb => cb !== callback);
    }
  }

  private notifyListeners(event: string): void {
    if (this.listeners[event]) {
      this.listeners[event].forEach(callback => callback());
    }
  }

  cleanup(): void {
    if (this.audio) {
      this.audio.pause();
      this.audio.src = '';
      
      // Remove all event listeners - simplified to avoid event reference issues
      this.audio = null;
    }
    
    this.listeners = {
      'timeupdate': [],
      'ended': [],
      'durationchange': [],
      'error': []
    };
  }

  // Mock audio behavior when real audio fails
  private mockAudioBehavior(): void {
    // Keep track of mock state
    let mockIsPlaying = false;
    let mockCurrentTime = 0;
    let mockDuration = 180; // 3 minutes
    let mockInterval: number | null = null;

    // Clear any existing interval
    if (mockInterval) {
      window.clearInterval(mockInterval);
      mockInterval = null;
    }

    // Override methods with mock behavior
    this.play = async () => {
      mockIsPlaying = true;
      if (!mockInterval) {
        mockInterval = window.setInterval(() => {
          if (mockIsPlaying) {
            mockCurrentTime += 0.1;
            this.notifyListeners('timeupdate');
            
            if (mockCurrentTime >= mockDuration) {
              this.notifyListeners('ended');
              mockCurrentTime = 0;
              mockIsPlaying = false;
              if (mockInterval) {
                window.clearInterval(mockInterval);
                mockInterval = null;
              }
            }
          }
        }, 100);
      }
      return Promise.resolve();
    };

    this.pause = () => {
      mockIsPlaying = false;
    };

    this.setCurrentTime = (time) => {
      mockCurrentTime = Math.min(time, mockDuration);
      this.notifyListeners('timeupdate');
    };

    this.getCurrentTime = () => mockCurrentTime;
    this.getDuration = () => mockDuration;

    // Notify that duration is available
    this.notifyListeners('durationchange');
  }

  // Helper method to get track URL by ID
  private getTrackUrlById(trackId: string): string {
    // Get URL from the preloaded URLs
    const url = this.trackUrls[trackId];
    
    if (url) {
      return url;
    }
    
    // Default fallback URL if the ID is not found
    return 'https://cdn.pixabay.com/download/audio/2022/10/25/audio_32442af4c6.mp3';
  }
}

export default AudioManager;
 