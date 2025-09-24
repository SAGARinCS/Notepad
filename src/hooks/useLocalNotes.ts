import { useEffect, useState, useRef } from "react";
import { loadNote, saveNote, deleteNote } from "../utils/storage";

export function useLocalNotes() {
  const [note, setNote] = useState(""); // <-- remove dummy text
  const undoStack = useRef<string[]>([]);
  const redoStack = useRef<string[]>([]);

  useEffect(() => {
    const saved = loadNote(); // load from localStorage
    setNote(saved);
    undoStack.current = [saved]; // initialize undo stack with saved note
  }, []);

  // Auto-save every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => saveNote(note), 5000);
    return () => clearInterval(interval);
  }, [note]);

  const updateNote = (text: string) => {
    undoStack.current.push(note);
    redoStack.current = [];
    setNote(text);
  };

  const undo = () => {
    if (undoStack.current.length > 0) {
      const prev = undoStack.current.pop()!;
      redoStack.current.push(note);
      setNote(prev);
    }
  };

  const redo = () => {
    if (redoStack.current.length > 0) {
      const next = redoStack.current.pop()!;
      undoStack.current.push(note);
      setNote(next);
    }
  };

  const handleSave = () => saveNote(note);
  const handleDelete = () => {
    deleteNote();
    setNote("");
  };

  return { note, setNote: updateNote, undo, redo, handleSave, handleDelete };
}
