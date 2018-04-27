function Header() {
  this.page = document.getElementsByClassName('page')[0];
  this.pageHeader = document.getElementsByClassName('header')[0];
}

Header.prototype.toggleState = function() {
  var _this = this;
  var scrolled = window.pageYOffset || document.documentElement.scrollTop;
  if(scrolled > 55) {
    _this.pageHeader.classList.add('header--sticky');    
    _this.page.classList.add('page--scrolled');  
  } else if (scrolled === 0) {
    _this.pageHeader.classList.remove('header--sticky');
    _this.page.classList.remove('page--scrolled');    
  }
};

Header.prototype.setScrollListener = function() {
  var _this = this;
  window.addEventListener('scroll', function() {
    _this.toggleState();
  });
}

module.exports.Header = Header;