const PostReducer = (state, action) => {
  if (action.type === 'SET_POSTS') {
    return {
      ...state,
      posts: action.payload,
    };
  }
  if (action.type === 'CREATE_POST') {
    return {
      ...state,
      posts: [action.payload, ...state.posts],
    };
  }

  if (action.type === 'SET_COMMENTS') {
    return {
      ...state,
      comments: action.payload,
    };
  }
  if (action.type === 'CREATE_COMMENT') {
    return {
      ...state,
      comments: [action.payload, ...state.comments],
    };
  }
  if (action.type === 'EMPTY_COMMENT') {
    return {
      ...state,
      comments: action.payload,
    };
  }
  return state;
};

export default PostReducer;
