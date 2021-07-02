import React, { useEffect, useState } from 'react';
import { StyleSheet, TouchableOpacity, View, Image, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Audio } from 'expo-av';
import { AVPlaybackSource, AVPlaybackStatus } from 'expo-av/build/AV';

const SoundPlayer = ({
  //   gameFlowSound,
  source,
  getNewPlayList,
  enterNightVotingPhase,
}: {
  //   gameFlowSound: { title: string; source: AVPlaybackSource };
  source: AVPlaybackSource[];
  getNewPlayList: () => void;
  enterNightVotingPhase: () => void;
}) => {
  const [currentIndex, setCurrentIndex] = useState(-1);
  const [sound, setSound] = useState(new Audio.Sound());

  useEffect(() => {
    setCurrentIndex(0);
  }, [source]);

  useEffect(() => {
    if (currentIndex >= 0 && source.length > 0) {
      loadAudio();
    }
    if (currentIndex === source.length - 1) {
      setCurrentIndex(-1);
    }
  }, [currentIndex]);

  useEffect(() => {
    return sound
      ? () => {
          console.log('Unloading Sound');
          sound.unloadAsync();
        }
      : undefined;
  }, [sound]);

  async function loadAudio() {
    console.log('Loading Sound');
    await Audio.setAudioModeAsync({
      allowsRecordingIOS: false,
      interruptionModeIOS: Audio.INTERRUPTION_MODE_IOS_DO_NOT_MIX,
      playsInSilentModeIOS: true,
      interruptionModeAndroid: Audio.INTERRUPTION_MODE_ANDROID_DO_NOT_MIX,
      shouldDuckAndroid: true,
      staysActiveInBackground: true,
      playThroughEarpieceAndroid: true,
    });
    sound.setOnPlaybackStatusUpdate(_onPlaybackStatusUpdate);
    await sound.loadAsync(source[currentIndex], { shouldPlay: true });
    setSound(sound);
  }

  const _onPlaybackStatusUpdate = (playbackStatus: AVPlaybackStatus) => {
    if (!playbackStatus.isLoaded) {
      // Update your UI for the unloaded state
      if (playbackStatus.error) {
        console.log(`Encountered a fatal error during playback: ${playbackStatus.error}`);
        // Send Expo team the error on Slack or the forums so we can help you debug!
      }
    } else {
      if (playbackStatus.didJustFinish && !playbackStatus.isLooping) {
        // The player has just finished playing and will stop. Maybe you want to play something else?
        (async () => {
          // getNewPlayList();
          console.log('length:: ', source.length);
          console.log('current index:: ', currentIndex);
          await sound.unloadAsync();
          if (source.length === 1) {
            getNewPlayList();
            // setCurrentIndex(0);
          } else if (currentIndex < source.length - 1) {
            setCurrentIndex((currentIndex) => currentIndex + 1);
          } else {
            //TODO stop playing and waiting roles cast skill
            enterNightVotingPhase();
            // getNewPlayList();
            // setCurrentIndex(0);
          }
        })();
      }
    }
  };

  return <></>;
};
export default SoundPlayer;

