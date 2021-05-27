import Button from "../UI/Button";
import AddNewNoteButton from "./AddNewNoteButton";
import classes from "./Sidebar.module.css";

const Sidebar = (props) => {
  const addNoteHandler = () => {
    props.onAddNote();
  };

  const selectNoteHandler = (id) => {
    props.onSelectNote(id);
  };

  const deleteNoteHandler = (id) => {
    props.onDeleteNote(id);
  };

  // Definer note listen
  const noteList = props.list.map((element) => {
    const title = element.title !== "" ? element.title : "untitled";
    return (
      <li key={element.id}>
        <div className="flex">
          <Button width="80%" onClick={() => selectNoteHandler(element.id)}>
            {title}
          </Button>
          <Button width="20%" color="red" onClick={() => deleteNoteHandler(element.id)}>
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
