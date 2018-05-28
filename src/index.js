import 'babel-polyfill';
import 'whatwg-fetch';

let spinnerHtml;

const routes = {
    '': 'templates/main.html',
    'main': 'templates/main.html',
    'services': 'templates/main.html',
    'installation': 'templates/main.html',
    'debug': 'templates/main.html',
    'support': 'templates/main.html',
    'modernize': 'templates/main.html',
    'licenses': 'templates/licenses.html',
    'contacts': 'templates/main.html',
    'about': 'templates/main.html',
};

const mainContentDiv = document.querySelector('#mainContent');

const sleeper = ms => x => new Promise(resolve => setTimeout(() => resolve(x), ms));
const loadToMain = content => mainContentDiv.innerHTML = content;

const loadTemplate = (url = '') => loadSpinner()
    .then(sleeper(2000))
    .then(() => fetch(url))    
    .then(res => res.text())
    .then(html => loadToMain(html));

const loadSpinner = async () => {
    if (spinnerHtml) {        
        return loadToMain(spinnerHtml);
    }
    return fetch('templates/spinner.html')
        .then(res => res.text())
        .then(html => loadToMain(spinnerHtml = html));        
};

const loadByRoute =
    ({ location: { hash = '' } }) => loadTemplate(routes[hash.substr(2, (hash.length - 1))]);

// After init application, need to load main page
loadTemplate(routes['']);
window.addEventListener("hashchange", ({ target }) => loadByRoute(target), false);
