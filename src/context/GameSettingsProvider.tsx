import React, { useReducer, useContext } from 'react';
import * as Shared from '../common/Shared';

export const GameSettingsContext = React.createContext({} as any);

const INITIAL_STATE = {
  //villagers
  villager: 0,
  oldMan: false,
  seer: false,
  fool: false,
  hunter: false,
  bodyguard: false,
  witch: false,

  //werewolf
  werewolf: 0,
  alphawolf: false,
  mysticwolf: false,

  //abilities
  elixirAbility: Shared.Abilities.Elixir.CANSAVEYOURSELF,
  poisonAbility: Shared.Abilities.Poison.CANNOTUSEWITHELIXIR,
  bodyguardAbility: Shared.Abilities.Bodyguard.DEADWHENGUARDANDSAVE,
};

// const CONSTANT = {
//   VILLAGER_INCREMENT: 'VILLAGER_INCREMENT',
//   VILLAGER_DECREMENT: 'VILLAGER_DECREMENT',
//   TOGGLE_OLDMAN: 'TOGGLE_OLDMAN',
//   TOGGLE_SEER: 'TOGGLE_SEER',
//   TOGGLE_FOOL: 'TOGGLE_FOOL',
//   TOGGLE_HUNTER: 'TOGGLE_HUNTER',
//   TOGGLE_BODYGUARD: 'TOGGLE_BODYGUARD',
//   TOGGLE_WITCH: 'TOGGLE_WITCH',

//   WEREWOLF_INCREMENT: 'WEREWOLF_INCREMENT',
//   WEREWOLF_DECREMENT: 'WEREWOLF_DECREMENT',
//   TOGGLE_ALPHAWOLF: 'TOGGLE_ALPHAWOLF',
//   TOGGLE_MYSTICWOLF: 'TOGGLE_MYSTICWOLF',
//   SET_ELIXIR_ABILITY: 'SET_ELIXIR_ABILITY',
//   SET_POISON_ABILITY: 'SET_POISON_ABILITY',
//   SET_BODYGUARD_ABILITY: 'SET_BODYGUARD_ABILITY',
// };

// type gameSettingsActionType =
//   | { type: 'SET_ELIXIR_ABILITY'; payload: string }
//   | { type: 'SET_POISON_ABILITY'; payload: string }
//   | { type: 'SET_BODYGUARD_ABILITY'; payload: string }
//   | { type: 'VILLAGER_INCREMENT' }
//   | { type: 'VILLAGER_DECREMENT' }
//   | { type: 'TOGGLE_OLDMAN' }
//   | { type: 'TOGGLE_SEER' }
//   | { type: 'TOGGLE_FOOL' }
//   | { type: 'TOGGLE_HUNTER' }
//   | { type: 'TOGGLE_BODYGUARD' }
//   | { type: 'TOGGLE_WITCH' }
//   | { type: 'WEREWOLF_INCREMENT' }
//   | { type: 'WEREWOLF_DECREMENT' }
//   | { type: 'TOGGLE_ALPHAWOLF' }
//   | { type: 'TOGGLE_MYSTICWOLF' };

enum CONSTANT {
  VILLAGER_INCREMENT = 'VILLAGER_INCREMENT',
  VILLAGER_DECREMENT = 'VILLAGER_DECREMENT',
  TOGGLE_OLDMAN = 'TOGGLE_OLDMAN',
  TOGGLE_SEER = 'TOGGLE_SEER',
  TOGGLE_FOOL = 'TOGGLE_FOOL',
  TOGGLE_HUNTER = 'TOGGLE_HUNTER',
  TOGGLE_BODYGUARD = 'TOGGLE_BODYGUARD',
  TOGGLE_WITCH = 'TOGGLE_WITCH',

