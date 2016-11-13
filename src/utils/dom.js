export const elementBuilder = (type, css, params, parent) => {
    const el = document.createElement(type);
    if(Array.isArray(css)) {
        el.classList.add(...css);
    } else {
        el.classList.add(css);
    }
    if (params) {
        Object.keys(params).forEach(k => el[k] = params[k]);
    }
    if (parent) {
        parent.appendChild(el);
    }
    const builder = {
        appendChild: (type, css, params, parent) => {
            el.appendChild(elementBuilder(type, css, params, parent).build());
            return builder;
        },
        appendChildIf: (condition, callback) => {
            if(condition) {
                return builder.appendChild(...callback());
            } else {
                return builder
            }
        },
        build: _ => el
    };
    return builder;
};

export const buildFooter = () => {
    return elementBuilder('footer', 'mainPage-footer')
        .appendChild('span', 'mainPage-footer-span', {innerHTML: 'Made with &#10084; by '})
        .appendChild('a', 'mainPage-footer-link', {innerHTML: 'Jug Montpellier', href: 'https://www.jug-montpellier.org/'})
        .appendChild('span', 'mainPage-footer-span', {innerHTML: ' - Fork me on '})
        .appendChild('a', 'mainPage-footer-link', {innerHTML: 'Github', href: 'https://github.com/manland/pre-lottery'})
        .build();
};