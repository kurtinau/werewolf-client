import { ImageSourcePropType } from 'react-native';

const ImagesDynamic: { [k in string]: ImageSourcePropType } = {
  roleCover: require('../assets/roles/roleCover.jpeg'),
  villager: require('../assets/roles/villager.jpeg'),
  werewolf: require('../assets/roles/werewolf.jpeg'),
  oldMan: require('../assets/roles/oldMan.jpeg'),
  seer: require('../assets/roles/seer.jpeg'),
  fool: require('../assets/roles/fool.jpeg'),
  hunter: require('../assets/roles/hunter.jpeg'),
  bodyguard: require('../assets/roles/bodyguard.jpeg'),
  witch: require('../assets/roles/witch.jpeg'),
  alphawolf: require('../assets/roles/alphawolf.jpeg'),
  mysticwolf: require('../assets/roles/mysticwolf.jpeg'),
};

export default ImagesDynamic;
