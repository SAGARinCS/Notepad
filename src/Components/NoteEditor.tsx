import { useState } from "react";

interface NoteEditorProps {
  value: string;
  onChange: (val: string) => void;
  darkMode: boolean;
  fontFamily: string;
  fontSize: number;
}

export default function NoteEditor({ value, onChange, darkMode, fontFamily, fontSize }: NoteEditorProps) {
  const [cursor, setCursor] = useState({ line: 1, col: 1 });

  const handleCursor = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const textUpToCursor = e.target.value.substring(0, e.target.selectionStart);
    const lines = textUpToCursor.split("\n");
    const line = lines.length;
    const col = lines[lines.length - 1].length + 1;
    setCursor({ line, col });
    onChange(e.target.value);
  };

  const wordCount = value.trim() === "" ? 0 : value.trim().split(/\s+/).length;

  return (
    <div className="flex flex-col flex-1">
      <textarea
        className={`flex-1 w-full p-4 outline-none resize-none
          ${darkMode ? "bg-gray-800 text-white placeholder-gray-400" : "bg-white text-black placeholder-gray-500"}`}
        style={{ fontFamily, fontSize }}
        value={value}
        onChange={handleCursor}
        placeholder="Start typing your notes here..."
      />
      <div className={`p-2 text-sm border-t ${darkMode ? "bg-gray-900 text-gray-300" : "bg-gray-200 text-gray-600"}`}>
        Words: {wordCount} | Characters: {value.length} | Line: {cursor.line}, Col: {cursor.col}
      </div>
    </div>
  );
}
