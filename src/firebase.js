import firebase from "firebase";
import 'firebase/storage';
const firebaseConfig = {
    apiKey: "AIzaSyDnPadWxUE1NhyOMcs-Kg_P1v4pCTU03vk",
    authDomain: "parabolic-rhino-338919.firebaseapp.com",
    projectId: "parabolic-rhino-338919",
    storageBucket: "parabolic-rhino-338919.appspot.com",
    messagingSenderId: "1003571244428",
    appId: "1:1003571244428:web:c49f351aa5784cc11dbaa9",
    measurementId: "G-SZG3BPD2GR"
  };
const fire = firebase.initializeApp(firebaseConfig);
export const db=firebase.database();
export default fire;