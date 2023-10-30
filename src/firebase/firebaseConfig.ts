import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

(async () =>
  await firestore().settings({
    persistence: true, // disable offline persistence
  }))();

export const getPlansCollection = async (id: string) => {
  return await firestore().collection('plan').where('owner', '==', id).get();
};

export const firebaseAuth = auth;

// database().setPersistenceEnabled(true);

const firebaseConfig = {
  apiKey: 'AIzaSyCHiR-m9SwwZVwEJWO37dLfvF9-BVe8bUc',
  authDomain: 'myapp-403222.firebaseapp.com',
  projectId: 'myapp-403222',
  storageBucket: 'myapp-403222.appspot.com',
  messagingSenderId: '878529743045',
  appId: '1:878529743045:web:3461009e939028b764c8ac',
  measurementId: 'G-R43FR8HGZ5',
};
