export function getEmailValidationRegex() {
    return /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
}

export function getPhoneNumberValidationRegex() {
    return /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;
}

export function getArrayParams(search) {
    let result = {};
    Object.keys(search).forEach(function (key, index) {
        if (search[key]?.includes(',')) search[key] = search[key].split(',');
        else if (search[key] === 'null') search[key] = null;
    });

    result = search;
    return result;
}
