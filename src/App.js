import { useCallback, useEffect, useState } from "react";
import "./App.css";
import NoteBody from "./components/NoteBody/NoteBody";
import Sidebar from "./components/Sidebar/Sidebar";

function App() {
  const [notes, setNotes] = useState([]);
  const [selectedNote, setSelectedNote] = useState(null);

  const fetchHttp = async () => {
    const response = await fetch(
      "https://react-http-f8322-default-rtdb.europe-west1.firebasedatabase.app/notes.json"
    );
    if (!response.ok) {
      throw new Error("Something went wrong!");
    }
    return await response.json();
  };

  const fetchNotes = useCallback(async () => {
    const data = await fetchHttp();

    const loadedNotes = [];
    for (const key in data) {
      loadedNotes.push({
        id: key,
        title: data[key].title,
        content: data[key].content,
      });
    }

    setNotes(loadedNotes);
  }, []);

  useEffect(() => {
    fetchNotes();
  }, [fetchNotes]);

  const selectNoteHandler = async (selectedNoteId) => {
    const data = await fetchHttp();

    const loadedNote = [];
    for (const key in await data) {
      if (selectedNoteId === key) {
        loadedNote.push({
          id: key,
          title: data[key].title,
          content: data[key].content,
        });
      }
    }

    setSelectedNote(loadedNote);
  };

  const changeNoteHandler=(value)=>{
    setSelectedNote(value)
  }
  
  return (
    <div className="App">
      <Sidebar onSelectNote={selectNoteHandler} list={notes} />
      <NoteBody body={selectedNote} onChangeNote={changeNoteHandler} />
    </div>
  );
}

export default App;
