import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import Grid from "@material-ui/core/Grid";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import Rating from "@material-ui/lab/Rating";
import PropTypes from "prop-types";
import ShowTo from "../../hoc/ShowTo";
import { apiURL } from "../../constants";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import {
  publishCoctail,
  deleteCoctail,
} from "../../store/actions/coctailsActions";

const useStyles = makeStyles({
  root: {
    maxWidth: 345,
    margin: "auto",
  },
  recipe: {
    textAlign: "center",
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
    width: "100%",
  },
});

const Coctail = (props) => {
  const classes = useStyles();

  const dispatch = useDispatch();

  const picture = apiURL + "/" + props.image;

  const totalScore =
    props.rating && props.rating.length !== 0
      ? Math.round(
          props.rating.reduce(
            (acc, currentValue) => acc + currentValue.score,
            0
          ) / props.rating.length
        )
      : "0";
  return (
    <ShowTo published={props.published} token={props.token} role="admin">
      <Grid item xs={12} sm={6} md={4} lg={3}>
        <Card className={classes.root}>
          <CardActionArea component={Link} to={"/coctails/" + props.id}>
            <CardMedia
              component="img"
              alt={props.name}
              height="300"
              image={picture}
              title={props.name}
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="h2">
                {props.name}
              </Typography>
              <Typography
                variant="body2"
                color="textSecondary"
                component="p"
                className={classes.recipe}
              >
                {props.recipe}
              </Typography>
            </CardContent>
          </CardActionArea>
          <Box pb={2} px={2}>
            <Grid item container xs justify="space-between" alignItems="center">
              <Grid item xs={4}>
                <Rating
                  name="read-only"
                  value={parseInt(totalScore)}
                  readOnly
                  size="small"
                  style={{ padding: "9px 0px" }}
                />
              </Grid>
              <Grid item container xs={8} justify="flex-end">
                {props.role === "admin" && (
                  <Button
                    onClick={() => dispatch(deleteCoctail(props.id))}
                    color="secondary"
                  >
                    Delete
                  </Button>
                )}
                {!props.published && (
                  <Button
                    onClick={() => dispatch(publishCoctail(props.id))}
                    color="primary"
                    disabled={props.role !== "admin"}
                  >
                    {props.role !== "admin" ? "Unpublished" : "Publish"}
                  </Button>
                )}
              </Grid>
            </Grid>
          </Box>
        </Card>
      </Grid>
    </ShowTo>
  );
};

Coctail.propTypes = {
  image: PropTypes.string,
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
};

export default Coctail;
