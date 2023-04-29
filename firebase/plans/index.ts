import {
  Timestamp,
  addDoc,
  collection,
  doc,
  getDocs,
  query,
  setDoc,
  where,
} from 'firebase/firestore';

import { db } from '../firebaseConfig';

export interface ExerciseSet {
  weight: string;
  reps: number;
}

export interface Exercise {
  name: string;
  sets: ExerciseSet[];
}

export interface Workout {
  days?: string[];
  name: string;
  lastPerformed?: Timestamp;
  exercises: Exercise[];
  id: string;
}

export interface Plan {
  name: string;
  userId?: string;
  workouts?: Workout[];
  id?: string;
}

const samplePlan: Plan = {
  name: 'Sample Plan',
  workouts: [
    {
      days: ['monday'],
      name: 'Chest & triceps',
      exercises: [{ name: 'pushups', sets: [{ weight: '100', reps: 20 }] }],
      id: '001',
    },
    {
      days: ['sunday'],
      name: 'Back & biceps',
      exercises: [{ name: 'pushups', sets: [{ weight: '100', reps: 20 }] }],
      id: '002',
    },
    {
      days: ['monday', 'sunday'],
      name: 'legs',
      exercises: [{ name: 'pushups', sets: [{ weight: '100', reps: 20 }] }],
      id: '003',
    },
  ],
};

export const createSamplePlan = (userId: string) => {
  const plansRef = collection(db, 'plans');
  return addDoc(plansRef, {
    ...samplePlan,
    userId,
  });
};

export const getPlans = async (userId: string) => {
  const q = query(collection(db, 'plans'), where('userId', '==', userId));
  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map((d) => {
    return { id: d.id, ...d.data() };
  });
};
