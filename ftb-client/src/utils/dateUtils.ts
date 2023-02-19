export const asLocalDate = (modified: number): string =>
        new Date(modified).toLocaleString().replace(",", "");
