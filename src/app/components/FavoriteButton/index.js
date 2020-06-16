import React from "react";
import { connect } from "react-redux";
import content from "../../../content";
import { compose, bindActionCreators } from "redux";
import { withRouter } from "react-router-dom";

import "./index.scss";

const FavoriteButton = ({ id, isFavorite, toggleFavorite }) => {
  const onClick = () => toggleFavorite(id, isFavorite);
  return (
    <button className="FavoriteButton" onClick={onClick}>
      {isFavorite ? "Remove 💔" : "Favorite"}
    </button>
  );
};

const enhance = compose(
  withRouter,
  connect(
    (state, { id }) => {
      return {
        isFavorite: content.selectors.isFavoriteById(state, id)
      };
    },
    dispatch => {
      return {
        toggleFavorite: bindActionCreators(
          content.actions.toggleFavorite,
          dispatch
        )
      };
    }
  )
);

export default enhance(FavoriteButton);
