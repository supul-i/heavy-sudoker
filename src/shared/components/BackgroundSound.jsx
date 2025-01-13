import PropTypes from "prop-types";
import { useEffect, useRef, useState } from "react";
import backgroundMusic from "../../assets/sound/background.mp3";
import OutlineButton from "./OutlineButton";

function BackgroundSound({ loop = true, volume = 0.5 }) {
  const audio = useRef(null);
  const [isPlay, setIsPlay] = useState(true);

  useEffect(() => {
    audio.current.loop = loop;
    audio.current.volume = volume;
  }, [audio, loop, volume]);

  const handlePlay = () => {
    if (isPlay) {
      audio.current.pause();
    } else {
      audio.current.play();
    }

    setIsPlay(!isPlay);
  };

  return (
    <>
      <audio ref={audio} src={backgroundMusic} autoPlay loop muted={false} />
      <OutlineButton onClick={handlePlay} text={isPlay ? "정지" : "재생"} size="S" />
    </>
  );
}

BackgroundSound.propTypes = {
  loop: PropTypes.bool,
  volume: PropTypes.number,
};

export default BackgroundSound;
