export class ReportsController {
  constructor(model, view) {
    this.view = view;
    this.model = model;
  }

  openReports() {
    this.model.sortTasksByTime();
    this.model.getPomodorasAmount();
    this.view.renderReports(this.model.pomodorosSortedTasks);
  }
}
