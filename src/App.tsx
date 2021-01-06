import { IonApp } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import React, { useState } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import { AuthContext } from './auth';
import AppTabs from './AppTabs';
import LoginPage from './pages/LoginPage';
import PageNotFound from './pages/PageNotFound';

const App: React.FC = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  console.log(`rendering App with loggedIn=${loggedIn}`);
  return (
    <IonApp>
      <AuthContext.Provider value={{ loggedIn }}>
        <IonReactRouter>
          <Switch>
            <Route exact path='/login'>
              <LoginPage onLogin={() => setLoggedIn(true)} />
            </Route>
            <Route path='/my'>
              <AppTabs />
            </Route>
            <Route exact path='/page-not-found'>
              <PageNotFound />
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
