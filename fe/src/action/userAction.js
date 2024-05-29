import api from "../utils/api";
import * as types from "../constants/user.constants";
import { commonUiActions } from "./commonUiAction";
import * as commonTypes from "../constants/commonUI.constants";
import { Response } from '../../node_modules/whatwg-fetch/fetch';
import { Navigate } from 'react-router-dom';
const loginWithToken = () => async (dispatch) => {};
const loginWithEmail = (payload) => async (dispatch) => {};
const logout = () => async (dispatch) => {};

const loginWithGoogle = (token) => async (dispatch) => {};

const registerUser =
  ({ email, name, password }, Navigate) =>
  async (dispatch) => {
    try{
      dispatch({type: types.GOOGLE_LOGIN_REQUEST})
      const Response = await api.post("/user", {email, name, password});
      if(Response.status !== 200) throw new Error(Response.data.error);
      dispatch({type:types.REGISTER_USER_SUCCESS})
      dispatch(commonUiActions.showToastMessage("Registration completed successfully.", "success"));
      Navigate("/login");
    }catch(error){
      dispatch({type:types.REGISTER_USER_FAIL,payload:error.error});
    }
  };
export const userActions = {
  loginWithToken,
  loginWithEmail,
  logout,
  loginWithGoogle,
  registerUser,
};
