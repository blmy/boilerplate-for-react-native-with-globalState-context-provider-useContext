import React, { useContext } from "react";
import { StyleSheet } from "react-native";
import { Context } from "../context/BlogContext";

import BlogPostForm from "../components/BlogPostForm";

//using navigation props to navigate to other screen.
const CreateScreen = ({ navigation }) => {
  const { addBlogPost } = useContext(Context);

  return (
    //addBlogPost, 3rd argument is a callback function.
    //In the event that we are saving/adding data in to external database store,
    //we will need to wait for the saving to be completed THEN navigate to our desired page.
    //onSubmit prop function contains 2 argument to pass to addBlogPost,
    //title and content. This is the new input from the user inside the form.
    <BlogPostForm
      onSubmit={(title, content) =>
        addBlogPost(title, content, () => navigation.navigate("Index"))
      }
    />
  );
};

const styles = StyleSheet.create({});

export default CreateScreen;
