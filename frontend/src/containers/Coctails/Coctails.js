import React, {Component} from 'react';
import {fetchCoctails} from "../../store/actions/coctailsActions";
import {connect} from "react-redux";
import {Link} from "react-router-dom";
import Coctail from "../../components/Coctail/Coctail";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import Box from '@material-ui/core/Box';

class Coctails extends Component {
  componentDidMount() {
    this.props.fetchCoctails();
  }

  render() {
    return (
      <Box mt={3}>
        <Grid container direction="column" spacing={2}>
          <Grid item container direction="row" justify="space-between" alignItems="center">
            <Grid item>
              <Typography variant="h4">
                Coctails
              </Typography>
            </Grid>
            {this.props.user && (
              <Grid item>
                <Button
                  color="primary"
                  component={Link}
                  to={"/coctails/new"}
                >
                  Add new coctail
                </Button>
              </Grid>
            )}
          </Grid>

          <Grid item container direction="row" justify="space-evenly" spacing={2}>
            {this.props.coctails.map(coctail => (
              <Coctail
                key={coctail._id}
                name={coctail.name}
                id={coctail._id}
                recipe={coctail.recipe}
                image={coctail.image}
                rating={coctail.rating}
                user={this.props.user&&this.props.user._id}
                token={coctail.user.token}
                published={coctail.published}
                role={this.props.user&&this.props.user.role}
              />
            ))}
          </Grid>
        </Grid>
      </Box>
    );
  }
}

const mapStateToProps = state => ({
  user: state.users.user,
  coctails: state.coctails.coctails,
});

const mapDispatchToProps = dispatch => ({
  fetchCoctails: () => dispatch(fetchCoctails()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Coctails);
