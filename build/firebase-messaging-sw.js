importScripts('https://www.gstatic.com/firebasejs/4.8.1/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/4.8.1/firebase-messaging.js');


const config = {
    apiKey: 'AIzaSyDW7Q8FN84LBIK4pqFLPKfK69gR4O8mde8',
    authDomain: 'planapp-f8adb.firebaseapp.com',
    databaseURL: 'https://planapp-f8adb.firebaseio.com',
    projectId: 'planapp-f8adb',
    storageBucket: 'planapp-f8adb.appspot.com',
    messagingSenderId: '74132727513'
  }
firebase.initializeApp(config)

const messaging = firebase.messaging();