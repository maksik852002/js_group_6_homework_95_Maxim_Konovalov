import axiosApi from "../../axiosApi";
import { push } from "connected-react-router";
import { toast } from 'react-toastify';

export const FETCH_COCTAILS_SUCCESS = 'FETCH_COCTAILS_SUCCESS';

export const CREATE_COCTAIL_SUCCESS = 'CREATE_COCTAIL_SUCCESS';
export const CREATE_COCTAIL_FAILURE = 'CREATE_COCTAIL_FAILURE';

export const ADD_COCTAIL_RATING_SUCCESS = 'ADD_COCTAIL_RATING_SUCCESS';

export const FETCH_COCTAIL_SUCCESS = 'FETCH_COCTAIL_SUCCESS';

export const PUBLISH_COCTAIL_SUCCESS = 'PUBLISH_COCTAIL_SUCCESS';

export const fetchCoctailsSuccess = coctails => ({type: FETCH_COCTAILS_SUCCESS, coctails});
export const createCoctailSuccess = () => ({type: CREATE_COCTAIL_SUCCESS});
export const createCoctailFailure = (error) => ({type: CREATE_COCTAIL_FAILURE, error});
export const addCoctailRatingSuccess = () => ({type: ADD_COCTAIL_RATING_SUCCESS});
export const fetchCoctailSuccess = coctail => ({type: FETCH_COCTAIL_SUCCESS, coctail});
export const publishCoctailSuccess = () => ({type: PUBLISH_COCTAIL_SUCCESS})

export const fetchCoctails = () => {
  return async (dispatch) => {
    const response = await axiosApi.get('/coctails');
    dispatch(fetchCoctailsSuccess(response.data));
  };
};

export const createCoctail = data => {
  return async (dispatch) => {
    try {
    await axiosApi.post('/coctails', data);
    dispatch(createCoctailSuccess());
    dispatch(push('/'))
    toast.info('Created cocktail under consideration by the moderator.', {
      position: toast.POSITION.BOTTOM_LEFT
    });
    } catch (e) {
      if (e.response) {
        dispatch(createCoctailFailure(e.response.data));
      } else {
        dispatch(createCoctailFailure({ global: "Network error or no internet" }));
      }
    }
  };
};

export const addCoctailRating = (id, data) => {
  return async (dispatch) => {
    try {
      await axiosApi.patch(`/coctails/${id}`, data);
      dispatch(fetchCoctail(id));
    } catch (e) {
      console.log(e)
    }
  };
};

export const fetchCoctail = id => {
  return async dispatch => {
    const response = await axiosApi.get('/coctails/' + id);
    dispatch(fetchCoctailSuccess(response.data));
  }
};

export const publishCoctail = id => {
  return async dispatch => {
    try {
      await axiosApi.patch(`/coctails/${id}/publish`);
      dispatch(fetchCoctails());
      dispatch(push('/'))
    } catch (e) {
      console.log(e)
    }
  };
};

export const deleteCoctail = id => {
  return async dispatch => {
    try {
      await axiosApi.delete(`/coctails/${id}`);
      dispatch(fetchCoctails());
      dispatch(push('/'))
    } catch (e) {
      console.log(e)
    }
  };
};
