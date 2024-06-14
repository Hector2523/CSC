document.addEventListener("DOMContentLoaded", () => {
    document.body.innerHTML += `
    <section id="loading">
        <div class="progress"></div>
        <aside class="container">
            <aside class="logo">
                <img src="img/icon.webp" alt="Colegio Santa Catarina logo">
            </aside>
            <aside class="description">
                <img src="img/logo-colegio-juizdefora.webp" alt="colegio santa catarina juiz de fora">
            </aside>
        </aside>
    </section>
    `;

    timer(700, 900, 600);
});

function timer(totalTime, time2, time3) {
    var repeat = document.styleSheets[document.styleSheets.length - 3].cssRules[0];

    let percent = 0;
    let interval = totalTime / 100;

    console.log(repeat)

    let loadingInterval = setInterval(() => {
        if (percent < 100) {
            percent++;
            repeat.style.setProperty("--percentage", percent + 'vw');
        } else {
            clearInterval(loadingInterval);
        }
    }, interval);

    setTimeout(() => {
        document.querySelector("aside.description").classList.add("active");

        setTimeout(() => {
            document.querySelector("aside.description").classList.remove("active");
            setTimeout(() => {
                document.querySelector("aside.container").classList.add("active");
                setTimeout(() => {
                    document.getElementById("loading").classList.add("finish");
                    document.querySelector("div.load").classList.add("finish");
                    document.body.classList.add("scroll");
                    setTimeout(() => {
                        document.querySelector("div.load").style.opacity = '1';
                    }, 100);
                    setTimeout(() => {
                        document.getElementById("loading").remove();
                        document.styleSheets[1].disabled = false;
                    }, (time3 - 200));
                }, (time3 + 1000));
            }, time3);
        }, time2);
    }, totalTime - (time2 + time3 + 1000));
}
