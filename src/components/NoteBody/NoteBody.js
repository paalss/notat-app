import { useRef, useState } from "react";
import classes from "./NoteBody.module.css";

const NoteBody = (props) => {
  console.log("NoteBody RUNNING");
  const titleRef = useRef();
  const contentRef = useRef();
  // const title = props.body !== null ? props.body[0].title : "null";
  // console.log(title);
  const inputChangeHandler = (event) => {
    const changedNote = [
      { title: titleRef.current.value, content: contentRef.current.value },
    ];
    console.log(titleRef.current.value);
    console.log(contentRef.current.value);
    props.onChangeNote(changedNote);
  };

  // const save = () => {
  //   fetch(
  //     "https://react-http-f8322-default-rtdb.europe-west1.firebasedatabase.app/notes.json",
  //     {
  //       method: "POST",
  //       body: JSON.stringify({
  //         title: contentRef.current.value,
  //         content: "eeeeee!",
  //       }),
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //     }
  //   );
  //   console.log(titleRef.current.value);
  // };

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
        ></textarea>{" "}
        <br />
        {/* <button onClick={save}>Lagre!</button> */}
      </>
    );
  } else {
    body = <p>No note selected</p>;
  }
  return <div className={classes.root}>{body}</div>;
};
export default NoteBody;
