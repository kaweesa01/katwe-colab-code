import {
  ADD_BLOG_POST,
  GET_BLOG_POSTS,
  DELETE_BLOG_POSTS,
  GET_EDIT_BLOG_POST,
  EDIT_BLOG_POST
} from "./types";
import axios from "axios";

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

export const getEditBlog = (id) => (dispatch) => {
  axios
    .get(`/api/blog/${id}/`)
    .then((res) => {
      dispatch({
        type: GET_EDIT_BLOG_POST,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err.response);
    });
};

export const addBlog = (blog) => (dispatch) => {
  axios
    .post("/api/blog/", blog)
    .then((res) => {
      dispatch({
        type: ADD_BLOG_POST,
        payload: res.data,
      });
    })
    .catch((err) => console.log(err.response));
};

export const editBlog = (id, blog) => (dispatch) => {
  axios
    .put(`/api/blog/${id}/`, blog)
    .then((res) => {
      dispatch({
        type: EDIT_BLOG_POST,
        payload: res.data,
      });
    })
    .catch((err) => console.log(err.response));
};

export const deleteBlog = (id) => (dispatch) => {
  console.log(id);
  axios
    .delete(`/api/blog/${id}/`)
    .then(
      dispatch({
        type: DELETE_BLOG_POSTS,
        payload: id,
      })
    )
    .catch((err) => console.log(err.response));
};
