import React from "react";
import { connect } from "react-redux";
import content from "../../../content";
import { compose, bindActionCreators } from "redux";
import { withRouter } from "react-router-dom";

import "./index.scss";

const FavoriteButton = ({ id, isFavorite, favorites, toggleFavorite }) => {
  // allFavorites,
  const onClick = () => toggleFavorite(id, isFavorite);
  return (
    <button className="FavoriteButton" onClick={onClick}>
      {/* {!!allFavorites && allFavorites.includes(id) ? "Remove 💔" : "Favorite"} */}
      {/* {!!favorites && favorites.includes(id) ? "Remove 💔" : "Favorite"} */}
      {isFavorite ? "Remove 💔" : "Favorite"}
    </button>
  );
};

// function mapStateToProps({ content: { favorites } }) {
//   return {
//     allFavorites: favorites
//   };
// }

// function mapDispatchToProps(dispatch) {
//   return {
//     toggleFavorite: id => dispatch({ type: content.types.TOGGLE_FAVORITE, id })
//   };
// }

// export default connect(mapStateToProps, mapDispatchToProps)(FavoriteButton);
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
