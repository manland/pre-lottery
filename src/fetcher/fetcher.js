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
 * @param implementations: the lottery implementations
 * @param nb: int nb winners
 * @returns {Promise.<Array<{winners: Array<{name}>, time: number}>>}
 */
export const fetchAll = (implementations, nb) => {
    return Promise.all(implementations.map((implementation) => {
        return fetchOne(implementation, nb);
    })).then(data => group(data));
};

const group = (data) => {
    data.sort((a, b) => a.time - b.time);
    return data.reduce((acc, implementation) => {
        if(implementation.error === false && checkWinner(implementation) && acc.winner === undefined) {
            acc.winner = implementation;
        } else if(implementation.error === false && checkWinner(implementation)) {
            acc.loosers.push(implementation);
        } else {
            console.log(implementation);
            if(!implementation.error) {
                acc.errors.push(Object.assign(implementation, {error: {message: 'Result bad formatted!'}}));
            } else {
                acc.errors.push(implementation);
            }
        }
        return acc;
    }, {winner: undefined, loosers: [], errors: []});
};

const checkWinner = (implementation) => {
    return implementation.winners && implementation.winners.length > 0 && implementation.winners[0].last_name && implementation.winners[0].first_name;
};
