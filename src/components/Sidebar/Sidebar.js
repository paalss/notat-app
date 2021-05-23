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

  const notesList = props.list.map((element) => {
    const title = element.title !== "" ? element.title : "untitled";
    return (
      <li key={element.id}>
        <div className="flex">
          <Button className="w80" onClick={() => selectNoteHandler(element.id)}>
            {title}
          </Button>
          <Button className="w20" onClick={() => deleteNoteHandler(element.id)}>
            Delete
          </Button>
        </div>
      </li>
    );
  });

  return (
    <div className={classes.root}>
      <AddNewNoteButton onAddNote={addNoteHandler} />
      <ul className={classes["notes-list"]}>{notesList}</ul>
    </div>
  );
};
export default Sidebar;
