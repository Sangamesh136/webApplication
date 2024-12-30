import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyDzJdOn7lTsdiZ6WkjwCHLmyQ6smT9XKBg',
  authDomain: 'vehiclenumberplatedetect-31506.firebaseapp.com',
  projectId: 'vehiclenumberplatedetect-31506',
  storageBucket: 'vehiclenumberplatedetect-31506.firebasestorage.app',
  messagingSenderId: '601475683226',
  appId: '1:601475683226:web:14ba04fd2c45bd31de6023',
  measurementId: 'G-VF31J9SGM6',
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);