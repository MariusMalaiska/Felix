import React, { useState, useCallback, useEffect } from "react";
import { useParams } from "react-router-dom";
import Button from "../components/Button";
import FavoriteButton from "../components/FavoriteButton";
import "../index.css";

const Single = ({ onClick, isfavorite }) => {
  const [movie, setMovie] = useState({});
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState("");
  const { id } = useParams();

  const getSingleItem = useCallback(async () => {
    console.log("fetching");
    console.log(id);
    setIsLoaded(true);
    const response = await fetch(
      `https://academy-video-api.herokuapp.com/content/items/${id}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          authorization: localStorage.getItem("token")
        }
      }
    );
    if (!response.ok) return setError("Error while fetching movie");
    const movie = await response.json();
    console.log(movie, "galinis tekstas 3");

    setMovie(movie);
    setIsLoaded(false);
  }, [setMovie, id]);

  useEffect(() => {
    getSingleItem();
  }, [getSingleItem]);

  return (
    <React.Fragment>
      <div className="Single">
        {isLoaded && !error ? (
          <h4 style={{ color: "white" }}> loading...</h4>
        ) : (
          <React.Fragment>
            <div
              className="Single-Image"
              style={{ backgroundImage: `url(${movie.image})` }}
            ></div>
            <div className="Single-Info">
              <h2 style={{ color: `white` }}>{movie.title}</h2>
              <p style={{ color: `white` }}>{movie.description}</p>
              <div className="Buttons-Info">
                <FavoriteButton
                  // isfavorite={favorites.includes(movie.id)}
                  onClick={onClick}
                  mode={isfavorite ? "outline" : ""}
                  id={movie.id}
                ></FavoriteButton>
                <Button to="/watch" size="large">
                  WATCH
                </Button>
              </div>
            </div>
          </React.Fragment>
        )}
        )}
      </div>
    </React.Fragment>
  );
};

export default Single;
