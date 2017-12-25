(function () {
  var toggle = document.querySelector('.btn-toggle');
  
  toggle.addEventListener('click', function(e) {
    this.classList.toggle('opened');
  });
})();


let menuOpen = document.getElementById('menuOpen'),
  menuList = document.querySelector('.hamb-menu__list'),
  body = document.querySelector('body');

menuOpen.addEventListener('click', function(){
  menuList.classList.toggle('hamb-menu__list_active');
  body.classList.toggle('fixed-block');
});





