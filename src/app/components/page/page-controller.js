export class PageController {
  constructor(pageModel, pageView, router) {
    this.pageModel = pageModel;
    this.pageView = pageView;
    this.router = router;
    this.page = document.getElementsByClassName('page')[0];
  }

  setLinksListener() {
    let _this = this;
    _this.page.addEventListener('click', function (e) {
      if (e.target.classList.contains('router-link')) {
        e.preventDefault();
        let href = e.target.getAttribute('href');
        _this.router.navigate(href);
      }
    });
  };

  init() {
    this.setLinksListener();
  };
}
