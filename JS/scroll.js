function toScroll(local, back) {
    switch (local) {
        case 0:
            document.getElementById('home').scrollIntoView();
            if (back != undefined) {
                back.style.scale = '1.2';
                setTimeout(() => {
                    back.style.scale = '1';
                }, 900)
            }
            break;
        default:
            console.warn('Posição inválida');
    }
}