import {
  ADD_BLOG_POST,
  GET_BLOG_POSTS,
  DELETE_BLOG_POSTS,
  GET_EDIT_BLOG_POST,
  EDIT_BLOG_POST,
} from "../actions/types";

const initialstate = {
  blogPosts: [],
  blogEdit: {},
};

export default function (state = initialstate, action) {
  switch (action.type) {
    case ADD_BLOG_POST:
      return {
        blogPosts: [...state.blogPosts, action.payload],
      };
    case GET_BLOG_POSTS:
      return {
        blogPosts: [...action.payload],
      };
    case DELETE_BLOG_POSTS:
      return {
        blogPosts: [
          ...state.blogPosts.filter((cur) => cur.id !== action.payload),
        ],
      };
    case GET_EDIT_BLOG_POST:
      return {
        ...state,
        blogEdit: action.payload,
      };
    case EDIT_BLOG_POST:
      return {
        blogPosts: [
          ...state.blogPosts.filter((cur) => cur.id !== action.payload.id),
          action.payload,
        ],
      };
    default:
      return state;
  }
}
