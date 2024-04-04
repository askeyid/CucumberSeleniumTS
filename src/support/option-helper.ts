const optionsIncludeString = (string: string, options: readonly string[]): boolean => {
    return options.includes(string);
}

export const stringIsOfOptions = <T extends string>(stringLevel: string, options: readonly string[]) => {
    if (optionsIncludeString(stringLevel, options)) {
        return stringLevel as T;
    } 

    throw Error(`🧨 String ${stringLevel} needs to be one of ${options} 🧨`);
}