// const audioBookPlaylist = [
//   {
//     title: 'Hamlet - Act I',
//     author: 'William Shakespeare',
//     source: 'Librivox',
//     uri:
//       'https://ia800204.us.archive.org/11/items/hamlet_0911_librivox/hamlet_act1_shakespeare.mp3',
//     imageSource: 'http://www.archive.org/download/LibrivoxCdCoverArt8/hamlet_1104.jpg',
//   },
//   {
//     title: 'Hamlet - Act II',
//     author: 'William Shakespeare',
//     source: 'Librivox',
//     uri:
//       'https://ia600204.us.archive.org/11/items/hamlet_0911_librivox/hamlet_act2_shakespeare.mp3',
//     imageSource: 'http://www.archive.org/download/LibrivoxCdCoverArt8/hamlet_1104.jpg',
//   },
//   {
//     title: 'Hamlet - Act III',
//     author: 'William Shakespeare',
//     source: 'Librivox',
//     uri: 'http://www.archive.org/download/hamlet_0911_librivox/hamlet_act3_shakespeare.mp3',
//     imageSource: 'http://www.archive.org/download/LibrivoxCdCoverArt8/hamlet_1104.jpg',
//   },
//   {
//     title: 'Hamlet - Act IV',
//     author: 'William Shakespeare',
//     source: 'Librivox',
//     uri:
//       'https://ia800204.us.archive.org/11/items/hamlet_0911_librivox/hamlet_act4_shakespeare.mp3',
//     imageSource: 'http://www.archive.org/download/LibrivoxCdCoverArt8/hamlet_1104.jpg',
//   },
//   {
//     title: 'Hamlet - Act V',
//     author: 'William Shakespeare',
//     source: 'Librivox',
//     uri:
//       'https://ia600204.us.archive.org/11/items/hamlet_0911_librivox/hamlet_act5_shakespeare.mp3',
//     imageSource: 'http://www.archive.org/download/LibrivoxCdCoverArt8/hamlet_1104.jpg',
//   },
// ];

// export default class App extends React.Component {
//   state = {
//     isPlaying: false,
//     playbackInstance: null,
//     currentIndex: 0,
//     volume: 1.0,
//     isBuffering: true,
//   };

//   async componentDidMount() {
//     try {
//       await Audio.setAudioModeAsync({
//         allowsRecordingIOS: false,
//         interruptionModeIOS: Audio.INTERRUPTION_MODE_IOS_DO_NOT_MIX,
//         playsInSilentModeIOS: true,
//         interruptionModeAndroid: Audio.INTERRUPTION_MODE_ANDROID_DO_NOT_MIX,
//         shouldDuckAndroid: true,
//         staysActiveInBackground: true,
//         playThroughEarpieceAndroid: true,
//       });

//       this.loadAudio();
//     } catch (e) {
//       console.log(e);
//     }
//   }

//   async loadAudio() {
//     const { currentIndex, isPlaying, volume } = this.state;

//     try {
//       const playbackInstance = new Audio.Sound();
//       const source = {
//         uri: audioBookPlaylist[currentIndex].uri,
//       };

//       const status = {
//         shouldPlay: isPlaying,
//         volume: volume,
//       };

//       playbackInstance.setOnPlaybackStatusUpdate(this.onPlaybackStatusUpdate);
//       await playbackInstance.loadAsync(source, status, false);
//       this.setState({
//         playbackInstance,
//       });
//     } catch (e) {
//       console.log(e);
//     }
//   }

//   onPlaybackStatusUpdate = (status) => {
//     this.setState({
//       isBuffering: status.isBuffering,
//     });
//   };

//   handlePlayPause = async () => {
//     const { isPlaying, playbackInstance } = this.state;
//     isPlaying ? await playbackInstance.pauseAsync() : await playbackInstance.playAsync();

//     this.setState({
//       isPlaying: !isPlaying,
//     });
//   };

//   handlePreviousTrack = async () => {
//     let { playbackInstance, currentIndex } = this.state;
//     if (playbackInstance) {
//       await playbackInstance.unloadAsync();
//       currentIndex < audioBookPlaylist.length - 1 ? (currentIndex -= 1) : (currentIndex = 0);
//       this.setState({
//         currentIndex,
//       });
//       this.loadAudio();
//     }
//   };

//   handleNextTrack = async () => {
//     let { playbackInstance, currentIndex } = this.state;
//     if (playbackInstance) {
//       await playbackInstance.unloadAsync();
//       currentIndex < audioBookPlaylist.length - 1 ? (currentIndex += 1) : (currentIndex = 0);
//       this.setState({
//         currentIndex,
//       });
//       this.loadAudio();
//     }
//   };

//   render() {
//     return <></>;
//   }
// }
