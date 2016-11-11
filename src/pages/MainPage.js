import {elementBuilder} from '../utils/dom';

export default class MainPage {

    constructor() {
        this.name = 'main';
    }

    start(pageContainer) {
        const mainPage = elementBuilder('div', 'mainPage', null, pageContainer).build();
        [1, 2, 3, 4, 5].forEach(i => mainPage.appendChild(MainPage.buildFireworksLink(i)));
    }

    static buildFireworksLink(i) {
        return elementBuilder('a', 'fireworksLink', {href: `#page=fireworks&nb=${i}`})
            .appendChild('img', 'fireworksLink-img', {src: 'assets/fireworks-icon.png'})
            .appendChild('span', 'fireworksLink-number', {innerHTML: i})
            .build();
    }

}