export const isAlphanumericAndSpaces = (str: string): boolean => {
    const regex = /^[a-zA-Z0-9 ]*$/;
    return regex.test(str);
};

export const isISOString = (str: string): boolean => {
    const regex = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/;
    return regex.test(str);
}