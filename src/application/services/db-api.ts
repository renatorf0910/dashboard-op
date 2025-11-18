import { Note } from "@/domain/types/notes/NoteProps";
import { notesDB } from "../../../db";

export async function fetchNotesByAsset(assetId: string): Promise<Note[]> {
  return notesDB.notes.where("assetId").equals(assetId).toArray();
}

export async function createNoteForAsset({ assetId, description }: { assetId: string; description: string; }) {
  return notesDB.notes.add({ assetId, description });
}

export async function deleteNote(id: number) {
  return notesDB.notes.delete(id);
}
