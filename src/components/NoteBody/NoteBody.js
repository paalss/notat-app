import { useRef } from "react";
import classes from "./NoteBody.module.css";

const NoteBody = (props) => {
  // console.log("NoteBody RUNNING");
  const titleRef = useRef();
  const contentRef = useRef();

  const inputChangeHandler = (event) => {
    const changedNote = [
      {
        id: props.body[0].id,
        title: titleRef.current.value,
        content: contentRef.current.value,
      },
    ];
    save()
    props.onChangeNote(changedNote);
  };

  const save = () => {
    fetch(
      `https://react-http-f8322-default-rtdb.europe-west1.firebasedatabase.app/notes/${props.body[0].id}.json`,
      {
        method: "PUT",
        body: JSON.stringify({
          title: titleRef.current.value,
          content: contentRef.current.value,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  };

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
        {/* <button onClick={save}>Save</button> */}
      </>
    );
  } else {
    body = <p>No note selected</p>;
  }
  return <div className={classes.root}>{body}</div>;
};
export default NoteBody;
