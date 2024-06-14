function toScroll(local, btn, button) {
    if (button.disabled) {
        console.warn('Aperte o botão com mais calma :)')
        return;
    }

    console.log(btn)

    switch (local) {
        case 0:
            document.getElementById('home').scrollIntoView();
            button.disabled = true;

            switch (btn) {
                case 'back':
                    button.style.scale = '1.2';
                setTimeout(() => {
                    button.style.scale = '1';
                }, 900)
            }
            
            break;
        default:
            console.warn('Posição inválida');
    }

    setTimeout(() => {
        button.disabled = false;
    }, 1000);
}
