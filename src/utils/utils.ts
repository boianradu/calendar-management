export const isAlphanumericAndSpaces = (str: string): boolean => {
    const regex = /^[a-zA-Z0-9 ]*$/;
    return regex.test(str);
};
