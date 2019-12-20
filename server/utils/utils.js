export default {
    checkParams
};

function hasValue(obj, key) {
    return (obj.hasOwnProperty(key) && obj[key] !== 'undefined') ? true : false;
};

function checkParams(body, bodyArr) {
    for (let i = 0; i < bodyArr.length; i++) {
        if (!hasValue(body, bodyArr[i])) {
            return {
                success: false,
                value: bodyArr[i]
            };
        }
    }
    return {
        success: true
    };
}