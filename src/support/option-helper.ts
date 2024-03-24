const optionsIncludeString = (string: string, options: readonly string[]): boolean => {
    return options.includes(string);
}

export const stringIsOfOptions = (stringLevel: string, options: readonly string[]): string => {
    if (optionsIncludeString(stringLevel, options)) {
        return stringLevel;
    } 

    throw Error(`String ${stringLevel} needs to be one of ${options}`);
}
