export class ReportsModel {
  constructor(taskList) {
    this.taskList = taskList;
    this.timeSortedTasks = {};

    this.pomodorosSortedTasks = {
      dayTasks: {
        '4': 0,
        '3': 0,
        '2': 0,
        '1': 0,
        failed: 0
      },
      weekTasks: {
        '4': 0,
        '3': 0,
        '2': 0,
        '1': 0,
        failed: 0
      },
      monthTasks: {
        '4': 0,
        '3': 0,
        '2': 0,
        '1': 0,
        failed: 0
      }
    };
  }

  sortTasksByTime() {
    this.getDayTasks();
    this.getWeekTasks();
    this.getMonthTasks();
  }

  getDayTasks() {
    this.timeSortedTasks.dayTasks = [];
    let doneTasks = this.taskList.doneTasks;
    let now = new Date();
    let taskDate;
    for (let i in doneTasks) {
      taskDate = new Date(doneTasks[i].finishTime);
      if (now.getDate() === taskDate.getDate() && taskDate.getMonth() === now.getMonth()) {
        doneTasks[i].finishDate = taskDate.getDate();
        doneTasks[i].finishDay = taskDate.getDay();
        this.timeSortedTasks.dayTasks.push((doneTasks[i]));
      }
    }
  }

  getWeekTasks() {
    this.timeSortedTasks.weekTasks = [];
    let doneTasks = this.taskList.doneTasks;
    let now = new Date();
    let taskDate;
    for (let i in doneTasks) {
      taskDate = new Date(doneTasks[i].finishTime);
      if (taskDate.getDate() >= now.getDate() - 7 && taskDate.getMonth() === now.getMonth()) {
        doneTasks[i].finishDate = taskDate.getDate();
        doneTasks[i].finishDay = taskDate.getDay();
        this.timeSortedTasks.weekTasks.push((doneTasks[i]));
      }
    }
  }

  getMonthTasks() {
    this.timeSortedTasks.monthTasks = [];
    let doneTasks = this.taskList.doneTasks;
    let now = new Date();
    let taskDate;
    for (let i in doneTasks) {
      taskDate = new Date(doneTasks[i].finishTime);
      if (taskDate.getMonth() === now.getMonth()) {
        doneTasks[i].finishDate = taskDate.getDate();
        doneTasks[i].finishDay = taskDate.getDay();
        this.timeSortedTasks.monthTasks.push((doneTasks[i]));
      }
    }
  }

  getPomodorasAmount() {
    for(let key in this.timeSortedTasks) {
      this.timeSortedTasks[key].forEach(task => {
        task.pomodoras.forEach(pomodoro => {
          if (pomodoro === 'done') {
            this.pomodorosSortedTasks[key][task.priority]++;
          } else if (pomodoro === 'failed') {
            this.pomodorosSortedTasks[key].failed++;;
          }
        });
      });
    }

  }
}
