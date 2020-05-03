import React, { useContext, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import { AntDesign, Feather } from "@expo/vector-icons";
//There will be multiple context in furture.
//Example: import { Context } from "../context/ImageContext";
//To resolve duplicate Context name, we can do this:
//import { Context as ImageContext } from "../context/ImageContext";
import { Context } from "../context/BlogContext";

//The props contain navigation to other screens.
const IndexScreen = ({ navigation }) => {
  //destructure BlogContext value
  const { state, deleteBlogPost, getBlogPosts } = useContext(Context);

  //useEffect, run some code only one time when component is first rendered.
  //Empty [] in the 2nd argument indicates that we want to run this code exactly one time.
  //When user is in IndexScreen, the getBlogPost() will only run one time.
  useEffect(() => {
    getBlogPosts();

    //If the screen is focus again, to run the code.
    //By focus means that, the screen is shown/navigated to user again.
    const listener = navigation.addListener("didFocus", () => {
      getBlogPosts();
    });

    //Remove listener to prevent memory leak.
    return () => {
      listener.remove();
    };
  }, []);

  return (
    <View style={styles.container}>
      {/* On button press, invoke callback function for delete post. */}
      {/* We cannot render out array of object directly with react inside of <Text> element,
      we need to use Flatlist to render array of object. */}
      {/* KeyExtractor has to be string */}
      <FlatList
        data={state}
        keyExtractor={(blogPost) => blogPost.id.toString()}
        renderItem={({ item }) => {
          return (
            //passing info to other screen with second argument with navigation.
            <TouchableOpacity
              onPress={() => navigation.navigate("Show", { id: item.id })}
            >
              <View style={styles.row}>
                <Text style={styles.title}>
                  {item.title} -> {item.id}
                </Text>
                <Text style={styles.title}>{item.content}</Text>
                <TouchableOpacity onPress={() => deleteBlogPost(item.id)}>
                  <AntDesign style={styles.icon} name="delete" />
                </TouchableOpacity>
              </View>
            </TouchableOpacity>
          );
        }}
      />
    </View>
  );
};

//Editing header navigation
IndexScreen.navigationOptions = ({ navigation }) => {
  return {
    headerRight: () => (
      <TouchableOpacity onPress={() => navigation.navigate("Create")}>
        <Feather style={{ marginRight: 15 }} name="plus" size={30} />
      </TouchableOpacity>
    ),
  };
};

const styles = StyleSheet.create({
  container: {
    //borderWidth: 1,
    //borderColor: "red",
    height: Dimensions.get("window").height - 56,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 20,
    paddingHorizontal: 10,
    //borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: "grey",
  },
  title: {
    fontSize: 18,
  },
  icon: {
    fontSize: 24,
  },
});

export default IndexScreen;
