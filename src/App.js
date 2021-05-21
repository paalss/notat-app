import { useState } from "react";
import "./App.css";
import NotesContent from "./components/NotesContent/NoteContent";
import NotesList from "./components/NotesList/NotesList";

function App() {
  const [notes, setNotes] = useState([]);
  
  const fetchNotes = async() => {
    const response = await fetch(
      "https://react-http-f8322-default-rtdb.europe-west1.firebasedatabase.app/meals.json"
    );

    if (!response.ok) {
      throw new Error("Something went wrong!");
    }

    const data = await response.json();

    const loadedNotes = [];
    for (const key in data) {
      loadedNotes.push({
        id: key,
        name: data[key].name,
        price: data[key].price,
        description: data[key].description,
      });
    }

    setNotes(loadedNotes);
  };

  return (
    <div className="App">
      <NotesList />
      <NotesContent />
    </div>
  );
}

export default App;
