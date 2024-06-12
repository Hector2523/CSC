function toScroll(local) {
    switch (local) {
        case 0:
            document.getElementById('home').scrollIntoView();
            break;
        default:
            console.warn('Posição inválida');
    }
}
