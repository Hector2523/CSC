// percentage

var h = document.documentElement,
        b = document.body,
        st = 'scrollTop',
        sh = 'scrollHeight';


document.addEventListener("scroll", () => {
    // closeMenu();

    var percent = (h[st] || b[st]) / ((h[sh] || b[sh]) - h.clientHeight) * 100;
    console.log(percent)
});