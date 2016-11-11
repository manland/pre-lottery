import MainPage from './pages/MainPage';
import FireworksPage from './pages/fireworks/FireworksPage';
import {parseHashParams} from './fetcher/utils';

const mainPage = new MainPage();
const fireworksPage = new FireworksPage();

const pagePerName = {
    [mainPage.name]: mainPage,
    [fireworksPage.name]: fireworksPage
};

const managePages = () => {
    const pageContainer = document.getElementById('page');
    pageContainer.innerHTML = '';
    const pageParams = parseHashParams(window.location.hash.substr(1));
    if (pagePerName[pageParams.page]) {
        pagePerName[pageParams.page].start(pageContainer, pageParams);
    } else {
        mainPage.start(pageContainer);
    }
};

window.addEventListener('DOMContentLoaded', () => {
    window.addEventListener('hashchange', managePages, false);
    managePages();
}, false);