  WEREWOLF_INCREMENT = 'WEREWOLF_INCREMENT',
  WEREWOLF_DECREMENT = 'WEREWOLF_DECREMENT',
  TOGGLE_ALPHAWOLF = 'TOGGLE_ALPHAWOLF',
  TOGGLE_MYSTICWOLF = 'TOGGLE_MYSTICWOLF',
  SET_ELIXIR_ABILITY = 'SET_ELIXIR_ABILITY',
  SET_POISON_ABILITY = 'SET_POISON_ABILITY',
  SET_BODYGUARD_ABILITY = 'SET_BODYGUARD_ABILITY',
  CLEAR_ALL_STATE = 'CLEAR_ALL_STATE',
}

type gameSettingsActionType =
  | { type: CONSTANT.SET_ELIXIR_ABILITY; payload: string }
  | { type: CONSTANT.SET_POISON_ABILITY; payload: string }
  | { type: CONSTANT.SET_BODYGUARD_ABILITY; payload: string }
  | { type: CONSTANT.VILLAGER_INCREMENT }
  | { type: CONSTANT.VILLAGER_DECREMENT }
  | { type: CONSTANT.TOGGLE_OLDMAN }
  | { type: CONSTANT.TOGGLE_SEER }
  | { type: CONSTANT.TOGGLE_FOOL }
  | { type: CONSTANT.TOGGLE_HUNTER }
  | { type: CONSTANT.TOGGLE_BODYGUARD }
  | { type: CONSTANT.TOGGLE_WITCH }
  | { type: CONSTANT.WEREWOLF_INCREMENT }
  | { type: CONSTANT.WEREWOLF_DECREMENT }
  | { type: CONSTANT.TOGGLE_ALPHAWOLF }
  | { type: CONSTANT.TOGGLE_MYSTICWOLF }
  | { type: CONSTANT.CLEAR_ALL_STATE };

// type actionType =
//   | CONSTANT.SET_ELIXIR_ABILITY
//   | CONSTANT.SET_POISON_ABILITY
//   | CONSTANT.SET_BODYGUARD_ABILITY
//   | CONSTANT.VILLAGER_INCREMENT
//   | CONSTANT.VILLAGER_DECREMENT
//   | CONSTANT.TOGGLE_OLDMAN
//   | CONSTANT.TOGGLE_SEER
//   | CONSTANT.TOGGLE_FOOL
//   | CONSTANT.TOGGLE_HUNTER
//   | CONSTANT.TOGGLE_BODYGUARD
//   | CONSTANT.TOGGLE_WITCH
//   | CONSTANT.WEREWOLF_INCREMENT
//   | CONSTANT.WEREWOLF_DECREMENT
//   | CONSTANT.TOGGLE_ALPHAWOLF
//   | CONSTANT.TOGGLE_MYSTICWOLF;

// const reducer = (state: typeof INITIAL_STATE = INITIAL_STATE, action: testType) => {
//   switch (action.type) {
//     case test.VILLAGER_INCREMENT:
//       return { ...state, villager: state.villager++ };
//     case test.SET_ELIXIR_ABILITY:
//       return { ...state, elixirAbility: action.payload };
//     default:
//       return state;
//   }
// };
// type gameSettings = {

// };

