import React from "react";
import "./index.scss";

import Title from "../Title";
import Button from "../Button";

function Movie({ children, title, img, onClick, isfavorite }) {
  const classes = `Movie`;

  return (
    <div className={classes}>
      <div
        className="Movie-Image"
        style={{ backgroundImage: `url(${img})` }}
      ></div>
      <div className="Movie-Info">
        <Title level="4">{title}</Title>
        <div className="module line-clamp">
          <p>{children}</p>
        </div>
        <Button
          size="small"
          onClick={onClick}
          mode={isfavorite ? "outline" : ""}
        >
          {isfavorite ? "Remove" : "Favorite"}
        </Button>
      </div>
    </div>
  );
}

export default Movie;
