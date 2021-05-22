import React, { useState, useEffect } from 'react';
import Background from '../components/Background';
import Logo from '../components/Logo';
import Header from '../components/Header';
import Paragraph from '../components/Paragraph';
import Button from '../components/Button';
import { DASHBOARD_SCREEN_PROPS } from '../../App';
import {
  initiateSocket,
  disconnectSocket,
  onEventWithCB,
  emitEvent,
  connectSocket,
  emitEventWithData,
  gameActionMessage,
} from '../utils/Socket';
import { useSnackbar } from '../context/SnackbarProvider';
import * as Shared from '../common/Shared';
import ProfileAvatar from '../components/Welcome/ProfileAvatar';
import Lobby from './Lobby';
import CreateGame, { GAME_SETTING_DATA_TYPE } from '../components/GameSettings/CreateGame';
import { GameSettingsProvider } from '../context/GameSettingsProvider';
import BackButton from '../components/BackButton';
import LobbyGameWaiting from '../components/Lobby/LobbyGameWaiting';
import RoomHeader from '../components/RoomHeader';
import InGame from '../components/InGame';

const GameContentPhase = {
  INITIAL: 'initial',
  AWAITINGINITIALSTATUS: 'awaitingInitialStatus',
  PREVIOUSSTATUSPAGE: 'previousStatusPage',
  INLOBBY: 'inLobby',
  CREATEGAME: 'createGame',
  INLOBBYGAME: 'inLobbyGame',
  INGAME: 'inGame',
  DISCONNECTED: 'disconnected',
};

