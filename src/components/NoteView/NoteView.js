import { useRef } from "react";
import classes from "./NoteView.module.css";

const NoteView = ({ body, onChangeNote }) => {
  const titleRef = useRef();
  const contentRef = useRef();

  // Ved skriving i note, lagre og oppdater App
  const inputChangeHandler = () => {
    const changedNote = [
      {
        id: body[0].id,
        title: titleRef.current.value,
        content: contentRef.current.value,
      },
    ];
    onChangeNote(changedNote);
  };

  // Vis note tekst dersom en note er valgt
  let view;
  if (body !== null) {
    view = (
      <>
        <input
          ref={titleRef}
          value={body[0].title}
          onChange={inputChangeHandler}
        ></input>
        <br />
        <textarea
          ref={contentRef}
          onChange={inputChangeHandler}
          value={body[0].content}
        ></textarea>
      </>
    );
  } else {
    view = <p>No note selected</p>;
  }
  return <div className={classes.root}>{view}</div>;
};
export default NoteView;
