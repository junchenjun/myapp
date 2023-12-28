import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import * as Sentry from 'sentry-expo';

(async () =>
  await firestore().settings({
    persistence: true, // disable offline persistence
  }))();

const firebaseAuth = auth;
const firebaseStore = firestore;

export { firebaseAuth, firebaseStore };

export const collections = {
  user: {
    name: 'Users',
    subCollections: {
      plan: { name: 'Plans' },
    },
  },
} as const;

export const getUserConfig = async (id: string) => {
  return (await firebaseStore().collection(collections.user.name).doc(id).get()).data();
};

export const createFolder = (name: string) => {
  const uid = auth().currentUser?.uid;
  return firebaseStore()
    .collection(collections.user.name)
    .doc(uid)
    .collection(collections.user.subCollections.plan.name)
    .add({
      name,
    })
    .then(docRef => {
      return docRef.id;
    })
    .catch(error => Sentry.Native.captureException(error));
};

export const updateFolderName = ({ id, name }: { id: string; name: string }) => {
  const uid = auth().currentUser?.uid;
  return firebaseStore()
    .collection(collections.user.name)
    .doc(uid)
    .collection(collections.user.subCollections.plan.name)
    .doc(id)
    .update({
      name,
    })
    .catch(error => Sentry.Native.captureException(error));
};

export const deleteFolder = (folderId: string) => {
  const uid = auth().currentUser?.uid;
  return firebaseStore()
    .collection(collections.user.name)
    .doc(uid)
    .collection(collections.user.subCollections.plan.name)
    .doc(folderId)
    .delete()
    .catch(error => Sentry.Native.captureException(error));
};
