export default class MainPage {

    constructor() {
        this.name = 'main';
    }

    start(pageContainer) {
        const mainPage = document.createElement('div');
        mainPage.classList.add('mainPage');
        pageContainer.appendChild(mainPage);

        [1, 2, 3, 4, 5].forEach(i => mainPage.appendChild(this.buildFireworksLink(i)));
    }

    buildFireworksLink(i) {
        const link = document.createElement('a');
        link.href = `#page=fireworks&nb=${i}`;
        link.classList.add('fireworksLink');
        const img = document.createElement('img');
        img.src = 'assets/fireworks-icon.png';
        img.classList.add('fireworksLink-img');
        link.appendChild(img);
        const number = document.createElement('span');
        number.innerHTML = i;
        number.classList.add('fireworksLink-number');
        link.appendChild(number);
        return link;
    }

}