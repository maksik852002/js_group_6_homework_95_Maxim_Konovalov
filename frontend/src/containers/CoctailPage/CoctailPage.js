import React, { Component } from "react";
import { fetchCoctail } from "../../store/actions/coctailsActions";
import { connect } from "react-redux";
import Grid from "@material-ui/core/Grid";
import CardMedia from "@material-ui/core/CardMedia";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Rating from "@material-ui/lab/Rating";
import Box from "@material-ui/core/Box";
import { apiURL, labels } from "../../constants";
import CoctailRating from "../../components/CoctailRating/CoctailRating";
import {publishCoctail, deleteCoctail} from '../../store/actions/coctailsActions';

class ProductPage extends Component {
  componentDidMount() {
    this.props.fetchCoctail(this.props.match.params.id);
  }

  render = () => {
    const {
      name,
      recipe,
      image,
      ingredients,
      rating,
      _id,
      published
    } = this.props.coctail;
    const picture = apiURL + "/" + image;
    const totalScore =
      rating && rating.length !== 0
        ? Math.round(
            rating.reduce((acc, currentValue) => acc + currentValue.score, 0) /
              rating.length
          )
        : "0";

    return (
      <Grid
        item
        container
        direction="column"
        xs={12}
        sm={11}
        md={9}
        xl={7}
        style={{ margin: "auto" }}
      >
        <Paper
          elevation={2}
          style={{ margin: "auto", marginTop: "30px", marginBottom: "30px", padding: "20px" }}
        >
          <Grid item container direction="row" spacing={2} wrap="wrap-reverse">
            <Grid item xs={12} sm={6}>
              <Paper elevation={3} style={{ padding: "5px" }}>
                <CardMedia
                  component="img"
                  image={image && picture}
                />
              </Paper>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography component="h4" variant="h4">
                {name}
              </Typography>
              <Typography component="h5" variant="overline">
                Rating:
              </Typography>
              <Grid
                item
                container
                xs
                alignItems="center"
                style={{ marginBottom: "8px" }}
              >
                <Rating
                  name="read-only"
                  value={parseInt(totalScore)}
                  readOnly
                />
                {totalScore !== null && rating && (
                  <Box ml={2}>
                    {labels[totalScore]} ({rating.length} votes)
                  </Box>
                )}
              </Grid>
              <Typography component="h5" variant="overline">
                Ingredietns:
              </Typography>
              <List>
                {ingredients &&
                  ingredients.map((ingr, i) => (
                    <ListItem key={i}>
                      <Typography component="p" variant="subtitle1">
                        {ingr.ingName} - {ingr.amount}
                      </Typography>
                    </ListItem>
                  ))}
              </List>
            </Grid>
          </Grid>
          <Grid item xs>
            <Typography component="h5" variant="overline">
              Recipe:
            </Typography>
            <Typography component="p" variant="subtitle1">
              {recipe}
            </Typography>
          </Grid>
          {this.props.user && (
            <Grid item xs>
              <Typography component="h5" display="inline" variant="overline">
                Your Rate:
              </Typography>
              <Grid item container xs justify='space-between' alignItems='center'>
                <Grid item xs={6}>
                  <CoctailRating
                    user={this.props.user._id}
                    id={_id}
                    rating={rating}
                    disabled={!published} 
                  />
                </Grid>
                <Grid item container xs={6} justify='flex-end'>
                  {this.props.user.role==='admin' && (
                    <Button onClick={() => this.props.deleteCoctail(_id)} color="secondary">Delete</Button>
                  )}
                  {!published && (
                    <Button onClick={() => this.props.publishCoctail(_id)} color="primary" disabled={this.props.user.role!=='admin'}>{this.props.user.role !=='admin' ? 'Unpublished' : 'Publish'}</Button>
                  )}
                </Grid>
              </Grid>
            </Grid>
          )}
        </Paper>
      </Grid>
    );
  };
}

const mapStateToProps = (state) => ({
  coctail: state.coctails.coctail,
  user: state.users.user,
});

const mapDispatchToProps = (dispatch) => ({
  fetchCoctail: (id) => dispatch(fetchCoctail(id)),
  publishCoctail: (id) => dispatch(publishCoctail(id)),
  deleteCoctail: (id) => dispatch(deleteCoctail(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ProductPage);
