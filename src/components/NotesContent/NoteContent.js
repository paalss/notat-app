import classes from "./NoteContent.module.css";

const NotesContent = (props) => {
  let body
  if (props.body !== null) {
    console.log(props.body[0]);
    body = (
      <>
        <h2>{props.body[0].title}</h2>
        <p>{props.body[0].content}</p>
      </>
    );
  } else {
    body = <p>No note selected</p>
  }
  return <div className={classes.root}>{body}</div>;
};
export default NotesContent;
