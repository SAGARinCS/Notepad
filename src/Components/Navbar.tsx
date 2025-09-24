import { useState, useRef, useEffect } from "react";
import { loadRecentNotes, loadNoteByName, downloadNoteAsTXT } from "../utils/storage";
import { FileText, Edit3, Eye, Type, TextCursorInput } from "lucide-react"; 

interface NavbarProps {
  onNew: () => void;
  onSave: () => void;
  onSaveAs: () => void;
  onDelete: () => void;
  darkMode: boolean;
  toggleDarkMode: () => void;
  undo: () => void;
  redo: () => void;
  onLoadNote: (text: string) => void;
  note: string;
  fontFamily: string;
  setFontFamily: (f: string) => void;
  fontSize: number;
  setFontSize: (s: number) => void;
}

export default function Navbar({
  onNew,
  onSave,
  onSaveAs,
  onDelete,
  darkMode,
  toggleDarkMode,
  undo,
  redo,
  onLoadNote,
  note,
  fontFamily,
  setFontFamily,
  fontSize,
  setFontSize,
}: NavbarProps) {
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const [recentNotes, setRecentNotes] = useState<string[]>([]);
  const navRef = useRef<HTMLDivElement>(null);

  useEffect(() => setRecentNotes(loadRecentNotes()), [openMenu]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(event.target as Node)) {
        setOpenMenu(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const toggleMenu = (menu: string) => setOpenMenu(openMenu === menu ? null : menu);

  const handleCut = () => document.execCommand("cut");
  const handleCopy = () => document.execCommand("copy");
  const handlePaste = () => document.execCommand("paste");

  const fontOptions = [
  "Arial", "Helvetica", "Times New Roman", "Georgia", "Verdana", "Courier New", 
  "Lucida Console", "Tahoma", "Trebuchet MS", "Impact", "Comic Sans MS", "monospace", "serif", "sans-serif"
];

const sizeOptions = [10, 12, 14, 16, 18, 20, 22, 24, 28, 32, 36, 48, 72];


  return (
    <div ref={navRef} className="flex bg-gray-200 dark:bg-gray-800 border-b shadow-sm select-none">
    {/* File Menu */}
      <div
        className="relative flex items-center gap-1 px-4 py-2 cursor-pointer hover:bg-gray-300 dark:hover:bg-gray-700"
        onClick={() => toggleMenu("file")}
      >
        <FileText size={16} /> File
        {openMenu === "file" && (
          <div className="absolute left-0 mt-2 w-48 bg-white dark:bg-gray-700 border rounded shadow-md z-10">
            <div onClick={onNew} className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 cursor-pointer">New</div>
            <div onClick={onSave} className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 cursor-pointer">Save</div>
            <div onClick={onSaveAs} className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 cursor-pointer">Save As</div>
            <div
              onClick={() => downloadNoteAsTXT("MyNote", note)}
              className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 cursor-pointer"
            >
              Download as TXT
            </div>
            <div className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 cursor-pointer">Recent Notes
              {recentNotes.length > 0 && (
                <div className="ml-4 mt-1 border-l border-gray-300 dark:border-gray-600">
                  {recentNotes.map((name) => (
                    <div
                      key={name}
                      onClick={() => onLoadNote(loadNoteByName(name))}
                      className="px-4 py-1 hover:bg-gray-100 dark:hover:bg-gray-600 cursor-pointer"
                    >
                      {name}
                    </div>
                  ))}
                </div>
              )}
            </div>
            <div onClick={onDelete} className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 cursor-pointer">Delete</div>
          </div>
        )}
      </div>

      {/* Edit Menu */}
      <div
        className="relative flex items-center gap-1 px-4 py-2 cursor-pointer hover:bg-gray-300 dark:hover:bg-gray-700"
        onClick={() => toggleMenu("edit")}
      >
        <Edit3 size={16} /> Edit
        {openMenu === "edit" && (
          <div className="absolute left-0 mt-2 w-40 bg-white dark:bg-gray-700 border rounded shadow-md z-10">
            <div onClick={undo} className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 cursor-pointer">Undo</div>
            <div onClick={redo} className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 cursor-pointer">Redo</div>
            <div onClick={handleCut} className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 cursor-pointer">Cut</div>
            <div onClick={handleCopy} className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 cursor-pointer">Copy</div>
            <div onClick={handlePaste} className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 cursor-pointer">Paste</div>
          </div>
        )}
      </div>

      {/* View Menu */}
      <div
        className="relative flex items-center gap-1 px-4 py-2 cursor-pointer hover:bg-gray-300 dark:hover:bg-gray-700"
        onClick={() => toggleMenu("view")}
      >
        <Eye size={16} /> View
        {openMenu === "view" && (
          <div className="absolute left-0 mt-2 w-40 bg-white dark:bg-gray-700 border rounded shadow-md z-10">
            <div onClick={toggleDarkMode} className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 cursor-pointer">
              {darkMode ? "Light Mode" : "Dark Mode"}
            </div>
          </div>
        )}
      </div>
{/* Font Family Dropdown */}
<div
  className="relative flex items-center gap-1 px-4 py-2 cursor-pointer hover:bg-gray-300 dark:hover:bg-gray-700"
  onClick={() => toggleMenu("font")}
>
  <Type size={16} /> Font
  {openMenu === "font" && (
    <div className="absolute top-full left-0 w-40 bg-white dark:bg-gray-700 border rounded shadow-md z-10">
      {fontOptions.map((f) => (
        <div
          key={f}
          onClick={() => setFontFamily(f)}
          className={`px-4 py-1 hover:bg-gray-100 dark:hover:bg-gray-600 cursor-pointer ${
            fontFamily === f ? "font-bold" : ""
          }`}
        >
          {f}
        </div>
      ))}
    </div>
  )}
</div>


  {/* Font Size Dropdown */}
<div
  className="relative flex items-center gap-1 px-4 py-2 cursor-pointer hover:bg-gray-300 dark:hover:bg-gray-700"
  onClick={() => toggleMenu("size")}
>
  <TextCursorInput size={16} /> Size
  {openMenu === "size" && (
    <div className="absolute top-full left-0 w-28 bg-white dark:bg-gray-700 border rounded shadow-md z-10">
      {sizeOptions.map((s) => (
        <div
          key={s}
          onClick={() => setFontSize(s)}
          className={`px-4 py-1 hover:bg-gray-100 dark:hover:bg-gray-600 cursor-pointer ${
            fontSize === s ? "font-bold" : ""
          }`}
        >
          {s}px
        </div>
      ))}
    </div>
  )}
</div>

    </div>
  );
}
