import {fetchAll} from './fetcher';
import {implementations} from './implementations';
import {shuffle} from './utils';
import {buildStarships} from './starship';

document.addEventListener('DOMContentLoaded', () => {
    const canvas = document.querySelector('#canvas');
    const starshipsCtrl = buildStarships(implementations, canvas);
    starshipsCtrl.clearAndDraw();

    setTimeout(() => starshipsCtrl.move(), 1000);
    setTimeout(() => starshipsCtrl.move(), 2000);
    setTimeout(() => starshipsCtrl.move(), 3000);
    setTimeout(() => starshipsCtrl.move(), 4000);

    window.addEventListener('resize', () => starshipsCtrl.clearAndDraw());

    fetchAll(shuffle(implementations), 1).then((data) => {
        console.log(data);
    });

});