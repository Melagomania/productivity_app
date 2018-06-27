export function PageController(pageModel, pageView, router) {
  this.pageModel = pageModel;
  this.pageView = pageView;
  this.router = router;
  this.page = document.getElementsByClassName('page')[0];
}

PageController.prototype.setLinksListener = function () {
  let _this = this;
  _this.page.addEventListener('click', function(e) {
    if(e.target.classList.contains('router-link')) {
      e.preventDefault();
      let href = e.target.getAttribute('href');
      _this.router.navigate(href);
    }
  });
};

PageController.prototype.init = function () {
  this.setLinksListener();
};
