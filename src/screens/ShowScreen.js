import React, { useContext } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

import { EvilIcons } from "@expo/vector-icons";

//If there is multiple context.
//import { Context as ImageContext } from "../context/ImageContext";
import { Context } from "../context/BlogContext";

//Receiving navagation prop from index screen
const ShowScreen = ({ navigation }) => {
  //destructure state from Context.
  const { state } = useContext(Context);

  //finding within state, the same id as the id from navigation.
  const blogPost = state.find(
    (blogPost) => blogPost.id === navigation.getParam("id")
  );

  return (
    <View>
      <Text>{blogPost.title}</Text>
      <Text>{blogPost.content}</Text>
    </View>
  );
};

//passing id to edit screen via navigation prop
ShowScreen.navigationOptions = ({ navigation }) => {
  return {
    headerRight: () => (
      <TouchableOpacity
        onPress={() =>
          navigation.navigate("Edit", { id: navigation.getParam("id") })
        }
      >
        <EvilIcons name="pencil" size={30} />
      </TouchableOpacity>
    ),
  };
};

const styles = StyleSheet.create({});

export default ShowScreen;