const reducer = (state: typeof INITIAL_STATE = INITIAL_STATE, action: gameSettingsActionType) => {
  switch (action.type) {
    case CONSTANT.SET_ELIXIR_ABILITY:
      return { ...state, elixirAbility: action.payload };
    case CONSTANT.SET_POISON_ABILITY:
      return { ...state, poisonAbility: action.payload };
    case CONSTANT.SET_BODYGUARD_ABILITY:
      return { ...state, bodyguardAbility: action.payload };
    case CONSTANT.VILLAGER_INCREMENT:
      return { ...state, villager: ++state.villager };
    case CONSTANT.VILLAGER_DECREMENT:
      return {
        ...state,
        villager: state.villager > 0 ? --state.villager : 0,
      };
    case CONSTANT.TOGGLE_OLDMAN:
      return {
        ...state,
        oldMan: !state.oldMan,
      };
    case CONSTANT.TOGGLE_SEER:
      return { ...state, seer: !state.seer };
    case CONSTANT.TOGGLE_FOOL:
      return { ...state, fool: !state.fool };
    case CONSTANT.TOGGLE_HUNTER:
      return {
        ...state,
        hunter: !state.hunter,
      };
    case CONSTANT.TOGGLE_BODYGUARD:
      return {
        ...state,
        bodyguard: !state.bodyguard,
      };
    case CONSTANT.TOGGLE_WITCH:
      return { ...state, witch: !state.witch };
    case CONSTANT.WEREWOLF_INCREMENT:
      return { ...state, werewolf: ++state.werewolf };
    case CONSTANT.WEREWOLF_DECREMENT:
      return {
        ...state,
        werewolf: state.werewolf > 0 ? --state.werewolf : 0,
      };
    case CONSTANT.TOGGLE_ALPHAWOLF:
      return {
        ...state,
        alphawolf: !state.alphawolf,
      };
    case CONSTANT.TOGGLE_MYSTICWOLF:
      return {
        ...state,
        mysticwolf: !state.mysticwolf,
      };
    case CONSTANT.CLEAR_ALL_STATE:
      return {
        ...INITIAL_STATE,
      };
    default:
      throw new Error();
  }
};

const gameSettingsAction = () => {
  const [state, dispatch] = useReducer(reducer, INITIAL_STATE);

  const villagerIncreaseHandler = () => {
    dispatch({ type: CONSTANT.VILLAGER_INCREMENT });
  };

  const villagerDecreaseHandler = () => {
    dispatch({ type: CONSTANT.VILLAGER_DECREMENT });
  };

  const toggleOldManHandler = () => {
    dispatch({ type: CONSTANT.TOGGLE_OLDMAN });
  };

  const toggleSeerHandler = () => {
    dispatch({ type: CONSTANT.TOGGLE_SEER });
  };

  const toggleFoolHandler = () => {
    dispatch({ type: CONSTANT.TOGGLE_FOOL });
  };

  const toggleHunterHandler = () => {
    dispatch({ type: CONSTANT.TOGGLE_HUNTER });
  };

  const toggleBodyguardHandler = () => {
    dispatch({ type: CONSTANT.TOGGLE_BODYGUARD });
  };

  const toggleWitchHandler = () => {
    dispatch({ type: CONSTANT.TOGGLE_WITCH });
  };

  const werewolfIncreaseHandler = () => {
    dispatch({ type: CONSTANT.WEREWOLF_INCREMENT });
  };

  const werewolfDecreaseHandler = () => {
    dispatch({ type: CONSTANT.WEREWOLF_DECREMENT });
  };

  const toggleAlphaWolfHandler = () => {
    dispatch({ type: CONSTANT.TOGGLE_ALPHAWOLF });
  };

  const toggleMysticWolfHandler = () => {
    dispatch({ type: CONSTANT.TOGGLE_MYSTICWOLF });
  };

  const setElixirAbilityHandler = (ability: string) => {
    dispatch({ type: CONSTANT.SET_ELIXIR_ABILITY, payload: ability });
  };

  const setPoisonAbilityHandler = (ability: string) => {
    dispatch({ type: CONSTANT.SET_POISON_ABILITY, payload: ability });
  };

  const setBodyguardAbilityHandler = (ability: string) => {
    dispatch({ type: CONSTANT.SET_BODYGUARD_ABILITY, payload: ability });
  };

  const clearAllStateHandler = () => {
    dispatch({ type: CONSTANT.CLEAR_ALL_STATE });
  };

  const getNumWerewolvesHandler = () => {
    let numWerewolves = state.werewolf;
    if (state.mysticwolf) numWerewolves++;
    if (state.alphawolf) numWerewolves++;
    return numWerewolves;
  };

  const getMaxPlayersHandler = () => {
    let maxplayers = state.werewolf + state.villager;
    const { seer, witch, hunter, fool, oldMan, alphawolf, mysticwolf, bodyguard } = state;
    if (seer) maxplayers++;
    if (witch) maxplayers++;
    if (oldMan) maxplayers++;
    if (fool) maxplayers++;
    if (hunter) maxplayers++;
    if (bodyguard) maxplayers++;
    if (alphawolf) maxplayers++;
    if (mysticwolf) maxplayers++;
    return maxplayers;
  };

  return {
    state,
    villagerIncreaseHandler,
    villagerDecreaseHandler,
    toggleOldManHandler,
    toggleSeerHandler,
    toggleFoolHandler,
    toggleHunterHandler,
    toggleBodyguardHandler,
    toggleWitchHandler,
    werewolfIncreaseHandler,
    werewolfDecreaseHandler,
    toggleAlphaWolfHandler,
    toggleMysticWolfHandler,
    setElixirAbilityHandler,
    setPoisonAbilityHandler,
    setBodyguardAbilityHandler,
    getNumWerewolvesHandler,
    clearAllStateHandler,
    getMaxPlayersHandler,
  };
};

