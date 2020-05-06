
//return true if string
export const isStrings = (...strs: string[]): boolean => {
    return (strs.filter(str => !str || typeof str !== 'string').length == 0);
};
//return true if object
export const isObject = (obj: Object, ...nullableProps: string[]) => {
    return obj && Object.keys(obj).every(key => {
        if (nullableProps.includes(key)) return true;
        return obj[key];
    });
};
// check if valid id, >0 and is number
export const ValidId = (id: number): boolean => {
    return !!(id && typeof id === 'number' && Number.isInteger(id) && id > 0);
};
//return true if object is empty -- no result
export function isEmptyObject<T>(obj: T) {
    return obj && Object.keys(obj).length === 0;
}

export const isValidObject = (obj: Object, ...nullableProps: string[]) => {
    return obj && Object.keys(obj).every(key => {
        if (nullableProps.includes(key)) return true;
        return obj[key];
    });
};


export default {
    ValidId,
    isStrings,
    isObject,
    isEmptyObject,
    isValidObject
}