import api from "../utils/api";
import * as types from "../constants/user.constants";
import { commonUiActions } from "./commonUiAction";
import * as commonTypes from "../constants/commonUI.constants";
const loginWithToken = () => async (dispatch) => {};

const loginWithEmail = ({email, password}) => async (dispatch) => {
  try{
    dispatch({type:types.LOGIN_REQUEST});
    const response = await api.post("/auth/login", {email,password});
    if(response.status!==200) throw new Error(response.error);
    sessionStorage.setItem("token", response.data.token);
    dispatch({type: types.LOGIN_SUCCESS, payload: response.data});
  }catch(error){
    dispatch({type:types.LOGIN_FAIL,payload:error.error})
  }
};
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
