import React from "react";
import { Link } from "react-router-dom";

import "./index.scss";

import Title from "../Title";
// import Button from "../Button";
import FavoriteButton from "../FavoriteButton";

function Movie({ children, title, img, onClick, isfavorite, id }) {
  const classes = `Movie`;

  return (
    <div className={classes}>
      {/* onClick={openMovie(id)} */}
      <div
        className="Movie-Image"
        style={{ backgroundImage: `url(${img})` }}
      ></div>
      <div className="Movie-Info">
        <Link to={`/content/${id}`}>
          <Title level="4">{title}</Title>
        </Link>
        <div className="module line-clamp">
          <p>{children}</p>
        </div>
        <FavoriteButton
          onClick={onClick}
          mode={isfavorite ? "outline" : ""}
          id={id}
        ></FavoriteButton>
      </div>
    </div>
  );
}

export default Movie;
