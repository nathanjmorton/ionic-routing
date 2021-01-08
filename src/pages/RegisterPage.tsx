import {
  IonButton,
  IonContent,
  IonHeader,
  IonInput,
  IonItem,
  IonLabel,
  IonList,
  IonLoading,
  IonPage,
  IonText,
  IonTitle,
  IonToolbar,
} from '@ionic/react';
import React, { useState } from 'react';
import { Redirect } from 'react-router';
import { useAuth } from '../auth';
import { auth } from '../firebase';

const RegisterPage: React.FC = () => {
  const { loggedIn } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [status, setStatus] = useState({ loading: false, error: false });

  const handleRegister = async () => {
    try {
      setStatus({ loading: true, error: false });
      const credential = await auth.createUserWithEmailAndPassword(
        email,
        password
      );
      console.log('credential:', credential);
    } catch (err) {
      setStatus({ loading: false, error: true });
    }
  };

  if (loggedIn) {
    return <Redirect to='/my/entries' />;
  }
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Register</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className='ion-padding'>
        <IonList>
          <IonItem>
            <IonLabel position='stacked'>Email</IonLabel>
            <IonInput
              type='email'
              value={email}
              onIonChange={(e) => setEmail(e.detail.value)}
            />
          </IonItem>
          <IonItem>
            <IonLabel position='stacked'>Password</IonLabel>
            <IonInput
              type='password'
              value={password}
              onIonChange={(e) => setPassword(e.detail.value)}
            />
          </IonItem>
        </IonList>
        {status.error && <IonText color='danger'>Registration failed</IonText>}
        <IonButton expand='block' onClick={handleRegister}>
          Create Account
        </IonButton>
        <IonButton expand='block' fill='clear' routerLink='/login'>
          Login
        </IonButton>
        <IonLoading isOpen={status.loading} />
      </IonContent>
    </IonPage>
  );
};

export default RegisterPage;
