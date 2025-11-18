import { NoteAsset } from "@/domain/types/notes/NoteProps";
import { create } from "zustand";
import { persist } from "zustand/middleware";


export const useNoteStore = create<NoteAsset>()(
  persist(
    (set) => ({
      selectedNoteId: null,
      setSelectedNote: (id) => set({ selectedNoteId: id }),
    }),
    { name: "note-ui-store" }
  )
);
