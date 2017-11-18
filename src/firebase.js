import Firebase from 'firebase'

const config = {
    apiKey: "AIzaSyDVmOaF8RR3HeKX9iaG3Vk3Oz3M_hct3NQ",
    authDomain: "sleepmeterv2.firebaseapp.com",
    databaseURL: "https://sleepmeterv2.firebaseio.com",
    projectId: "sleepmeterv2",
    storageBucket: "sleepmeterv2.appspot.com",
    messagingSenderId: "531016436978"
}

const app = Firebase.initializeApp(config);

export const db = app.database();
