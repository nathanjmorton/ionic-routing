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

const EntryPage: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot='start'>
            <IonBackButton />
          </IonButtons>
          <IonTitle>404</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className='ion-padding'>Page Not Found</IonContent>
    </IonPage>
  );
};

export default EntryPage;
