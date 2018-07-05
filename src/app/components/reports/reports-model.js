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
  }

  getPomodorasAmount(taskList) {
    let pomodoras = {
      '4': {
        failed: 0,
        done: 0
      },
      '3': {
        failed: 0,
        done: 0
      },
      '2': {
        failed: 0,
        done: 0
      },
      '1': {
        failed: 0,
        done: 0
      }
    };

    taskList.forEach( task => {
      task.pomodoras.forEach( pomodora => {
        if(pomodora) {
          pomodoras[task.priority][pomodora]++;
        }
      });
    });

    console.log(taskList);
    console.log(pomodoras);
  }
}
