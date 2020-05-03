import React, { useReducer } from "react";

/*============== Note ================*/
// This is a boilerplate for Automatic Context Creation.
// We do not need to change another code in this js file.
/*============== Note ================*/

//Export default a plain function thus the file name is lowercase createDataContext.
//The 3 things that need to be customised is passed into
//our export default function.
//1. the reducer function.
//2. the helper function dispatch action.
//3. the initial state.
export default (reducer, actions, initialState) => {
  //Declaring Context variable.
  const Context = React.createContext();

  //Setup provider function.
  //This is the wrapper that wraps our entire App component.
  const Provider = ({ children }) => {
    //Setup useReducer state.
    //The reducer function and initialState is passed
    //into our useReducer.
    const [state, dispatch] = useReducer(reducer, initialState);

    //Actions is an object that contain all our action functions.
    //We loop throught each actions === { addBlogPost: (dispatch) => { return () => {} }}.
    //The naming of boundActions is because we process these actions
    //individually and they are bound to this copy of dispatch.
    const boundActions = {};
    //key === "addBlogPost"
    for (let key in actions) {
      //boundActions[key] is similar to boundAction.addBlogPost
      //actions[key] is similar to actions.addBlogPost(dispatch)
      boundActions[key] = actions[key](dispatch);
    }

    //In our provider function, we return the state
    //and all actions to our children.
    //Therefore, children can onlt access these two items.
    return (
      <Context.Provider value={{ state, ...boundActions }}>
        {children}
      </Context.Provider>
    );
  };

  //In the export default function, we return the Context
  //and Provider to the Context.js that called createDataContext.
  return { Context, Provider };
};
