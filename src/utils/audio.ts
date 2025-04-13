import clickSoundSrc from "../assets/sound/click-sound.mp3";
import clickKeyPadSoundSrc from "../assets/sound/click-Keypad.mp3";
import correctSoundSrc from "../assets/sound/correct-sound.mp3";
import errorSoundSrc from "../assets/sound/wrong-error.mp3";

const clickSound: HTMLAudioElement = new Audio(clickSoundSrc);
const clickKeyPadSound: HTMLAudioElement = new Audio(clickKeyPadSoundSrc);
const correctSound: HTMLAudioElement = new Audio(correctSoundSrc);
const errorSound: HTMLAudioElement = new Audio(errorSoundSrc);

const playClickSound = () => clickSound.play();
const playClickKeyPadSound = () => clickKeyPadSound.play();
const playCorrectSound = () => correctSound.play();
const playErrorSound = () => errorSound.play();

export { playClickSound, playClickKeyPadSound, playCorrectSound, playErrorSound };
