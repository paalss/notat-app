import classes from "./Button.module.css";

const Button = (props) => {
  let btnColor;
  switch (props.color) {
    case "green":
      btnColor = classes.green;
      break;

    case "red":
      btnColor = classes.red;
      break;

    default:
      break;
  }

  let btnWidth;
  switch (props.width) {
    case "80%":
      btnWidth = classes.w80;
      break;

    case "20%":
      btnWidth = classes.w20;
      break;

    default:
      break;
  }
  return (
    <button
      onClick={props.onClick}
      className={
        btnColor + " " + btnWidth + " " + props.className + " " + classes.button
      }
      styles={props.styles}
    >
      {props.children}
    </button>
  );
};

export default Button;
