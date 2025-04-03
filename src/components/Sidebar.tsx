import  { Music, Heart, Clock, Home } from 'lucide-react';
import { AppState } from '../types';

interface SidebarProps {
  currentTab: AppState['currentTab'];
  setCurrentTab: (tab: AppState['currentTab']) => void;
  isSidebarOpen: boolean;
  toggleSidebar: () => void;
}

const Sidebar = ({ currentTab, setCurrentTab, isSidebarOpen }: SidebarProps) => {
  return (
    <div className={`sidebar ${isSidebarOpen ? 'show' : ''}`}>
      <div className="logo">
        <Music size={24} />
        <span>Music Player</span>
      </div>
      
      <div 
        className={`menu-item ${currentTab === 'forYou' ? 'active' : ''}`}
        onClick={() => setCurrentTab('forYou')}
      >
        <Home size={20} />
        <span>For You</span>
      </div>
      
      <div 
        className={`menu-item ${currentTab === 'favorites' ? 'active' : ''}`}
        onClick={() => setCurrentTab('favorites')}
      >
        <Heart size={20} />
        <span>Favorites</span>
      </div>
      
      <div 
        className={`menu-item ${currentTab === 'recentlyPlayed' ? 'active' : ''}`}
        onClick={() => setCurrentTab('recentlyPlayed')}
      >
        <Clock size={20} />
        <span>Recently Played</span>
      </div>
    </div>
  );
};

export default Sidebar;
 