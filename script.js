let currentPage = 1;
const totalPages = 4;

function nextPage() {
    document.getElementById(`page${currentPage}`).classList.remove('active');
    currentPage++;
    if(currentPage > totalPages) currentPage = totalPages;
    document.getElementById(`page${currentPage}`).classList.add('active');

    if(currentPage === 1) startHearts();
    if(currentPage === 4) startConfetti();
}

/* Heart effect */
function startHearts() {
    const heartsContainer = document.querySelector('.hearts');
    setInterval(() => {
        const heart = document.createElement('div');
        heart.classList.add('heart');
        heart.style.left = Math.random() * window.innerWidth + 'px';
        heart.style.animationDuration = (2 + Math.random() * 3) + 's';
        heartsContainer.appendChild(heart);
        setTimeout(() => heart.remove(), 3000);
    }, 300);
}
startHearts();

/* Countdown for page 2 */
const birthday = new Date('February 2, 2026 00:00:00').getTime();
function updateCountdown() {
    const now = new Date().getTime();
    const distance = birthday - now;
    const days = Math.floor(distance / (1000*60*60*24));
    const hours = Math.floor((distance % (1000*60*60*24))/(1000*60*60));
    const minutes = Math.floor((distance % (1000*60*60))/(1000*60));
    const seconds = Math.floor((distance % (1000*60))/1000);
    const countdownEl = document.getElementById('countdown');
    if(countdownEl) {
        countdownEl.innerHTML = distance > 0 ? 
            `Time until your birthday: ${days}d ${hours}h ${minutes}m ${seconds}s` :
            "🎉 Happy Birthday! 🎉";
    }
}
setInterval(updateCountdown, 1000);
updateCountdown();

/* Confetti for page4 */
function startConfetti() {
    const confettiContainer = document.getElementById('confetti');
    if(!confettiContainer) return;
    const colors = ['#ff4d6d','#ffd700','#00ffcc','#ff66b3','#66ff66'];
    for(let i=0;i<150;i++){
        const confetti = document.createElement('div');
        confetti.classList.add('confetti-piece');
        confetti.style.backgroundColor = colors[Math.floor(Math.random()*colors.length)];
        confetti.style.left = Math.random()*window.innerWidth+'px';
        confetti.style.top = Math.random()*window.innerHeight+'px';
        confettiContainer.appendChild(confetti);
        animateConfetti(confetti);
    }
}
function animateConfetti(confetti){
    let x = parseInt(confetti.style.left);
    let y = parseInt(confetti.style.top);
    const speed = Math.random()*3+2;
    const angle = Math.random()*2*Math.PI;
    function fall(){
        x += Math.sin(angle)*speed;
        y += Math.cos(angle)*speed;
        confetti.style.left = x+'px';
        confetti.style.top = y+'px';
        if(y<window.innerHeight) requestAnimationFrame(fall);
    }
    fall();
}
