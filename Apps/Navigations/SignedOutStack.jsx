import Login from "../Screens/Login";
import Forgot from "../Screens/Forgot";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Signup from "../Screens/Signup";
import ProfilePic from "../Screens/ProfilePic";
import Additional from "../Screens/Additional";

const Stack = createStackNavigator();

const SignedOutStack = () => (
  <NavigationContainer>
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen
        name="Signup"
        component={Signup}
        options={{
          animation: "slide_from_right",
        }}
      />
      <Stack.Screen
        name="Additional"
        component={Additional}
        options={{
          animation: "slide_from_right",
        }}
      />
      <Stack.Screen
        name="Profilepic"
        component={ProfilePic}
        options={{
          headerShown: true,
          headerTitle: '',
          headerTintColor: 'white',
          headerStyle: {backgroundColor: 'black'},
          animation: "slide_from_right",
        }}
      />
      <Stack.Screen
        name="Forgot"
        component={Forgot}
        options={{
          animation: "slide_from_right",
        }}
      />
    </Stack.Navigator>
  </NavigationContainer>
);

export default SignedOutStack;