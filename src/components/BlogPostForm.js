import React, { useState } from "react";
import { View, Text, StyleSheet, TextInput, Button } from "react-native";

const BlogPostForm = ({ onSubmit, initialValue }) => {
  //Initialise default state in component.
  const [title, setTitle] = useState(initialValue ? initialValue.title : "");
  const [content, setContent] = useState(initialValue ? initialValue.content : "");

  return (
    <View>
      <Text style={styles.label}>Enter Title:</Text>
      <TextInput
        style={styles.input}
        value={title}
        onChangeText={(input) => setTitle(input)}
      />
      <Text style={styles.label}>Enter Content:</Text>
      <TextInput
        style={styles.input}
        value={content}
        onChangeText={(input) => setContent(input)}
      />
      {/* onSubmit prop function contains 2 argument to pass to addBlogPost,
      title and content. This is the new input from the user inside the form. */}
      <Button title="Save Blog Post" onPress={() => onSubmit(title, content)} />
    </View>
  );
};

const styles = StyleSheet.create({
  input: {
    fontSize: 18,
    borderWidth: 1,
    borderColor: "black",
    marginBottom: 10,
    padding: 5,
    margin: 5,
  },
  label: {
    fontSize: 20,
    margin: 5,
  },
});

export default BlogPostForm;
