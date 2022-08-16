const refs = {
    start: document.querySelector('[data-start]'),
    stop: document.querySelector('[data-stop]'),
    body: document.body,
};

refs.stop.disabled = true;

let intervalId = 0;

refs.start.addEventListener('click', e => {
    e.target.disabled = true;

    refs.stop.disabled = false;

    colorSwitcher(refs.body);

    intervalId = setInterval(() => {
        colorSwitcher(refs.body);
    }, 1000);
});

refs.stop.addEventListener('click', e => {
    clearInterval(intervalId);

    e.target.disabled = true;
    refs.start.disabled = false;
});

function getRandomHexColor() {
    return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

function colorSwitcher(domElement) {
    domElement.style.backgroundColor = getRandomHexColor();
}