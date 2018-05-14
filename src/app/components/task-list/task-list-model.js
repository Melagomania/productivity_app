export function TaskListModel(database) {
  this.remoteDB = database;
  
  this.remoteDB.getTasksFromDB();
  this.localDB = {};
}

TaskListModel.prototype.init = function() {
  this.remoteDB
}
