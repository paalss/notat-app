import { useRef } from "react";
import classes from "./NoteView.module.css";

const NoteView = (props) => {
  const titleRef = useRef();
  const contentRef = useRef();

  // Ved skriving i note, lagre og oppdater App
  const inputChangeHandler = (event) => {
    const changedNote = [
      {
        id: props.body[0].id,
        title: titleRef.current.value,
        content: contentRef.current.value,
      },
    ];
    props.onChangeNote(changedNote);
  };

  // Vis note tekst dersom en note er valgt
  let body;
  if (props.body !== null) {
    body = (
      <>
        <input
          ref={titleRef}
          value={props.body[0].title}
          onChange={inputChangeHandler}
        ></input>
        <br />
        <textarea
          ref={contentRef}
          onChange={inputChangeHandler}
          value={props.body[0].content}
        ></textarea>
      </>
    );
  } else {
    body = <p>No note selected</p>;
  }
  return <div className={classes.root}>{body}</div>;
};
export default NoteView;