export const GameSettingsProvider = ({ children }: { children: React.ReactNode }) => {
  const {
    state,
    villagerIncreaseHandler,
    villagerDecreaseHandler,
    toggleOldManHandler,
    toggleSeerHandler,
    toggleFoolHandler,
    toggleHunterHandler,
    toggleBodyguardHandler,
    toggleWitchHandler,
    werewolfIncreaseHandler,
    werewolfDecreaseHandler,
    toggleAlphaWolfHandler,
    toggleMysticWolfHandler,
    setElixirAbilityHandler,
    setPoisonAbilityHandler,
    setBodyguardAbilityHandler,
    getNumWerewolvesHandler,
    clearAllStateHandler,
    getMaxPlayersHandler,
  } = gameSettingsAction();
  return (
    <GameSettingsContext.Provider
      value={{
        //villagers
        villager: state.villager,
        oldMan: state.oldMan,
        seer: state.seer,
        fool: state.fool,
        hunter: state.hunter,
        bodyguard: state.bodyguard,
        witch: state.witch,

        //werewolf
        werewolf: state.werewolf,
        alphawolf: state.alphawolf,
        mysticwolf: state.mysticwolf,

        //abilities
        elixirAbility: state.elixirAbility,
        poisonAbility: state.poisonAbility,
        bodyguardAbility: state.bodyguardAbility,
        villagerIncrease: villagerIncreaseHandler,
        villagerDecrease: villagerDecreaseHandler,
        toggleOldMan: toggleOldManHandler,
        toggleSeer: toggleSeerHandler,
        toggleFool: toggleFoolHandler,
        toggleHunter: toggleHunterHandler,
        toggleBodyguard: toggleBodyguardHandler,
        toggleWitch: toggleWitchHandler,
        werewolfIncrease: werewolfIncreaseHandler,
        werewolfDecrease: werewolfDecreaseHandler,
        toggleAlphaWolf: toggleAlphaWolfHandler,
        toggleMysticWolf: toggleMysticWolfHandler,
        setElixirAbility: setElixirAbilityHandler,
        setPoisonAbility: setPoisonAbilityHandler,
        setBodyguardAbility: setBodyguardAbilityHandler,
        getNumWerewolves: getNumWerewolvesHandler,
        clearAllSettings: clearAllStateHandler,
        getMaxPlayers: getMaxPlayersHandler,
      }}
    >
      {children}
    </GameSettingsContext.Provider>
  );
};

export const useGameSettings = () => {
  const context = useContext(GameSettingsContext);
  if (context === undefined) {
    throw new Error('useCount must be used within a GameSettingsProvider');
  }
  return context;
};
