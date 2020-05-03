import createDataContext from "./createDataContext";
import jsonServer from "../api/jsonServer";

/*============== Note ================*/
// This is a boilerplate to create multiple context.js file.
// We only need to change the reducer, helper function and
// the 3 argument in createDataContext().
// We can create multiple context.js through this
// implementation of Automatic Context Creation for different purpose.
// Example: ImageContext.js and BlogContext.js.
/*============== Note ================*/

//Reducer function
//Random id generator for add_blogPost.
//The filter() method creates an array filled with all array elements that pass a test.
//The map(), loops through the state of each item and match the id,
//if match to repalce the existing content with new content else return existing content.
const blogReducer = (State, action) => {
  switch (action.type) {
    case "get_blogPosts":
      //A total source of true data, therefore there is no
      //need to add the data from API into the state.
      return action.payload;
    case "delete_blogPost":
      return State.filter((itemInState) => itemInState.id !== action.payload);

    case "edit_blogPost":
      return State.map((blogPost) => {
        return blogPost.id === action.payload.id ? action.payload : blogPost;
      });
    default:
      return State;
  }
};

//Helper function that dispatch action.
//Our addBlogPost does not have access to dispatch, because
//dispatch was created in Provider function.
//In order to access the dispatch function, we have to call
//our helper function addBlogPost with dispatch function.
//Then return a new function that calls the dispatch function.
const getBlogPosts = (dispatch) => {
  return async () => {
    const response = await jsonServer.get("/blogposts");
    dispatch({ type: "get_blogPosts", payload: response.data });
  };
};

const addBlogPost = (dispatch) => {
  return async (title, content, callback) => {
    await jsonServer.post("/blogposts", { title, content });
    callback();
  };
};

const deleteBlogPost = (dispatch) => {
  return async (id) => {
    await jsonServer.delete(`/blogposts/${id}`);
    //Since getBlogPost can only run once in useEffect,
    //we will not be able to see the IndexScreen re-render
    //to show the udpated data from server side, therefore,
    //we can dispatch to update client side state so that
    //IndexScreen will re-render to show udpated data.
    //IndexScreen is not Focus or navigated to.

    //Benefit of using dispatch to udpate state is that
    //we can almost immediately see the changes to the data,
    //we dont have to wait for server side data.
    dispatch({ type: "delete_blogPost", payload: id });
  };
};

const editBlogPost = (dispatch) => {
  return async (id, title, content, callback) => {
    await jsonServer.put(`blogposts/${id}`, { title, content });
    dispatch({ type: "edit_blogPost", payload: { id, title, content } });
    callback();
  };
};

//Call createDataContext function and pass in 3 things.
//1. Reducer function.
//2. Helper function that dispatch action.
//3. Initial state, in this case is an array [].
//On return from createDataContext,
//we destructure the returned object which contains
//Context and Provider.
export const { Context, Provider } = createDataContext(
  blogReducer,
  { getBlogPosts, addBlogPost, deleteBlogPost, editBlogPost },
  []
);
