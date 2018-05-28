import 'babel-polyfill';
import 'whatwg-fetch';

let spinnerHtml;

const routes = {
    '': 'templates/main.html',
    'main': 'templates/main.html',
    'services': 'templates/main.html',
    'installation': 'templates/installation.html',
    'debug': 'templates/debug.html',
    'support': 'templates/support.html',
    'modernize': 'templates/modernize.html',
    'licenses': 'templates/licenses.html',

    'alert': 'templates/must-know/alert.html',
    'defense': 'templates/must-know/defense.html',
    'pavilion': 'templates/must-know/pavilion.html',
    'service': 'templates/must-know/service.html',

    'company': 'templates/must-know/company.html',
    'belarus': 'templates/must-know/belarus.html',
    'building': 'templates/must-know/building.html',
    'using': 'templates/must-know/using.html'
};

const mainContentDiv = document.querySelector('#mainContent');

const sleeper = ms => x => new Promise(resolve => setTimeout(() => resolve(x), ms));
const loadToMain = content => mainContentDiv.innerHTML = content;
const getRoute = () =>  {
    const { location: { hash = '' } } = window;
    return routes[hash.substr(2, (hash.length - 1))];
};


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
    ({ location: { hash = '' } }) => loadTemplate(getRoute());

// After init application, need to load main page
loadTemplate(getRoute());
window.addEventListener("hashchange", ({ target }) => loadByRoute(target), false);
