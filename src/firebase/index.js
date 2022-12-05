import firebase from 'firebase/compat/app';
import { getStorage } from 'firebase/storage';

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: 'AIzaSyA8zxYidpz6epodC9909cilmFh5DuSvnfk',
    authDomain: 'project-i-61ff1.firebaseapp.com',
    projectId: 'project-i-61ff1',
    storageBucket: 'project-i-61ff1.appspot.com',
    messagingSenderId: '790503861538',
    appId: '1:790503861538:web:ef3fc55fab88ceee3fc97b',
    measurementId: 'G-7VM91WKX4M',
};

const app = firebase.initializeApp(firebaseConfig);

export const storage = getStorage(app);
