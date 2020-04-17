import React from 'react';
import {useDispatch, useSelector} from "react-redux";
import {createCoctail} from "../../store/actions/coctailsActions";
import CoctailForm from "../../components/CoctailForm/CoctailForm";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";

const NewCoctail = () => {

  const error = useSelector(state => state.coctails.error)
  const dispatch = useDispatch();
  const createCoctailHandler = async (data) => {
    await dispatch(createCoctail(data));
  };

  return (
    <>
      <Box pb={2} pt={2}>
        <Typography variant="h4">Add New Coctail</Typography>
      </Box>

      <CoctailForm
        onSubmit={createCoctailHandler}
        error={error}
      />
    </>
  );
}

export default NewCoctail;