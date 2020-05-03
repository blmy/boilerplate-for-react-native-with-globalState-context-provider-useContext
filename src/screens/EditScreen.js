import React, { useContext } from "react";
import { StyleSheet } from "react-native";
import { Context } from "../context/BlogContext";

import BlogPostForm from "../components/BlogPostForm";

//Receiveing navigation prop from show screen to get item id.
const EditScreen = ({ navigation }) => {
  const id = navigation.getParam("id");
  const { state, editBlogPost } = useContext(Context);

  const blogPost = state.find((blogPost) => blogPost.id === id);

  return (
    //navigation.pop() allows us to go back to previous screen.
    <BlogPostForm
      initialValue={{ title: blogPost.title, content: blogPost.content }}
      onSubmit={(title, content) => {
        editBlogPost(id, title, content, () => navigation.pop());
      }}
    />
  );
};

const styles = StyleSheet.create({});

export default EditScreen;
