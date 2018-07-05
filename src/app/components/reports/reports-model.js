export class ReportsModel {
  constructor(taskList) {
    this.taskList = taskList;
    this.dayTasks = [];
    this.weekTasks = [];
    this.monthTasks = [];
  }

  sortTasksByTime() {
    this.getDayTasks();
    this.getWeekTasks();
    this.getMonthTasks();
  }

  getDayTasks() {
    this.dayTasks = [];
    let doneTasks = this.taskList.doneTasks;
    let now = new Date();
    let taskDate;
    for(let i in doneTasks) {
      taskDate = new Date(doneTasks[i].finishTime);
      if(now.getDate() === taskDate.getDate() && taskDate.getMonth() === now.getMonth()) {
        this.dayTasks.push((doneTasks[i]));
      }
    }
    console.log('d', this.dayTasks);
  }

  getWeekTasks() {
    this.weekTasks = [];
    let doneTasks = this.taskList.doneTasks;
    let now = new Date();
    let taskDate;
    for(let i in doneTasks) {
      taskDate = new Date(doneTasks[i].finishTime);
      if(taskDate.getDate() >= now.getDate() - 7 && taskDate.getMonth() === now.getMonth()) {
        this.weekTasks.push((doneTasks[i]));
      }
    }
    console.log('w', this.weekTasks);
  }

  getMonthTasks() {
    this.monthTasks = [];
    let doneTasks = this.taskList.doneTasks;
    let now = new Date();
    let taskDate;
    for(let i in doneTasks) {
      taskDate = new Date(doneTasks[i].finishTime);
      if(taskDate.getMonth() === now.getMonth()) {
        this.monthTasks.push((doneTasks[i]));
      }
    }
    console.log('m', this.monthTasks);
  }
}
