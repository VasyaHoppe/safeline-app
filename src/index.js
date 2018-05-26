import 'babel-polyfill';
import 'whatwg-fetch';

const routes = {
    '': 'templates/main.html',
    'main': 'templates/main.html',
    'services': 'templates/main.html',
    'licenses': 'templates/licenses.html',
    'contacts': 'templates/main.html',
    'about': 'templates/main.html'
};

const params = { 
    method: 'GET',
    headers: new Headers(),
    mode: 'cors',
    cache: 'default'
};

const loadByRoute = ({ location: { hash = '' } }) => {
    const route = hash.substr(2, (hash.length - 1));
    return fetch(routes[route])
        .then(res => res.text())
        .then(html => {
            console.log(html);
        });
}

window.addEventListener("hashchange", ({ target }) => loadByRoute(target), false);