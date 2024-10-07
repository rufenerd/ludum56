import {useState, useEffect} from "react";
import useSound from "use-sound";
import music from './sound/goobmusic.wav'

function MusicProvider () {
  const [ muted, setMuted ] = useState(false)
  const [ playMusic, { stop }] = useSound(music, { loop: true })

  if (!muted) {
    stop()
    playMusic()
  } else {
    stop()
  }

  return <div className="music-controls">
    <button onClick={() => setMuted(!muted)}>{muted ? 'Unmute' : 'Mute music'}</button>
  </div>
}

export default MusicProvider
