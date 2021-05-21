import Button from "../UI/Button";
import AddNewNoteButton from "./AddNewNoteButton";
import classes from "./Sidebar.module.css";

const Sidebar = (props) => {
  const selectNoteHandler = (id) => {
    props.onSelectNote(id);
  };

  const notesList = props.list.map((element) => {
    const title = element.title !== "" ? element.title : "untitled";
    return (
      <li key={element.id}>
        <Button onClick={() => selectNoteHandler(element.id)}>{title}</Button>
      </li>
    );
  });
  
  return (
    <div className={classes.root}>
      <AddNewNoteButton />
      <ul className={classes["notes-list"]}>{notesList}</ul>
    </div>
  );
};
export default Sidebar;
