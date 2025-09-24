import Navbar from "./Components/Navbar";
import NoteEditor from "./Components/NoteEditor";
import { useLocalNotes } from "./hooks/useLocalNotes";
import { saveNoteAs} from "./utils/storage";
import { useState } from "react";

export default function App() {
  const { note, setNote, undo, redo, handleSave, handleDelete } = useLocalNotes();
  const [darkMode, setDarkMode] = useState(false);
  const [fontFamily, setFontFamily] = useState("monospace");
  const [fontSize, setFontSize] = useState(16);

  const handleNew = () => { if (confirm("Start a new note? Unsaved changes will be lost.")) setNote(""); };
  const handleSaveAs = () => {
    const name = prompt("Enter a name for this note:");
    if (name) {
      saveNoteAs(name, note);
      alert(`Saved as "${name}" `);
    }
  };
  const handleLoadNote = (text: string) => setNote(text);

  return (
    <div className={darkMode ? "dark" : ""}>
      <div className="h-screen w-screen flex flex-col bg-gray-100 dark:bg-gray-900 dark:text-white">
        <Navbar
          onNew={handleNew}
          onSave={handleSave}
          onSaveAs={handleSaveAs}
          onDelete={handleDelete}
          darkMode={darkMode}
          toggleDarkMode={() => setDarkMode(!darkMode)}
          undo={undo}
          redo={redo}
          onLoadNote={handleLoadNote}
          note={note}
          fontFamily={fontFamily}
          setFontFamily={setFontFamily}
          fontSize={fontSize}
          setFontSize={setFontSize}
        />
        <NoteEditor value={note} onChange={setNote} darkMode={darkMode} fontFamily={fontFamily} fontSize={fontSize} />
      </div>
    </div>
  );
}
