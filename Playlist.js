
import React from 'react';

const Playlist = ({ playlist, currentTrackIndex, playTrack, removeTrack }) => {
  return (
    <div className="playlist">
      <h3>Play List</h3>
      {playlist.map((track, index) => (
        <div key={index} className={currentTrackIndex === index ? 'track playing' : 'track'}>
          <div>{track.name}</div>
          <button onClick={() => playTrack(index)}>Play</button>
          <button onClick={() => removeTrack(index)}>Remove</button>
        </div>
      ))}
    </div>
  );
};

export default Playlist;
