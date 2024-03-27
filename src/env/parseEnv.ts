export const env = (key: string): string => {
    const value = process.env[key]
    if (!value) {
        throw Error(`No environment variable found for ${key}`);
    }
    return value;
}

/**
 * #AF: returns JSON object from file
 * @param path path to file to read 
 * @returns JSON object
 */
export const getJsonFromFile = <T = Record<string, string>>(path: string): T => {
    return require(`${process.cwd()}${path}`);
}

export const envNumber = (key: string): number => {
    return Number(env(key));
}