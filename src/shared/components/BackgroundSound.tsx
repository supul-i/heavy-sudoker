import { useEffect, useRef, useState } from "react";
import backgroundMusic from "../../assets/sound/background.mp3";
import OutlineButton from "./OutlineButton";

type BackgroundSoundProps = {
  loop: boolean;
  volume: number;
};

function BackgroundSound({ loop = true, volume = 0.5 }: BackgroundSoundProps) {
  const audio = useRef<HTMLAudioElement | null>(null);
  const [isPlay, setIsPlay] = useState<boolean>(true);

  useEffect(() => {
    if (audio.current) {
      audio.current.loop = loop;
      audio.current.volume = volume;
    }
  }, [audio, loop, volume]);

  const togglePlay = () => {
    if (audio.current) {
      if (isPlay) {
        audio.current.pause();
      } else {
        audio.current.play();
      }
    }

    setIsPlay(!isPlay);
  };

  return (
    <>
      <audio ref={audio} src={backgroundMusic} autoPlay loop muted={false} />
      <OutlineButton onClick={togglePlay} text={isPlay ? "정지" : "재생"} size="S" />
    </>
  );
}

export default BackgroundSound;
