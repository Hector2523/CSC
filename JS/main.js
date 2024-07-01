// if (localStorage.getItem("cacheComplete") === "true") {
//     timer(700, 900, 600);
// }

timer(700, 900, 600);

function timer(totalTime, time2, time3) {
    const loadStyleSheet = document.getElementById("loadCSS").sheet;

    if (loadStyleSheet) {
        if (loadStyleSheet.cssRules && loadStyleSheet.cssRules.length > 0) {
            let foundRule = false;
            for (let i = 0; i < loadStyleSheet.cssRules.length; i++) {
                let rule = loadStyleSheet.cssRules[i];
                if (rule.style) {
                    foundRule = true;
                    let percent = 0;
                    let interval = totalTime / 100;

                    let loadingInterval = setInterval(() => {
                        if (percent < 100) {
                            percent++;
                            rule.style.setProperty("--percentage", percent + 'vw');
                        } else {
                            clearInterval(loadingInterval);
                        }
                    }, interval);
                    break;
                }
            }
            if (!foundRule) {
                console.error('A folha de estilo load.css não contém regras CSS com objetos style.');
            }
        } else {
            console.error('A folha de estilo load.css não contém regras CSS.');
        }
    } else {
        console.error('Nenhuma folha de estilo load.css encontrada.');
    }

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
                        if (document.styleSheets.length > 1) {
                            document.styleSheets[1].disabled = false;
                        }
                    }, (time3 - 200));
                }, (time3 + 1000));
            }, time3);
        }, time2);
    }, totalTime - (time2 + time3 + 1000));
}
