import {
  IonContent,
  IonFab,
  IonFabButton,
  IonHeader,
  IonIcon,
  IonImg,
  IonItem,
  IonLabel,
  IonList,
  IonPage,
  IonThumbnail,
  IonTitle,
  IonToolbar,
} from '@ionic/react';
import { add as addIcon } from 'ionicons/icons';
import React, { useEffect, useState } from 'react';
import { useAuth } from '../auth';
import { firestore } from '../firebase';
import { Entry, toEntry } from '../models';
import { formatDate } from '../date';

const HomePage: React.FC = () => {
  const { userId } = useAuth();
  const [entries, setEntries] = useState<Entry[]>([]);
  useEffect(() => {
    const entriesRef = firestore
      .collection('users')
      .doc(userId)
      .collection('entries');
    return entriesRef
      .orderBy('date', 'desc')
      .limit(7)
      .onSnapshot(({ docs }) => setEntries(docs.map(toEntry)));
  }, [userId]);
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Home Page</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className='ion-padding'>
        <IonList>
          {entries.map((entry) => (
            <IonItem
              button
              key={entry.id}
              routerLink={`/my/entries/view/${entry.id}`}
            >
              {entry.pictureUrl && (
                <IonThumbnail slot='end'>
                  <IonImg src={entry.pictureUrl} />
                </IonThumbnail>
              )}
              <IonLabel>
                <h3>{formatDate(entry.date)}</h3>
                <h2>{entry.title}</h2>
              </IonLabel>
            </IonItem>
          ))}
        </IonList>
        <IonFab vertical='bottom' horizontal='end'>
          <IonFabButton routerLink='/my/entries/add'>
            <IonIcon icon={addIcon} />
          </IonFabButton>
        </IonFab>
      </IonContent>
    </IonPage>
  );
};

export default HomePage;
