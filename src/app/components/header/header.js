export function Header() {
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

Header.prototype.toggleCurrentLink = function(newCurrentPage) {
  var current = document.getElementsByClassName('header__menu-link--active');
  if(current.length) {
    current[0].classList.remove('header__menu-link--active');
  }
  if(newCurrentPage) {
    var newCurrentLink = document.getElementsByClassName('header__menu-link--' + newCurrentPage)[0];
    newCurrentLink.classList.add('header__menu-link--active');
  }
}

// module.exports.Header = Header;