let authBtn = document.getElementById('auth-btn'),
    welcomeBlock = document.querySelector('.welcome-block'),
    flipBlock = document.querySelector('.flip-block');

authBtn.addEventListener('click', function(){
    welcomeBlock.classList.toggle('welcome-block--active');
})