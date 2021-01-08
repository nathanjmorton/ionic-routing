import { IonApp, IonLoading } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import React, { useState, useEffect } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import { AuthContext } from './auth';
import AppTabs from './AppTabs';
import LoginPage from './pages/LoginPage';
import PageNotFound from './pages/PageNotFound';
import { auth } from './firebase';
import RegisterPage from './pages/RegisterPage';

const App: React.FC = () => {
  const [authState, setAuthState] = useState({
    loading: true,
    loggedIn: false,
  });
  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      setAuthState({ loading: false, loggedIn: Boolean(user) });
    });
  }, []);
  console.log(`rendering app with authState: `, authState);
  if (authState.loading) {
    return <IonLoading isOpen />;
  }
  return (
    <IonApp>
      <AuthContext.Provider value={{ loggedIn: authState.loggedIn }}>
        <IonReactRouter>
          <Switch>
            <Route exact path='/login'>
              <LoginPage />
            </Route>
            <Route exact path='/register'>
              <RegisterPage />
            </Route>
            <Route path='/my'>
              <AppTabs />
            </Route>
            <Redirect exact path='/' to='/my/entries' />
            <Route>
              <PageNotFound />
            </Route>
          </Switch>
        </IonReactRouter>
      </AuthContext.Provider>
    </IonApp>
  );
};

export default App;
