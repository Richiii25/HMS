const arrayToCSV = (arr: string[]): string => {
    if (!arr || arr.length === 0) {
        return null;
    }
    return arr.join(", ");
}
export { arrayToCSV }; 