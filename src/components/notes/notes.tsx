"use client";

import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useNoteStore } from "@/application/store/useNoteStore";
import * as Yup from "yup";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { SkeletonCard } from "../ui/card-skeleton";

import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogAction,
} from "@/components/ui/alert-dialog";

import { Trash2, Pencil } from "lucide-react";
import {
  createNoteForAsset,
  deleteNoteForAsset,
  fetchNotesByAsset,
  updateNoteForAsset
} from "@/application/services/notes-api";

const noteSchema = Yup.string()
  .required("Note cannot be empty")
  .max(200, "Maximum 200 characters allowed");

export function Notes({ assetId }: { assetId: string }) {
  const [description, setDescription] = useState("");
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const [openDialog, setOpenDialog] = useState(false);
  const [dialogContent, setDialogContent] = useState("");

  const queryClient = useQueryClient();
  const { selectedNoteId, setSelectedNote } = useNoteStore();

  const { data: notes, isLoading, isError } = useQuery({
    queryKey: ["notes", assetId],
    queryFn: () => fetchNotesByAsset(assetId),
    enabled: !!assetId,
  });

  const addMutation = useMutation({
    mutationFn: (desc: string) => createNoteForAsset({ assetId, description: desc }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notes", assetId] });
      setDescription("");
      setErrorMsg(null);
      toast.success("Note created successfully!");
    },
  });

  const deleteMutation = useMutation({
    mutationFn: deleteNoteForAsset,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notes", assetId] });
      setSelectedNote(null);
      toast.error("Note deleted!");
    },
  });

  async function handleUpdateNote() {
    try {
      await noteSchema.validate(dialogContent);
      updateMutation.mutate({
        id: selectedNoteId!,
        description: dialogContent,
      });
    } catch (err: any) {
      toast.error(err.message);
    }
  }

  const updateMutation = useMutation({
    mutationFn: ({ id, description }: { id: number; description: string }) =>
      updateNoteForAsset(id, description),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notes", assetId] });
      toast.success("Updated note!");
      setOpenDialog(false);
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

  function sizeText(text: string) {
    return text.length > 20 ? text.slice(0, 20) + "..." : text;
  }

  if (isError) return <p className="text-red-600">Couldn't load notes.</p>;

  return (
    <>
      <div className="p-4 mt-6 border rounded-xl bg-white shadow-sm space-y-4">
        <h3 className="text-lg font-semibold">Notes</h3>

        <div className="space-y-2">
          <Textarea
            value={description}
            placeholder="Write a note (max 200 chars)"
            className="resize-none min-h-20"
            onChange={(ev) => setDescription(ev.target.value)}
          />

          {errorMsg && <p className="text-red-500 text-sm">{errorMsg}</p>}

          <Button className="w-full" onClick={handleAddNote}>
            Save Note
          </Button>
        </div>

        <Separator />

        <div className="space-y-2">
          <h4 className="font-medium text-gray-700">Notes</h4>

          {isLoading && <SkeletonCard />}

          {!isLoading && notes?.length === 0 && (
            <p className="text-gray-500 text-sm">No notes yet</p>
          )}
          <ScrollArea className="h-[200px] rounded-md border p-2 bg-gray-50">
            <ul className="divide-y">
              {notes?.map((note) => (
                <li
                  key={note.id}
                  className={`flex items-center py-2 px-2 rounded hover:bg-gray-100 transition cursor-pointer ${
                    selectedNoteId === note.id ? "bg-blue-100" : ""
                  }`}
                >
                  <div className="flex items-center justify-between w-full gap-3">
                    <div
                      className="flex-1 text-gray-700 truncate"
                      onClick={() => {
                        setSelectedNote(note.id!);
                        setDialogContent(note.description);
                        setOpenDialog(true);
                      }}
                    >
                      {sizeText(note.description)}
                    </div>
                    <Pencil
                      size={18}
                      className="text-blue-600 hover:text-blue-800 transition cursor-pointer"
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedNote(note.id!);
                        setDialogContent(note.description);
                        setOpenDialog(true);
                      }}
                    />
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Trash2
                          size={18}
                          className="text-red-500 hover:text-red-700 transition cursor-pointer"
                          onClick={(e) => e.stopPropagation()}
                        />
                      </AlertDialogTrigger>

                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>Delete Note</AlertDialogTitle>
                          <AlertDialogDescription>
                            Are you sure you want to delete this note? This action cannot be undone.
                          </AlertDialogDescription>
                        </AlertDialogHeader>

                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                          <AlertDialogAction
                            className="bg-red-600 hover:bg-red-700"
                            onClick={() => deleteMutation.mutate(note.id!)}
                          >
                            Delete
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </div>
                </li>
              ))}
            </ul>
          </ScrollArea>
        </div>
      </div>
      <Dialog open={openDialog} onOpenChange={setOpenDialog}>
        <DialogContent className="max-h-[70vh] overflow-y-auto space-y-4">
          <DialogHeader>
            <DialogTitle>Edit Note</DialogTitle>
          </DialogHeader>
          <Textarea
            className="min-h-[120px]"
            value={dialogContent}
            onChange={(e) => setDialogContent(e.target.value)}
          />
          <Button className="w-full" onClick={handleUpdateNote}>
            Save Changes
          </Button>
        </DialogContent>
      </Dialog>
    </>
  );
}
