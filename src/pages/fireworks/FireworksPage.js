import {fetchAll} from '../../fetcher/fetcher';
import {implementations} from '../../fetcher/implementations';
import {FireworkDisplay} from './fireworks.js';

export default class FireworksPage {

    constructor() {
        this.name = 'fireworks';
    }

    start() {

        const page = document.getElementById('page');

        const canvas = document.createElement('canvas');
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        canvas.style.position = 'absolute';
        canvas.style.left = 0;
        canvas.style.top = 0;
        page.appendChild(canvas);

        const winners = document.createElement('div');
        winners.classList.add('winners');
        page.appendChild(winners);

        const implems = document.createElement('div');
        implems.classList.add('implems');
        page.appendChild(implems);

        const loosers = document.createElement('div');
        loosers.classList.add('loosers');
        page.appendChild(loosers);

        fetchAll(implementations, 2).then(data => {
            console.log(data);
            data.sort((a, b) => a.time - b.time);
            const implementationsWinners = data.filter(d => d.error === false);
            const implementationsError = data.filter(d => d.error !== false);
            FireworkDisplay.launchText(canvas, implementationsWinners[0].winners.map(d => `${d.first_name}.${d.last_name}`).join(' '));
            setTimeout(() => winners.innerHTML = implementationsWinners[0].winners.map(d => `${d.first_name} ${d.last_name}`).join(' & '), 20000);
            loosers.innerHTML = this.formatRes(implementationsWinners, implementationsError);
        });

    }

    formatRes(winners, errors) {
        return `
            <div class="winners-title">Winners</div><ul class="winners-list"><li>${winners[0].config.language} <i>(${winners[0].time}msc)</i></li></ul>
            <div class="loosers-title">Loosers</div><ul class="loosers-list">${winners.filter((d, i) => i > 0).map(d => `<li>${d.config.language}  <i>(${d.time}msc)</i></li>`).join('')}</ul>
            <div class="errors-title">Errors</div><ul class="errors-list">${errors.filter(d => d.error !== false).map(d => `<li>${d.config.language} <i>(${d.time}msc)</i><span>${d.error.message}</span></li>`).join('')}</ul>`;
    }

}