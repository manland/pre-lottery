import {fetchAll} from './fetcher';
import {implementations} from './implementations';
import {shuffle} from './utils';

fetchAll(shuffle(implementations), 1).then((data) => {
    console.log(data);
});