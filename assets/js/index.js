'use strict';

const { log } = console;
const query = (sel) => document.querySelector(sel);
const event = (elt, evt, cb) => elt.addEventListener(evt, cb);
const contains = (array, string) => {
    const result = array.find(item => string.toLowerCase().indexOf(item.toLowerCase()) > -1);
    if (typeof result !== 'string')
        return "Unknown";
    return result
};
const getBrowser = () => {
    const browser = contains(["Edg", "Chrome", "Firefox", "Safari", "MSIE"], navigator.userAgent);
    return browser.replace("Edg", "Edge");
};
const getOS = () => {
    const os = contains(["Android", "iPhone", "iPad", "Windows", "Mac OS", "Linux"], navigator.userAgent);
    return os.replace("iPhone", "iOS").replace("iPad", "iOS");
};
function setCookie(name, value, maxAge = 30, options = { secure: false, SameSite: 'Lax' }) {
    return document.cookie = `${name}=${encodeURIComponent(value)}; max-age=${maxAge}; ${Object.keys(options).map(key => `${key}=${encodeURIComponent(options[key])}`).join('; ')}`;
}
function getCookie(name) {
    const cookie = document.cookie.match(new RegExp(`${name}=([^;]+)`));
    return cookie ? decodeURIComponent(cookie[1]) : '';
}
function show(board = null) {
    [cookieBoard.classList.remove('show'), settingBoard.classList.remove('show')];
    board !== null ? board.classList.add('show') : '';
}

const MAX_AGE = 15;
const cookieBoard = query('.cookie-board');
const settingBoard = query('.setting-board');
const accept = query('.accept');
const settings = query('.settings');
const save = query('.save');
const systemInfo = { browser: getBrowser(), os: getOS(), width: window.innerWidth, height: window.innerHeight };
const setCheckedCookie = (check, value) => check.checked ? setCookie(check.name, value, MAX_AGE) : setCookie(check.name, 'rejected', MAX_AGE);
const saveCookies = () => Object.keys(systemInfo).forEach(key => setCheckedCookie(query(`.${key}`), systemInfo[key]));
const logCookies = () => Object.keys(systemInfo).forEach(key => log(key, getCookie(key)));
const checkCookies = () => { saveCookies(); show(); logCookies() };
event(settings, 'click', () => show(settingBoard));
event(accept, 'click', () => checkCookies());
event(save, 'click', () => checkCookies());

const cookie = document.cookie;
if (cookie.length === 0)
    show(cookieBoard);
else
    logCookies();