let menu = document.getElementById('menu');
let button = document.getElementById('menuBtn');
var time = false;

button.addEventListener('click', () => {
    if (time == false) {
        time = true;
        menu.classList.toggle('open');
        button.classList.toggle('open');
        setTimeout(() => {
            time = false
        }, 1000)
    } else {
        console.warn('Aperte o botão com mais calma :)');
    }

})

// document.addEventListener("scroll", () => {
//     menu.classList.remove('open');
//     button.classList.remove('open');
// })