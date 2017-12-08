export const storageAvailable = (type = 'localStorage') => {
    try {
        var storage = window[type],
            x = '__storage_test__';
        storage.setItem(x, x);
        storage.removeItem(x);
        return true;
    } catch (e) {
        return e instanceof DOMException && (
            // everything except Firefox
            e.code === 22 ||
                // Firefox
                e.code === 1014 ||
                // test name field too, because code might not be present
                // everything except Firefox
                e.name === 'QuotaExceededError' ||
                // Firefox
                e.name === 'NS_ERROR_DOM_QUOTA_REACHED') &&
            // acknowledge QuotaExceededError only if there's something already stored
            storage.length !== 0;
    }
};

export const getStorage = key => {
    if (storageAvailable) {
        const val = localStorage.getItem(key);
        return (val && JSON.parse(val)) || undefined;
    } else {
        return undefined;
    }
};

export const removeStorage = key => storageAvailable() ?
    localStorage.removeItem(key) : undefined;

export const putStorage = (key, value) => storageAvailable() ?
    localStorage.setItem(key, JSON.stringify(value)) : undefined;

export const createIniData = data => {
    const script = document.createElement('script');
    script.setAttribute('id', 'iniData');
    script.innerHTML = `window.BOOTSTRAP_CLIENT_STATE = ${data}`;
    document.head.appendChild(script);
};
