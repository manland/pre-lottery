export const shuffle = (a) => {
    for (let i = a.length; i; i--) {
        let j = Math.floor(Math.random() * i);
        [a[i - 1], a[j]] = [a[j], a[i - 1]];
    }
    return a;
};

/**
 * Transform 'page=fireworks&nb=2' to {page: 'fireworks', nb: '2'}
 * @param hash the hash from url
 */
export const parseHashParams = (hash) => {
    if(!hash) return {};
    const params = hash.split('&');
    return params.reduce((acc, param) => {
        const p = param.split('=');
        acc[p[0]] = p[1];
        return acc;
    }, {});
};

const cleanDict = {'é': 'e', 'ç': 'c', 'è': 'e', 'ö': 'o', 'ë': 'e'};

/**
 * from é to e or ça to ca
 * @param text
 * @returns {string|XML|void|*}
 */
export const cleanText = (text) => {
    return text.replace(/[^\w ]/g, function(char) {
        return cleanDict[char] || char;
    });
};