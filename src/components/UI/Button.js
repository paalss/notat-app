import classes from "./Button.module.css";

const Button = ({ color, width, onClick, className, styles, children }) => {
  // Mulige konfigurasjoner for komponentet
  let btnColor;
  switch (color) {
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
  switch (width) {
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
      onClick={onClick}
      className={
        btnColor + " " + btnWidth + " " + className + " " + classes.button
      }
      styles={styles}
    >
      {children}
    </button>
  );
};

export default Button;
