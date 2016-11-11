import {elementBuilder} from '../utils/dom';

export default class MainPage {

    constructor() {
        this.name = 'main';
    }

    start(pageContainer) {
        const linkTests = elementBuilder('div', 'mainPage-linkTests', {innerHTML: 'Run tests >', onclick: () => {
            document.querySelector('.mainPage-linkTests-token').style.display = 'inline-block';
        }}, pageContainer).build();

        const mainPage = elementBuilder('div', 'mainPage', null, pageContainer).build();

        elementBuilder('div', 'mainPage-linkTests-token', null, linkTests)
            .appendChild('input', 'mainPage-linkTests-token-input', {type: 'text', placeholder: 'token', value: localStorage.getItem('tokenTests')})
            .appendChild('button', 'mainPage-linkTests-token-btn', {innerHTML: '>', onclick: () => {
                const token = document.querySelector('.mainPage-linkTests-token-input').value;
                localStorage.setItem('tokenTests', token);
                window.location.href = `tests/tests.html?token=${token}`;
            }});
        [1, 2, 3, 4, 5].forEach(i => mainPage.appendChild(MainPage.buildFireworksLink(i)));
    }

    static buildFireworksLink(i) {
        return elementBuilder('a', 'mainPage-fireworksLink', {href: `#page=fireworks&nb=${i}`})
            .appendChild('img', 'mainPage-fireworksLink-img', {src: 'assets/fireworks-icon.png'})
            .appendChild('span', 'mainPage-fireworksLink-number', {innerHTML: i})
            .build();
    }

}