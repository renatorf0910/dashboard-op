import { SearchStoreProps } from '@/domain/types/searchStore/SearchStoreProps';
import { create } from 'zustand';


export const useSearchStore = create<SearchStoreProps>((set) => ({
    query: "",
    setQuery: (q: string) => set(() => ({ query: q})),
    clear: () => set(() => ({ query: "" })) 
}));

