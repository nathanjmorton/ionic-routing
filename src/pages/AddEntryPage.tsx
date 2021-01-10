import {
  IonBackButton,
  IonButton,
  IonButtons,
  IonContent,
  IonDatetime,
  IonHeader,
  IonInput,
  IonItem,
  IonLabel,
  IonList,
  IonPage,
  IonTextarea,
  IonTitle,
  IonToolbar,
} from '@ionic/react';
import { CameraResultType, Plugins } from '@capacitor/core';
import React, { useEffect, useRef, useState } from 'react';
import { useHistory } from 'react-router';
import { useAuth } from '../auth';
import { firestore, storage } from '../firebase';
const { Camera } = Plugins;

const savePicture = async (blobUrl, userId) => {
  const pictureRef = storage.ref(`/users/${userId}/pictures/${Date.now()}`);
  const response = await fetch(blobUrl);
  const blob = await response.blob();
  const snapshot = await pictureRef.put(blob);
  const url = await snapshot.ref.getDownloadURL();
  console.log('saved pic: ', url);
  return url;
};

const AddEntryPage: React.FC = () => {
  const { userId } = useAuth();
  const history = useHistory();
  const [title, setTitle] = useState('');
  const [pictureUrl, setPictureUrl] = useState('/assets/placeholder.png');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');
  const fileInputRef = useRef<HTMLInputElement>();

  useEffect(
    () => () => {
      if (pictureUrl.startsWith('blob:')) {
        URL.revokeObjectURL(pictureUrl);
      }
    },
    [pictureUrl]
  );

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files.item(0);
    const pictureUrl = URL.createObjectURL(file);
    setPictureUrl(pictureUrl);
  };

  const handlePictureClick = async () => {
    // fileInputRef.current.click();
    try {
      const photo = await Camera.getPhoto({
        resultType: CameraResultType.Uri,
      });
      setPictureUrl(photo.webPath);
    } catch (err) {
      console.log('camera error: ', err);
    }
  };

  const handleSave = async () => {
    const entriesRef = firestore
      .collection('users')
      .doc(userId)
      .collection('entries');
    const entryData = { date, title, pictureUrl, description };
    if (!pictureUrl.startsWith('/assets')) {
      entryData.pictureUrl = await savePicture(pictureUrl, userId);
    }
    const entryRef = await entriesRef.add(entryData);
    console.log('saved: ', entryRef.id);
    setTitle('');
    setDescription('');
    history.goBack();
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot='start'>
            <IonBackButton />
          </IonButtons>
          <IonTitle>Add Entry</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className='ion-padding'>
        <IonList>
          <IonItem>
            <IonLabel position='stacked'>Date</IonLabel>
            <IonDatetime
              value={date}
              onIonChange={(e) => setDate(e.detail.value)}
            />
          </IonItem>
          <IonItem>
            <IonLabel position='stacked'>Title</IonLabel>
            <IonInput
              value={title}
              onIonChange={(e) => setTitle(e.detail.value)}
            />
          </IonItem>
          <IonItem>
            <IonLabel position='stacked'>Picture</IonLabel>
            <input
              type='file'
              accept='image/*'
              hidden
              ref={fileInputRef}
              onChange={handleFileChange}
            />
            <img
              src={pictureUrl}
              alt=''
              style={{ cursor: 'pointer' }}
              onClick={handlePictureClick}
            />
            <br />
          </IonItem>
          <IonItem>
            <IonLabel position='stacked'>Description</IonLabel>
            <IonTextarea
              value={description}
              onIonChange={(e) => setDescription(e.detail.value)}
            />
          </IonItem>
          <IonButton expand='block' onClick={handleSave}>
            Save
          </IonButton>
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default AddEntryPage;