export default function Dashboard({ navigation, route }: DASHBOARD_SCREEN_PROPS) {
  const { username } = route.params;

  const [socketState, setSocketState] = useState({
    socketConnectError: null,
    socketConnectTimeout: null,
    socketGeneralError: null,
  });
  const [game, setGame] = useState<{
    phase: string;
    isLobbyGame: boolean;
    message: string;
    gameState: Shared.GameState;
    gameName: string;
    roomState: Shared.RoomState;
  }>({
    phase: GameContentPhase.INITIAL,
    isLobbyGame: false,
    message: '',
    gameState: new Shared.GameState(),
    gameName: '',
    roomState: new Shared.RoomState(),
  });

  const [lobby, setLobby] = useState<{
    lobbyGameState: Shared.LobbyGameState;
  }>({
    lobbyGameState: new Shared.LobbyGameState(),
  });

  const { visible, showSnackbar, hideSnackbar, dispatch } = useSnackbar();

  const setMessage = (msg: string) => {
    setGame((game) => ({ ...game, message: msg }));
  };

  const setGameConfigOverview = (overview: string) => {
    setGame((game) => ({ ...game, gameConfigOverview: overview }));
  };

  const setPhase = (newPhase: string) => {
    setGame((game) => ({ ...game, phase: newPhase }));
  };

  useEffect(() => {
    if (username) {
      console.log('name:: ', username);
      initiateSocket(username);
      connectSocket();
      onEventWithCB('connect', () => {
        setPhase(GameContentPhase.AWAITINGINITIALSTATUS);
        emitEvent(Shared.ClientSocketEvent.INITIALSTATUSREQUEST);
      });
      onEventWithCB('disconnect', () => {
        setPhase(GameContentPhase.DISCONNECTED);
      });
      onEventWithCB('connect_error', (error) => {
        setSocketState((socketState) => ({ ...socketState, socketConnectError: error }));
        console.log('Error encountered while trying to establish socket.io connection: ' + error);
      });
      onEventWithCB('connect_timeout', (timeout) => {
        setSocketState((socketState) => ({ ...socketState, socketConnectTimeout: timeout }));
        console.log('Timeout reached while trying to establish socket.io connection: ' + timeout);
      });
      onEventWithCB('error', (error) => {
        setSocketState((socketState) => ({ ...socketState, socketGeneralError: error }));
        console.log('Error encountered by the socket.io client: ' + error);
      });

      onEventWithCB(Shared.ServerSocketEvent.INITIALSTATUSREPLY, (data) => {
        switch (data.type) {
          case Shared.StatusType.INGAME:
            setGame((game) => ({
              ...game,
              gameName: data.gameName,
              isLobbyGame: false,
              phase: GameContentPhase.PREVIOUSSTATUSPAGE,
            }));
            break;
          case Shared.StatusType.INLOBBYGAME:
            setGame((game) => ({
              ...game,
              gameName: data.gameName,
              isLobbyGame: true,
              phase: GameContentPhase.PREVIOUSSTATUSPAGE,
            }));
            setLobby((lobby) => ({ ...lobby, lobbyGameState: new Shared.LobbyGameState() }));
            break;
          case Shared.StatusType.INLOBBY:
            setGame((game) => ({
              ...game,
              gameName: '',
              isLobbyGame: false,
              phase: GameContentPhase.PREVIOUSSTATUSPAGE,
            }));
            setLobby((lobby) => ({ ...lobby, lobbyGameState: new Shared.LobbyGameState() }));
            break;
          default:
            setMessage('Unrecognized type in status message received.');
            break;
        }
      });

      onEventWithCB(Shared.ServerSocketEvent.STATUSREPLY, (data) => {
        switch (data.type) {
          case Shared.StatusType.INGAME:
            setGame((game) => ({
              ...game,
              phase: GameContentPhase.INGAME,
              isLobbyGame: false,
              gameName: data.gameName,
              gameState: data.gameState,
              roomState: data.roomState,
            }));
            break;
          case Shared.StatusType.INLOBBYGAME:
            setGame((game) => ({
              ...game,
              phase: GameContentPhase.INLOBBYGAME,
              isLobbyGame: true,
              gameName: data.gameName,
            }));
            setLobby((lobby) => ({
              ...lobby,
              lobbyGameState: data.lobbyGameState,
            }));
            break;
          case Shared.StatusType.INLOBBY:
            setGame((game) => ({
              ...game,
              // gameName: null,
              // gameState: null,
              phase: GameContentPhase.INLOBBY,
            }));
            break;
          default:
            setMessage('Unrecognized type in status message received.');
            break;
        }
      });

      onEventWithCB(Shared.ServerSocketEvent.CREATEGAMEOUTCOME, (data) => {
        console.log('Create Game OutCome: ', data);
        switch (data.type) {
          case Shared.CreateGameOutcome.SUCCESS:
            setGame((game) => ({
              ...game,
              phase: GameContentPhase.INLOBBYGAME,
              isLobbyGame: true,
              gameName: data.gameName,
            }));
            setLobby((lobby) => ({
              ...lobby,
              lobbyGameState: data.lobbyGameState,
            }));
            console.log('successs');
            // this.socket.emit(Shared.ClientSocketEvent.UNSUBSCRIBELOBBYUPDATES);
            break;
          case Shared.CreateGameOutcome.ALREADYINGAME:
            setGame((game) => ({
              ...game,
              message:
                'Server reports that you are already in a game and must leave it before creating a new one. Please report this issue and try again later.',
            }));
            // this.requestStateDetails()
            break;
          case Shared.CreateGameOutcome.TOOMANYWEREWOLVES:
            setGame((game) => ({
              ...game,
              message:
                'Server reports that the game creation request specified too many werewolves. This outcome implies a inconsistency between the client and server. Please report this issue and try a smaller number of werewolves.',
            }));
            break;
          case Shared.CreateGameOutcome.NOTENOUGHWEREWOLVES:
            setGame((game) => ({
              ...game,
              message:
                'Server reports that the game creation request specified too few werewolves. This outcome implies a inconsistency between the client and server. Please report this issue and try a larger number of werewolves.',
            }));
            break;
          case Shared.CreateGameOutcome.NOTENOUGHPLAYERS:
            setGame((game) => ({
              ...game,
              message:
                'Server reports that the game creation request specified too few players. This outcome implies a inconsistency between the client and server. Please report this issue and try a larger number of players.',
            }));
            break;
          case Shared.CreateGameOutcome.NAMEEXISTS:
            setGame((game) => ({
              ...game,
              message:
                'There already exists a game with the name you tried to create. Please use a different name.',
            }));
            break;
          case Shared.CreateGameOutcome.MISSINGINFO:
            setGame((game) => ({
              ...game,
              message:
                'Protocol mismatch between the client and server. Please report this issue and try again later.',
            }));
            break;
          case Shared.CreateGameOutcome.INTERNALERROR:
            setGame((game) => ({
              ...game,
              message:
                'Internal error encountered by server when processing request to create game. Please try again later.',
            }));
            break;
          default:
            setGame((game) => ({
              ...game,
              message:
                'Unrecognized message received from server in response to request to create game. Please report this issue and try again later.',
            }));
            break;
        }
      });

      onEventWithCB(Shared.ServerSocketEvent.JOINGAMEOUTCOME, (data) => {
        switch (data.type) {
          case Shared.JoinGameOutcome.ALREADYINGAME:
            showSnackbar('You are in room.');
            setMessage('You are in room.');
            break;

          case Shared.JoinGameOutcome.DOESNOTEXIST:
            showSnackbar('Room is not existed.');
            setMessage('Room is not existed.');
            break;

          case Shared.JoinGameOutcome.GAMEFULL:
            showSnackbar('The room you are trying to join in is full.');
            setMessage('The room you are trying to join in is full.');
            break;

          case Shared.JoinGameOutcome.GAMESTARTED:
            showSnackbar('The room you are trying to join in has already started.');
            setMessage('The room you are trying to join in has already started.');
            break;

          case Shared.JoinGameOutcome.MISSINGINFO:
            showSnackbar('Missing info from server.');
            setMessage('Missing info from server.');
            break;

          case Shared.JoinGameOutcome.SUCCESS:
            setGame((game) => ({
              ...game,
              phase: GameContentPhase.INLOBBYGAME,
              isLobbyGame: true,
              gameName: data.gameName,
            }));
            setLobby((lobby) => ({
              ...lobby,
              lobbyGameState: data.lobbyGameState,
            }));
            break;

          default:
            setMessage('Unrecognized type in status message received.');
            break;
        }
      });

      onEventWithCB(Shared.ServerSocketEvent.LOBBYGAMEUPDATE, (data) => {
        console.log('Lobby Game Update Return: ', data);
        switch (data.type) {
          case Shared.LobbyGameUpdate.SEATSCHANGED:
            setLobby((lobby) => ({
              ...lobby,
              lobbyGameState: data.lobbyGameState,
            }));
            break;
          case Shared.LobbyGameUpdate.PLAYERJOINED:
            let notification = 'Player join in the room.';
            setLobby((lobby) => {
              if (
                lobby.lobbyGameState?.wildMode &&
                lobby.lobbyGameState.players[lobby.lobbyGameState.owner].role !== -1
              ) {
                notification = 'Player join in the room, the roles card must be shuffled again.';
              }
              return {
                ...lobby,
                lobbyGameState: data.lobbyGameState,
              };
            });
            showSnackbar(notification);
            break;
          case Shared.LobbyGameUpdate.SHUFFLECARDS:
            setLobby((lobby) => ({
              ...lobby,
              lobbyGameState: data.lobbyGameState,
            }));
            showSnackbar('Shuffle cards successfully.');
            break;
          case Shared.LobbyGameUpdate.MODECHANGED:
            console.log('wild mode return: ', data.gameState);
            setLobby((lobby) => ({
              ...lobby,
              lobbyGameState: data.lobbyGameState,
            }));
            break;
          default:
            setMessage('Unrecognized type in status message received.');
            break;
        }
      });

      onEventWithCB(Shared.ServerSocketEvent.GAMEACTION, (data) => {
        switch (data.type) {
          case Shared.ServerMessageType.GAMESTARTSUCCESS:
            console.log('gameState::: ', data.gameState);
            setGame((game) => ({
              ...game,
              phase: GameContentPhase.INGAME,
              gameState: data.gameState,
              roomState: data.roomState,
              isLobbyGame: false,
            }));
            showSnackbar('Game Started...');
            break;
          case Shared.ServerMessageType.GAMESTARTFAIL:
            console.log('shibai', data.message);
            showSnackbar(data.message);
            setMessage(data.message);
            break;
          default:
            console.log('default');
            setMessage('Unrecognized type in status message received.');
            break;
        }
      });
    }

    return () => {
      disconnectSocket();
      // dispatch({ type: 'SHOW_SNACKBAR', payload: 'You have been disconnected from server.' });
      showSnackbar('You have been disconnected from server.');
      setPhase(GameContentPhase.DISCONNECTED);
    };
  }, []);

  const requestStateDetails = () => {
    emitEvent(Shared.ClientSocketEvent.STATUSREQUEST);
  };
  const handleContinue = () => {
    requestStateDetails();
    setMessage('');
  };

  const navigateCreate = () => {
    setMessage('');
    if (game.phase === GameContentPhase.INLOBBY) {
      // this.socket.emit(Shared.ClientSocketEvent.UNSUBSCRIBELOBBYUPDATES);
      // this.setState({ lobbyState: null });
      setGame((game) => ({ ...game, phase: GameContentPhase.CREATEGAME }));
    } else {
      console.warn(
        'Warning: attempt to enter create game interface from component when not in the lobby.',
      );
    }
  };

  const navigateLobbyFromCreate = () => {
    setMessage('');
    if (game.phase === GameContentPhase.CREATEGAME) {
      requestStateDetails();
    } else {
      console.warn(
        'Warning: function to return to lobby from create game screen called when client was not in create game screen.',
      );
    }
  };

  const createGame = (data: GAME_SETTING_DATA_TYPE) => {
    setMessage('');
    if (game.phase === GameContentPhase.CREATEGAME) {
      emitEventWithData(Shared.ClientSocketEvent.CREATEGAME, data);
    } else {
      console.warn('Warning: request to create game received when not in CREATEGAME phase.');
    }
  };

  const toggleSeatHandle = (seatNum?: number) => {
    seatNum
      ? emitEventWithData(Shared.ClientSocketEvent.LOBBYGAMETOGGLEASEAT, {
          seatNum,
        })
      : emitEventWithData(Shared.ClientSocketEvent.LOBBYGAMETOGGLEASEAT, {
          roomNum: game.gameName,
        });
  };

  const joinGame = (roomNum: string) => {
    emitEventWithData(Shared.ClientSocketEvent.JOINGAME, {
      roomNum: roomNum,
    });
  };

  const shuffleCardsHandle = (wild?: boolean) => {
    if (wild) {
      emitEventWithData(Shared.ClientSocketEvent.SHUFFLECARDS, { wildMode: wild });
    } else {
      emitEvent(Shared.ClientSocketEvent.SHUFFLECARDS);
    }
  };

  const roleRevealedHandle = () => {
    emitEvent(Shared.ClientSocketEvent.REVEALROLE);
  };

  const wildModeToggleHandle = () => {
    emitEvent(Shared.ClientSocketEvent.TOGGLEGAMEMODE);
  };

  const sendMessage = (message: gameActionMessage) => {
    emitEventWithData(Shared.ClientSocketEvent.GAMEACTION, message);
  };

  let content = null;

  switch (game.phase) {
    case GameContentPhase.INITIAL:
      if (socketState.socketConnectError) {
        content = (
          <>
            <Header>Connect to the Game</Header>
            <Paragraph>
              Error connecting to server. You may try connecting again. If problem persists, please
              try again later.
            </Paragraph>
            <Button mode="outlined" onPress={() => {}}>
              Retry Connection
            </Button>
          </>
        );
      } else if (socketState.socketConnectTimeout) {
        content = (
          <>
            <Header>Connect to the Game</Header>
            <Paragraph>
              Attempt to connect to the server has timed out. You may try connecting again. If
              problem persists, please try again later.
            </Paragraph>
            <Button mode="outlined" onPress={() => {}}>
              Retry Connection
            </Button>
          </>
        );
      } else {
        content = (
          <>
            <Header>Connect to the Game</Header>
            <Paragraph>
              Attempting to connect to the server. When the connection is successful, the page will
              change automatically.
            </Paragraph>
          </>
        );
      }
      break;
    case GameContentPhase.AWAITINGINITIALSTATUS:
      content = (
        <>
          <Header>Connection Established</Header>
          <Paragraph>Requested player status from server. Awaiting response...</Paragraph>
        </>
      );
      break;
    case GameContentPhase.PREVIOUSSTATUSPAGE:
      if (game.gameName) {
        // splash screen to inform user that they were previously in a game and will be returned to that game
        content = (
          <>
            <Header>Welcome back!</Header>
            <Paragraph>
              Our records show that you were previously in the game {game.gameName}
            </Paragraph>
            <Button mode="outlined" onPress={handleContinue}>
              Continue
            </Button>
          </>
        );
      } else {
        content = (
          <>
            <Header>Entering Lobby</Header>
            <Paragraph>
              It looks like you are not part of an existing game. Click the button below to enter
              the lobby where you can create a new game or join an existing game.
            </Paragraph>
            <Button mode="outlined" onPress={handleContinue}>
              Continue
            </Button>
          </>
        );
      }
      break;
    case GameContentPhase.INLOBBY:
      content = <Lobby navigateCreate={navigateCreate} joinGame={joinGame} />;
      break;
    case GameContentPhase.CREATEGAME:
      content = (
        <GameSettingsProvider>
          <CreateGame submitSettings={createGame} />
        </GameSettingsProvider>
      );
      break;
    case GameContentPhase.INLOBBYGAME:
      content = (
        <LobbyGameWaiting
          username={username}
          lobbyGameState={lobby.lobbyGameState}
          toggleSeat={toggleSeatHandle}
          shuffleCards={shuffleCardsHandle}
          roleRevealed={roleRevealedHandle}
          wildModeToggle={wildModeToggleHandle}
          sendMessage={sendMessage}
        />
      );
      break;
    case GameContentPhase.INGAME:
      content = <InGame gameState={game.gameState} roomState={game.roomState} username={username}/>;
      break;
    case GameContentPhase.DISCONNECTED:
      content = (
        <>
          <Header>Disconnected</Header>
          <Paragraph>
            You have been disconnected. You may attempt to reconnect. If you are unable to do so,
            please try again later.
          </Paragraph>
          <Button mode="outlined" onPress={() => {}}>
            Connect
          </Button>
        </>
      );
      break;
    default:
      content = (
        <>
          <Header>Error</Header>
          <Paragraph>Internal error with the client application. Please try again later.</Paragraph>
        </>
      );
      break;
  }

  return (
    <Background>
      {game.phase === GameContentPhase.CREATEGAME && (
        <BackButton goBack={navigateLobbyFromCreate} />
      )}
      {game.phase === GameContentPhase.INLOBBYGAME && <RoomHeader roomNum={game.gameName} />}
      <ProfileAvatar
        username={username}
        logout={() =>
          navigation.reset({
            index: 0,
            routes: [{ name: 'StartScreen' }],
          })
        }
      />
      {game.phase !== GameContentPhase.CREATEGAME &&
        game.phase !== GameContentPhase.INLOBBYGAME &&
        game.phase !== GameContentPhase.INGAME && <Logo />}
      {content}
      {/* <Button
        mode="outlined"
        onPress={() =>
          navigation.reset({
            index: 0,
            routes: [{ name: 'StartScreen' }],
          })
        }
      >
        Logout
      </Button> */}
    </Background>
  );
}
