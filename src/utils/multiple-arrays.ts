export const multiplyArray = <T>(items: T[], amount: number) => Array.from({ length: amount }, () => [...items]).flat();
