import {
  IonBackButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
} from '@ionic/react';
import React from 'react';
import { useParams } from 'react-router';
import { Redirect } from 'react-router-dom';
import { entries } from '../data';

interface RouteParams {
  id: string;
}

const EntryPage: React.FC = () => {
  const { id } = useParams<RouteParams>();
  const entry = entries.find((entry) => entry.id === id);
  if (!entry) {
    // throw new Error(`no such entry ${id}`);
    return <Redirect to='/page-not-found' />;
  }
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot='start'>
            <IonBackButton />
          </IonButtons>
          <IonTitle>{entry.title}</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className='ion-padding'>{entry.description}</IonContent>
    </IonPage>
  );
};

export default EntryPage;
