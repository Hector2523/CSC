var run = true;

function startAgeCounter() {
    setTimeout(() => {
        if (run) {
            run = false;
            var age = document.getElementById('age');
    
            for (let n = 0; n <= 115; n++) {
    
                setTimeout(() => {
                    update(n);
                }, 6 * n);
            }
    
            function update(n) {
                age.innerHTML = `${n}`;
            }
    
        }
    }, 300)
}

var sections = ['home', 'description'];
var observer;

function initializeObserver() {
    if (observer) {
        observer.disconnect(); // Desconecta o observador existente, se houver
    }

    observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            var section = entry.target.id;

            if (section === "home") {
                if (entry.intersectionRatio > 0.5) {
                    document.getElementById(section).classList.remove('blur');
                    document.querySelector('header').classList.remove('background');
                } else {
                    document.getElementById(section).classList.add('blur');
                    document.querySelector('header').classList.add('background');
                }
            } else if (entry.isIntersecting && section === "description") {
                startAgeCounter();
                sections.splice(sections.indexOf('description'), 1);
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: [0, 0.5, 1] });

    sections.forEach(sectionId => {
        var sectionElement = document.querySelector(`section#${sectionId}`);
        if (sectionElement) {
            observer.observe(sectionElement);
        }
    });
}


document.addEventListener("scroll", initializeObserver);
window.addEventListener("resize", initializeObserver);