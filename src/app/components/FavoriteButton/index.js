import React from "react";
import { connect } from "react-redux";

import "./index.scss";

const FavoriteButton = ({ id, allFavorites, toggleFavorite }) => {
  const onClick = () => toggleFavorite(id);

  return (
    <button className="FavoriteButton" onClick={onClick}>
      {!!allFavorites && allFavorites.includes(id) ? "Remove 💔" : "Favorite"}
    </button>
  );
};

function mapStateToProps({ favorites }) {
  return {
    allFavorites: favorites
  };
}

function mapDispatchToProps(dispatch) {
  return {
    toggleFavorite: id => dispatch({ type: "TOGGLE_FAVORITE", id })
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(FavoriteButton);
