import { useCallback, useEffect, useState } from "react";
import "./App.css";
import NotesContent from "./components/NotesContent/NoteContent";
import Sidebar from "./components/Sidebar/Sidebar";

function App() {
  const [notes, setNotes] = useState([]);
  // console.log('notes: ', notes)
  
  const fetchNotes = useCallback(async() => {
    const response = await fetch(
      "https://react-http-f8322-default-rtdb.europe-west1.firebasedatabase.app/notes.json"
    );

    if (!response.ok) {
      throw new Error("Something went wrong!");
    }

    const data = await response.json();

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

  useEffect(()=>{
    fetchNotes()
  }, [fetchNotes])

  return (
    <div className="App">
      <Sidebar list={notes} />
      <NotesContent />
    </div>
  );
}

export default App;
