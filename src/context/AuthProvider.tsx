import React, { createContext, useContext, useReducer } from 'react';

const INITIAL_STATE = {
  username: '',
};

const AuthContext = createContext({} as any);

type ACTION_TYPE = { type: 'login'; payload: string } | { type: 'logout' };

const reducer = (state = INITIAL_STATE, action: ACTION_TYPE) => {
  switch (action.type) {
    case 'login':
      return { ...state, username: action.payload };
    case 'logout':
      return { ...state, username: '' };
    default:
      throw new Error();
  }
};

const AuthAction = () => {
  const [state, dispatch] = useReducer(reducer, INITIAL_STATE);
  const loginHandler = (username: string) => {
    dispatch({ type: 'login', payload: username });
  };
  const logoutHandler = () => {
    dispatch({ type: 'logout' });
  };
  return { state, loginHandler, logoutHandler };
};

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const { loginHandler, logoutHandler, state } = AuthAction();
  return (
    <AuthContext.Provider
      value={{
        username: state.username,
        login: loginHandler,
        logout: logoutHandler,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useCount must be used within a GameSettingsProvider');
  }
  return context;
};
