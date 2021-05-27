import Button from "../UI/Button";

// '+ Add new note'-knappen
const AddNewNoteButton = (props) => {
  const addNew = () => {
    props.onAddNote();
  };

  return <Button color="green" onClick={addNew}>+ Add new note</Button>;
};
export default AddNewNoteButton;
