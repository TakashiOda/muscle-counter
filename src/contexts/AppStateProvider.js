import React, { createContext, useState, useEffect } from 'react';
import { AppState } from 'react-native';
import PropTypes from 'prop-types';

export const AppStateContext = createContext({});
export const AppStateProvider = ({ children }) => {
  const [appState, setAppState] = useState(AppState.currentState);

  useEffect(() => {
    AppState.addEventListener('change', handleAppStateChange);
  }, []);

  const handleAppStateChange = (nextAppState) => {
    setAppState(nextAppState);
  };

  return (
    <AppStateContext.Provider
      value={{
        appState,
        setAppState,
      }}
    >
      {children}
    </AppStateContext.Provider>
  );
};

AppStateProvider.propTypes = {
  children: PropTypes.object.isRequired,
};
