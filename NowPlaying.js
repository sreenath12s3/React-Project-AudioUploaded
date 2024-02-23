
import React, { useEffect, useRef } from 'react';

const NowPlaying = ({ playlist, currentTrackIndex, playNextTrack }) => {
  const audioRef = useRef(null);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.addEventListener('ended', playNextTrack);
      return () => audioRef.current.removeEventListener('ended', playNextTrack);
    }
  }, [currentTrackIndex, playNextTrack]);

  if (currentTrackIndex === -1 || !playlist[currentTrackIndex]) {
    return <div> No track is currently playing</div>;
  }

  const currentTrack = playlist[currentTrackIndex];

  return (
    <div className="now-playing">
      <div><h4>Now Playing:{currentTrack.name}</h4> </div>
      <audio controls autoPlay ref={audioRef} src={URL.createObjectURL(currentTrack)} />
    </div>
  );
};

export default NowPlaying;
