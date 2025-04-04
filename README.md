# 🎵 React Music Player

## 🚀 Features
- Built using **React.js, SCSS, React-Bootstrap**
- Loads dummy data from a JSON object with key-value pairs:
  - `title`, `thumbnail`, `musicUrl`, `duration`, `artistName`
- **Responsive Design**:
  - On smaller screens, the player becomes the main interface with a menu button for the song list.
- **Dynamic Background Gradient**:
  - Changes based on the cover image of the current song.
- **Smooth Animations & Transitions**:
  - Loading animations for the list.
  - Smooth background color change effect.
- **Persistent Music Playback**:
  - Music continues playing when switching tabs (e.g., Favourites, Recently Played).
- **Search Functionality**:
  - Filters songs based on track title.
- **Recently Played Section**:
  - Stores the last 10 played songs using **Session Storage**.
- **Favorites Feature**:
  - Mark songs as favorites using the three-dot menu.
  - Favorites persist using **Local Storage**.

## 📂 Project Structure
```
📁 src
 ┣ 📁 components
 ┃ ┣ 📜 AlbumView.tsx
 ┃ ┣ 📜 EmptyState.tsx
 ┃ ┣ 📜 Player.tsx
 ┃ ┗ 📜 SearchBar.tsx
 ┃ ┗ 📜 SideBar.tsx
 ┃ ┗ 📜 TrackItem.tsx
 ┃ ┗ 📜 TrackList.tsx
 ┣ 📁 assets
 ┃ ┣ 🎵 music files
 ┣ 📁 styles
 ┃ ┣ 📜 index.scss
 ┣ 📁 data
 ┃ ┣ 📜 tracks.ts
 ┣ 📜 App.js
 ┣ 📜 data.json (Dummy Song Data)
 ┣ 📜 index.js
```

## 🛠 Installation & Setup
1. Clone the repository:
   ```sh
   git clone https://github.com/Sowmiya1921051/react-music-player.git
   ```
2. Navigate into the project folder:
   ```sh
   cd react-music-player
   ```
3. Install dependencies:
   ```sh
   npm install
   ```
4. Start the development server:
   ```sh
   npm start
   ```

## 📜 Dummy Data (data.json)
```json
[
   {
    id: '1',
    title: "Dreamy Reflection",
    artistName: "Benjamin Tissot",
    thumbnail: "https://images.unsplash.com/photo-1500462918059-b1a0cb512f1d?auto=format&fit=crop&w=300&h=300&q=80",
    musicUrl: "https://www.bensound.com/bensound-music/bensound-buddy.mp3",
    duration: "2:02",
    color: "rgba(240, 100, 40, 0.8)"
  },
  {
    id: '2',
    title: "Piano Serenity",
    artistName: "Scott Holmes",
    thumbnail: "https://images.unsplash.com/photo-1475275166152-f1e8005f9854?auto=format&fit=crop&w=300&h=300&q=80",
    musicUrl: "https://files.freemusicarchive.org/storage-freemusicarchive-org/music/no_curator/Scott_Holmes/Inspiring_Documentary_Music/Scott_Holmes_-_02_-_Uplifting_Inspirational_Corporate.mp3",
    duration: "2:56",
    color: "rgba(40, 60, 100, 0.8)"
  },
]
```

## 🎨 UI/UX Highlights
- **Modern UI with smooth animations**
- **Gradient background transitions based on album art**
- **Minimal and interactive music player interface**
- **Easy-to-navigate menu with search & filtering**

## 🏗 Future Improvements
- Playlist functionality
- Volume control slider
- Dark mode

## 🤝 Contributing
1. Fork the repository
2. Create a feature branch (`git checkout -b feature-name`)
3. Commit your changes (`git commit -m "Added new feature"`)
4. Push to the branch (`git push origin feature-name`)
5. Open a Pull Request


---
Made with 💛 by **Sowmiya N**

