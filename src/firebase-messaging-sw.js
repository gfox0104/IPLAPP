// const { Environment } = require("@angular/compiler-cli/src/ngtsc/typecheck/src/environment");


// importScripts('https://www.gstatic.com/firebasejs/8.10.0/firebase-app.js');
// importScripts('https://www.gstatic.com/firebasejs/8.10.0/firebase-messaging.js');

// importScripts('https://www.gstatic.com/firebasejs/7.6.0/firebase-app.js');
// importScripts('https://www.gstatic.com/firebasejs/7.6.0/firebase-messaging.js');

importScripts('https://www.gstatic.com/firebasejs/7.24.0/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/7.24.0/firebase-messaging.js');

// importScripts('https://www.gstatic.com/firebasejs/6.1.5/firebase-app.js');
// importScripts('https://www.gstatic.com/firebasejs/6.1.5/firebase-messaging.js');




firebase.initializeApp({
  apiKey: 'AIzaSyAmk-KtdHYeR2llmxdjE4yu4Y2SNlAMDMk',
  appId: '1:1095460168527:web:1b194864d96f51a1f21b3a',
  projectId: 'rare-lambda-245821',
  authDomain: 'rare-lambda-245821.firebaseapp.com',
  databaseURL: 'https://rare-lambda-245821.firebaseio.com',
  storageBucket: 'rare-lambda-245821.appspot.com',
  messagingSenderId: '1095460168527',
  measurementId: 'G-62E7QE63L7',
});

// firebase.initializeApp({
//     apiKey: Environment.apiKey,
//     authDomain: Environment.authDomain,
//     databaseURL: Environment.databaseURL,
//     projectId: Environment.projectId,
//     storageBucket: Environment.storageBucket,
//     messagingSenderId: Environment.messagingSenderId,
//     appId: Environment.appId,
//     measurementId: Environment.measurementId,
//   });

const messaging = firebase.messaging();