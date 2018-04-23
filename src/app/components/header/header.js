// require('./header.less'); // example of including component's styles
var pageHeader = document.getElementsByClassName('header')[0];
var page = document.getElementsByClassName('page')[0];
var headerAddBtn = document.getElementsByClassName('header__menu-link--add')[0];
console.log(headerAddBtn);
window.addEventListener('scroll', function() {
  var scrolled = window.pageYOffset || document.documentElement.scrollTop;
  if(scrolled > 50) {
    pageHeader.classList.add('header--sticky');
    page.classList.add('page--scrolled');
    headerAddBtn.classList.remove('hidden');
  } else if(scrolled === 0) {
    pageHeader.classList.remove('header--sticky');
    page.classList.remove('page--scrolled');  
    headerAddBtn.classList.add('hidden');      
  }
})