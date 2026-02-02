import { useEffect, useState } from "react";

function NotesApp() {
  const [note, setNote] = useState("");
  const [notes, setNotes] = useState([]);

  // 🔹 Load notes from localStorage on first render
  useEffect(() => {
    const savedNotes = JSON.parse(localStorage.getItem("notes"));
    if (savedNotes) {
      setNotes(savedNotes);
    }
  }, []);

  // 🔹 Save notes to localStorage whenever notes change
  useEffect(() => {
    localStorage.setItem("notes", JSON.stringify(notes));
  }, [notes]);

  // 🔹 Add note
  const addNote = () => {
    if (note.trim() === "") return;
    setNotes([...notes, note]);
    setNote("");
  };

  // 🔹 Delete note
  const deleteNote = (index) => {
    const updatedNotes = notes.filter((_, i) => i !== index);
    setNotes(updatedNotes);
  };

  return (
    <div style={{ maxWidth: "400px", margin: "50px auto" }}>
      <h2>Notes App</h2>

      <input
        type="text"
        placeholder="Write a note..."
        value={note}
        onChange={(e) => setNote(e.target.value)}
        style={{ width: "100%", padding: "10px" }}
      />

      <button
        onClick={addNote}
        style={{
          marginTop: "10px",
          padding: "10px",
          width: "100%",
        }}
      >
        Save Note
      </button>

      <ul style={{ marginTop: "20px", paddingLeft: 0 }}>
        {notes.map((n, index) => (
          <li
            key={index}
            style={{
              listStyle: "none",
              marginBottom: "10px",
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            {n}
            <button onClick={() => deleteNote(index)}>❌</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default NotesApp;
