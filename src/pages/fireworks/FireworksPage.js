import {fetchAll} from '../../fetcher/fetcher';
import {implementations} from '../../fetcher/implementations';
import {FireworkDisplay} from './fireworks.js';
import {elementBuilder} from '../../utils/dom';

export default class FireworksPage {

    constructor() {
        this.name = 'fireworks';
    }

    start(pageContainer, pageParams) {

        const canvas = elementBuilder('canvas', 'fireworks-canvas', {
            width: window.innerWidth,
            height: window.innerHeight
        }, pageContainer).build();
        const winners = elementBuilder('div', 'winners', null, pageContainer).build();
        const loosers = elementBuilder('div', 'loosers', null, pageContainer).build();

        fetchAll(implementations, pageParams.nb || 1).then(data => {
            console.log(data);
            data.sort((a, b) => a.time - b.time);
            const winners = data.filter(d => d.error === false);
            const winner = winners[0];
            const errors = data.filter(d => d.error !== false);
            FireworkDisplay.launchText(canvas, !!winner ? winner.winners.map(d => `${d.first_name}.${d.last_name}`).join(' ') : 'FAIL !!');
            setTimeout(() => this.details(pageContainer, winner, winners.filter((a, i) => i>0), errors), 5000);
        });

    }

    details(pageContainer, winner, loosers, errors) {
        const oneWinner = !!winner;
        const oneLooserAtLeast = loosers.length > 0;
        const oneErrorAtLeast = errors.length > 0;
        elementBuilder('div', 'fireworks-details', null, pageContainer)
            .appendChildIf(oneWinner, () => ['div', 'fireworks-details-title', {innerHTML: 'Winner'}])
            .appendChildIf(oneWinner, () => ['ul', 'fireworks-details-list', {innerHTML: `<li>${winner.config.language} <i>(${winner.time}msc)</i> : ${FireworksPage.getStringAttendees(winner)}</li>`}])
            .appendChildIf(oneLooserAtLeast, () => ['div', 'fireworks-details-title', {innerHTML: 'Looser'}])
            .appendChildIf(oneLooserAtLeast, () => ['ul', 'fireworks-details-list', {innerHTML: `${loosers.map(d => `<li>${d.config.language}  <i>(${d.time}msc)</i> : ${FireworksPage.getStringAttendees(d)}</li>`).join('')}`}])
            .appendChildIf(oneErrorAtLeast, () => ['div', 'fireworks-details-title', {innerHTML: 'Error'}])
            .appendChildIf(oneErrorAtLeast, () => ['ul', 'fireworks-details-list', {innerHTML: `${errors.map(d => `<li>${d.config.language} <i>(${d.time}msc)</i><span>${d.error.message}</span></li>`).join('')}`}])
            .build();
    }

    static getStringAttendees(implem) {
        return implem.winners.map(d => `${d.first_name}.${d.last_name}`).join(' ');
    }

}