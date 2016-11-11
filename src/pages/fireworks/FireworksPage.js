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

        fetchAll(implementations, pageParams.nb || 1).then(data => {
            const {winner, loosers, errors} = FireworksPage.group(data);
            FireworkDisplay.launchText(canvas, !!winner ? FireworksPage.getStringAttendees(winner, ' ') : 'FAIL !!');
            setTimeout(() => pageContainer.appendChild(FireworksPage.buildDetails(winner, loosers, errors)), 20000);
        });

    }

    static group(data) {
        data.sort((a, b) => a.time - b.time);
        const winners = data.filter(d => d.error === false);
        const winner = winners[0];
        const loosers = winners.filter((a, i) => i>0)
        const errors = data.filter(d => d.error !== false);
        return {winner, loosers, errors};
    }

    static buildDetails(winner, loosers, errors) {
        const oneWinner = !!winner;
        const oneLooserAtLeast = loosers.length > 0;
        const oneErrorAtLeast = errors.length > 0;
        return elementBuilder('div', 'fireworks-details')
            .appendChildIf(oneWinner, () => ['div', 'fireworks-details-title', {innerHTML: 'Winner'}])
            .appendChildIf(oneWinner, () => ['ul', 'fireworks-details-list', {innerHTML: `<li>${winner.config.language} <i>(${winner.time}msc)</i> : ${FireworksPage.getStringAttendees(winner, ' // ')}</li>`}])
            .appendChildIf(oneLooserAtLeast, () => ['div', 'fireworks-details-title', {innerHTML: 'Looser'}])
            .appendChildIf(oneLooserAtLeast, () => ['ul', 'fireworks-details-list', {innerHTML: `${loosers.map(d => `<li>${d.config.language}  <i>(${d.time}msc)</i> : ${FireworksPage.getStringAttendees(d, ' // ')}</li>`).join('')}`}])
            .appendChildIf(oneErrorAtLeast, () => ['div', 'fireworks-details-title', {innerHTML: 'Error'}])
            .appendChildIf(oneErrorAtLeast, () => ['ul', 'fireworks-details-list', {innerHTML: `${errors.map(d => `<li>${d.config.language} <i>(${d.time}msc)</i> : ${d.error.message}</li>`).join('')}`}])
            .build();
    }

    static getStringAttendees(implem, separator) {
        return implem.winners.map(d => `${d.first_name}.${d.last_name}`).join(separator);
    }

}