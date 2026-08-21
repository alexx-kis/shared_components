export const toCamelCase = (str: string) => str.replace(/[-_]+([a-zA-Z0-9])/g, (_, char: string) => char.toUpperCase());
