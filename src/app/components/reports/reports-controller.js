export class ReportsController {
  constructor(model, view) {
    this.view = view;
    this.model = model;
  }

  openReports() {
    this.model.sortTasksByTime();

    this.model.getPomodorasAmount(this.model.dayTasks);
    this.model.getPomodorasAmount(this.model.weekTasks);
    this.model.getPomodorasAmount(this.model.monthTasks);

    this.view.renderReports();
  }
}
