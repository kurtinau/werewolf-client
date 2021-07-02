export const Phases = {
  STARTED: 'started',
  DAYTIME: 'daytime',
  DAYTIMEVOTING: 'daytimeVoting',
  ENDOFDAY: 'endOfDay',
  DAYTIMEVOTEFAILED: 'daytimeVoteFailed',
  NIGHTTIME: 'nighttime',
  NIGHTTIMEVOTING: 'nighttimeVoting',
  NIGHTTIMEVOTINGDONE: 'nightTimeVotingDone',
  NIGHTTIMEVOTEFAILED: 'nighttimeVoteFailed',
  ENDOFNIGHT: 'endOfNight',
  OVER: 'over',
};

export const Abilities = {
  Elixir: {
    CANNOTSAVEYOURSELF: 'canNotSaveYourself',
    CANSAVEYOURSELF: 'canSaveYourself',
    CANSAVEYOURSELFONLY1STNIGHT: 'canSaveYourselfOnly1stNight',
  },
  Poison: {
    CANUSEWITHELIXIR: 'canUseWithElixir',
    CANNOTUSEWITHELIXIR: 'canNotUseWithElixir',
  },
  Bodyguard: {
    DEADWHENGUARDANDSAVE: 'deadWhenGuardAndSave',
    NOTDEADWHENGUARDANDSAVE: 'notDeadWhenGuardAndSave',
  },
};

export const ClientMessageType = {
  GAMESTART: "gameStart",
  GAMESTATEREQ: "gameStateReq",
  SUGGESTTARGET: "suggestTarget",
  SKILLSCAST: "skillsCast",
  VOTECAST: "voteCast",
  ACKNOWLEDGE: "acknowledge", // acknowledge results of end of day and end of night
};

export const ServerMessageType = {
  GAMESTARTFAIL: "gameStartFail",
  GAMESTARTSUCCESS: "gameStartSuccess",
  GAMESTATEINFO: "gameStateInfo",
  ACKNOWLEDGEMENT: "acknowledgement",
  VOTECAST: "voteCast",
  SKILLSCAST: "skillsCast",
};

export const ServerSocketEvent = {
  // SYSTEMNOTICE: "systemNotice", // notices from server unrelated to the happenings inside the game
  INITIALSTATUSREPLY: 'initialStatusReply', // excludes state details
  STATUSREPLY: 'statusReply', // reply to STATUSREQUEST by client containing game information
  GAMEACTION: 'gameAction', // action related to the context of the game itself
  LOBBYGAMEUPDATE: 'lobbyGameUpdate',
  // LOBBYUPDATE: "lobbyUpdate", // update to the status of the game lobby (e.g. a player joins/leaves a game)
  // LOBBYSTATEREPLY: "lobbyState", // message containing complete state of lobby
  // LOBBYGAMESTATEREPLY: "lobbyGameState", // message containing complete state of a lobby game
  // LOBBYUPDATESSUBSCRIBED: "lobbyUpdatesSubscribed", // confirmation that lobby updates room has been joined
  // LOBBYUPDATESUNSUBSCRIBED: "lobbyUpdatesUnsubscribed",
  CREATEGAMEOUTCOME: 'createGameOutcome', // outcome of a create game request, enumerated in CreateGameOutcome
  // LEAVEGAMEOUTCOME: "leaveGameOutcome",
  JOINGAMEOUTCOME: 'joinGameOutcome',
  // GAMESTARTED: "gameStarted", // sent when the last player joins a lobby game and the game controller is created
  // // clients must request initial status update via GAMEACTION message
  // GAMEENDED: "gameEnded", // clients are notified of the start to a game via GAMEACTION messages
  // REMOVEDFROMGAME: "removedFromGame", // removed from game due to exceptional circumstances
  // LOBBYGAMECHATMESSAGE: "lobbyGameChatMessage",
  // LOBBYGAMESTATEUPDATE: "lobbyGameStateUpdate"
  USEREXISTED: 'usernameExisted',
  CONNECTSUCCESS: 'connectSuccess',
  SHUFFLECARDSOUTCOME: 'shuffleCardsOutcome',
};

export const ClientSocketEvent = {
  GAMEACTION: 'gameAction', // action related to the context of the game itself
  INITIALSTATUSREQUEST: 'initialStatusRequest', // request for reply that excludes state details
  STATUSREQUEST: 'statusRequest', // request from client asking for the client's status (e.g. whether it is in a game)
  // LOBBYSTATEREQUEST: "lobbyStateRequest", // client message asking for complete state of lobby
  // LOBBYGAMESTATEREQUEST: "lobbyGameStateRequest",
  SUBSCRIBELOBBYUPDATES: 'subscribeLobbyUpdates', // request to join lobby updates room
  UNSUBSCRIBELOBBYUPDATES: 'unsubscribeLobbyUpdates',
  JOINGAME: 'joinGame',
  CREATEGAME: 'createGame',
  STARTGAME: "startGame",
  // LEAVEGAME: "leaveGame", // leave game in lobby before it has started. Currenlty no way to leave started games.
  LOBBYGAMETOGGLEASEAT: 'lobbyGameToggleASeat',
  SHUFFLECARDS: 'shuffleCards',
  REVEALROLE: 'revealRole',
  TOGGLEGAMEMODE: 'toggleGameMode',
};

