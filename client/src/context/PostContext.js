import { createContext, useReducer } from 'react';
import reducer from '../reducer/PostReducer';

export const PostContext = createContext();

export const PostContextProvider = ({ children }) => {
  const initialState = {
    posts: [],
    comments: [],
  };
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <PostContext.Provider value={{ ...state, dispatch }}>
      {children}
    </PostContext.Provider>
  );
};
