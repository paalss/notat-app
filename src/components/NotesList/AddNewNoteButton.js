import classes from "./AddNewNoteButton.module.css";

const AddNewNoteButton = () => {
  const addNew = () => {
    fetch(
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
  };
  return (
    <button className={classes.button} onClick={addNew}>
      + Add new note
    </button>
  );
};
export default AddNewNoteButton;