export const CreateGameOutcome = {
  ALREADYINGAME: 'alreadyInGame',
  MISSINGINFO: 'missingInfo',
  NAMEEXISTS: 'nameExists',
  NOTENOUGHPLAYERS: 'notEnoughPlayers',
  TOOMANYWEREWOLVES: 'tooManyWerewolves',
  NOTENOUGHWEREWOLVES: 'notEnoughWerewolves',
  INTERNALERROR: 'internalError',
  SUCCESS: 'success',
};

export const LeaveGameOutcome = {
  NOTINGAME: 'notInGame',
  GAMESTARTED: 'gameStarted',
  INTERNALERROR: 'internalError',
  SUCCESS: 'success',
};

export const JoinGameOutcome = {
  MISSINGINFO: 'missingInfo',
  ALREADYINGAME: 'alreadyInGame',
  GAMESTARTED: 'gameStarted', // game started as a result of player joining
  DOESNOTEXIST: 'doesNotExist',
  SUCCESS: 'success',
  INTERNALERROR: 'internalError',
  GAMEFULL: 'gameFull',
};

export const LobbyGameUpdate = {
  // GAMECREATED: "gameCreated",
  PLAYERLEFT: 'playerLeft',
  PLAYERJOINED: 'playerJoined',
  GAMEDELETED: 'gameDeleted',
  GAMESTARTED: 'gameStarted',
  SEATSCHANGED: 'seatsChanged',
  SHUFFLECARDS: 'shuffleCards',
  MODECHANGED: 'modeChanged',
};

export const StatusType = {
  INGAME: 'inGame',
  INLOBBYGAME: 'inLobbyGame',
  INLOBBY: 'inLobby',
};

export class LobbyPlayerDetail {
  name: string;
  role: number;
  seatNum: number;
  roleRevealed: boolean;
  constructor(name: string) {
    this.name = name;
    this.seatNum = 0;
    this.role = -1;
    this.roleRevealed = false;
  }
}

export class LobbyGameState {
  maxPlayers: number;
  numWerewolves: number;
  players: { [K in string]: LobbyPlayerDetail };
  owner: string;
  wildMode: boolean;
  seats: { [K in number]: string };
  configOverview: string;
  constructor() {
    this.maxPlayers = 0;
    this.numWerewolves = 0;
    this.players = {};
    this.owner = '';
    this.wildMode = false;
    this.seats = {};
    this.configOverview = '';
  }
}

export class RoomState {
  owner: string;
  wildMode: boolean;
  seats: { [K in number]: string };
  configOverview: string;
  constructor() {
    this.owner = '';
    this.wildMode = false;
    this.seats = {};
    this.configOverview = '';
  }
}

export class PlayerDetail {
  isWerewolf: boolean;
  isAlive: boolean;
  hasSkills: boolean;
  role: number;
  seatNum: number;
  constructor(isWerewolf: boolean, hasSkills: boolean, role: number, seatNum: number) {
    this.isWerewolf = isWerewolf;
    this.isAlive = true;
    this.hasSkills = false;
    this.role = -1;
    this.seatNum = 0;
  }
}

export class GameState {
  phase: string;
  players: { [K in string]: PlayerDetail };
  votes: {};
  acks: Array<string>;
  chosenPlayer: string;
  rolesName: string[];
  leftoverRoles: string[];
  constructor() {
    this.phase = Phases.STARTED;
    this.players = {}; // player name -> Shared.PlayerDetails object
    this.votes = {}; // player name -> value; true = yea, false = nay
    this.acks = []; // acknowledgements for information displayed in certain phases
    this.chosenPlayer = ''; // player chosen for voting or player just killed
    this.rolesName = [];
    this.leftoverRoles = [];
  }
}

export interface GameConfig {
  // numplayer: number;
  villager: number;
  werewolf: number;
  oldMan?: boolean;
  seer?: boolean;
  fool?: boolean;
  hunter?: boolean;
  bodyguard?: boolean;
  witch?: boolean;
  alphawolf?: boolean;
  mysticwolf?: boolean;
}

export const RolesCode = {
  villager: 0,
  werewolf: 1,
  oldMan: 2,
  seer: 3,
  fool: 4,
  hunter: 5,
  bodyguard: 6,
  witch: 7,
  alphawolf: 8,
  mysticwolf: 9,
};
