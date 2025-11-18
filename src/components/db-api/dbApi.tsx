"use client";

import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useNoteStore } from "@/application/store/useNoteStore";
import { createNoteForAsset, deleteNote, fetchNotesByAsset } from "@/application/services/db-api";
import * as Yup from "yup";

const noteSchema = Yup.string()
  .required("Note cannot be empty")
  .max(200, "Maximum 200 characters allowed");

export function DbApi({ assetId }: { assetId: string }) {
  const [description, setDescription] = useState("");
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const queryClient = useQueryClient();
  const { selectedNoteId, setSelectedNote } = useNoteStore();

  const { data: notes, isLoading, isError } = useQuery({
    queryKey: ["notes", assetId],
    queryFn: () => fetchNotesByAsset(assetId),
    enabled: !!assetId,
  });

  const addMutation = useMutation({
    mutationFn: (desc: string) =>
      createNoteForAsset({ assetId, description: desc }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notes", assetId] });
      setDescription("");
      setErrorMsg(null);
    },
  });

  const deleteMutation = useMutation({
    mutationFn: deleteNote,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notes", assetId] });
      setSelectedNote(null);
    },
  });

  async function handleAddNote() {
    try {
      await noteSchema.validate(description);
      addMutation.mutate(description);
    } catch (err: any) {
      setErrorMsg(err.message);
    }
  }

  if (isError) return <p className="text-red-600">Couldn't load notes.</p>;

  return (
    <div className="p-4 mt-6 border rounded-xl bg-white shadow-sm space-y-4">
      <h3 className="text-lg font-semibold">Notes</h3>

      <div className="space-y-2">
        <textarea
          value={description}
          placeholder="Write a note (max 200 chars)"
          className="border rounded-lg w-full p-2 min-h-[80px] resize-none"
          onChange={(ev) => setDescription(ev.target.value)}
        />

        {errorMsg && <p className="text-red-500 text-sm">{errorMsg}</p>}

        <button
          className="bg-blue-600 text-white px-4 py-2 rounded w-full"
          onClick={handleAddNote}
        >
          Save Note
        </button>
      </div>

      <div className="space-y-2">
        <h4 className="font-medium text-gray-700">Notes</h4>

        {isLoading && <p>Loading notes...</p>}

        {!isLoading && notes?.length === 0 && (
          <p className="text-gray-500 text-sm">No notes yet</p>
        )}

        <ul className="space-y-2">
          {notes?.map((note) => (
            <li
              key={note.id}
              className={`p-3 border rounded-lg bg-gray-50 flex justify-between items-center cursor-pointer ${
                selectedNoteId === note.id ? "bg-blue-100" : ""
              }`}
              onClick={() => setSelectedNote(note.id!)}
            >
              <span className="text-gray-700">{note.description}</span>

              <button
                className="bg-red-500 text-white px-2 py-1 rounded"
                onClick={(e) => {
                  e.stopPropagation();
                  deleteMutation.mutate(note.id!);
                }}
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
