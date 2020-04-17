import React, { Component } from "react";
import FormElement from "../UI/Form/FormElement";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import AddedIngredients from "../AddedIngredients/AddedIngredients";

class PostForm extends Component {
  state = {
    name: "",
    image: "",
    ingredients: [],
    recipe: "",
    ingName: "",
    amount: "",
  };

  submitFormHandler = (event) => {
    event.preventDefault();

    const formData = new FormData();

    Object.keys(this.state).forEach((key) => {
      let value = this.state[key];
      if (key !== "ingName" || key !== "amount") {
        if (key === 'ingredients') {
          value = JSON.stringify(value)
        }
        formData.append(key, value);
      }
    });
    this.props.onSubmit(formData);
  };

  inputChangeHandler = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  fileChangeHandler = (event) => {
    this.setState({
      [event.target.name]: event.target.files[0],
    });
  };

  addIngrdientHandler = () => {
    this.setState({
      ingredients: [
        ...this.state.ingredients,
        { ingName: this.state.ingName, amount: this.state.amount },
      ],
      ingName: "",
      amount: "",
    });
  };

  removeIngrdientHandler = (index) => {
    const ingredients = [...this.state.ingredients];
    ingredients.splice(index, 1)
    this.setState({ingredients});
  };

  getFieldError = fieldName => {
    try {
      return this.props.error.errors[fieldName].message;
    } catch (e) {
      return undefined;
    }
  };

  render() {
    return (
      <form onSubmit={this.submitFormHandler}>
        <Grid container direction="column" spacing={2}>
          <Grid item xs>
            <FormElement
              type="text"
              propertyName="name"
              title="Name"
              placeholder="Enter coctail name"
              onChange={this.inputChangeHandler}
              value={this.state.name}
              error={this.getFieldError('name')}
            />
          </Grid>
          <Grid item container direction="column" spacing={2}>
            <Grid item container xs>
              {this.state.ingredients.map((ing, i) => (
                <AddedIngredients key={i} name={ing.ingName} amount={ing.amount} close={() => this.removeIngrdientHandler(i)}/>
              ))}
            </Grid>
            <Grid item container xs justify="space-between">
              <Grid item xs={9}>
                <FormElement
                  type="text"
                  propertyName="ingName"
                  title="Ingredient name"
                  placeholder="Enter ingredient name"
                  onChange={this.inputChangeHandler}
                  value={this.state.ingName}
                />
              </Grid>
              <Grid item xs={2}>
                <FormElement
                  type="text"
                  propertyName="amount"
                  title="Amount"
                  placeholder="Enter amount"
                  onChange={this.inputChangeHandler}
                  value={this.state.amount}
                />
              </Grid>
            </Grid>
            <Grid item>
              <Button
                onClick={this.addIngrdientHandler}
                color="primary"
                variant="contained"
              >
                Add ingredient
              </Button>
            </Grid>
          </Grid>
          <Grid item xs>
            <FormElement
              type="text"
              propertyName="recipe"
              title="Recipe"
              placeholder="Enter coctail recipe"
              onChange={this.inputChangeHandler}
              value={this.state.recipe}
              error={this.getFieldError('recipe')}
            />
          </Grid>
          <Grid item xs>
            <FormElement
              type="file"
              propertyName="image"
              title="Image"
              onChange={this.fileChangeHandler}
              error={this.getFieldError('image')}
            />
          </Grid>
          <Grid item xs>
            <Button type="submit" color="primary" variant="contained">
              Create coctail
            </Button>
          </Grid>
        </Grid>
      </form>
    );
  }
}

export default PostForm;
