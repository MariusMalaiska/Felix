import React from "react";
import "./index.scss";
import { Link } from "react-router-dom";

function Button({ children, size, onClick, mode, type, ...props }) {
  const Tag = props.to ? Link : props.href ? "a" : "button";
  const sizeClass = { small: "Button--small", large: "Button--large" }[size];
  let modeClass = mode === "outline" ? "Button--outline Button " : "Button";

  return (
    <Tag
      className={`${modeClass} ${sizeClass}`}
      onClick={onClick}
      type={type}
      {...props}
    >
      {children}
    </Tag>
  );
}
export default Button;
