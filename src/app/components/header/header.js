export class Header {
  constructor() {
    this.page = document.getElementsByClassName('page')[0];
    this.pageHeader = document.getElementsByClassName('header')[0];
    this.headerNavigation = document.getElementById('header_navigation');
  }

  toggleState () {
    let _this = this;
    let scrolled = window.pageYOffset || document.documentElement.scrollTop;
    if (scrolled > 55) {
      _this.pageHeader.classList.add('header--sticky');
      _this.page.classList.add('page--scrolled');
    } else if (scrolled === 0) {
      _this.pageHeader.classList.remove('header--sticky');
      _this.page.classList.remove('page--scrolled');
    }
  }

  setScrollListener () {
    let _this = this;
    window.addEventListener('scroll', function () {
      _this.toggleState();
    });
  }

  toggleCurrentLink (newCurrentPage) {
    let current = document.getElementsByClassName('header__menu-link--active');
    if (current.length) {
      current[0].classList.remove('header__menu-link--active');
    }
    if (newCurrentPage) {
      let newCurrentLink = document.getElementsByClassName('header__menu-link--' + newCurrentPage)[0];
      newCurrentLink.classList.add('header__menu-link--active');
    }
  }

  update (data) {
    if (data.currentStage !== 5 && data.currentStage !== 0) {
      this.hideNavigation();
    } else {
      this.showNavigation();
    }
  }

  hideNavigation () {
    this.headerNavigation.classList.add('header__menu--hidden');
  }

  showNavigation () {
    this.headerNavigation.classList.remove('header__menu--hidden');
  }
}
