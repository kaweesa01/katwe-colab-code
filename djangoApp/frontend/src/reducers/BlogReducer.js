import {
  ADD_BLOG_POST,
  GET_BLOG_POSTS,
  DELETE_BLOG_POSTS,
  GET_EDIT_BLOG_POST,
  EDIT_BLOG_POST,
  GET_USER_BLOG_POSTS,
  ADMIN_DELETE_BLOG_POSTS
} from "../actions/types";

const initialstate = {
  blogPosts: [],
  userBlogPosts: [],
  blogEdit: {},
};

export default function (state = initialstate, action) {
  switch (action.type) {
    case ADD_BLOG_POST:
      return {
        ...state,
        userBlogPosts: [...state.userBlogPosts, action.payload],
      };
    case GET_USER_BLOG_POSTS:
      return {
        ...state,
        userBlogPosts: [...action.payload],
      };
    case GET_BLOG_POSTS:
      return {
        ...state,
        blogPosts: [...action.payload],
      };
    case DELETE_BLOG_POSTS:
      return {
        ...state,
        userBlogPosts: [
          ...state.userBlogPosts.filter((cur) => cur.id !== action.payload),
        ],
      };
    case ADMIN_DELETE_BLOG_POSTS:
      return {
        ...state,
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
        ...state,
        userBlogPosts: [
          ...state.userBlogPosts.filter((cur) => cur.id !== action.payload.id),
          action.payload,
        ],
      };
    default:
      return state;
  }
}
