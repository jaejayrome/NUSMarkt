import { createMocks } from 'firebase-mock';
import { initializeApp } from 'firebase/app';
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseApp = initializeApp({
    apiKey: "AIzaSyBXrNsphWEoodnzDeSvg7HLsPTEgg4rT3s",
    authDomain: "nusmarkt-41131.firebaseapp.com",
    projectId: "nusmarkt-41131",
    storageBucket: "nusmarkt-41131.appspot.com",
    messagingSenderId: "518175974664",
    appId: "1:518175974664:web:984eaf2896f323452eb8bd" 
});

const { auth: mockAuth, firestore: mockFirestore } = createMocks();

export const auth = mockAuth;
export const firestore = mockFirestore;

auth.signInWithEmailAndPassword.mockImplementation((email, password) => {
  if (email === 'test@example.com' && password === 'password123') {
    return Promise.resolve({ user: mockUser });
  }
  return Promise.reject(new Error('Invalid email or password'));
});

auth.createUserWithEmailAndPassword.mockImplementation((email, password) => {
  if (email === 'test@example.com' && password === 'password123') {
    return Promise.resolve({ user: mockUser });
  }
  return Promise.reject(new Error('Registration failed'));
});

mockFirestore.collection.mockReturnValue({
  add: jest.fn().mockResolvedValue(),
});

const mockUser = {
  uid: 'test-uid',
  email: 'test@example.com',
};

   