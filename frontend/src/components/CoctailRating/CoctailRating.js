import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { useDispatch } from "react-redux";
import Rating from "@material-ui/lab/Rating";
import Box from "@material-ui/core/Box";
import { addCoctailRating } from "../../store/actions/coctailsActions";
import { labels } from "../../constants";

const useStyles = makeStyles({
  root: {
    display: "flex",
    alignItems: "center",
  },
});

const CoctailRating = ({ rating, user, id, disabled }) => {
  let currentUserRating = rating && rating.find((el) => el.user === user);
  if (currentUserRating === undefined) {
    currentUserRating = { score: 0 };
  }
  const [hover, setHover] = useState(-1);
  const dispatch = useDispatch();
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Rating
        name="hover-feedback"
        value={currentUserRating.score}
        disabled={disabled}
        onChange={(event, newValue) => {
          dispatch(addCoctailRating(id, { user, score: newValue }));
        }}
        onChangeActive={(event, newHover) => {
          setHover(newHover);
        }}
      />
      <Box ml={2}>
        {labels[hover !== -1 ? hover : currentUserRating.score]}{" "}
      </Box>
    </div>
  );
};

export default CoctailRating;
