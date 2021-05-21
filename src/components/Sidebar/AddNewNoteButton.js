import Button from "../UI/Button";

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
    <Button onClick={addNew}>
      + Add new note
    </Button>
  );
};
export default AddNewNoteButton;
