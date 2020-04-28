import React from "react";
import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";

import IndexScreen from "./src/screens/IndexScreen";
import { BlogProvider } from "./src/context/BlogContext";

//2 arguments in createStackNavigator()
//first, list out all our screens
//second, configuration options specifically for stackNavigation
const navigator = createStackNavigator(
  {
    Index: IndexScreen,
  },
  {
    initialRouteName: "Index",
    defaultNavigationOptions: {
      title: "Blogs",
    },
  }
);

//Refactor below to wrap every other components in inside our
//application in our custom component wrapper.
//This is our data provider. Something similar with REDUX.
//==========Start===============//

//export default createAppContainer(navigator);

const App = createAppContainer(navigator);

export default () => {
  return (
    <BlogProvider>
      <App />
    </BlogProvider>
  );
};

//==========End===============//
