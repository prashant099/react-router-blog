import axios from "axios";

export const FETCH_POSTS = "FETCH_POSTS";
export const FETCH_POST = "FETCH_POST";
export const CREATE_POST = "CREATE_POST";
export const DELETE_POST = "DELETE_POST";

const BASE_URL = "http://reduxblog.herokuapp.com/api";
const API_KEY = "?key=supersecret";

export const fetchPosts = () => {
  const request = axios.get(`${BASE_URL}/posts${API_KEY}`);

  return {
    type: FETCH_POSTS,
    payload: request,
  };
};

export const fetchPost = (postId) => {
  const request = axios.get(`${BASE_URL}/posts/${postId}${API_KEY}`);

  return {
    type: FETCH_POST,
    payload: request,
  };
};

export const createPost = (formData, callback) => {
  const request = axios
    .post(`${BASE_URL}/posts${API_KEY}`, formData)
    .then(() => callback());

  return {
    type: CREATE_POST,
    payload: request,
  };
};

export const deletePost = (postId, callback) => {
  axios.delete(`${BASE_URL}/posts/${postId}${API_KEY}`).then(() => callback());

  return {
    type: DELETE_POST,
    payload: postId,
  };
};
