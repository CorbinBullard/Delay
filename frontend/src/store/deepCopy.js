 export function deepCopy(obj) {
    const target = Array.isArray(obj) ? [] : {};
    for (let key in obj) {
        let value = obj[key];
        if (value && typeof value === 'object') {
            target[key] = deepCopy(value);
        } else {
            target[key] = value;
        }
    }
    return target;
}
