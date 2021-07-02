import { AVPlaybackSource } from 'expo-av/build/AV';

const SoundsDynamic: { [k in string]: { [k in string]: AVPlaybackSource } } = {
  gameFlow: {
    start: require('../assets/audio/Start.mp3'),
    end: require('../assets/audio/End.mp3'),
    openEyes: require('../assets/audio/actions/open_eyes.mp3'),
    closeEyes: require('../assets/audio/actions/close_eyes.mp3'),
  },

  roles: {
    werewolf: require('../assets/audio/characters/werewolf.mp3'),
    seer: require('../assets/audio/characters/seer.mp3'),
    hunter: require('../assets/audio/characters/hunter.mp3'),
    bodyguard: require('../assets/audio/characters/bodyguard.mp3'),
    witch: require('../assets/audio/characters/witch.mp3'),
  },

  skills: {
    werewolf: require('../assets/audio/skills/werewolf.mp3'),
    seer: require('../assets/audio/skills/seer.mp3'),
    hunter: require('../assets/audio/skills/hunter.mp3'),
    bodyguard: require('../assets/audio/skills/bodyguard.mp3'),
    witch: require('../assets/audio/skills/witch.mp3'),
  },
};

export default SoundsDynamic;
