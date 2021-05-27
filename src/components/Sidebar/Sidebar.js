import Button from "../UI/Button";
import AddNewNoteButton from "./AddNewNoteButton";
import classes from "./Sidebar.module.css";

const Sidebar = ({ onAddNote, onSelectNote, onDeleteNote, list }) => {
  const addNoteHandler = () => {
    onAddNote();
  };

  const selectNoteHandler = (id) => {
    onSelectNote(id);
  };

  const deleteNoteHandler = (id) => {
    onDeleteNote(id);
  };

  // Definer note listen
  const noteList = list.map((element) => {
    const title = element.title !== "" ? element.title : "untitled";
    return (
      <li key={element.id}>
        <div className="flex">
          <Button width="80%" onClick={() => selectNoteHandler(element.id)}>
            {title}
          </Button>
          <Button
            width="20%"
            color="red"
            onClick={() => deleteNoteHandler(element.id)}
          >
            Delete
          </Button>
        </div>
      </li>
    );
  });

  // Print ut sidebar innhold, inkludert note listen
  return (
    <div className={classes.root}>
      <AddNewNoteButton onAddNote={addNoteHandler} />
      <ul className={classes["notes-list"]}>{noteList}</ul>
    </div>
  );
};
export default Sidebar;
