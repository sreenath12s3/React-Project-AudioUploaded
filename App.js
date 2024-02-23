
import React, { useState, useEffect } from 'react';

import Playlist from './components/Playlist';
import NowPlaying from './components/NowPlaying';
import './App.css';

const App = () => {
  const [playlist, setPlaylist] = useState([]);
  const [currentTrackIndex, setCurrentTrackIndex] = useState(-1);

  useEffect(() => {
    // Load playlist and last playing audio file from local storage
    const savedPlaylist = JSON.parse(localStorage.getItem('playlist'));
    const lastTrackIndex = parseInt(localStorage.getItem('lastTrackIndex'));

    if (savedPlaylist) {
      setPlaylist(savedPlaylist);
      setCurrentTrackIndex(lastTrackIndex);
    }
  }, []);

  useEffect(() => {
    // Save playlist and last playing audio file to local storage
    localStorage.setItem('playlist', JSON.stringify(playlist));
    localStorage.setItem('lastTrackIndex', currentTrackIndex);
  }, [playlist, currentTrackIndex]);

  const handleFileUpload = (files) => {
    setPlaylist(prevPlaylist => [...prevPlaylist, ...files]);
  };

  const playTrack = (index) => {
    setCurrentTrackIndex(index);
  };

  const playNextTrack = () => {
    setCurrentTrackIndex((prevIndex) => (prevIndex + 1) % playlist.length);
  };

  const removeTrack = (index) => {
    const newPlaylist = [...playlist];
    newPlaylist.splice(index, 1);
    setPlaylist(newPlaylist);
  };

  return (
    <div className="container">
      <h1>Upolad audio</h1>
      <input type="file" className="file-upload" accept="audio/*" onChange={(e) => handleFileUpload(e.target.files)} multiple />
      <Playlist
        playlist={playlist}
        currentTrackIndex={currentTrackIndex}
        playTrack={playTrack}
        removeTrack={removeTrack}
      />
      <NowPlaying
        playlist={playlist}
        currentTrackIndex={currentTrackIndex}
        playNextTrack={playNextTrack}
      />
    </div>
  );
};

export default App;
