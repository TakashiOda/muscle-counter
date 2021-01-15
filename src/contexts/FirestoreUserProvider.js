import React, { createContext, useContext, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import * as firebase from 'firebase';
const db = firebase.firestore();
/* contexts */
import { AuthContext } from './AuthProvider';
import { AppStateContext } from './AppStateProvider';

export const FirestoreUserContext = createContext({});
export const FirestoreUserProvider = ({ children }) => {
  const { appState } = useContext(AppStateContext);
  const { user } = useContext(AuthContext);
  const [firestoreUser, setFirestoreUser] = useState(null);

  useEffect(() => {
    if (appState == 'active') {
      const unsubscribe = db.collection('users').doc(`${user.uid}`)
        .onSnapshot((doc) => {
          setFirestoreUser(doc.data());
        });
      return () => unsubscribe();
    }
  },[appState]);

  return (
    <FirestoreUserContext.Provider
      value={{
        firestoreUser,
        setFirestoreUser,
      }}
    >
      {children}
    </FirestoreUserContext.Provider>
  );
};

FirestoreUserProvider.propTypes = {
  children: PropTypes.object.isRequired,
};
