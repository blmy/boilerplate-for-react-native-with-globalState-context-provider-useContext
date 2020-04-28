import React from "react";

//Object that is responsible for moving data directly to component.
const BlogContext = React.createContext();

//We created a component called BlogProvider that accepts other component
//as an argument and that other argument is going to be shown in our BlogProvider.

//The children is a prop that represent other component.

//We can create a lot of custom component to wrap around elements
//that we wish to pass data to.

//In this case, the children is <App />, as it is wrapped by
//our custom component BlogProvider.

export const BlogProvider = ({ children }) => {
  return (
    <BlogContext.Provider
      //We are not able to put object in value right now,
      //it will throw an error, the reason is that
      //we cannot render a text object with react.
      value={"I am a context value."}
    >
      {children}
    </BlogContext.Provider>
  );
};

export default BlogContext;
