import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
    apiKey: "AIzaSyBu-hqN07rXe0zX7ZTtJVtp_NzZoxEpTHE",
    authDomain: "crwn-db-30fef.firebaseapp.com",
    databaseURL: "https://crwn-db-30fef.firebaseio.com",
    projectId: "crwn-db-30fef",
    storageBucket: "crwn-db-30fef.appspot.com",
    messagingSenderId: "990501821192",
    appId: "1:990501821192:web:cf8193dd7fef96e7252abd",
    measurementId: "G-Z01L4PKXCD"
  };

  firebase.initializeApp(config);

  export const createUserProfileDocument = async(userAuth, ...additionalData) => {
      if(!userAuth) return;

      const userRef = firestore.doc(`user/${userAuth.uid}`);

      const snapShot = await userRef.get();

      if(!snapShot.exists){
        const {displayName,email} = userAuth;
        const createdAt = new Date();

        try{
          await userRef.set({
            displayName,
            email,
            createdAt,
            ...additionalData
          })
        }catch(error){
            console.log("error creating the user", error.message);
        }
      }

      return userRef;
  }

  export const auth = firebase.auth();
  export const firestore = firebase.firestore();

  const provider = new firebase.auth.GoogleAuthProvider();
  provider.setCustomParameters({prompt:'select_account'});

  export const signInWithGoogle = () => auth.signInWithPopup(provider);

  export default firebase;