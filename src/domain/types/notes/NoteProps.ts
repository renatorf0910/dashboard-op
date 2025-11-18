export interface NoteAsset {
  selectedNoteId: number | null;
  setSelectedNote: (id: number | null) => void;
}

export interface Note {
  id?: number;
  assetId: string;
  description: string;
}