export const fieldComparator = <T extends any>(field: keyof T): (a: T, b: T) => number => (a, b) =>
    a[field] === b[field] ? 0 : a[field] > b[field] ? 1 : -1;