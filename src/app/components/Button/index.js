import React from "react";
import "./index.scss";

function Button({ children, size, onClick, mode }) {
  const sizeClass = { small: "Button--small", large: "Button--large" }[size];
  let modeClass = mode === "outline" ? "Button--outline Button " : "Button";
  return (
    <button className={`${modeClass} ${sizeClass}`} onClick={onClick}>
      {children}
    </button>
  );
}
export default Button;
