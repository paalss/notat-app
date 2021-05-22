import Button from "../UI/Button";

const AddNewNoteButton = (props) => {
  const addNew = () => {
    props.onAddNote();
  };

  return <Button onClick={addNew}>+ Add new note</Button>;
};
export default AddNewNoteButton;
