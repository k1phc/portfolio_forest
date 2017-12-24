(function () {
  var toggle = document.querySelector('.btn-toggle');
    
  toggle.addEventListener('click', function(e) {
    this.classList.toggle('opened');
  });
})();