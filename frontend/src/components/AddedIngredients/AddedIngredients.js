import React from "react";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import Chip from "@material-ui/core/Chip";

const AddedIngredients = ({ name, amount, close }) => {
  return (
    <Grid item xs={2}>
      <Box py={1}>
        <Chip
          label={`${name} - qty(${amount})`}
          onDelete={close}
          variant="outlined"
        />
      </Box>
    </Grid>
  );
};

export default AddedIngredients;
