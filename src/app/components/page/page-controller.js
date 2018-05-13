export function PageController(pageModel, pageView, router) {
  this.router = router;
  this.page = document.getElementsByClassName('page')[0];
}

PageController.prototype.setLinksListener = function () {
  var _this = this;
  _this.page.addEventListener('click', function(e) {
    if(e.target.classList.contains('router-link')) {
      e.preventDefault();
      var href = e.target.getAttribute('href');
      _this.router.navigate(href);
    }
  });
}