import Firebase from 'firebase'

const config = {
  apiKey: 'AIzaSyDW7Q8FN84LBIK4pqFLPKfK69gR4O8mde8',
  authDomain: 'planapp-f8adb.firebaseapp.com',
  databaseURL: 'https://planapp-f8adb.firebaseio.com',
  projectId: 'planapp-f8adb',
  storageBucket: 'planapp-f8adb.appspot.com',
  messagingSenderId: '74132727513'
}

const app = Firebase.initializeApp(config)


const messaging = Firebase.messaging();

const db = Firebase.database();



// Firebase.auth().signInAnonymously().catch( e => console.log(e));

Firebase.auth().onAuthStateChanged(user => {
  if (user) {
    let isAnonymous = user.isAnonymous;
    let uid = user.uid;
    
    messaging.requestPermission()
    .then( () => {
      return messaging.getToken();
    })
    .then( token => {
      db.ref('users/' + uid).set({token});
      return fetch(`https://39wodm-user.freehosting.host/FCM/fcmSub.php?token=${token}`)
    })
    .catch( e => console.log(e))

  } 
  else {}

});




export {Firebase, app}
