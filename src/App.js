import { useCallback, useEffect, useState } from "react";
import "./App.css";
import NoteView from "./components/NoteView/NoteView";
import Sidebar from "./components/Sidebar/Sidebar";

function App() {
  const [notes, setNotes] = useState([]);
  const [selectedNote, setSelectedNote] = useState(null);
  // console.log("notes: ", notes);

  const fetchHttp = async (noteId) => {
    const slashNoteId = noteId ? "/" + noteId : "";
    const response = await fetch(
      `https://react-http-f8322-default-rtdb.europe-west1.firebasedatabase.app/notes${slashNoteId}.json`
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
      });
    }

    setNotes(loadedNotes);
  }, []);

  useEffect(() => {
    fetchNotes();
  }, [fetchNotes]);

  const selectNoteHandler = async (selectedNoteId) => {
    const data = await fetchHttp(selectedNoteId);
    // console.log("data: ", await data);
    const loadedNote = [];
    const key = selectedNoteId;
    loadedNote.push({
      id: key,
      title: data.title,
      content: data.content,
    });

    setSelectedNote(loadedNote);
  };

  const deleteNoteHandler = async (noteId) => {
    const data = await fetch(
      `https://react-http-f8322-default-rtdb.europe-west1.firebasedatabase.app/notes/${noteId}.json`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    console.log("data: ", data);
    setNotes((prevNotes) => {
      return prevNotes.filter((x) => x.id !== noteId);
    });
  };

  const addNoteHandler = async () => {
    const data = await fetch(
      "https://react-http-f8322-default-rtdb.europe-west1.firebasedatabase.app/notes.json",
      {
        method: "POST",
        body: JSON.stringify({
          title: "",
          content: "",
        }),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const responseObj = await data.json();
    const id = responseObj.name;

    setNotes((prevNotes) => {
      return [...prevNotes, { id: id, title: "", content: "" }];
    });
  };

  const changeNoteHandler = (value) => {
    setSelectedNote(value);
    setNotes((prevState) => {
      return (prevState = prevState.map(
        (obj) => value.find((o) => o.id === obj.id) || obj
      ));
    });
  };

  return (
    <div className="App">
      <Sidebar
        onAddNote={addNoteHandler}
        onSelectNote={selectNoteHandler}
        onDeleteNote={deleteNoteHandler}
        list={notes}
      />
      <NoteView body={selectedNote} onChangeNote={changeNoteHandler} />
    </div>
  );
}

export default App;
