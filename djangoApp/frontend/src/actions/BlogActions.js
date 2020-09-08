import {
  ADD_BLOG_POST,
  GET_BLOG_POSTS,
  DELETE_BLOG_POSTS,
  GET_EDIT_BLOG_POST,
  EDIT_BLOG_POST,
  GET_USER_BLOG_POSTS,
  ADMIN_DELETE_BLOG_POSTS,
  SEARCH_BLOG,
  CANCEL_SEARCH,
  GET_ERRORS,
  REMOVE_ERRORS,
  GET_MESSAGE,
} from "./types";
import axios from "axios";
import { tokenConfig } from "./auth";

export const getBlog = () => (dispatch) => {
  axios
    .get("/api/blog/")
    .then((res) => {
      dispatch({
        type: GET_BLOG_POSTS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err.response);
    });
};

export const adminDeleteBlog = (id) => (dispatch) => {
  console.log(id);
  axios
    .delete(`/api/blog/${id}/`)
    .then(
      dispatch({ type: GET_MESSAGE, payload: { delete: "Blog post deleted" } }),
      dispatch({
        type: ADMIN_DELETE_BLOG_POSTS,
        payload: id,
      })
    )
    .catch((err) => console.log(err.response));
};

export const getUserBlog = () => (dispatch, getState) => {
  axios
    .get("/api/userBlog/", tokenConfig(getState))
    .then((res) => {
      dispatch({ type: REMOVE_ERRORS });
      dispatch({
        type: GET_USER_BLOG_POSTS,
        payload: res.data,
      });
    })
    .catch((err) => {
      // console.log(err.response);
    });
};

export const getEditBlog = (id) => (dispatch, getState) => {
  axios
    .get(`/api/userBlog/${id}/`, tokenConfig(getState))
    .then((res) => {
      dispatch({ type: REMOVE_ERRORS });
      dispatch({
        type: GET_EDIT_BLOG_POST,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err.response);
    });
};

export const addBlog = (blog) => (dispatch, getState) => {
  axios
    .post("/api/userBlog/", blog, tokenConfig(getState))
    .then((res) => {
      dispatch({ type: REMOVE_ERRORS });
      dispatch({ type: GET_MESSAGE, payload: { add: "Blog post added" } });
      dispatch({
        type: ADD_BLOG_POST,
        payload: res.data,
      });
    })
    .catch((err) => {
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data,
      });
      // console.log(err.response);
    });
};

export const editBlog = (id, blog) => (dispatch, getState) => {
  axios
    .put(`/api/userBlog/${id}/`, blog, tokenConfig(getState))
    .then((res) => {
      dispatch({ type: GET_MESSAGE, payload: { edit: "Blog post edited" } });
      dispatch({ type: REMOVE_ERRORS });
      dispatch({
        type: EDIT_BLOG_POST,
        payload: res.data,
      });
    })
    .catch((err) => console.log(err.response));
};

export const deleteBlog = (id) => (dispatch, getState) => {
  console.log(id);
  axios
    .delete(`/api/userBlog/${id}/`, tokenConfig(getState))
    .then(
      dispatch({ type: GET_MESSAGE, payload: { delete: "Blog post deleted" } }),
      dispatch({ type: REMOVE_ERRORS }),
      dispatch({
        type: DELETE_BLOG_POSTS,
        payload: id,
      })
    )
    .catch((err) => console.log(err.response));
};

export const searchBlog = (searchArray, searchTerm) => (dispatch) => {
  if (searchTerm.length !== 0) {
    const filterItems = searchArray.filter(
      (item) => item.creator.toLowerCase().indexOf(searchTerm) > -1
    );
    if (filterItems.length <= 0) {
      const err_msg = {
        msg: "no search result",
      };
      dispatch({
        type: GET_ERRORS,
        payload: err_msg,
      });
    } else {
      dispatch({ type: REMOVE_ERRORS });
      dispatch({
        type: SEARCH_BLOG,
        payload: filterItems,
      });
    }
  } else {
    const err_msg = {
      msg: "Fill the search form",
    };
    dispatch({
      type: GET_ERRORS,
      payload: err_msg,
    });
  }
};

export const cancelSearch = () => (dispatch) => {
  dispatch({
    type: CANCEL_SEARCH,
  });
};
