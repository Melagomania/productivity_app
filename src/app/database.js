var config = {
  apiKey: "AIzaSyDgy89rmgZiUhUR-lueALGeSjBjG9ZSipw",
  authDomain: "productivity-app-4a40d.firebaseapp.com",
  databaseURL: "https://productivity-app-4a40d.firebaseio.com",
  projectId: "productivity-app-4a40d",
  storageBucket: "",
  messagingSenderId: "136714087996",
};
firebase.initializeApp(config);
function testDB() {
  addUserToDB(10, {
    name: 'max',
    age: 28
  });
  addUserToDB(11, {
    name: 'alex',
    age: 21
  });
  addUserToDB(12, {
    name: 'viktor',
    age: 41
  });
  addUserToDB(13, {
    name: 'olha',
    age: 19
  });
  addUserToDB(14, {
    name: 'igor',
    age: 28
  });

  logUserFromDB(10);
  logUserFromDB(11);
  logUserFromDB(12);
  logUserFromDB(13);
  logUserFromDB(14);

  function addUserToDB(userId, userData) {
    firebase.database().ref(`users/user${userId}`).set(userData);
  }

  function logUserFromDB(userId) {
    var ref = firebase.database().ref(`users/user${userId}`);
    ref.on('value', function(snapshot) {
      console.log(snapshot.val());
    });
  }
};

window.testDB = testDB;
