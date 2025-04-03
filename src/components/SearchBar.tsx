import  { Search } from 'lucide-react';

interface SearchBarProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

const SearchBar = ({ searchQuery, setSearchQuery }: SearchBarProps) => {
  return (
    <div className="search-bar">
      <input
        type="text"
        placeholder="Search Song, Artist"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      <Search size={18} />
    </div>
  );
};

export default SearchBar;
 