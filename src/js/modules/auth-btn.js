let authBtn = document.getElementById('authBtn'),
  welcomeBlock = document.querySelector('.welcome-block'),
  flipBlock = document.querySelector('.flip-block');

authBtn.addEventListener('click', function(){
  welcomeBlock.classList.add('welcome-block__disable'),
  flipBlock.classList.add('flip-block__active');
});