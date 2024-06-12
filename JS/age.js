var run = true;

function startAgeCounter() {
    if (run) {
        run = false;
        var age = document.getElementById('age');

        for (let n = 0; n <= 115; n++) {

            setTimeout(() => {
                update(n);
            }, 8 * n);
        }

        function update(n) {
            age.innerHTML = `${n}`;
        }

        function calcEase(n) {
            if (n <= 25) {
                return 100;
            } else if (n >= 90) {
                return 50;
            } else {
                return 100;
            }
        }
    }
}

document.addEventListener("scroll", () => {
    var description = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                startAgeCounter();
                description.unobserve(entry.target); // Stop observing after the function is triggered
            }
        });
    });

    var target = document.querySelector('#description');
    description.observe(target);
});