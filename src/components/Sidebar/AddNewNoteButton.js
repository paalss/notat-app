import Button from "../UI/Button";

const AddNewNoteButton = (props) => {
  const addNew = () => {
    props.onAddNote();
  };

  return <Button className="w100" onClick={addNew}>+ Add new note</Button>;
};
export default AddNewNoteButton;
