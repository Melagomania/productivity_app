export function Firebase() {
  this.config = {
    apiKey: "AIzaSyDgy89rmgZiUhUR-lueALGeSjBjG9ZSipw",
    authDomain: "productivity-app-4a40d.firebaseapp.com",
    databaseURL: "https://productivity-app-4a40d.firebaseio.com",
    projectId: "productivity-app-4a40d",
    storageBucket: "",
    messagingSenderId: "136714087996",
  };
  firebase.initializeApp(this.config);

}

Firebase.prototype.addTask = function(taskData) {
  var key = firebase.database().ref('tasks').push(taskData).key;
  return key;
}

Firebase.prototype.editTask = function(taskId, taskData) {
  firebase.database().ref('tasks/' + taskId).set(taskData);
}

Firebase.prototype.removeTask = function(taskId) {
  firebase.database().ref('tasks/' + taskId).remove();
}

Firebase.prototype.getTasksFromDB = function() {
  var ref = firebase.database().ref(`tasks`);
  ref.on('value', function(snapshot) {
    console.log(snapshot.val());
  });
}

