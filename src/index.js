import MainPage from './pages/MainPage';
import FireworksPage from './pages/fireworks/FireworksPage';
import {parseHashParams} from './utils/utils';
import {buildFooter} from './utils/dom';

const mainPage = new MainPage();
const fireworksPage = new FireworksPage();

const pagePerName = {
    [mainPage.name]: mainPage,
    [fireworksPage.name]: fireworksPage
};

const managePages = () => {
    document.body.innerHTML = '';
    const pageParams = parseHashParams(window.location.hash.substr(1));
    if (pagePerName[pageParams.page]) {
        pagePerName[pageParams.page].start(document.body, pageParams);
    } else {
        mainPage.start(document.body);
    }
    document.body.appendChild(buildFooter());
};

window.addEventListener('DOMContentLoaded', () => {
    window.addEventListener('hashchange', managePages, false);
    managePages();
}, false);