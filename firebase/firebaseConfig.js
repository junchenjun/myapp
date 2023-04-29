// Import the functions you need from the SDKs you need
import AsyncStorage from '@react-native-async-storage/async-storage';
import { initializeApp } from 'firebase/app';
import { initializeAuth, getReactNativePersistence } from 'firebase/auth';
import { initializeFirestore } from 'firebase/firestore';

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyCLYQ9gmkIXgbim1rkifdIQZYK_FQ7oAII',
  authDomain: 'gym-log-by-jun.firebaseapp.com',
  projectId: 'gym-log-by-jun',
  storageBucket: 'gym-log-by-jun.appspot.com',
  messagingSenderId: '244734442198',
  appId: '1:244734442198:web:5ab08dd9c87b637b482777',
  measurementId: 'G-HRNYM5E3BN',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service

export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
});

export const db = initializeFirestore(app, {
  experimentalForceLongPolling: true, // this line
  useFetchStreams: false, // and this line
});
