// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
	apiKey: 'AIzaSyDEhEcttHE_sOSdraOHZTpUOE8_JaKLstc',
	authDomain: 'house-marketplace-b2be9.firebaseapp.com',
	projectId: 'house-marketplace-b2be9',
	storageBucket: 'house-marketplace-b2be9.appspot.com',
	messagingSenderId: '229554417071',
	appId: '1:229554417071:web:6dc7dcbc5526dbe056135a',
};

// Initialize Firebase
initializeApp(firebaseConfig);
export const db = getFirestore();
