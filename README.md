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
 ┃ ┣ 📜 MusicPlayer.jsx
 ┃ ┣ 📜 SongList.jsx
 ┃ ┣ 📜 SearchBar.jsx
 ┃ ┗ 📜 Favourites.jsx
 ┣ 📁 assets
 ┃ ┣ 🎵 music files
 ┃ ┣ 🎨 thumbnails
 ┃ ┗ 🎭 icons
 ┣ 📁 styles
 ┃ ┣ 📜 main.scss
 ┃ ┗ 📜 variables.scss
 ┣ 📜 App.js
 ┣ 📜 data.json (Dummy Song Data)
 ┣ 📜 index.js
```

## 🛠 Installation & Setup
1. Clone the repository:
   ```sh
   git clone https://github.com/yourusername/react-music-player.git
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
    "title": "Lost in Sound",
    "thumbnail": "path-to-image.jpg",
    "musicUrl": "path-to-music.mp3",
    "duration": "3:45",
    "artistName": "John Doe"
  },
  {
    "title": "Ocean Waves",
    "thumbnail": "path-to-image.jpg",
    "musicUrl": "path-to-music.mp3",
    "duration": "4:20",
    "artistName": "Jane Smith"
  }
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

## 📜 License
This project is **MIT licensed**.

---
Made with ❤️ by **Sowmiya N**

