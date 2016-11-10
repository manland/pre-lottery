import MainPage from './pages/MainPage';
import FireworksPage from './pages/fireworks/FireworksPage';

const mainPage = new MainPage();
const fireworksPage = new FireworksPage();

const pagePerName = {
    [mainPage.name]: mainPage,
    [fireworksPage.name]: fireworksPage
};

const managePages = () => {
    const page = window.location.hash.substr(1);
    if (pagePerName[page]) {
        pagePerName[page].start();
    } else {
        mainPage.start();
    }
};

window.addEventListener('DOMContentLoaded', () => {
    window.addEventListener('hashchange', managePages, false);
    managePages();
}, false);