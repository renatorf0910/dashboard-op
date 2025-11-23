import { Note } from "@/domain/types/notes/NoteProps";
import { notesDB } from "../../../notesDb";

export async function fetchNotesByAsset(assetId: string): Promise<Note[]> {
  return notesDB.notes.where("assetId").equals(assetId).toArray();
}

export async function createNoteForAsset({ assetId, description }: { assetId: string; description: string; }) {
  return notesDB.notes.add({ assetId, description });
}

export async function updateNoteForAsset(id: number, description: string) {
  return notesDB.notes.update(id, { description });
}

export async function deleteNoteForAsset(id: number) {
  return notesDB.notes.delete(id);
}

