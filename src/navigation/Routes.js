import React, { useContext, useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import * as firebase from 'firebase';
/* components */
import { AuthStack } from './AuthStack';
import { BaseStack } from './BaseStack';
import { Loading } from '../components/Loading';
/* context */
import { AuthContext } from '../contexts/AuthProvider';
import { AppStateProvider } from '../contexts/AppStateProvider';
import { FirestoreUserProvider } from '../contexts/FirestoreUserProvider';

export const Routes = () => {
  const { user, setUser } = useContext(AuthContext);
  const [loading, setLoading] = useState(true);
  const [initializing, setInitializing] = useState(true);

  function onAuthStateChanged(user) {
    setUser(user);
    if (initializing) setInitializing(false);
    setTimeout(function() {
      setLoading(false);
    }, 2000);
  }

  useEffect(() => {
    const subscriber = firebase.auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber;
  }, []);

  if (loading) {
    return (
      <>
        <Loading />
        <StatusBar hidden />
      </>
    );
  }
  if (user) {
    return (
      <AppStateProvider>
        <FirestoreUserProvider>
          <BaseStack />
        </FirestoreUserProvider>
      </AppStateProvider>
    );
  } else {
    return (
      <AuthStack />
    );
  }
};
