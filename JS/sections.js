var run = true;
var age = document.getElementById('age');

function startAgeCounter() {
    setTimeout(() => {
        if (run) {
            run = false;
           
    
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
        observer.disconnect();
    }

    observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            var section = entry.target.id;

            if (section === "home") {
                if (entry.intersectionRatio > 0.5) {
                    document.getElementById(section).classList.remove('blur');
                    document.querySelector('header').classList.remove('background');
                    back.classList.remove('active');

                    clearTimeout(back.hideTimeout);
                    back.hideTimeout = setTimeout(() => {
                        if (entry.intersectionRatio > 0.5) {
                            back.style.display = 'none';
                        }
                    }, 550);

                } else {
                    clearTimeout(back.hideTimeout);
                    document.getElementById(section).classList.add('blur');
                    document.querySelector('header').classList.add('background');
                    back.style.display = 'flex';

                    setTimeout(() => {
                        back.classList.add('active');
                    }, 100);
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