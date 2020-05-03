import React from "react";
import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";

import IndexScreen from "./src/screens/IndexScreen";
import ShowScreen from "./src/screens/ShowScreen";
import CreateScreen from "./src/screens/CreateScreen";
import EditScreen from "./src/screens/EditScreen";

//There will be multiple Provider in furture.
//Example: import { Provider } from "../context/ImageContext";
//To resolve duplicate Provider name, we can do this:
//import { Provider as ImageProvider } from "../context/ImageContext";
import { Provider } from "./src/context/BlogContext";

//2 arguments in createStackNavigator()
//first, list out all our screens
//second, configuration options specifically for stackNavigation
const navigator = createStackNavigator(
  {
    Index: IndexScreen,
    Show: ShowScreen,
    Create: CreateScreen,
    Edit: EditScreen,
  },
  {
    initialRouteName: "Index",
    defaultNavigationOptions: {
      title: "Blogs",
      headerTitleAlign: "center",
    },
  }
);

//Refactor below to wrap every other components in inside our
//application in our custom component wrapper <Provider>.
//In the Provider function, we will return the state or data
//to our children. In this case, is <App />.
//==========Start===============//

//export default createAppContainer(navigator);

const App = createAppContainer(navigator);

export default () => {
  return (
    //We can warp multiple nested provider.
    <Provider>
      <App />
    </Provider>
  );
};

//==========End===============//
