export default class MainPage {

    constructor() {
        this.name = 'main';
    }

    start() {
        document.getElementById('page').innerHTML = '<a href="#fireworks">Fireworks</a>';
    }

}