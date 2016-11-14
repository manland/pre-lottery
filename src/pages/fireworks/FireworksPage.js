import {fetchAll} from '../../fetcher/fetcher';
import {implementations} from '../../fetcher/implementations';
import {FireworkDisplay} from './fireworks.js';
import {elementBuilder} from '../../utils/dom';
import {shuffle, cleanText} from '../../utils/utils';

const LEVELS = {
    debug: 'debug',
    info: 'info',
    warning: 'warning',
    error: 'error'
};

const initSentences = [
    {level: LEVELS.info, type: 'Jug', sentence: `JUG data center init state for ${implementations.length} implementations`},
    {level: LEVELS.info, type: 'Jug', sentence: `Dokku initalize ${implementations.length * 10} containers`},
    {level: LEVELS.debug, type: 'Jug', sentence: `Zookeeper started`},
    {level: LEVELS.debug, type: 'Jug', sentence: `Kafka started and linked to Zookeeper`},
    {level: LEVELS.info, type: 'Jug', sentence: `${implementations.length * 1000} channels created`},
    {level: LEVELS.warning, type: 'Jug', sentence: `Scala implementation require 1500 containers, Kubernetes launch them`},
    {level: LEVELS.warning, type: 'Jug', sentence: `Kubernetes detect 90% memory used by NodeJs implementation`},
    {level: LEVELS.info, type: 'Jug', sentence: `Kubernetes start replication on AWS}`}
];

const trollSentences = [
    {level: LEVELS.info, type: 'Scala', sentence: `compilation start at 15°C and finish at 45°C`},
    {level: LEVELS.error, type: 'Scala', sentence: `func ><> missing => try :-| or -_-'`},
    {level: LEVELS.debug, type: 'Scala', sentence: `proverb : don't read old code, rewrite it`},
    {level: LEVELS.info, type: 'Scala', sentence: `definition : language witch allow developer to do oriented object but it's not allowed by community`},
    {level: LEVELS.info, type: 'Scala', sentence: `high language, old VM...`},

    {level: LEVELS.info, type: 'NodeJs', sentence: `long long time ago someone enter > npm install`},
    {level: LEVELS.error, type: 'NodeJs', sentence: `undefined is not a function`},
    {level: LEVELS.debug, type: 'NodeJs', sentence: `threads are for noobs`},
    {level: LEVELS.warning, type: 'NodeJs', sentence: `if you use npm you are so 10 October 2016`},
    {level: LEVELS.info, type: 'NodeJs', sentence: `fun fact : delete a library in npm registry and 30% of npm libraries can't be builds`},
    {level: LEVELS.info, type: 'NodeJs', sentence: `fun fact : the best UI library for terminal (Blessed) is written in JavaScript`},

    {level: LEVELS.error, type: 'Go', sentence: `hello-world linux-vdso.so.1 (0x00007fff5f109000) libc.so.6 not found`},
    {level: LEVELS.warning, type: 'Go', sentence: `man go get : 'Get code go from master of git repository'`},
    {level: LEVELS.info, type: 'Go', sentence: `pointer trick : if you manage memory yourself you will add lot of bugs`},
    {level: LEVELS.info, type: 'Go', sentence: `Concurrency is not parallelism! Ok, but if i want to do parallelism ? Use NodeJs bro!`},
    {level: LEVELS.debug, type: 'Go', sentence: `if you have 10 programs written in Go, you have 10 times same libs installed`}
];

const finishSentences = [
    {level: LEVELS.info, type: 'Jug', sentence: `All http call finished`},
    {level: LEVELS.info, type: 'Jug', sentence: `Winners in 3`},
    {level: LEVELS.info, type: 'Jug', sentence: `Winners in 2`},
    {level: LEVELS.info, type: 'Jug', sentence: `Winners in 1`}
];

const sentences = initSentences.concat(shuffle(trollSentences)).concat(finishSentences);

export default class FireworksPage {

    constructor() {
        this.name = 'fireworks';
    }

    start(pageContainer, pageParams) {

        const canvas = elementBuilder('canvas', 'fireworks-canvas', {
            width: window.innerWidth,
            height: window.innerHeight
        }, pageContainer).build();

        // ONLY USED IN DEV MODE (e.g. localhost)
        const fakeImplemCall = () => new Promise((resolve) => {
            setTimeout(() => {
                resolve({winner: {config: {language: 'Fake'}, winners: [{last_name: 'Maneschi', first_name: 'Romain'}], time: 12, error: false}, loosers: [], errors: []})
            }, 5000);
        });

        const realImplemCall = () => fetchAll(implementations, pageParams.nb || 1);

        const loaderManager = FireworksPage.launchLoader(window.location.hostname === 'localhost' ? fakeImplemCall() : realImplemCall());
        pageContainer.appendChild(loaderManager.loader);
        loaderManager.promise.then(({winner, loosers, errors}) => {
            FireworkDisplay.launchText(canvas, !!winner ? FireworksPage.getStringAttendees(winner, ' ') : 'FAIL !!');
            setTimeout(() => pageContainer.appendChild(FireworksPage.buildDetails(winner, loosers, errors)), 20000);
        });

    }

    static launchLoader(promiseFetch) {
        const localSentences = [].concat(sentences);
        const loader = elementBuilder('div', 'fireworks-loader').build();
        const sentencesContainer = elementBuilder('ul', 'fireworks-loader-sentences', null, loader).build();

        let fetchIsFinish = false;
        let fetchData;

        const promise = new Promise((resolve) => {
            let displayedMsg = 1;
            const displayOne = () => {
                displayedMsg++;
                sentencesContainer.appendChild(FireworksPage.buildLoaderSentence(localSentences.shift()));
                setTimeout(() => {
                    if (!fetchIsFinish || displayedMsg < sentences.length + 1) {
                        displayOne();
                    } else {
                        loader.classList.add('hidden');
                        resolve(fetchData);
                    }
                }, 1000);
            };
            displayOne();
        });

        promiseFetch.then((data) => {
            fetchIsFinish = true;
            fetchData = data;
        });

        return {loader, promise};
    }

    static buildLoaderSentence(sentence) {
        const date = new Date();
        const formatDate = `${date.getFullYear()}/${date.getMonth()}/${date.getDate()} - ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()} - ${date.getMilliseconds()}`;
        const format = `[${formatDate}] [${sentence.level}] [${sentence.type}] ${sentence.sentence}`;
        return elementBuilder('li', ['fireworks-loader-sentence', sentence.type, sentence.level], {innerHTML: format}).build();
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

        return implem.winners.map(d => `${cleanText(d.first_name)}.${cleanText(d.last_name)}`).join(separator);
    }

}