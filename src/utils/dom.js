export const elementBuilder = (type, css, params, parent) => {
    const el = document.createElement(type);
    el.classList.add(css);
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