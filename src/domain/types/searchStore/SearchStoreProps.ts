export interface SearchStoreProps {
    query: string,
    setQuery: (q: string) => void;
    clear: () => void;
}