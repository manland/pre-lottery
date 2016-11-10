/**
 * Fetcher nb winners and time to get them
 * @param config: [language: string, url: string]
 * @param nb: int nb winners
 * @returns {Promise.<{winners: Array<{name}>, time: number}>}
 */
const fetchOne = (config, nb) => {
    const now = Date.now();
    let time;
    return fetch(`${config.url}/winners?nb=${nb}`).then((data) => {
        time = Date.now() - now;
        return data.json();
    }).then((res) => {
        return {winners: res, time: time, config: config, error: false};
    }, (error) => {
        time = Date.now() - now;
        return {winners: [], time: time, config: config, error: error};
    });
};

/**
 * Fetcher nb winners and time to get them
 * @param nb: int nb winners
 * @returns {Promise.<Array<{winners: Array<{name}>, time: number}>>}
 */
export const fetchAll = (implementations, nb) => {
    return Promise.all(implementations.map((implementation) => {
        return fetchOne(implementation, nb);
    }));
};
