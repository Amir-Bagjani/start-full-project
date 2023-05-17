export type Override<T, O> = Omit<T, keyof O> & O;
