import { Note } from "@/domain/types/notes/NoteProps";
import Dexie, { Table } from "dexie";

export class NotesDB extends Dexie {
  notes!: Table<Note>;

  constructor() {
    super("notes_db");
    this.version(1).stores({
      notes: "++id, assetId", 
    });
  }
}

export const notesDB = new NotesDB();
