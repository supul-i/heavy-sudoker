import clickSoundSrc from "../assets/sound/click-sound.mp3";
import clickKeyPadSoundSrc from "../assets/sound/click-Keypad.mp3";
import correctSoundSrc from "../assets/sound/correct-sound.mp3";
import errorSoundSrc from "../assets/sound/wrong-error.mp3";

const clickSound = new Audio(clickSoundSrc);
const clickKeyPadSound = new Audio(clickKeyPadSoundSrc);
const correctSound = new Audio(correctSoundSrc);
const errorSound = new Audio(errorSoundSrc);

const playClickSound = () => clickSound.play();
const playClickKeyPadSound = () => clickKeyPadSound.play();
const playCorrectSound = () => correctSound.play();
const playErrorSound = () => errorSound.play();

export { playClickSound, playClickKeyPadSound, playCorrectSound, playErrorSound };
