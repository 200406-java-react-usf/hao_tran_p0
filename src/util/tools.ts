export const ValidId = (id: number): boolean => {
    return !!(id && typeof id === 'number' && Number.isInteger(id) && id > 0);
};
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
//return true if id property of a module
export const isProperty = (prop: string, type: any) => {
    if (!prop || !type) {
        return false;
    }
    let typeCreator = <T>(Type: (new () => T)): T => {
        return new Type();
    }
    let tempInstance;
    try {
        tempInstance = typeCreator(type);
    } catch {
        return false;
    }
    return Object.keys(tempInstance).includes(prop);
}
//return true if object is empty -- no result
export function isEmptyObject<T>(obj: T) {
    return obj && Object.keys(obj).length === 0;
}




export default {
    ValidId,
    isStrings,
    isObject,
    isProperty,
    isEmptyObject
}