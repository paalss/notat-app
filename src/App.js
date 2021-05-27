import { useCallback, useEffect, useState } from "react";
import "./App.css";
import NoteView from "./components/NoteView/NoteView";
import Sidebar from "./components/Sidebar/Sidebar";

function App() {
  const [noteList, setNoteList] = useState([]);
  const [selectedNote, setSelectedNote] = useState(null);

  // Hent alle notes, eller én note hvis noteId parameter er gitt
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

  // Hent note-data for å vise note-listen i sidebar
  const fetchNotes = useCallback(async () => {
    const data = await fetchHttp();

    const loadedNotes = [];
    for (const key in data) {
      loadedNotes.push({
        id: key,
        title: data[key].title,
      });
    }

    setNoteList(loadedNotes);
  }, []);

  useEffect(() => {
    fetchNotes();
  }, [fetchNotes]);

  // Hent note-data for å vise note i note view
  const fetchSelectedNote = async (selectedNoteId) => {
    const data = await fetchHttp(selectedNoteId);

    const loadedNote = [];
    const key = selectedNoteId;
    loadedNote.push({
      id: key,
      title: data.title,
      content: data.content,
    });

    setSelectedNote(loadedNote);
  };

  // Slett note fra firebase og oppdater GUI
  const deleteNoteHandler = async (noteId) => {
    fetch(
      `https://react-http-f8322-default-rtdb.europe-west1.firebasedatabase.app/notes/${noteId}.json`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    setNoteList((prevNotes) => {
      return prevNotes.filter((x) => x.id !== noteId);
    });
  };

  // Legg til note i firebase og oppdater GUI
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

    setNoteList((prevNotes) => {
      return [...prevNotes, { id: id, title: "", content: "" }];
    });
  };

  // Lagre note i firebase, gjør input mutable og oppdater note-list GUI
  const changeNoteHandler = (value) => {
    save(value);
    setSelectedNote(value);
    setNoteList((prevState) => {
      return (prevState = prevState.map(
        (obj) => value.find((o) => o.id === obj.id) || obj
      ));
    });
  };

  const save = (value) => {
    fetch(
      `https://react-http-f8322-default-rtdb.europe-west1.firebasedatabase.app/notes/${value[0].id}.json`,
      {
        method: "PUT",
        body: JSON.stringify({
          title: value[0].title,
          content: value[0].content,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  };

  return (
    <div className="App">
      <Sidebar
        onAddNote={addNoteHandler}
        onSelectNote={fetchSelectedNote}
        onDeleteNote={deleteNoteHandler}
        list={noteList}
      />
      <NoteView body={selectedNote} onChangeNote={changeNoteHandler} />
    </div>
  );
}

export default App;
