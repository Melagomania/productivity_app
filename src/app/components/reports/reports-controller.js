export class ReportsController {
  constructor(model, view) {
    this.view = view;
    this.model = model;
  }

  openReports() {
    this.view.renderReports();
  }
}
