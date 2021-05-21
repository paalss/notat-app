import AddNewNoteButton from "./AddNewNoteButton";
import classes from "./NotesList.module.css";

const NotesList = () => {
  return <div className={classes.root}>
    <AddNewNoteButton/>
  </div>;
};
export default NotesList;
