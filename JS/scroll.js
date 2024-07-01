var home = document.getElementById('home');
var scrolling = false;
var programmaticScroll = false;

function toScroll(local, btn, button) {
    if (button.disabled) {
        console.warn('Aperte o botão com mais calma :)');
        return;
    }

    scrolling = true;
    programmaticScroll = true;

    switch (local) {
        case 0:
            home.scrollIntoView({ behavior: 'smooth' });
            button.disabled = true;

            if (btn === 'back') {
                button.style.transform = 'scale(1.2)';
                setTimeout(() => {
                    button.style.transform = 'scale(1)';
                }, 900);
            }
            break;
        default:
            console.warn('Posição inválida');
    }

    setTimeout(() => {
        button.disabled = false;
        scrolling = false;
    }, 1000);

    setTimeout(() => {
        programmaticScroll = false;
    }, 1000);
}

document.addEventListener('scroll', () => {
    if (scrolling && !programmaticScroll) {
        console.warn('Não é possível rolar a tela enquanto uma ação de rolagem já está em andamento :(');
    }
});
