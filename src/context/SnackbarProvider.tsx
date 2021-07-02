import React, { useContext, useReducer } from 'react';
import { Portal, Snackbar } from 'react-native-paper';

export const SnackbarContext = React.createContext({} as any);

type SnackbarStateType = {
  visible: boolean;
  message: string;
  //   label?: string;
};

type SnackbarActionType = { type: 'SHOW_SNACKBAR'; payload: string } | { type: 'HIDE_SNACKBAR' };

const INITIAL_STATE = {
  visible: false,
  //   label: 'Close',
  message: '',
};

const reducer = (state: SnackbarStateType = INITIAL_STATE, action: SnackbarActionType) => {
  switch (action.type) {
    case 'SHOW_SNACKBAR':
      return { ...state, visible: true, message: action.payload };
    case 'HIDE_SNACKBAR':
      return { ...state, visible: false };
    default:
      throw new Error();
  }
};

const useSnackbarAction = () => {
  const [state, dispatch] = useReducer(reducer, INITIAL_STATE);
  const showSnackbarHandler = (message: string) => {
    dispatch({ type: 'SHOW_SNACKBAR', payload: message });
  };

  const hideSnackbarHandler = () => {
    dispatch({ type: 'HIDE_SNACKBAR' });
  };

  return { state, dispatch, showSnackbarHandler, hideSnackbarHandler };
};

export const SnackbarProvider = ({ children }: { children: React.ReactNode }) => {
  const { state, dispatch, showSnackbarHandler, hideSnackbarHandler } = useSnackbarAction();
  return (
    <SnackbarContext.Provider
      value={{
        visible: state.visible,
        message: state.message,
        dispatch: dispatch,
        showSnackbar: showSnackbarHandler,
        hideSnackbar: hideSnackbarHandler,
      }}
    >
      <Portal>
        <Snackbar
          visible={state.visible}
          onDismiss={hideSnackbarHandler}
          action={{
            label: 'Close',
            onPress: () => hideSnackbarHandler,
          }}
        >
          {state.message}
        </Snackbar>
      </Portal>
      
      {children}
      
    </SnackbarContext.Provider>
  );
};

export const useSnackbar = () => {
  const context = useContext(SnackbarContext);
  if (context === undefined) {
    throw new Error('useSnackbar must be used within a SnackbarProvider');
  }
  return context;
};
